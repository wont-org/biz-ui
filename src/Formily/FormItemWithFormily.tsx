// import { QuestionCircleOutlined } from '@ant-design/icons';
// import { FormItem } from '@formily/antd';
// import { Tooltip, TooltipProps } from 'antd';
// import React, { FC, ReactNode } from 'react';

// type FormilyFormItemProps = typeof FormItem;
// interface FormItemWithFormilyProps extends FormilyFormItemProps {
//   tooltipProps: Exclude<TooltipProps, 'title'> & { icon?: ReactNode };
//   label?: ReactNode;
//   children?: ReactNode;
// }
// const FormItemWithFormily: FC<FormItemWithFormilyProps> = (props) => {
//   const { children, label, tooltipProps, ...rest } = props;
//   const { icon = <QuestionCircleOutlined /> } = tooltipProps || {};
//   return (
//     <FormItem
//       {...rest}
//       label={
//         label &&
//         tooltipProps && (
//           <>
//             {label}
//             <Tooltip {...tooltipProps}>
//               <span style={{ marginLeft: 4, cursor: 'pointer' }}>{icon}</span>
//             </Tooltip>
//           </>
//         )
//       }
//     >
//       {children}
//     </FormItem>
//   );
// };

// export default FormItemWithFormily;
