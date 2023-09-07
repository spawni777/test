import { Module } from '@nestjs/common';
import { ImagesController } from '@/modules/images/images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Image } from '@/modules/images/images.model';
import { ImagesRegister } from '@/modules/images/images.register';
import { FirebaseService } from '@/services/firebase/firebase.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Image]),
  ],
  controllers: [ImagesController],
  providers: [ImagesRegister, FirebaseService],
})
export class ImagesModule {}
