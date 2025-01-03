import React from "react";
import styles from "@/styles/PerspectiveText.module.css";

const PerspectiveText = () => {
  return (
    <div className={styles.layeredText}>
      <p className={styles.textIndent}>
        Loneliness is when your thoughts hit the walls of your mind and remain
        trapped inside
      </p>
      <p className={styles.shadow}>Perspective</p>
    </div>
  );
};

export default PerspectiveText;
