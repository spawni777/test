import { Image } from '@/modules/images/images.model';


export class GetImagesResponseDto {
  constructor(private images: Image[], private total: number) {}
}
