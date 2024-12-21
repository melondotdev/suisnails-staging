// groupChapters.ts
import { Chapter } from '../../utils/novel_chapters';

export function getChapterGroups(chapters: Chapter[], groupSize = 10) {
  const groups: Chapter[][] = [];
  for (let i = 0; i < chapters.length; i += groupSize) {
    groups.push(chapters.slice(i, i + groupSize));
  }
  return groups;
}
