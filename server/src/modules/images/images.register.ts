import { Inject, Injectable } from '@nestjs/common';
import { Image } from '@/modules/images/images.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateImageDto } from '@/modules/images/dto/create-image.dto';
import { DeleteImageDto } from '@/modules/images/dto/delete-image.dto';
import { FirebaseService } from '@/services/firebase/firebase.service';
import cfg from '@/cfg';
import * as path from 'path';
import { UpdateImageDto } from '@/modules/images/dto/update-image.dto';

@Injectable()
export class ImagesRegister {
  constructor(
    @InjectModel(Image) private imageRepository: typeof Image,
    @Inject(FirebaseService) private firebaseService: FirebaseService,
  ) {}

  async create(dto: CreateImageDto) {
    const {URL, downloadURL} = await this.firebaseService.saveFile({
      filePath: path.resolve(cfg.uploadImagesFolder, dto.filename),
    });

    return await this.imageRepository.create({
      URL,
      downloadURL,
      label: dto.label,
      filename: dto.filename,
      aspectRatio: dto.aspectRatio,
    });
  }

  async getImages(offset: number = 0, limit?: number) {
    const total = await this.imageRepository.count();
    const images = await this.imageRepository.findAll({
      order: [['createdAt', 'ASC']],
      offset,
      limit: limit
        ? limit
        : total,
    });

    return { images, total };
  }

  async deleteImage(dto: DeleteImageDto) {
    const image = await Image.findByPk(dto.id);

    if (!image) throw new Error('Image not found');

    await this.firebaseService.deleteFile({filename: image.filename});
    await Image.destroy({ where: { id: dto.id } });
  }

  async update(dto: UpdateImageDto) {
    const image = await Image.findByPk(dto.id);
    image.label = dto.label;

    await image.save()

    return image;
  }
}
