import axios, { AxiosProgressEvent } from 'axios';
import { GetImagesResponse, PostImageUploadResponse } from '@/types/api';

export const getImagesAPI = () => {
  return axios.get<GetImagesResponse>('/api/images');
}

export const uploadImageAPI = (formData: FormData, onUploadProgress: (event: AxiosProgressEvent) => void) => {
  return axios<PostImageUploadResponse>('/api/images', {
    method: 'POST',
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  })
}

export const deleteImageAPI = (imageId: number) => {
  return axios('/api/images', {
    method: 'DELETE',
    data: {
      id: imageId,
    }
  })
}

export const updateImageAPI = (imageId: number, label: string) => {
  return axios('/api/images', {
    method: 'PUT',
    data: {
      id: imageId,
      label,
    },
  })
}
