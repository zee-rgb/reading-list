import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";
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

// Constants for localStorage keys
const BOOKS_STORAGE_KEY = "reading-list-books";
const NEXT_ID_STORAGE_KEY = "reading-list-next-id";

// Helper functions for localStorage
const loadBooksFromStorage = (): Book[] => {
  try {
    const stored = localStorage.getItem(BOOKS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load books from localStorage:", error);
    return [];
  }
};

const loadNextIdFromStorage = (): number => {
  try {
    const stored = localStorage.getItem(NEXT_ID_STORAGE_KEY);
    return stored ? Number.parseInt(stored, 10) : 1;
  } catch (error) {
    console.error("Failed to load nextId from localStorage:", error);
    return 1;
  }
};

const saveBooksToStorage = (books: Book[]): void => {
  try {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
  } catch (error) {
    console.error("Failed to save books to localStorage:", error);
  }
};

const saveNextIdToStorage = (nextId: number): void => {
  try {
    localStorage.setItem(NEXT_ID_STORAGE_KEY, nextId.toString());
  } catch (error) {
    console.error("Failed to save nextId to localStorage:", error);
  }
};

export function BookProvider({ children }: BookProviderProps) {
  // Initialize state from localStorage
  const [books, setBooks] = useState<Book[]>(() => loadBooksFromStorage());
  const [nextId, setNextId] = useState<number>(() => loadNextIdFromStorage());

  // Sync books to localStorage whenever books change
  useEffect(() => {
    saveBooksToStorage(books);
  }, [books]);

  // Sync nextId to localStorage whenever nextId changes
  useEffect(() => {
    saveNextIdToStorage(nextId);
  }, [nextId]);

  const addBook = (title: string) => {
    if (!title.trim()) return;
    const newBook: Book = {
      id: nextId,
      title: title.trim(),
    };
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    setNextId(nextId + 1);
  };

  const updateBook = (id: number, newTitle: string) => {
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, title: newTitle.trim() } : book
    );
    setBooks(updatedBooks);
  };

  const deleteBook = (id: number) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
}
