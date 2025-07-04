import React from "react";
import Board from "./components/Board";
import "./styles/App.css";

const handleDropToTrash = (e) => {
  e.preventDefault();
  const data = JSON.parse(e.dataTransfer.getData("text/plain"));
  const { cardId, fromColumnId } = data;

  setBoard((prevBoard) =>
    prevBoard.map((column) =>
      column.id === fromColumnId
        ? {
            ...column,
            cards: column.cards.filter((card) => card.id !== cardId),
          }
        : column
    )
  );
};


function App() {
  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <Board />
      <div className="trash-zone" onDragOver={(e) => e.preventDefault()} onDrop={handleDropToTrash} >
        🗑️
      </div>
    </div>
    
  );
}

export default App;
