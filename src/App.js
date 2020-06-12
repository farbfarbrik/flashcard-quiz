import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import FlashcardList from './FlashcardList';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.trivia_categories);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://opentdb.com/api.php?amount=${amountEl.current.value}&category=${categoryEl.current.value}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const shuffle = (a) => {
          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
          }
          return a;
        };
        setFlashcards(
          data.results.map((item, index) => {
            const options = [
              ...item.incorrect_answers.map((answer) => decodeString(answer)),
              decodeString(item.correct_answer),
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(item.question),
              answer: decodeString(item.correct_answer),
              options: shuffle(options),
            };
          })
        );
      });
  };

  return (
    <>
      <form className='header' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <select id='category' ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='amount'>Number of Questions</label>
          <input
            type='number'
            id='amount'
            min='1'
            step='1'
            defaultValue={10}
            ref={amountEl}
          ></input>
        </div>
        <div className='form-group'>
          <button className='btn'>Generate</button>
        </div>
      </form>
      <div className='container'>
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

const decodeString = (str) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = str;
  return textArea.value;
};

export default App;
