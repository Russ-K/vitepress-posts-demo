---
title: Posts
---

<script setup>
import { data as posts } from './index.data.ts'
</script>

<ul>
  <li v-for="post of posts">
    <a :href="post.url">{{ post.frontmatter.title }}</a>
    <span> by {{ post.frontmatter.author }}</span>
  </li>
</ul>

<style scoped>
  ul {
      list-style-type: none;
      padding-left: 0;
      font-size: 1.125rem;
      line-height: 1.75;
  }

  li {
      display: flex;
      justify-content: space-between;
  }

  li span {
      font-family: var(--vp-font-family-mono);
      font-size: var(--vp-code-font-size);
  }
</style>
