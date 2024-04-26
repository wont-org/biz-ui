import { useState } from 'react';

export default (src = '') => {
  const [imgSrc, setImgSrc] = useState('');

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
  return imgSrc;
};
