import { useDispatch } from 'react-redux';
import { setImageLoaded } from '@/store/images.store';
import { useEffect, useRef } from 'react';
import { ImageData } from '@/types/storage';

const useImageLoading = (props: ImageData) => {
  const {
    aspectRatio,
    groupDate,
    id,
  } = props;

  // hardcoded now because we don't need adaptive view for test task
  const skeletonHeight = 214;
  const skeletonWidth = aspectRatio * skeletonHeight;

  const dispatch = useDispatch();
  const onImageLoaded = () => {
    dispatch(setImageLoaded({isLoaded: true, groupDate, id}))
  }

  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (!imageRef.current) return;

    const img = imageRef.current!;

    if (img.complete) {
      onImageLoaded()
    } else {
      img.addEventListener('load', onImageLoaded)
    }

    return () => {
      img.removeEventListener('load', onImageLoaded);
    }
  }, [])

  return {
    skeletonWidth,
    skeletonHeight,
    imageRef,
  }
}

export default useImageLoading;
