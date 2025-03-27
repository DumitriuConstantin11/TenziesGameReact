import Die from "./Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [numbers, setNumbers] = React.useState(() => generateAllNewDice());
  const gameWon =
    numbers.every((die) => die.isHeld) &&
    numbers.every((die) => die.value === numbers[0].value);

  function generateAllNewDice() {
    const diceVal = [];
    for (let i = 0; i < 10; i++) {
      diceVal.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return diceVal;
  }

  const diceElements = numbers.map((num) => (
    <Die
      key={num.id}
      value={num.value}
      isHeld={num.isHeld}
      hold={() => hold(num.id)}
    />
  ));

  function reroll() {
    if (gameWon) {
      setNumbers(generateAllNewDice())
    } else {
      setNumbers((prevNumbers) =>
        prevNumbers.map((item) =>
          item.isHeld
            ? item
            : { ...item, value: Math.floor(Math.random() * 6) + 1 }
        )
      );
    }
  }

  function hold(id) {
    setNumbers((prevNumbers) =>
      prevNumbers.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="diceButtons">{diceElements}</div>
      <button onClick={reroll} className="rerollBtn">
        {gameWon ? "New game" : "Roll"}
      </button>
    </main>
  );
}
