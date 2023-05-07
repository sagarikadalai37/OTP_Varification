import React from "react";
import "./styles.css";
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        &copy; <span>{year}</span> MiM Essay - All Rights Copyright Reserved To{" "}
        <a target="_blank" rel="noreferrer" href="">
          Sagarika Dalai
        </a>
      </p>
    </footer>
  );
}
