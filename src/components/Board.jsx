import React, { useState, useEffect } from "react";
import Column from "./Column";

const LOCAL_STORAGE_KEY = "kanban-board-columns";

const defaultData = [
  {
    id: "col-1",
    title: "To Do",
    cards: [
      { id: "card-1", title: "Learn React" },
      { id: "card-2", title: "Set up project" },
    ],
  },
  {
    id: "col-2",
    title: "In Progress",
    cards: [{ id: "card-3", title: "Build Board component" }],
  },
  {
    id: "col-3",
    title: "Done",
    cards: [],
  },
];

function Board() {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultData;
  });

  // Save to localStorage whenever columns change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const handleAddCard = (columnId, cardTitle) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: [
                ...col.cards,
                { id: `card-${Date.now()}`, title: cardTitle },
              ],
            }
          : col
      )
    );
  };

  const handleMoveCard = (cardId, fromColId, toColId) => {
    setColumns((prevCols) => {
      let movedCard;
      const updatedCols = prevCols.map((col) => {
        if (col.id === fromColId) {
          const cardIndex = col.cards.findIndex((c) => c.id === cardId);
          if (cardIndex !== -1) {
            movedCard = col.cards[cardIndex];
            return {
              ...col,
              cards: col.cards.filter((c) => c.id !== cardId),
            };
          }
        }
        return col;
      });

      return updatedCols.map((col) =>
        col.id === toColId
          ? {
              ...col,
              cards: [...col.cards, movedCard],
            }
          : col
      );
    });
  };

  const handleDeleteCard = (cardId, columnId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col
      )
    );
  };

const handleEditCard = (cardId, columnId, newTitle) => {
  setColumns((prev) =>
    prev.map((col) =>
      col.id === columnId
        ? {
            ...col,
            cards: col.cards.map((c) =>
              c.id === cardId ? { ...c, title: newTitle } : c
            ),
          }
        : col
    )
  );
};


  return (
    <div className="board">
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          onAddCard={handleAddCard}
          onMoveCard={handleMoveCard}
          onDeleteCard={handleDeleteCard}
          onEditCard={handleEditCard}
          color={
            column.id === "col-1"
              ? "var(--nord10)" // blue for "Requested"
              : column.id === "col-2"
              ? "var(--nord13)" // yellow for "In Progress"
              : "var(--nord14)" // green for "Done"
          }
        />
        
      ))}
    </div>
    
  );
}

export default Board;
