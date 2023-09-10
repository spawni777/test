export type ImageStatusName = 'loaded' | 'isUploading';

export type ImageData = {
  URL: string;
  downloadURL: string;
  id: number | string;
  filename: string;
  label: string;
  createdAt: string;
  groupDate: string;
  aspectRatio: number;
  statuses: {
    loaded?: boolean;
    isUploading?: boolean;
  }
}

export type ImageGroups = {
  [key: string]: ImageData[]
}

export interface IImagesState {
  groups: ImageGroups;
  statuses: {
    fetched: boolean;
  },
  totalNumber: number;
}

export interface IDefaultModal {
  isOpen: boolean;
}

export interface IEditingModal extends IDefaultModal {
  image: ImageData;
}

export type ModalsState = {
  [index: string]: IDefaultModal | IEditingModal;
  uploading: IDefaultModal;
  editing: IEditingModal;
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
