import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import styles from "./RootLayout.module.css";

export default function RootLayout() {
  return (
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}
