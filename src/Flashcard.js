import React, { useState } from 'react';
import './Flashcard.css';

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false); //false: front, true:back
  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      onClick={() => setFlip((currentFlip) => !currentFlip)}
    >
      <div className='front'>
        {flashcard.question}
        <div className='flashcard-options'>
          {flashcard.options.map((option) => {
            return (
              <div className='flashcard-option' key={option}>
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className='back'>{flashcard.answer}</div>
    </div>
  );
}
