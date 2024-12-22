// groupChapters.ts
import { Chapter } from '../../utils/novel_chapters';

export const getChapterGroupsByNumber = (chapters: Chapter[], groupSize = 10) => {
  const groups: Record<string, Chapter[]> = {};

  chapters.forEach((chapter) => {
    // Extract the numeric part of the chapter title, ignoring ".1", ".2", etc.
    const chapterNumberMatch = chapter.title.match(/^Chapter (\d+)/i);
    if (chapterNumberMatch) {
      const chapterNumber = parseInt(chapterNumberMatch[1], 10); // Extract main chapter number
      const groupIndex = Math.floor((chapterNumber - 1) / groupSize); // Determine group index
      const groupKey = `Chapters ${groupIndex * groupSize + 1}-${(groupIndex + 1) * groupSize}`; // e.g., "Chapters 1-10"

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(chapter);
    }
  });

  // Convert the groups object to an array for rendering
  return Object.entries(groups).map(([groupTitle, chapters]) => ({
    groupTitle,
    chapters,
  }));
};
