import { useEffect, useState } from 'react';
import './App.css';

import Figure from './components/Figure';
import Header from './components/Header'
import Word from './components/Word';
import WrongLetters from './components/WrongLetters';

const words = ['application', 'programming', 'interface', 'react']

let selectedWord = words[Math.floor(Math.random() * words.length)]

function App() {
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([]);

  useEffect(() => {
   const handleKeydown = event => {
     const {key, keyCode} = event
     if( playable && keyCode >= 65 && keyCode <= 90){
       const letter = key.toLowerCase()

       if(selectedWord.includes(letter)){
         if(!correctLetters.includes(letter)){
           setCorrectLetters(currentLetters => [...currentLetters, letter])
         }
         else{
           // show notification
         }
        } else{
           if( !wrongLetters.includes(letter)){
             setWrongLetters(wrongLetters => [...wrongLetters, letter])
           } else{
             // show notification
           }
         }
       }
     }
   window.addEventListener('keydown', handleKeydown)

   return () => window.removeEventListener('keydown', handleKeydown)
  }, [correctLetters, wrongLetters, playable])
  return (
    <div>
        <Header />
        <div className="game-container">
           <Figure wrongLetters={wrongLetters} />
           <WrongLetters wrongLetters={wrongLetters}/>
           <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>
       
    </div>
  );
}

export default App;
