// import { NumberPicker } from '@formily/antd';
// import { InputNumberProps } from 'antd';
// import debounce from 'lodash/debounce';
// import React, { FC } from 'react';

// const NumberPickerWithDefault: FC<
//   InputNumberProps & {
//     debounceTime?: number;
//   }
// > = (props) => {
//   const { debounceTime, onChange, ...restProps } = props;
//   const handleChange = debounce((value) => {
//     onChange?.(value);
//   }, debounceTime);
//   return (
//     <NumberPicker
//       style={{
//         width: '100%',
//       }}
//       onChange={debounceTime ? handleChange : onChange}
//       {...restProps}
//     />
//   );
// };

// export default NumberPickerWithDefault;
