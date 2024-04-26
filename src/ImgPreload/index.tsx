import type { ImgHTMLAttributes } from 'react';
import React from 'react';
import usePreloadImg from '../usePreloadImg';

export default (props: ImgHTMLAttributes<HTMLImageElement>) => {
  const imgSrc = usePreloadImg(props.src);
  return imgSrc ? <img {...props} src={imgSrc} /> : null;
};
