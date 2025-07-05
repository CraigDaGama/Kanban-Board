import React, { useState, useRef, useEffect } from "react";

function Card({ card, columnId, onDragStart, isBeingDragged, isOverTrash, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editedTitle.trim();
    if (trimmed && trimmed !== card.title) {
      onEdit(card.id, columnId, trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditedTitle(card.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`card ${isBeingDragged && isOverTrash ? "delete-hover" : ""}`}
      draggable
      onDragStart={onDragStart}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="edit-input"
        />
      ) : (
        <div className="card-row" onDoubleClick={() => setIsEditing(true)}>
          <span className="dot" />
          <span className="card-title">{card.title}</span>
        </div>
      )}
    </div>
  );
}

export default Card;
