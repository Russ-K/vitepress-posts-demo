import fm from 'front-matter';
import fs from 'fs';
import path from 'path';

type SidebarMeta = {
  text: string;
  link: string;
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
    } as SidebarMeta;
  })
  .reverse();

  return meta;
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
