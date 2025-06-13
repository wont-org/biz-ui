import { IFatherConfig } from 'father';

export const antdImport: NonNullable<IFatherConfig['extraBabelPlugins']>[number] = [
  'import',
  {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  },
  'antd',
];
export const styledComponentsImport: NonNullable<IFatherConfig['extraBabelPlugins']>[number] = [
  'babel-plugin-styled-components',
  {
    displayName: true,
    fileName: true,
  },
];
export const svgImport: NonNullable<IFatherConfig['extraBabelPlugins']>[number] = [
  // require.resolve('inline-react-svg'),
  'inline-react-svg',
  {
    svgo: {
      plugins: [
        { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
        'removeDimensions',
        'convertStyleToAttrs',
      ],
    },
  },
];
