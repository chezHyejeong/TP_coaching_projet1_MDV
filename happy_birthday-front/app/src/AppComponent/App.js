import React, { useState, useEffect, useMemo } from "react";
import HeaderComponent from "./HeaderComponent/Header";
import QuoteOnlyComponent from "./QuoteOnlyComponent/QuoteOnly";
import BirthdayComponent from "./BirthdayComponent/Birthday";
import SidebarComponent from "./SidebarComponent/Sidebar";
import {
  getTodaysBirthday,
  getRandomQuote,
} from "../services/birthdayApiService";

function App() {
  const colorsList = useMemo(
    () => [
      "#DF80AC", // customPink
      "#579FF4", // customBlue
      "#FCB325", // customYellow
      "#098E27", // customGreen
    ],
    []
  );

  const [Birthdays, setBirthdays] = useState([]);
  const [CurrentBirthday, setCurrentBirthday] = useState(null);
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const [CurrentColor, setCurrentColor] = useState(colorsList[0]);
  const [CurrentQuote, setCurrentQuote] = useState(null);

  useEffect(() => {
    getTodaysBirthday()
      .then((result) => {
        const students_birthday = result.students_birthday || [];
        const teachers_birthday = result.teachers_birthday || [];
        let birthdaysList = [...students_birthday, ...teachers_birthday];
        console.log("Fetched Birthdays:", birthdaysList);
        setBirthdays(birthdaysList);
      })
      .catch(() => {
        setBirthdays([]);
      });

    getRandomQuote()
      .then((result) => {
        setCurrentQuote(result);
      })
      .catch(() => {
        setCurrentQuote(null);
      });
  }, []);

  useEffect(() => {
    if (Birthdays.length > 0) {
      setCurrentColor(colorsList[CurrentIndex % colorsList.length]);
      setCurrentBirthday({
        ...Birthdays[CurrentIndex],
        index: CurrentIndex,
      });
    }
  }, [Birthdays, CurrentIndex, colorsList]);

  useEffect(() => {
    if (Birthdays.length > 0) {
      const intervalId = setInterval(() => {
        const index =
          CurrentIndex === Birthdays.length - 1 ? 0 : CurrentIndex + 1;
        setCurrentIndex(index);
        setCurrentColor(colorsList[index % colorsList.length]);
        setCurrentBirthday({
          ...Birthdays[index],
          index: index,
        });

        // Update random quote
        getRandomQuote()
          .then((result) => {
            setCurrentQuote(result);
          })
          .catch(() => {
            setCurrentQuote(null);
          });
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [Birthdays, CurrentIndex, colorsList]);

  return (
    <div>
      <HeaderComponent />
      {Birthdays.length > 0 && CurrentBirthday ? (
        <div className="h-screen w-screen flex">
          <BirthdayComponent
            currentBirthday={CurrentBirthday}
            currentColor={CurrentColor}
          />
          <SidebarComponent
            currentBirthday={CurrentBirthday}
            totalBirthdays={Birthdays.length}
            currentColor={CurrentColor}
            currentQuote={CurrentQuote}
          />
        </div>
      ) : (
        <QuoteOnlyComponent currentColor={CurrentColor} />
      )}
    </div>
  );
}

export default App;
