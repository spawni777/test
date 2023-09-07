import { Injectable } from '@nestjs/common';
import { initializeApp, cert } from 'firebase-admin/app';
import { getDownloadURL, getStorage, Storage } from 'firebase-admin/storage';
import { SaveFileDto } from '@/services/firebase/dto/save-file.dto';
import {unlink} from 'fs/promises';
import { DeleteFileDto } from '@/services/firebase/dto/delete-file.dto';

@Injectable()
export class FirebaseService {
  private storage: Storage;

  constructor() {
    initializeApp({
      credential: cert({
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          .replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        projectId: process.env.FIREBASE_PROJECT_ID,
      }),
      storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
    });

    this.storage = getStorage();
  }

  async saveFile(dto: SaveFileDto) {
    const snapshot = await this.storage.bucket().upload(dto.filePath);
    const fileURL = await getDownloadURL(snapshot[0]);

    await unlink(dto.filePath);
    return fileURL;
  }

  async deleteFile(dto: DeleteFileDto) {
      await this.storage.bucket().file(dto.filename).delete();
  }
}
