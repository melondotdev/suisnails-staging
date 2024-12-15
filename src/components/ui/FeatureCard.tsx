import React from 'react';

interface FeatureCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

export function FeatureCard({ imageSrc, title, description }: FeatureCardProps) {
  return (
    <div className="group p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-500">
      {/* Image Section */}
      <div className="mb-4 overflow-hidden rounded-lg">
        <img
          src={imageSrc}
          alt={title}
          className="w-full object-cover filter grayscale group-hover:filter-none transition-all duration-500"
        />
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-semibold mb-2 font-lovecraft text-gray-300 group-hover:text-white transition-colors duration-500">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 group-hover:text-gray-400 transition-colors duration-500">
        {description}
      </p>
    </div>
  );
}
