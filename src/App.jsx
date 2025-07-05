import React, { useState, useEffect } from "react";
import Column from "./components/Column";
import "./styles/App.css";

const defaultData = {
  todo: [],
  inprogress: [],
  done: [],
};

function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("kanbanData");
    return saved ? JSON.parse(saved) : defaultData;
  });

  const [draggedCard, setDraggedCard] = useState(null);
  const [isOverTrash, setIsOverTrash] = useState(false);

  useEffect(() => {
    localStorage.setItem("kanbanData", JSON.stringify(data));
  }, [data]);

  const handleDropCard = (columnId, card) => {
    if (isOverTrash) {
      deleteCard(card.id);
    } else {
      const newData = { ...data };
      for (const key in newData) {
        newData[key] = newData[key].filter((c) => c.id !== card.id);
      }
      newData[columnId].push(card);
      setData(newData);
    }
    setDraggedCard(null);
    setIsOverTrash(false);
  };

  const deleteCard = (cardId) => {
    const newData = {};
    for (const key in data) {
      newData[key] = data[key].filter((card) => card.id !== cardId);
    }
    setData(newData);
  };

  const handleDragStart = (card) => {
    setDraggedCard(card);
  };

  const handleEditCard = (cardId, columnId, newTitle) => {
  setData((prevData) => {
    const newData = { ...prevData };
    newData[columnId] = newData[columnId].map((card) =>
      card.id === cardId ? { ...card, title: newTitle } : card
    );
    return newData;
  });
};

  return (
    <div className="app">
      <h1>Kanban Board</h1>

      <div className="board">
        <Column
          title="To Do"
          columnId="todo"
          headerColor="var(--nord10)"
          cards={data.todo}
          onDropCard={handleDropCard}
          onDragStart={handleDragStart}
          draggedCard={draggedCard}
          isOverTrash={isOverTrash}
          onEditCard={handleEditCard}
        />
        <Column
          title="In Progress"
          columnId="inprogress"
          headerColor="var(--nord13)"
          cards={data.inprogress}
          onDropCard={handleDropCard}
          onDragStart={handleDragStart}
          draggedCard={draggedCard}
          isOverTrash={isOverTrash}
          onEditCard={handleEditCard}
        />
        <Column
          title="Done"
          columnId="done"
          headerColor="var(--nord14)"
          cards={data.done}
          onDropCard={handleDropCard}
          onDragStart={handleDragStart}
          draggedCard={draggedCard}
          isOverTrash={isOverTrash}
          onEditCard={handleEditCard}
        />
      </div>

      {/* Trash bin */}
      <div
        className={`trash-bin ${isOverTrash ? "over" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsOverTrash(true);
        }}
        onDragLeave={() => setIsOverTrash(false)}
        onDrop={(e) => {
          e.preventDefault();
          if (draggedCard) {
            deleteCard(draggedCard.id);
            setDraggedCard(null);
          }
          setIsOverTrash(false);
        }}
      >
        🗑️
      </div>
    </div>
  );
}

export default App;
