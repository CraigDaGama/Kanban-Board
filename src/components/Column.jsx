import React, { useState } from "react";
import Card from "./Card";

function Column({ title, columnId, cards, onDropCard, onDragStart, draggedCard, isOverTrash, headerColor, onEditCard }) {
  const [newCardTitle, setNewCardTitle] = useState("");

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCardTitle.trim()) return;
    const newCard = {
      id: Date.now(),
      title: newCardTitle,
    };
    onDropCard(columnId, newCard);
    setNewCardTitle("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedCard) {
      onDropCard(columnId, draggedCard);
    }
  };

  return (
    <div className="column" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <div
        className="column-header"
        style={{ backgroundColor: headerColor }}
      >
        {title}
      </div>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDragStart={() => onDragStart(card)}
          isBeingDragged={draggedCard?.id === card.id}
          isOverTrash={isOverTrash}
          columnId={columnId}
          onEdit={(cardId, columnId, newTitle) => onEditCard(cardId, columnId, newTitle)}
        />
      ))}

      <form onSubmit={handleAddCard}>
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
