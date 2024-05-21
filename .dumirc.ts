import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/biz-ui/',
  publicPath: '/biz-ui/',
  themeConfig: {
    name: 'biz-ui',
    // nav: [
    //   { title: 'Blog', link: '/blog' }
    // ]
  },
  // apiParser: {},
  resolve: {
    docDirs: ['docs'],
    // 配置入口文件路径，API 解析将从这里开始
    // entryFile: './src/index.tsx',
  },
  alias: {
    '@wont/biz-ui': path.join(__dirname, 'src'),
  },
});
