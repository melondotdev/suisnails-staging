import { Link } from 'react-router-dom';

interface FeatureCardProps {
  imageSrc: string;
  title: string;
  description: string;
  link?: string; // Optional internal link (URL path within the app)
}

export function FeatureCard({ imageSrc, title, description, link }: FeatureCardProps) {
  const cardContent = (
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

  // If a link is provided, wrap the card content with a React Router Link.
  return link ? (
    <Link to={link} className="block">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}
