import { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import type { Book } from "../types/booktypes";

type EditButtonProps = {
  readonly book: Book;
};

export default function EditButton({ book }: EditButtonProps) {
  const { updateBook } = useBooks();
  const [isEditing, setIsEditing] = useState(false);
  const [bookTitle, setBookTitle] = useState(book.title);

  const handleEdit = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    setIsEditing(true);
    setBookTitle(book.title);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBook(book.id, bookTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setBookTitle(book.title); // Reset to original title
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit}>
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && handleCancel()}
              placeholder={book.title}
              autoFocus
            />
          </div>
        </div>
        <div className="buttons">
          <button
            className="button is-small is-success"
            style={{ minWidth: "40px" }}
            type="submit"
          >
            Save
          </button>
          <button
            className="button is-small is-light"
            style={{ minWidth: "40px" }}
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <button
      className="button is-small is-warning"
      style={{ minWidth: "80px" }}
      onClick={handleEdit}
    >
      Edit
    </button>
  );
}
