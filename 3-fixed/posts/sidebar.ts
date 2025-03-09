import fm from 'front-matter';
import fs from 'fs';
import path from 'path';

type SidebarMeta = {
  text: string;
  link: string;
  filePath: string;
  prev?: { text: string; link: string };
  next?: { text: string; link: string };
};

export const getPostMetaData = (): SidebarMeta[] => {
  const files = readMarkdownFilesRecursively(path.resolve(__dirname, '.')).filter(
    (file) => file !== path.resolve(__dirname, 'index.md'),
  );

  const meta = files.map((file) => {
    const frontmatter = fm(fs.readFileSync(file, 'utf-8')).attributes as Record<string, any>;
    return {
      text: frontmatter.title || path.basename(file, '.md'),
      link: `/${file.replace(/index\.md$/, '')}`,
      filePath: getFilePath(file),
    } as SidebarMeta;
  })
  .reverse();

  
  for (let i = 0; i < meta.length; i++) {
    if (i !== 0) {
      meta[i].next = { text: meta[i - 1].text, link: meta[i - 1].filePath };
    } else {
      meta[i].next = { text: 'Posts', link: '/posts' };
    }

    if (i !== meta.length - 1) {
      meta[i].prev = { text: meta[i + 1].text, link: meta[i + 1].filePath };
    }
  }


  return meta;
};

const getFilePath = (file: string) => {
  return `posts${file.split('posts')[1].replace(/\\/g, '/')}`;
};

const readMarkdownFilesRecursively = (dir: string): string[] => {
  let mdFiles: string[] = [];

  try {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        // Recursively read from subdirectory
        mdFiles = mdFiles.concat(readMarkdownFilesRecursively(fullPath));
      } else if (file.isFile() && file.name.endsWith('.md')) {
        mdFiles.push(fullPath);
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }

  return mdFiles;
};
