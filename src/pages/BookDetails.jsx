import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./BookDetails.module.css";

export default function BookDetails() {
  // fetch an ID for a book from the URL
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    data: books,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const response = await axios.get(`https://gutendex.com/books/?ids=${id}`);
      return response.data.results;
    },
  });

  const book = books && books.length > 0 ? books[0] : null;

  useEffect(() => {
    const currentFav = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = currentFav.some((favBook) => favBook.id === Number(id));
    setIsFavorite(exists);
  }, [id]);

  const toggleFavorite = () => {
    if (!book) return;

    let currentFav = JSON.parse(localStorage.getItem("favorites")) || [];
    // if the book is a favorite already filter it away to remove
    if (isFavorite) {
      currentFav = currentFav.filter((favBook) => favBook.id !== book.id);
      setIsFavorite(false);
    } else // if not favorite add the book to the array
    {
      currentFav.push(book);
      setIsFavorite(true);
    }
    // save it to localstorage
    localStorage.setItem("favorites", JSON.stringify(currentFav));
  };

  if (isLoading) return <div>Loading book details...</div>;
  if (isError) return <div>Error occured: {error.message}</div>;
  if (!book) return <div>Book not found</div>;

  const coverImg = book.formats?.["image/jpeg"] || "https://placeholder.com";
  const authorName = book.authors && book.authors.length > 0 ? book.authors[0].name : "Unknown author";

  const digitalLinkToBook = book.formats?.["text/html"] || book.formats?.["text/plain; charset=us-ascii"];

  return (
    <div className={styles.detailsContainer}>
      <img src={coverImg} alt={book.title} className={styles.coverImg} />
      <div className={styles.infoSection}>
        {/*Book details */}
        <h1 className={styles.title}>{book.title}</h1>
        <p className={styles.metaTxt}>Author: {authorName}</p>
        <p className={styles.metaTxt}>Language: {book.languages?.join(", ")}</p>
        <p className={styles.metaTxt}>Category / Subject: {book.subjects?.slice(0, 3).join(", ")}</p>
      </div>

      <div className={styles.btnGroup}>
        {digitalLinkToBook && (
          <a href={digitalLinkToBook} target="_blank" rel="noreferrer">
            Read Online
          </a>
        )}
        <button onClick={toggleFavorite}>{isFavorite ? "Remove from favorites" : "Add to favorites"}</button>
      </div>
    </div>
  );
}
