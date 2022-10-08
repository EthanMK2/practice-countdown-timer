import React, { useEffect, useState, GetDerivedStateFromProps } from "react";
import classes from "./Timer.module.css";
const randomDate = new Date(2023, 2, 2, 0, 0, 0); // date for default setting

const curDate = new Date();
const date = Math.abs(curDate - randomDate);

let defaultDate = {
  days: Math.round(date / (1000 * 60 * 60 * 24)) - 1,
  hours: Math.round(date / (1000 * 60 * 60)) % 24,
  minutes: Math.round(date / (1000 * 60)) % 60,
  seconds: Math.round(date / 1000) % 60,
};

export const parseMonth = (month) => {
  switch (month) {
    case "Jan":
      return 0;
    case "Feb":
      return 1;
    case "Mar":
      return 2;
    case "Apr":
      return 3;
    case "May":
      return 4;
    case "Jun":
      return 5;
    case "Jul":
      return 6;
    case "Aug":
      return 7;
    case "Sep":
      return 8;
    case "Oct":
      return 9;
    case "Nov":
      return 10;
    case "Dec":
      return 11;
  }
};

export const Timer = () => {
  const [selectedMonth, setSelectedMonth] = useState("Jan");
  const [selectedDay, setSelectedDay] = useState(1);

  const [selectedDate, setSelectedDate] = useState(defaultDate);

  const selectMonthHandler = (event) => {
    setSelectedMonth(event.target.value);
    console.log(event.target.value);
  };

  const selectDayHandler = (event) => {
    setSelectedDay(event.target.value);
    console.log(event.target.value);
  };

  const setDateHandler = (event) => {
    event.preventDefault();

    const monthInteger = parseMonth(selectedMonth);
    const todayDate = new Date();
    let year =
      todayDate.getMonth() > monthInteger
        ? todayDate.getFullYear() + 1
        : todayDate.getFullYear();
    if (
      selectedDay <= todayDate.getDate() &&
      monthInteger == todayDate.getMonth()
    ) {
      year = todayDate.getFullYear() + 1;
    }
    const dateEntered = new Date(`${selectedMonth} ${selectedDay} ${year}`);
    console.log(dateEntered);
    const date = Math.abs(todayDate - dateEntered);
    const newDate = {
      days: Math.round(date / (1000 * 60 * 60 * 24)),
      hours: Math.round(date / (1000 * 60 * 60)) % 24,
      minutes: Math.round(date / (1000 * 60)) % 60,
      seconds: Math.round(date / 1000) % 60,
    };
    setSelectedDate(newDate);
  };

  const updateTime = () => {
    setSelectedDate((prevDate) => {
      let days = prevDate.days;
      let hours = prevDate.hours;
      let minutes = prevDate.minutes;
      let seconds = prevDate.seconds;

      seconds -= 1;

      if (seconds === -1) {
        seconds = 59;
        minutes -= 1;
      }
      if (minutes === -1) {
        minutes = 59;
        seconds = 59;
        hours -= 1;
      }
      if (hours === -1) {
        hours = 23;
        minutes = 59;
        seconds = 59;
        days -= 1;
      }

      return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      };
    });
  };

  useEffect(() => {
    let myInterval = setInterval(updateTime, 1000);
    console.log("SET INTERVAL");

    return () => {
      clearInterval(myInterval);
      myInterval = setInterval(updateTime, 1000);
    };
  }, []);

  // placeholders to keep timer clean, and not "moving" whenever a digit changes (02:08 versus just 2:8)
  const daysPlaceHolderOne =
    selectedDate.days <= 99 && selectedDate.days >= 10 ? "0" : "";
  const daysPlaceHolderTwo = selectedDate.days <= 9 ? "00" : "";

  const hoursZeroPlaceHolder = selectedDate.hours <= 9 ? "0" : "";
  const minutesZeroPlaceHolder = selectedDate.minutes <= 9 ? "0" : "";
  const secondsZeroPlaceHolder = selectedDate.seconds <= 9 ? "0" : "";

  return (
    <div className={classes["main-container"]}>
      <div className={classes.inputs}>
        <form onSubmit={setDateHandler} className={classes.inputs}>
          <div className={classes["input-item"]}>
            <label htmlFor="month">
              {" "}
              Select Month
              <select onChange={selectMonthHandler}>
                <option value={"Jan"}>Jan</option>
                <option value={"Feb"}>Feb</option>
                <option value={"Mar"}>Mar</option>
                <option value={"Apr"}>Apr</option>
                <option value={"May"}>May</option>
                <option value={"Jun"}>Jun</option>
                <option value={"Jul"}>Jul</option>
                <option value={"Aug"}>Aug</option>
                <option value={"Sep"}>Sep</option>
                <option value={"Oct"}>Oct</option>
                <option value={"Nov"}>Nov</option>
                <option value={"Dec"}>Dec</option>
              </select>
            </label>
          </div>
          <div className={classes["input-item"]}>
            <label htmlFor="month">
              {" "}
              Select Day
              <input
                type="number"
                defaultValue={1}
                onChange={selectDayHandler}
              ></input>
            </label>
          </div>
          <button type="submit" className={classes["input-item"]}>
            Set Countdown
          </button>
        </form>
      </div>

      <div className={classes.timer}>
        {daysPlaceHolderOne}
        {daysPlaceHolderTwo}
        {selectedDate.days} : {hoursZeroPlaceHolder}
        {selectedDate.hours} : {minutesZeroPlaceHolder}
        {selectedDate.minutes} : {secondsZeroPlaceHolder}
        {selectedDate.seconds}
      </div>
    </div>
  );
};
