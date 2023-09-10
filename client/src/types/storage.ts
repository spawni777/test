export type ImageStatusName = 'loaded' | 'isUploading';

export interface ImageData {
  URL: string;
  downloadURL: string;
  id: number | string;
  filename: string;
  label: string;
  createdAt: string;
  groupDate: string;
  aspectRatio?: number;
  statuses: {
    loaded?: boolean;
    isUploading?: boolean;
  }
}

export interface ImageGroups {
  [key: string]: ImageData[]
}

export interface IImagesState {
  groups: ImageGroups;
  statuses: {
    fetched: boolean;
  },
  totalNumber: number;
}

export enum ModalNameEnum {
  uploading = 'uploading',
  editing = 'editing',
}

export type ModalName = keyof typeof ModalNameEnum;

export type ModalsState = {
  [key in ModalNameEnum]: {
    isOpen: boolean;
  };
};

export type NotificationState = {
  [index: string]: string | boolean | undefined;
  title?: string;
  text?: string;
  type?: 'warning' | 'success' | 'error';
  isOpen: boolean;
};

export interface IRootState {
  images: IImagesState;
  modals: ModalsState;
  notification: NotificationState;
}
