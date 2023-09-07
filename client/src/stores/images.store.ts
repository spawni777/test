import { makeAutoObservable } from 'mobx';
import { ImageData } from '@/types/imageData';

class ImagesStore {
  images: ImageData[];

  constructor() {
    makeAutoObservable(this);
  }
}

export default ImagesStore;
