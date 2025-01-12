"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/PerspectiveText.module.css";
import { heroTextApi } from "@/services/heroTextApi";

interface HeroText {
  id: string;
  littleText: string;
  heroText: string;
}

const PerspectiveText = () => {
  const [heroText, setHeroText] = useState<HeroText | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroText = async () => {
      try {
        const data = await heroTextApi.getHeroText();
        setHeroText(data);
      } catch (error) {
        console.error("Error fetching hero text:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroText();
  }, []);

  // CSS değişkenini güncelle
  useEffect(() => {
    if (heroText) {
      document.documentElement.style.setProperty(
        "--hero-text",
        `"${heroText.heroText}"`
      );
    }
  }, [heroText]);

  if (isLoading || !heroText) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.layeredText}>
      <p className={styles.textIndent}>{heroText.littleText}</p>
      <p className={styles.shadow}>{heroText.heroText}</p>
    </div>
  );
};

export default PerspectiveText;
