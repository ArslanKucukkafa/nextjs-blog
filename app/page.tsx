"use client";

import { useEffect, useState, useCallback } from 'react';
import styles from '../styles/style.module.css';

const songTitles = [
  "Git", // Software Skills
  "Ambitious", // Personality
  "Java", // Software Skills
  "Danisment High School", // Education
  "Data JPA", // Software Skills
  "Inter Software Engineer at Ozgur Software Inc", // Experiences
  "FastAPI", // Software Skills
  "Cloud Systems", // Hobies
  "Flask", // Software Skills
  "Forward-thinking", // Personality
  "Spring Boot", // Software Skills
  "Fırat Universty (Bachelor degree)", // Education
  "Karate Tests", // Software Skills
  "Inter Software Engineer at Skyland Inc", // Experiences
  "Junit Tests", // Software Skills
  "AI Tools", // Hobies
  "Python", // Software Skills
  "Impatient", // Personality
  "Maven", // Software Skills
  "Inter Software Engineer at Enoca Inc", // Experiences
  "Visiting in Product Hunt", // Hobies
  "Persistent", // Personality
  "React", // Software Skills
  "JAVA", // Hobies
  "Postgresql", // Software Skills
  "Eager to learn", // Personality
  "Docker", // Software Skills
  "Passion for Motocross", // Hobies
  "Open to discussion", // Personality
  "Linux", // Software Skills
  "Unbiased", // Personality
  "Cloud Computer Instance", // Software Skills
  "Java Enthusiast", // Personality
  "Gitlab" // Software Skills
];



// Full date assignments array
const dateAssignments = [
    {
      date: "Personality",
      songs: ["Ambitious", "Forward-thinking", "Impatient", "Persistent", "Eager to learn", "Open to discussion", "Unbiased", "Java Enthusiast"]
    },
    {
      date: "Software Skills",
      songs: ["Java","Spring Boot", "Maven", "React","Docker", "Linux", "Cloud Computer Instance", "Python", "Flask", "FastAPI", "Postgresql", "Data JPA", "Karate Tests", "Junit Tests", "Git", "Gitlab"]
    },
    {
      date: "Education",
      songs: ["Danisment High School","Fırat Universty (Bachelor degree)"]
    },
    {
      date: "Experiences",
      songs: ["Inter Software Engineer at Ozgur Software Inc","Inter Software Engineer at Skyland Inc","Inter Software Engineer at Enoca Inc"]
    },
    {
      date: "Hobies",
      songs: ["Cloud Systems","AI Tools", "Visiting in Product Hunt", "JAVA","Farming", "Passion for Motocross"]
    }
];

const PearlJam: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = useCallback((index: number) => {
    setIsHovered(true);
    setCurrentIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dateAssignments.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className={styles.tourContainer}>
      <div className={styles.tourDiv}>
        <h1 className={styles.heading}>
          <span>Arslan Kucukkafa</span>
          <span>Arslan Kucukkafa</span>
        </h1>
        <h2 className={styles.subHeading}>Software Developer</h2>
        <ul className={styles.datesList}>
          {dateAssignments.map((assignment, index) => (
            <li
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundColor: currentIndex === index ? 'var(--theme-color-1)' : '',
                color: currentIndex === index ? '#19191f' : ''
              }}
            >
              {assignment.date}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.songDiv}>
        <ul className={styles.songList}>
          {songTitles.map((song, index) => (
            <li
              key={index}
              className={styles.songItem}
              style={{
                color: dateAssignments[currentIndex].songs.includes(song)
                  ? 'var(--theme-color-2)'
                  : '#323143', // Default rengi ekledik
              }}
            >
              {song}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PearlJam;