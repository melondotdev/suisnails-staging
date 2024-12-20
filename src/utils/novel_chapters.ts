// Book-level info
export const bookCoverSrc = '/assets/hero.webp'; // Replace with your actual cover image
export const bookTitle = 'by MAKABAKA';
export const bookSummary = `Beneath a fractured sky, where whispers of the sea speak in riddles, a path emerges for those who should not walk it. Shadows conceal ancient truths, and each step pulls the traveler deeper into a labyrinth of unseen forces, fleeting alliances, and choices that could reshape the fabric of reality—or unravel it entirely.`;

export interface Chapter {
  title: string;
  textLoader: () => Promise<string>; // Function to load text dynamically
  published: boolean; // Controls access to the chapter
}

export const CHAPTERS: Chapter[] = [
  {
    title: 'Prologue',
    textLoader: () => import('../lib/chapters/prologue.txt?raw'),
    published: true, // Accessible by everyone
  },
  {
    title: 'Chapter 1: Awakening',
    textLoader: () => import('../lib/chapters/chapter1.txt?raw'),
    published: true,
  },
  {
    title: 'Chapter 2: The Village at the Edge of the Woods',
    textLoader: () => import('../lib/chapters/chapter2.txt?raw'),
    published: false, // Unpublished, restrict access
  },
  {
    title: 'Chapter 3: The Village at the Edge of the Woods',
    textLoader: () => import('../lib/chapters/chapter2.txt?raw'),
    published: false,
  },
  {
    title: 'Chapter 4: The Village at the Edge of the Woods',
    textLoader: () => import('../lib/chapters/chapter2.txt?raw'),
    published: false,
  },
  {
    title: 'Chapter 5: The Village at the Edge of the Woods',
    textLoader: () => import('../lib/chapters/chapter2.txt?raw'),
    published: false,
  },
  {
    title: 'Chapter 6: The Village at the Edge of the Woods',
    textLoader: () => import('../lib/chapters/chapter2.txt?raw'),
    published: false,
  },
  {
    title: 'Chapter 7: The Village at the Edge of the Woods',
    textLoader: () => import('../lib/chapters/chapter2.txt?raw'),
    published: false,
  },
  {
    title: 'Chapter 8: The Village at the Edge of the Woods',
    textLoader: () => import('../lib/chapters/chapter2.txt?raw'),
    published: false,
  },
  {
    title: 'Chapter 9: The Village at the Edge of the Woods',
    textLoader: () => import('../lib/chapters/chapter2.txt?raw'),
    published: false,
  },
  {
    title: 'Chapter 10: The Village at the Edge of the Woods',
    textLoader: () => import('../lib/chapters/chapter2.txt?raw'),
    published: false,
  },
  {
    title: 'Chapter 11: The Village at the Edge of the Woods',
    textLoader: () => import('../lib/chapters/chapter2.txt?raw'),
    published: false,
  },
  {
    title: 'Chapter 12: The Village at the Edge of the Woods',
    textLoader: () => import('../lib/chapters/chapter2.txt?raw'),
    published: false,
  },
];
