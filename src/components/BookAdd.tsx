import { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import BookCard from "./BookCard";

export default function BookAdd() {
  const [inputValue, setInputValue] = useState("");
  const { addBook } = useBooks();

  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addBook(inputValue);
    setInputValue("");
  };

  return (
    <div className="container has-text-centered">
      <form className="has-text-centered mb-5">
        <div className="field has-addons is-justify-content-center">
          <div className="control">
            <input
              className="input"
              placeholder="Add a book"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <div className="control">
            <button
              className="button is-primary"
              type="submit"
              onClick={handleClick}
            >
              Add Book
            </button>
          </div>
        </div>
      </form>
      <BookCard />
    </div>
  );
}
