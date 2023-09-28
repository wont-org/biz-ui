import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
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
