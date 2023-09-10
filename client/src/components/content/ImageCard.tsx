import styles from '@/styles/components/content/image-card.module.scss';
import { memo } from 'react';
import { ImageData } from '@/types/storage';
import { CSSTransition } from "react-transition-group";
import useInitImageUpload from '@/hooks/useInitImageUpload';
import useImageActions from '@/hooks/useImageActions';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useImageLoading from '@/hooks/useImageLoading';

const ImageCard = memo((props: ImageData) => {
  const {
    URL: url,
    label,
    statuses,
  } = props;

  const {
    uploadedSize,
    totalSize,
    uploadedProgress,
    uploadingIsDone,
  } = useInitImageUpload(props);

  const actions = useImageActions(props);
  const {
    skeletonWidth,
    skeletonHeight,
    imageRef,
  } = useImageLoading(props);

  return (
    <div className={styles.imageData}>
      <div className={styles.imageDataContent}>
        <CSSTransition
          in={!statuses.loaded}
          timeout={200}
          classNames="fade"
          unmountOnExit
        >
          <div className={styles.skeleton}>
            <Skeleton
              width={skeletonWidth}
              height={skeletonHeight}
            />
          </div>
        </CSSTransition>

        <CSSTransition
          in={statuses.loaded}
          timeout={200}
          classNames="fade"
        >
          <div className={styles.image}>
            <img src={url} alt="image" ref={imageRef}/>
          </div>
        </CSSTransition>

        <CSSTransition
          in={!uploadingIsDone}
          timeout={200}
          classNames="fade"
          unmountOnExit
        >
          <div className={styles.uploading}>
            <div className={styles.uploadingBar} style={{width: `${uploadedProgress}%`}}/>
            <div className={styles.uploadingContent}>
              <div className={styles.uploadingTitle}>Uploading</div>
              <div className={styles.uploadingProcess}>
                {`${uploadedSize} of ${totalSize}`}
              </div>
            </div>
          </div>
        </CSSTransition>

        {uploadingIsDone && (
          <div className={styles.actions}>
            <div className={styles.actionsContent}>
              {actions.map(action => (
                <div className={styles.action} onClick={action.onClick} key={action.title}>
                  <div className={styles.actionImage}>
                    <img src={action.image} alt="icon"/>
                  </div>
                  <div className={styles.actionTitle}>
                    {action.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <CSSTransition
        in={!!label.length && statuses.loaded}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <div className={styles.label}>{label}</div>
      </CSSTransition>
    </div>
  )
})

export default ImageCard;
