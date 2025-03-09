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

  async transformPageData(pageData, { siteConfig }) {
    const post = posts.find((post) => post.filePath === pageData.filePath);
    if (post) {
      pageData.frontmatter.prev = post.prev;
      pageData.frontmatter.next = post.next;
    } else if (pageData.filePath === 'posts/index.md') {
      pageData.frontmatter.next = { text: 'Home', link: '/' };
      pageData.frontmatter.prev = {
        text: posts[0]?.text,
        link: posts[0]?.filePath,
      }
    }
  },
});
