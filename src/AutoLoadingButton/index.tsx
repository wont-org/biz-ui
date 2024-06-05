import { useSafeState } from 'ahooks';
import { Button, ButtonProps } from 'antd';
import React from 'react';

type Thenable<T> =
  | Promise<T>
  | { then: (onfulfilled?: (value: T) => any, onrejected?: (reason: any) => any) => any };
type GeneratorReturn<T> = Generator<T, void, unknown> | AsyncGenerator<T, void, unknown>;

const isThenable = (thing: any): thing is Thenable<unknown> => {
  return !!(thing && typeof thing.then === 'function');
};

const isGenerator = (thing: any): thing is () => GeneratorReturn<unknown> => {
  return (
    typeof thing === 'function' &&
    (thing.constructor.name === 'GeneratorFunction' ||
      thing.constructor.name === 'AsyncGeneratorFunction')
  );
};

const runGenerator = (gen: () => GeneratorReturn<unknown>): Promise<void> => {
  const iterator = gen();
  return new Promise((resolve, reject) => {
    const step = (
      nextF: () => IteratorResult<unknown, void> | Promise<IteratorResult<unknown, void>>,
    ) => {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }
      if (next instanceof Promise) {
        next.then(
          (resolvedNext) => step(() => resolvedNext),
          (e) => reject(e),
        );
      } else {
        if (next.done) {
          return resolve();
        }
        Promise.resolve(next.value).then(
          (v) => step(() => iterator.next(v)),
          (e) => step(() => iterator.throw!(e)),
        );
      }
    };
    step(() => iterator.next());
  });
};

export default (baseProps: ButtonProps) => {
  const { children, onClick, ...props } = baseProps;
  const [loading, setLoading] = useSafeState(false);

  const onClickWrap = async () => {
    if (typeof onClick !== 'function') {
      return;
    }

    const ret = onClick() as undefined | Thenable<unknown> | (() => GeneratorReturn<unknown>);

    if (!ret) {
      return;
    }

    if (isThenable(ret)) {
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
    } else if (isGenerator(ret)) {
      setLoading(true);
      runGenerator(ret).then(
        () => {
          setLoading(false);
        },
        (e) => {
          setLoading(false);
          return Promise.reject(e);
        },
      );
    }
  };

  return (
    <Button {...props} loading={loading} onClick={onClickWrap}>
      {children}
    </Button>
  );
};
