import { useEffect } from 'react';
import { getImagesAPI } from '@/api';
import { addImages, setFetched } from '@/store/images.store';
import { useDispatch } from 'react-redux';

const useInitImages = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const {data: {images, total}} = await getImagesAPI();

      dispatch(addImages({ images, total }));
      dispatch(setFetched(true));
    })()
  }, []);
}

export default useInitImages;
