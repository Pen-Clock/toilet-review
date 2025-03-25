// src/controllers/photoController.ts
import { Request, Response } from 'express';
import path from 'path';
import { UploadedFile } from 'express-fileupload';
import Photo from './models/Photo';
import Toilet from './models/Toilet';

export async function getToiletPhotos(req: Request, res: Response) {
  try {
    const photos = await Photo.find({ toilet_id: req.params.id });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
}

export async function uploadPhoto(req: Request, res: Response) {
  try {
    const toiletId = req.params.id;
    
    const toilet = await Toilet.findById(toiletId);
    if (!toilet) {
      return res.status(404).json({ error: 'Toilet not found' });
    }
    
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded' });
    }
    
    const photoFile = req.files.photo as UploadedFile;
    
    if (!photoFile.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'Only image files are allowed' });
    }
    
    // Create a unique filename
    const filename = `${Date.now()}-${photoFile.name.replace(/\s/g, '_')}`;
    const uploadPath = path.join(__dirname, '../../uploads', filename);
    
    // Move the file to the uploads directory
    await photoFile.mv(uploadPath);
    
    // Create a new photo record in the database
    const photo = new Photo({
      toilet_id: toiletId,
      url: `/uploads/${filename}`
    });
    
    const newPhoto = await photo.save();
    res.status(201).json(newPhoto);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(400).json({ 
      error: 'Failed to upload photo',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
