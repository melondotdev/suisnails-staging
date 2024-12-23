import React, { useState, useEffect } from 'react';
import { Header } from '../components/header/Header';
import {
  CHAPTERS,
  Chapter,
  bookCoverSrc,
  bookSummary,
  bookTitle,
} from '../utils/novel_chapters';
import { getChapterGroupsByNumber } from '../components/novel/groupChapters';
import { useChapterPointsHandler } from '../components/novel/useChapterPointsHandler';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface WalletData {
  Address?: string;
  Balance?: number;
}

interface NovelProps {
  walletData: WalletData;
  isWalletConnected: boolean;
}

export const Novel: React.FC<NovelProps> = ({ walletData, isWalletConnected }) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number | null>(0);
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [chapterText, setChapterText] = useState<string>(''); // Holds the dynamically loaded text
  const [claimedChapters, setClaimedChapters] = useState<Set<number>>(new Set()); // Tracks claimed chapters
  const [userPoints, setUserPoints] = useState<number>(0); // User's current points

  const mainChapters = CHAPTERS.slice(1); // All chapters except the prologue
  const chapterGroups = getChapterGroupsByNumber(mainChapters);

  const { fetchClaimedChapters, handleAddPoints } = useChapterPointsHandler({
    walletData,
    setUserPoints,
    setClaimedChapters,
  });

  const toggleGroup = (groupIndex: number) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupIndex)) {
        newSet.delete(groupIndex);
      } else {
        newSet.add(groupIndex);
      }
      return newSet;
    });
  };
  
  useEffect(() => {
    const loadChapterText = async () => {
      if (currentChapterIndex !== null) {
        const chapter = CHAPTERS[currentChapterIndex];
        const module = await chapter.textLoader(); // Dynamic import
        setChapterText(module.default || module); // Set text from the dynamically imported file
      }
    };

    loadChapterText();

    // Scroll to top when the chapter index changes
    window.scrollTo({ top: 0 });
  }, [currentChapterIndex]);

  useEffect(() => {
    if (isWalletConnected && walletData?.Address) {
      fetchClaimedChapters();
    }
  }, [isWalletConnected, walletData, fetchClaimedChapters]);

  const handleClaimPoints = () => {
    if (!isWalletConnected || !walletData?.Address || currentChapterIndex === null) return;
    if (claimedChapters.has(currentChapterIndex)) return; // Prevent claiming twice

    handleAddPoints(50, currentChapterIndex); // Claim 50 points for the current chapter
  };

  const currentChapter: Chapter | null =
    currentChapterIndex !== null ? CHAPTERS[currentChapterIndex] : null;

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-200 pt-24 font-serif">
      <Header walletData={walletData} isWalletConnected={isWalletConnected} connectOption={true} />

      <div className="flex h-full">
        {/* Left Panel: Fixed TOC */}
        <aside
          className={`
            fixed top-0 left-0 h-[600px] transition-all duration-300 
            ${isMinimized ? 'w-12' : 'w-64'} flex flex-col overflow-y-auto mt-24 scrollbar-dark
          `}
        >
          {/* Sticky Header Section */}
          <div
            className="sticky top-0 z-10 flex items-center justify-end p-2"
          >
            <button
              onClick={() => setIsMinimized((prev) => !prev)}
              className="text-gray-400 hover:text-gray-200"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? <ChevronRight /> : <ChevronLeft />}
            </button>
          </div>

          {!isMinimized && (
            <>
              {/* Book Info Section */}
              <div className="p-4 border-b border-gray-800">
                <img
                  src={bookCoverSrc}
                  alt="Book Cover"
                  className="w-full h-auto rounded-md mb-4"
                />
                <h2 className="text-lg font-bold mb-1">{bookTitle}</h2>
                <p className="text-sm text-gray-400 whitespace-pre-line">{bookSummary}</p>
              </div>

              {/* Table of Contents */}
              <div className="flex-grow p-4">
                <h2 className="text-xl font-bold mb-4">Table of Contents</h2>

                {/* Prologue */}
                <div className="mb-4">
                  <button
                    onClick={() => setCurrentChapterIndex(0)}
                    className={`w-full text-left bg-gray-800 p-2 rounded flex items-center ${
                      CHAPTERS[0].published ? 'hover:bg-gray-700' : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Prologue
                    {!CHAPTERS[0].published && <span className="ml-2 text-gray-400">🔒</span>}
                  </button>
                </div>

                {/* Main Chapters and Partial Chapters */}
                {chapterGroups.map(({ groupTitle, chapters }, groupIndex) => (
                  <div key={groupIndex} className="mb-4">
                    <button
                      onClick={() => toggleGroup(groupIndex)}
                      className="w-full text-left bg-gray-800 hover:bg-gray-700 p-2 rounded"
                    >
                      {groupTitle} {expandedGroups.has(groupIndex) ? '▲' : '▼'}
                    </button>
                    {expandedGroups.has(groupIndex) && (
                      <ul className="mt-2 pl-4 border-l border-gray-700">
                        {chapters.map((chapter, chapterIdx) => (
                          <li key={chapterIdx} className="mb-2 flex items-center">
                            <button
                              onClick={() => setCurrentChapterIndex(CHAPTERS.indexOf(chapter))}
                              disabled={!chapter.published}
                              className={`flex-grow text-left ${
                                chapter.published
                                  ? 'text-emerald-400 hover:underline'
                                  : 'text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {chapter.title}
                            </button>
                            {!chapter.published && <span className="ml-2 text-gray-400">🔒</span>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}      
              </div>
            </>
          )}
        </aside>

        {/* Chapter Content Area */}
        <main
          className="flex-grow overflow-y-auto p-4 ml-auto"
          style={{
            marginLeft: isMinimized ? '3rem' : '16rem', // Adjust content margin to accommodate the minimized or expanded TOC
            minHeight: 'calc(100vh - 6rem)',
          }}
        >
          {currentChapter ? (
            <div>
              {/* Chapter Title */}
              <h2 className="text-2xl font-bold mb-2">{currentChapter.title}</h2>
              {/* Chapter Text */}
              <p className="leading-relaxed whitespace-pre-line">{chapterText || 'Loading...'}</p>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {/* Previous Chapter Button */}
                <button
                  onClick={() => setCurrentChapterIndex((currentChapterIndex ?? 0) - 1)}
                  disabled={
                    (currentChapterIndex ?? 0) === 0 || // Prevent going before the first chapter
                    !CHAPTERS[(currentChapterIndex ?? 0) - 1]?.published // Check if previous chapter is unpublished
                  }
                  className={`px-4 py-2 rounded-md ${
                    (currentChapterIndex ?? 0) === 0 || !CHAPTERS[(currentChapterIndex ?? 0) - 1]?.published
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-emerald-700 hover:bg-emerald-600'
                  }`}
                >
                  Previous Chapter
                </button>
                
                {/* Claim Points Button */}
                <div className="text-center">
                  {isWalletConnected ? (
                    claimedChapters.has(currentChapterIndex!) ? (
                      <button
                        disabled
                        className="bg-gray-600 text-white px-4 py-2 rounded cursor-not-allowed"
                      >
                        Already Claimed
                      </button>
                    ) : (
                      <button
                        onClick={handleClaimPoints}
                        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition-all duration-300"
                      >
                        Claim 50 Points
                      </button>
                    )
                  ) : (
                    <div className="relative group inline-block">
                      <button
                        disabled
                        className="bg-gray-600 text-white px-4 py-2 rounded cursor-not-allowed"
                      >
                        Claim 50 Points
                      </button>
                    </div>
                  )}
                </div>       
                
                {/* Next Chapter Button */}
                <button
                  onClick={() => setCurrentChapterIndex((currentChapterIndex ?? 0) + 1)}
                  disabled={
                    (currentChapterIndex ?? 0) >= CHAPTERS.length - 1 || // Prevent going past the last chapter
                    !CHAPTERS[(currentChapterIndex ?? 0) + 1]?.published // Check if next chapter is unpublished
                  }
                  className={`px-4 py-2 rounded-md ${
                    (currentChapterIndex ?? 0) >= CHAPTERS.length - 1 || !CHAPTERS[(currentChapterIndex ?? 0) + 1]?.published
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-emerald-700 hover:bg-emerald-600'
                  }`}
                >
                  Next Chapter
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Select a chapter from the Table of Contents.</p>
          )}
        </main>
      </div>
    </div>
  );
};
