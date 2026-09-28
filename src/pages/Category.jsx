import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../services/api.js";
import BookCard from "../components/BookCard/BookCard.jsx";

export default function Category() {
  const { categoryName } = useParams();

  // a way to keep control over the API url for a specific category
  const [apiUrl, setApiUrl] = useState(`https://gutendex.com/books?topic=${categoryName}`);

  useEffect(() => {
    setApiUrl(`https://gutendex.com/books?topic=${categoryName}`);
  }, [categoryName]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categoryBooks", apiUrl],
    queryFn: () => fetchBooks(apiUrl),
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <div>Books loading within this category: {categoryName}...</div>;
  if (isError) return <div>Error occurd: {error.message}</div>;

  return (
    <div>
      <h2>Category: {categoryName}</h2>
      <div>
        {data?.results?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div>
        <button onClick={() => setApiUrl(data.previous)} disabled={!data?.previous}>
          Last Page
        </button>
        <button onClick={() => setApiUrl(data.next)} disabled={!data?.next}>
          Next Page
        </button>
      </div>
    </div>
  );
}
