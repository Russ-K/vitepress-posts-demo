import { createContentLoader } from 'vitepress';

export default createContentLoader('./posts/*/*.md', {
  render: true,
  includeSrc: true,
  transform(rawData) {
    return rawData.sort((a, b) => {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
  },
});
