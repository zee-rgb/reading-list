import { useBooks } from "../hooks/useBooks";
import type { Book } from "../types/booktypes";

type DeleteButtonProps = {
  readonly book: Book;
};

export default function DeleteButton({ book }: DeleteButtonProps) {
  const { deleteBook } = useBooks();

  const handleDelete = () => {
    deleteBook(book.id);
  };

  return (
    <button
      className="button is-small is-danger"
      style={{ minWidth: "80px" }}
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}
