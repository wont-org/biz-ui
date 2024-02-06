import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/pro-react-ui/',
  publicPath: '/pro-react-ui/',
  themeConfig: {
    name: 'dumi-test',
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
});
