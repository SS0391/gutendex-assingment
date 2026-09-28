import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../services/api.js";
import BookCard from "../components/BookCard/BookCard.jsx";

export default function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [apiUrl, setApiUrl] = useState("https://gutendex.com/books/");
  // currentUrl shows the books in list
  const currentUrl = searchQuery ? `https://gutendex.com/books/?search=${encodeURIComponent(searchQuery)}` : apiUrl;

  // Using Tanstack to get Loading, error call if needed
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["books", searchQuery, currentUrl],
    queryFn: () => fetchBooks(currentUrl),
  });

  if (isLoading) return <div>Loading books from the Gutendex API..</div>;
  if (isError) return <div>Error occurred: {error.message}</div>;

  return (
    <div>
      <h2>{searchQuery ? `Results "${searchQuery}"` : "Popular books"}</h2>

      <div>
        {data?.results?.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div>
        <button onClick={() => setApiUrl(data.previous)} disabled={!data?.previous}>
          Last page
        </button>
        <button onClick={() => setApiUrl(data.next)} disabled={!data?.next}>
          Next page
        </button>
      </div>
    </div>
  );
}
