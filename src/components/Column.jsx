import React, { useState } from "react";
import Card from "./Card";

function Column({ column, onAddCard, onMoveCard, onDeleteCard, onEditCard, color }) {
  const [newCardTitle, setNewCardTitle] = useState("");

  // Add card form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newCardTitle.trim() === "") return;
    onAddCard(column.id, newCardTitle);
    setNewCardTitle("");
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (data.fromColumnId !== column.id) {
      onMoveCard(data.cardId, data.fromColumnId, column.id);
    }
  };

  return (
    <div
      className="column"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Colored top header */}
      <div
        className="column-header"
        style={{
          backgroundColor: color,
          color: "var(--nord6)",
        }}
      >
        {column.title}
      </div>

      {/* Cards */}
      <div className="cards">
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            columnId={column.id}
            onDelete={onDeleteCard}
            onEdit={onEditCard}
          />
        ))}
      </div>


      {/* Add new card form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          placeholder="New card title"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Column;
