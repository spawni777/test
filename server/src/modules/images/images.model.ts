import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ImageCreationAttrs {
  URL: string;
  filename: string;
  label: string;
}

@Table({tableName: 'images', updatedAt: false})
export class Image extends Model<Image, ImageCreationAttrs> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, unique: true})
  filename: string;

  @Column({type: DataType.STRING, unique: true})
  URL: string;

  @Column({type: DataType.STRING})
  label: number;
}
