import React, { useState } from "react";
import Cell from "./Cell";

const ROWS = 6;
const COLUMNS = 7;

function Board({ player, togglePlayer, setWinner, winner, isPvE }) {
  const [grid, setGrid] = useState(
    Array(ROWS)
      .fill(null)
      .map(() => Array(COLUMNS).fill(null))
  );

  const dropToken = (colIndex, currentPlayer) => {
    if (winner) return; // Ne pas jouer si le jeu est terminé

    const newGrid = [...grid];
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newGrid[row][colIndex]) {
        newGrid[row][colIndex] = currentPlayer;
        setGrid(newGrid);

        if (checkWinner(newGrid, row, colIndex, currentPlayer)) {
          setWinner(currentPlayer); // Déclarer le gagnant
        } else {
          // Si c'est le joueur humain et le mode PvE est activé
          if (isPvE && currentPlayer === "red") {
            setTimeout(() => playAI(), 500); // Laisser l'ordinateur jouer
          } else {
            togglePlayer(); // Passer au joueur suivant
          }
        }
        break;
      }
    }
  };

  const playAI = () => {
    if (winner) return;

    let colIndex;
    do {
      colIndex = Math.floor(Math.random() * COLUMNS); // Choisir une colonne aléatoire
    } while (grid[0][colIndex]); // Réessayer si la colonne est pleine

    dropToken(colIndex, "yellow"); // L'ordinateur joue son coup

    togglePlayer(); // Passer au joueur humain
  };

  const checkWinner = (grid, row, col, currentPlayer) => {
    const directions = [
      { x: 0, y: 1 }, // Horizontal
      { x: 1, y: 0 }, // Vertical
      { x: 1, y: 1 }, // Diagonale principale
      { x: 1, y: -1 }, // Diagonale secondaire
    ];

    for (let { x, y } of directions) {
      let count = 1;
      for (let step = 1; step <= 3; step++) {
        const r = row + step * x;
        const c = col + step * y;
        if (grid[r] && grid[r][c] === currentPlayer) count++;
        else break;
      }
      for (let step = 1; step <= 3; step++) {
        const r = row - step * x;
        const c = col - step * y;
        if (grid[r] && grid[r][c] === currentPlayer) count++;
        else break;
      }
      if (count >= 4) return true;
    }
    return false;
  };

  return (
    <div className="board">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            color={cell}
            onClick={() => {
              if (!cell && player === "red" && !winner) {
                dropToken(colIndex, player);
              }
            }}
          />
        ))
      )}
    </div>
  );
}

export default Board;
