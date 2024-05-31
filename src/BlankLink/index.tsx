import React, { AnchorHTMLAttributes } from 'react';

export default (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { children, ...restProps } = props;
  return (
    <a {...restProps} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};
