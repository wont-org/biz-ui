import { useSafeState } from 'ahooks';
import { Button, ButtonProps } from 'antd';
import React from 'react';

export default (baseProps: ButtonProps) => {
  const { children, onClick, ...props } = baseProps;
  const [loading, setLoading] = useSafeState(false);
  const isThenable = (thing) => {
    return !!(thing && !!thing.then);
  };
  const onClickWrap = async () => {
    if (typeof onClick !== 'function') {
      return;
    }
    const ret = onClick() as undefined | Promise<unknown>;
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
  };

  return (
    <Button {...props} loading={loading} onClick={onClickWrap}>
      {children}
    </Button>
  );
};
