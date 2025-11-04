import { useBooks } from "../hooks/useBooks";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default function BookCard() {
  const { books } = useBooks();
  return (
    <div className="columns is-multiline">
      {books.map((book) => (
        <div key={book.id} className="column is-one-third">
          <div className="card">
            <div className="card-content has-text-centered">
              <p className="title is-5">{book.title}</p>
              <div className="buttons is-centered">
                <EditButton key={`edit-${book.id}`} book={book} />
                <DeleteButton key={`delete-${book.id}`} book={book} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
