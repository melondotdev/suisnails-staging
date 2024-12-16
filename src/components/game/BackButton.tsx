import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assumes you're using React Router

interface BackButtonProps {
  to?: string; // Optional destination path
}

export const BackButton: React.FC<BackButtonProps> = ({ to = '/' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(to); // Navigate to the specified path
  };

  return (
    <button
      onClick={handleBack}
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        padding: '10px 15px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer',
        zIndex: 20, // Ensure it overlays everything
      }}
    >
      Back
    </button>
  );
};

export default BackButton;
