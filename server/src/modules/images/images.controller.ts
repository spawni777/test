import { Body, Controller, Delete, Get, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { DeleteImageDto } from '@/modules/images/dto/delete-image.dto';
import * as path from 'path';
import cfg from '@/cfg';
import { ImagesRegister } from '@/modules/images/images.register';
import { GetImagesQueryDto } from '@/modules/images/dto/get-images-query.dto';
import { GetImagesResponseDto } from '@/modules/images/dto/get-images-response.dto';
import { UploadImagesResponseDto } from '@/modules/images/dto/upload-images-response.dto';
import { UpdateImageDto } from '@/modules/images/dto/update-image.dto';
import { UpdateImageResponseDto } from '@/modules/images/dto/update-image-response.dto';

@Controller('/api/images')
export class ImagesController {
  constructor(private imagesRegister: ImagesRegister) {}

  @Get('/')
  async getImages(@Query() {offset, limit}: GetImagesQueryDto ) {
    const { images, total } = await this.imagesRegister.getImages(offset, limit);

    return new GetImagesResponseDto(images, total);
  }

  @Delete('/')
  async deleteImage(@Body() imageDto: DeleteImageDto) {
    await this.imagesRegister.deleteImage(imageDto);

    return 'success';
  }

  @Put('/')
  async updateImage(@Body() imageDto: UpdateImageDto) {
    const updatedImage = await this.imagesRegister.update(imageDto);

    return new UpdateImageResponseDto(updatedImage);
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
  async uploadImage(@Body() body: {label: string, aspectRatio: string}, @UploadedFile() file: Express.Multer.File) {
    const image = await this.imagesRegister.create({
      filename: file.filename,
      label: body.label,
      aspectRatio: body.aspectRatio,
    });

    return new UploadImagesResponseDto(image);
  }
}
