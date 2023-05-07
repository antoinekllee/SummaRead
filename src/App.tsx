import React from 'react';
import './App.css';

const App: React.FC = () => {
  const handleClick1 = () => {
    console.log("Button 1 clicked!");
  };

  const handleClick2 = () => {
    console.log("Button 2 clicked!");
  };

  return (
    <div>
      <button onClick={handleClick1}>Button 1</button>
      <button onClick={handleClick2}>Button 2</button>
    </div>
  );
};

export default App;
