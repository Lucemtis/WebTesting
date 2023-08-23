import React, { useState, useEffect } from "react";
import data from "../data/data.json"; // Ajustez le chemin selon votre structure
import '../styles/randomPhrase.scss'

const RandomPhrase = () => {
  const [phrasePart1, setPhrasePart1] = useState("");
  const [phrasePart2, setPhrasePart2] = useState("");

  useEffect(() => {
    const generateRandomPhrase = async () => {
      const randomAction = data.actions[Math.floor(Math.random() * data.actions.length)];
      const randomTimeCode = getRandomTimeCode();

      const timeRanges = [
        { min: 1 * 60, max: 30 * 60 },               // 1 à 30 minutes (en secondes)
        { min: 600, max: 10800 },                   // 10 minutes à 3 heures (en secondes)
        { min: 3600, max: 36000 },                  // 1 heure à 10 heures (en secondes)
        { min: 86400, max: 7905600 },               // 1 jour à 3 mois (en secondes)
        { min: 31536000, max: 3122064000 }          // 1 an à 99 ans (en secondes)
      ];

      const { min, max } = timeRanges[randomTimeCode - 1];
      const randomTime = getRandomTime(min, max);

      const timeString = convertTime(randomTime);

      const phrasePart1 = `La mission d'aujourd'hui est : ${randomAction}.`;
      const phrasePart2 = `Tu as ${timeString} pour la réaliser.`;

      setPhrasePart1("");
      setPhrasePart2("");

      let index = 0;
      const interval = setInterval(() => {
        if (index <= phrasePart1.length) {
          setPhrasePart1(phrasePart1.substring(0, index));
        } else {
          clearInterval(interval);

          setTimeout(() => {
            index = 0;
            const secondInterval = setInterval(() => {
              if (index <= phrasePart2.length) {
                setPhrasePart2(phrasePart2.substring(0, index));
              } else {
                clearInterval(secondInterval);
              }
              index++;
            }, 100);
            // setPhrasePart1(""); // Supprimer la partie 1
          }, 1000); // Attente d'1 seconde avant d'afficher la partie 2
        }
        index++;
      }, 100);

      // Nettoyage de l'intervalle à la désactivation du composant
      return () => {
        clearInterval(interval);
      };
    };

    const getRandomTimeCode = () => {
      const probabilities = [0.5, 0.3, 0.15, 0.04, 0.01];
      const randomValue = Math.random();
      let cumulativeProbability = 0;

      for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i];
        if (randomValue <= cumulativeProbability) {
          return i + 1;
        }
      }

      return probabilities.length;
    };

    const getRandomTime = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const convertTime = (time) => {
      const seconds = time % 60;
      const minutes = Math.floor((time / 60) % 60);
      const hours = Math.floor((time / 3600) % 24);
      const days = Math.floor((time / 86400) % 30); // Approximation d'un mois
      const years = Math.floor(time / 31536000);

      const formattedTime = [];
      if (years > 0) {
        formattedTime.push(`${years} an${years !== 1 ? "s" : ""}`);
      }
      if (days > 0) {
        formattedTime.push(`${days} jour${days !== 1 ? "s" : ""}`);
      }
      if (hours > 0) {
        formattedTime.push(`${hours} heure${hours !== 1 ? "s" : ""}`);
      }
      if (minutes > 0) {
        formattedTime.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
      }
      if (seconds > 0) {
        formattedTime.push(`${seconds} seconde${seconds !== 1 ? "s" : ""}`);
      }

      return formattedTime.join(" ");
    };

    const timeout = setTimeout(() => {
      generateRandomPhrase();
    }, 1000);

    return () => {
      clearTimeout(timeout); // Nettoyage du timeout à la désactivation du composant
    };
  }, []);

  return (
    <div className="randomPhraseContent">
      <p>{phrasePart1}</p>
      <p>{phrasePart2}</p>
    </div>
  );
};

export default RandomPhrase;
