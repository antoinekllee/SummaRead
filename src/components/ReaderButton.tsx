import React from 'react';

interface ReaderButtonProps {
  onClick: () => void;
  isReaderEnabled: boolean;
}

const ReaderButton: React.FC<ReaderButtonProps> = ({ onClick, isReaderEnabled }) => {
  const buttonClass = isReaderEnabled
    ? 'reader-button enabled'
    : 'reader-button';

  return (
    <button onClick={onClick} className={buttonClass}>
      {isReaderEnabled ? 'ON' : 'OFF'}
    </button>
  );
};

export default ReaderButton;