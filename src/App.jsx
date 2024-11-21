import React, { useState } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import "./App.css";

function App() {
  const [player, setPlayer] = useState("red"); // Joueur actuel
  const [winner, setWinner] = useState(null); // Gagnant
  const [isPvE, setIsPvE] = useState(true); // Mode Joueur contre Ordinateur

  const togglePlayer = () => {
    setPlayer((prevPlayer) => (prevPlayer === "red" ? "yellow" : "red"));
  };

  return (
    <div className="app">
      <Header />
      {winner ? (
        <h2 className={`winner ${winner}`}>Joueur {winner} a gagné ! 🎉</h2>
      ) : (
        <h2>
          Tour du joueur : <span className={player}>{player}</span>
        </h2>
      )}
      <Board
        player={player}
        togglePlayer={togglePlayer}
        setWinner={setWinner}
        winner={winner}
        isPvE={isPvE}
        setIsPvE={setIsPvE}
      />
      <button onClick={() => window.location.reload()}>Rejouer</button>
    </div>
  );
}

export default App;
