import { ImageData } from '@/types/storage';

export interface GetImagesResponse {
  images: ImageData[];
  total: number;
}

export interface PostImageUploadResponse {
  image: ImageData;
}
