import { Inject, Injectable } from '@nestjs/common';
import { Image } from '@/modules/images/images.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateImageDto } from '@/modules/images/dto/create-image.dto';
import { DeleteImageDto } from '@/modules/images/dto/delete-image.dto';
import { FirebaseService } from '@/services/firebase/firebase.service';
import cfg from '@/cfg';
import * as path from 'path';

@Injectable()
export class ImagesRegister {
  constructor(
    @InjectModel(Image) private imageRepository: typeof Image,
    @Inject(FirebaseService) private firebaseService: FirebaseService,
  ) {}

  async create(dto: CreateImageDto) {
    const imageURL = await this.firebaseService.saveFile({
      filePath: path.resolve(cfg.uploadImagesFolder, dto.filename),
    });

    await this.imageRepository.create({
      URL: imageURL,
      label: dto.label,
      filename: dto.filename,
    });

    return imageURL;
  }

  async getAll() {
    return await this.imageRepository.findAll();
  }

  async deleteImage(dto: DeleteImageDto) {
    const image = await Image.findByPk(dto.id);

    if (!image) throw new Error('Image not found');

    await this.firebaseService.deleteFile({filename: image.filename});
    await Image.destroy({ where: { id: dto.id } });
  }
}
