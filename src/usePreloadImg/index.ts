import { useEffect, useState } from 'react';

export default (src = '') => {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (!src) {
      setImgSrc('');
      return;
    }

    const img = new Image();
    img.src = src;

    img.onload = () => {
      if (img.complete) {
        setImgSrc(img.src);
      }
    };

    img.onerror = () => {
      setImgSrc('');
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return imgSrc;
};
