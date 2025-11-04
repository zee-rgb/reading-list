// Utility functions for managing localStorage data
// You can import and use these in development/testing

export const clearReadingListData = (): void => {
  localStorage.removeItem("reading-list-books");
  localStorage.removeItem("reading-list-next-id");
  console.log("Reading list data cleared from localStorage");
};

export const exportReadingListData = (): string => {
  const books = localStorage.getItem("reading-list-books") || "[]";
  const nextId = localStorage.getItem("reading-list-next-id") || "1";

  return JSON.stringify(
    {
      books: JSON.parse(books),
      nextId: Number.parseInt(nextId, 10),
      exportedAt: new Date().toISOString(),
    },
    null,
    2
  );
};

export const importReadingListData = (data: string): void => {
  try {
    const parsed = JSON.parse(data);
    localStorage.setItem("reading-list-books", JSON.stringify(parsed.books));
    localStorage.setItem("reading-list-next-id", parsed.nextId.toString());
    console.log("Reading list data imported successfully");
  } catch (error) {
    console.error("Failed to import reading list data:", error);
  }
};
