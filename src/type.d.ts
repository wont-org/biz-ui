// import type { CSSProp } from 'styled-components';

// declare module 'react' {
//   interface DOMAttributes {
//     css?: CSSProp;
//   }
//   // interface Attributes {
//   //   css?: CSSProp;
//   // }
// }

declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export const ReactComponent;
  const src: string;
  export default src;
}
