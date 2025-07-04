import React, { useState } from "react";

function Card({ card, columnId, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleEditSave = () => {
    const trimmed = editedTitle.trim();
    if (trimmed) {
      onEdit(card.id, columnId, trimmed);
    } else {
      setEditedTitle(card.title); // reset to original if blank
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleEditSave();
    if (e.key === "Escape") {
      setEditedTitle(card.title);
      setIsEditing(false);
    }
  };

  const handleDragStart = (e) => {
    const data = { cardId: card.id, fromColumnId: columnId };
    e.dataTransfer.setData("text/plain", JSON.stringify(data));
  };

  return (
    <div className="card" draggable onDragStart={handleDragStart}>
      {isEditing ? (
        <input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleEditSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div className="card-row" onDoubleClick={handleDoubleClick}>
          <span className="dot" />
          <span className="card-title">{card.title}</span>
        </div>
      )}
    </div>
  );
}

export default Card;
