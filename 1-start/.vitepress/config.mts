import { defineConfig } from 'vitepress';

import { getPostMetaData } from '../posts/sidebar';

const posts = getPostMetaData();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Posts', link: '/posts/' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: posts,
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
