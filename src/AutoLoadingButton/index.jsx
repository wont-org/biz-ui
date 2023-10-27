import { Button } from 'antd';
import React, { useState } from 'react';

export default ({ children, onClick, ...props } = {}) => {
  const [loading, setLoading] = useState(false);
  const isThenable = (thing) => {
    return !!(thing && thing.then);
  };
  const onClickWrap = () => {
    if (typeof onClick !== 'function') {
      return;
    }
    const ret = onClick();
    if (!ret) {
      return;
    }
    if (!isThenable(ret)) {
      return;
    }

    setLoading(true);
    ret.then(
      () => {
        setLoading(false);
      },
      (e) => {
        setLoading(false);
        return Promise.reject(e);
      },
    );
    // try {
    //   setLoading(true);
    //   await ;
    // } finally {
    //   setLoading(false);
    // }
  };
  return (
    <Button {...props} loading={loading} onClick={onClickWrap}>
      {children}
    </Button>
  );
};
