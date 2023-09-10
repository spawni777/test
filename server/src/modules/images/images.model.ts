import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ImageCreationAttrs {
  URL: string;
  downloadURL: string;
  filename: string;
  label: string;
  aspectRatio: string;
}

@Table({tableName: 'images', updatedAt: false})
export class Image extends Model<Image, ImageCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true})
  filename: string;

  @Column({type: DataType.STRING, unique: true})
  URL: string;

  @Column({type: DataType.STRING, unique: true})
  downloadURL: string;

  @Column({type: DataType.STRING})
  label: string;

  @Column({type: DataType.STRING})
  aspectRatio: string;
}
