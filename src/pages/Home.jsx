import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../services/api.js";
import BookCard from "../components/BookCard/BookCard.jsx";

export default function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [apiUrl, setApiUrl] = useState("https://gutendex.com");

  // changes to the url? resets it to a new search url
  useEffect(() => {
    if (searchQuery) {
      setApiUrl(`https://gutendex.com?search=${encodeURIComponent(searchQuery)}`);
    } else {
      setApiUrl("https://gutendex.com");
    }
  }, [searchQuery]);

  // Using Tanstack to get Loading, error call if needed
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["books", apiUrl],
    queryFn: () => fetchBooks(apiUrl),
    placeholderData: (previousData) => previousData,
  });

  if (isLoading) return <div>Loading books from the Gutendex API..</div>;
  if (isError) return <div>Error occurd: {error.message}</div>;

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
