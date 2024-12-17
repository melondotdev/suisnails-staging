import React, { useState } from 'react';
import { GRIMOIRE_CONTENT } from '../utils/grimoire_content';
import BgImage from '../../public/assets/background.webp';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { StatCard } from '../components/ui/StatCard';

export const Grimoire: React.FC = () => {
  const [showLoreModal, setShowLoreModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  
  return (
    <div className="min-h-screen bg-black text-gray-200 pt-24 relative overflow-hidden font-serif">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 grayscale hover:grayscale-0 transition-all duration-700"
        style={{ backgroundImage: `url(${BgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 select-none">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 tracking-widest uppercase">
            {GRIMOIRE_CONTENT.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-400 italic">
            "{GRIMOIRE_CONTENT.subtitle}"
          </p>
          <p className="max-w-2xl mx-auto text-gray-400 mb-12 italic leading-relaxed">
            {GRIMOIRE_CONTENT.intro}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AnimatedButton locked={false} onClick={() => setShowLoreModal(true)}>
              Veil of Lore
            </AnimatedButton>
            <AnimatedButton locked={false} onClick={() => setShowTokenModal(true)}>
              Ichor of Tokenomics
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Lore Modal */}
      {showLoreModal && (
        <LoreModal onClose={() => setShowLoreModal(false)} />
      )}

      {/* Tokenomics Modal */}
      {showTokenModal && (
        <TokenomicsModal onClose={() => setShowTokenModal(false)} />
      )}
    </div>
  );
};

interface ModalProps {
  onClose: () => void;
}

const LoreModal: React.FC<ModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(GRIMOIRE_CONTENT.loreSections[0].id);

  const activeContent = GRIMOIRE_CONTENT.loreSections.find(section => section.id === activeTab);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="relative w-full max-w-5xl h-[80vh] bg-gradient-to-b from-black via-gray-900 to-black border border-gray-700 rounded-lg overflow-hidden flex">
        {/* Sidebar Tabs */}
        <div className="w-1/4 border-r border-gray-700 bg-black/60 overflow-y-auto">
          <div className="p-4 font-semibold uppercase tracking-wider text-gray-400 text-sm border-b border-gray-700">
            Veil of Lore
          </div>
          <div className="overflow-y-auto h-full">
            {GRIMOIRE_CONTENT.loreSections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`block w-full text-left px-4 py-3 border-b border-gray-800 hover:bg-black/50 transition-colors 
                ${activeTab === section.id ? 'bg-black/50 text-gray-200' : 'text-gray-400'}`}
              >
                <div className="flex items-center space-x-2">
                  {section.symbolSrc && <img src={section.symbolSrc} alt="" className="w-6 h-6" />}
                  <span>{section.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="w-3/4 p-6 relative">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-200" onClick={onClose}>
            ✕
          </button>
          {activeContent && (
            <div className="overflow-y-auto h-full pr-4">
              {activeContent.imageSrc && (
                <div className="mb-4">
                  <img src={activeContent.imageSrc} alt="" className="w-full h-48 object-cover rounded shadow-md" />
                </div>
              )}
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">{activeContent.title}</h2>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {activeContent.content.trim()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TokenomicsModal: React.FC<ModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(GRIMOIRE_CONTENT.tokenomicsSections[0].id);

  const activeContent = GRIMOIRE_CONTENT.tokenomicsSections.find(section => section.id === activeTab);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="relative w-full max-w-5xl h-[80vh] bg-gradient-to-b from-black via-gray-900 to-black border border-gray-700 rounded-lg overflow-hidden flex">
        {/* Sidebar Tabs */}
        <div className="w-1/4 border-r border-gray-700 bg-black/60">
          <div className="p-4 font-semibold uppercase tracking-wider text-gray-400 text-sm border-b border-gray-700">
            Ichor of Tokenomics
          </div>
          <div className="overflow-y-auto h-full">
            {GRIMOIRE_CONTENT.tokenomicsSections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`block w-full text-left px-4 py-3 border-b border-gray-800 hover:bg-black/50 transition-colors 
                ${activeTab === section.id ? 'bg-black/50 text-gray-200' : 'text-gray-400'}`}
              >
                <div className="flex items-center space-x-2">
                  {section.symbolSrc && <img src={section.symbolSrc} alt="" className="w-6 h-6" />}
                  <span>{section.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="w-3/4 p-6 relative">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-200" onClick={onClose}>
            ✕
          </button>
          {activeContent && (
            <div className="overflow-y-auto h-full pr-4">
              {activeContent.imageSrc && (
                <div className="mb-4">
                  <img src={activeContent.imageSrc} alt="" className="w-full h-48 object-cover rounded shadow-md" />
                </div>
              )}
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">{activeContent.title}</h2>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed mb-8">
                {activeContent.content.trim()}
              </p>

              {activeContent.id === "occultMetrics" && (
                <div className="border-t border-gray-700 pt-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <StatCard label="Total $SUS Harvested" value="66,666" description="Essence of Abyss" />
                    <StatCard label="Heroes Forged" value="10,420" description="Shell-bound Souls" />
                    <StatCard label="Realms Explored" value="7" description="Frontiers of Night" />
                    <StatCard label="Cycle Count" value="120" description="Levels of Madness" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
