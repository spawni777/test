import styles from '@/styles/components/content/body.module.scss';
import { useSelector } from 'react-redux';
import { ImageGroups, IRootState } from '@/types/storage';
import ImageGroup from '@/components/content/ImageGroup';
import UIContainer from '@/components/ui/UIContainer';
import { getTimestampOfGroupDate } from '@/utils/date';

const Body = () => {
  const imageGroups = useSelector<IRootState, ImageGroups>(({ images }) => images.groups);
  const imagesGroupDates = Object.keys(imageGroups)
    .sort((a, b) => getTimestampOfGroupDate(b) - getTimestampOfGroupDate(a));

  return (
    <UIContainer>
      <div className={styles.body}>
        {imagesGroupDates.map(imageGroupDate => (
          <ImageGroup
            key={imageGroupDate}
            imageGroupDate={imageGroupDate}
          />
        ))}
      </div>
    </UIContainer>
  )
}

export default Body;
