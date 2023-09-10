import styles from '@/styles/components/content/body.module.scss';
import { useSelector } from 'react-redux';
import { ImageGroups, IRootState } from '@/types/storage';
import ImageGroup from '@/components/content/ImageGroup';
import UIContainer from '@/components/ui/UIContainer';

const Body = () => {
  const imageGroups = useSelector<IRootState, ImageGroups>(({ images }) => images.groups);

  return (
    <UIContainer>
      <div className={styles.body}>
        {Object.keys(imageGroups).map(imageGroupDate => (
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
