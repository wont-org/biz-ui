import { defineConfig } from 'dumi';
import path from 'path';
import { antdImport, styledComponentsImport } from './config/build';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/biz-ui/',
  publicPath: '/biz-ui/',
  themeConfig: {
    name: 'biz-ui',
    nav: [
      { title: '指南', link: '/guide' },
      { title: '组件列表', link: '/components' },
      { title: '更新日志', link: '/changelog' },
      { title: 'GitHub', link: 'https://github.com/wont-org/biz-ui' },
    ],
    footer: `Open-source MIT Licensed | Copyright © 2024-present
<br />
Powered by liukun`,
  },
  apiParser: {},
  resolve: {
    docDirs: ['docs'],
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.tsx',
  },
  extraBabelPlugins: [antdImport, styledComponentsImport],
  lessLoader: {
    javascriptEnabled: true,
  },
  analytics: {
    ga_v2: 'G-3PNCWTT1R1',
  },
  alias: {
    '@wont/biz-ui': path.join(__dirname, 'src'),
  },
});
