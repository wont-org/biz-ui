import { CaptchaInput } from '@wont/biz-ui';
import React, { useState } from 'react';

export default () => {
  const [val, setVal] = useState<string>();

  return (
    <CaptchaInput
      value={val}
      onChange={(value) => {
        console.log('value :>> ', value);
        setVal(value);
      }}
    />
  );
};
