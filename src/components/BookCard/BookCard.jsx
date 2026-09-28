import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";

export default function BookCard({ book }) {
  // get a image for the book that is rendered
  const coverImg = book.formats?.["image/jpeg"] || "https://placeholder.com";

  const authorName = book.authors && book.authors.length > 0 ? book.authors[0].name : "Unknown author";

  return (
    <div className={styles.card}>
      <img src={coverImg} alt={book.title} className={styles.cover} />

      <h2 className={styles.title}>{book.title}</h2>
      <p className={styles.author}>{authorName}</p>

      <Link to={`/book/${book.id}`} className={styles.btn}>
        See more
      </Link>
    </div>
  );
}
