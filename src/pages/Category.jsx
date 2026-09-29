import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../services/api.js";
import BookCard from "../components/BookCard/BookCard.jsx";

export default function Category() {
  const { categoryName } = useParams();

  const [pageUrl, setPageUrl] = useState(null);

  useEffect(() => {
    setPageUrl(null);
  }, [categoryName]);

  // const currentUrl = pageUrl || `https://gutendex.com/books/?topic=${encodeURIComponent(categoryName)}`;
  const queryParam = pageUrl ? pageUrl : { topic: categoryName };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categoryBooks", categoryName, queryParam],
    queryFn: async () => {
      const res = await fetchBooks(queryParam);
      return res;
    },
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
        <button onClick={() => setPageUrl(data.previous)} disabled={!data?.previous}>
          Last Page
        </button>
        <button onClick={() => setPageUrl(data.next)} disabled={!data?.next}>
          Next Page
        </button>
      </div>
    </div>
  );
}
