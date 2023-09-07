import { Body, Controller, Delete, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { DeleteImageDto } from '@/modules/images/dto/delete-image.dto';
import * as path from 'path';
import cfg from '@/cfg';
import { ImagesRegister } from '@/modules/images/images.register';

@Controller('/api/images')
export class ImagesController {
  constructor(private imagesRegister: ImagesRegister) {}

  @Get('/')
  getImages() {
    return this.imagesRegister.getAll();
  }

  @Delete('/')
  async deleteImage(@Body() imageDto: DeleteImageDto) {
    await this.imagesRegister.deleteImage(imageDto);

    return 'success';
  }


  @Post('/')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: cfg.uploadImagesFolder,
        filename(req, file, callback) {
          const ext = path.extname(file.originalname);
          callback(null, `${randomUUID()}${ext}`);
        },
      }),
      fileFilter(req, file, callback) {
        const ext = path.extname(file.originalname);
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];

        if (allowedExtensions.includes(ext)) {
          return callback(null, true);
        }

        return callback(new Error('Only images are allowed'), false);
      }
    }),
  )
  async uploadImage(@Body() body: {label: string}, @UploadedFile() file: Express.Multer.File) {
    await this.imagesRegister.create({
      filename: file.filename,
      label: body.label,
    });

    return 'success';
  }
}
