import React from 'react';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { FeatureCard } from '../components/ui/FeatureCard';
import { StatCard } from '../components/ui/StatCard';
import { Header } from '../components/header/Header';
import { FEATURES, STATS } from '../utils/home_content';
import BgImage from '/assets/background.webp';
import Logo from '/assets/logo-removebg.png'

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Header />
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 grayscale hover:grayscale-0 transition-all duration-700" 
          style={{ backgroundImage: `url(${BgImage})` }} 
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center group">
          {/* Heading */}
          <div className="flex items-center justify-center mb-6">
            <img src={Logo} alt="logo" className="w-[200px] h-[200px] mr-2" />
          </div>
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-gray-400">Reject Humanity. Seek Immorality.</p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AnimatedButton primary to="/novel" locked={false} >Descend Into Madness</AnimatedButton>
            <AnimatedButton to="/grimoire" locked={false}>Forbidden Knowledge</AnimatedButton>
          </div>
        </div>
      </div>
      <div className="bg-black/95 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <FeatureCard 
                key={feature.title}
                imageSrc={feature.imageSrc}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="border-y border-gray-800 group">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <StatCard key={stat.value} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}