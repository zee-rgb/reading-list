import type { ReactNode } from "react";
import { createContext, useState } from "react";
import type { Book } from "../types/booktypes";

type BookContextType = {
  books: Book[];
  addBook: (title: string) => void;
  updateBook: (id: number, newTitle: string) => void;
  deleteBook: (id: number) => void;
};

export const BookContext = createContext<BookContextType | undefined>(
  undefined
);

type BookProviderProps = {
  readonly children: ReactNode;
};

export function BookProvider({ children }: BookProviderProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [nextId, setNextId] = useState(1);

  const addBook = (title: string) => {
    if (!title.trim()) return;
    const newBook: Book = {
      id: nextId,
      title: title.trim(),
    };
    setBooks([...books, newBook]);
    setNextId(nextId + 1);
  };

  const updateBook = (id: number, newTitle: string) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, title: newTitle.trim() } : book
      )
    );
  };

  const deleteBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
}
