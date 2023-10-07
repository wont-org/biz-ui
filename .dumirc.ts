import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/pro-react-ui/',
  themeConfig: {
    name: 'dumi-test',
    // nav: [
    //   { title: 'Blog', link: '/blog' }
    // ]
  },
  resolve: {
    docDirs: ['docs'],
  },
});
