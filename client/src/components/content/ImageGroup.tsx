import styles from '@/styles/components/content/images-group.module.scss'
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ImageData, IRootState } from '@/types/storage';
import ImageCard from '@/components/content/ImageCard';

type Props = {
  imageGroupDate: string;
};

const ImageGroup = memo(({imageGroupDate}: Props) => {
  const imageGroup = useSelector<IRootState, ImageData[]>(({ images }) => images.groups[imageGroupDate]);
  const imageGroupLength = imageGroup.length;

  if (!imageGroupLength) return null;

  const imageGroupDateChopped = imageGroupDate.slice(0, -6)

  return (
    <div className={styles.group}>
      <div className={styles.title}>
        <div className={styles.date}>{imageGroupDateChopped}</div>
        <div className={styles.imagesNumber}>{imageGroupLength}</div>
      </div>
      <div className={styles.content}>
        {imageGroup.map(image => (
          <ImageCard
            key={image.URL}
            id={image.id}
            createdAt={image.createdAt}
            URL={image.URL}
            filename={image.filename}
            label={image.label}
            aspectRatio={image.aspectRatio}
            statuses={image.statuses}
            groupDate={image.groupDate}
            downloadURL={image.downloadURL}
          />
        ))}
      </div>
    </div>
  )
})

export default ImageGroup;
