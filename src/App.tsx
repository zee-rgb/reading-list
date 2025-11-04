import BookAdd from "./components/BookAdd";
import { BookProvider } from "./contexts/BookContext";

export default function App() {
  return (
    <BookProvider>
      <div className="container has-text-centered">
        <div className=" has-text-centered">
          <BookAdd />
        </div>
      </div>
    </BookProvider>
  );
}
