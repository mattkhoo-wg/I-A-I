import React, { useState, useEffect } from "react";
import classes from "./FamilyLog.module.css";
import foot from "./../../img/foot.svg";
import line from "./../../img/line.svg";
import baby from "./../../img/baby.png";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import UserService from "../../userSerivces";

// Card Component
const Card = ({log}) => {
  return (
    <div className={classes.card}>
      <div className={classes.lineLeft}></div>
      <div className={classes.cardInner}>
        <div className={classes.pic}>
          <img src={baby} alt="baby" />
          <img src={baby} alt="baby" />
        </div>
        <div className={classes.text}>
          <h2>{log.eventName}</h2>
          <br />
          <p>
            {log.notes}
          </p>
        </div>
      </div>
    </div>
  );
};

const FamilyLog = () => {
  const [toggleMonth, setIsToggleMonth] = useState(1);
  const [toggleYear, setIsToggleYear] = useState(2021); //maybe change to 2023
  const [logs, setLogs] = useState([]);

  const user = localStorage.getItem("user");
  const userObj = JSON.parse(user);

  useEffect(() => {
    fetchLogData(toggleMonth);
  }, [toggleMonth]);

  const fetchLogData = async (month) => {
    //get events for the month and year
    try {
      const response = await UserService.getLog(userObj.id, toggleMonth, toggleYear);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setLogs(response.data);
  };

  const showMonthData = (index) => {
    setIsToggleMonth(index);
  };

  const showYearData = (id) => {
    setIsToggleYear(id);
  };

  const years = [2021, 2022, 2023];
  const months = Array.from({length: 12}, (_, i) => i + 1); // generates numbers 1-12

  const renderEvents = logs.length > 0 ? logs.map((event) => {
    return //react component for the logs
  }) : <p>You have no events planned for this month </p>; //if there is no events show this message.

  return (
    <div className={classes.familyLogTop}>
      <div className={classes.rowTop}>
        <div className={classes.left}>
          <img src={foot} alt="foot" />
        </div>
        <div className={classes.right}>
          <div className={classes.years}>
            {years.map(year => (
              <div
                onClick={() => {
                  showYearData(year);
                }}
                className={
                  toggleYear === year
                    ? `${classes.arrow} ${classes.arrowActive}`
                    : `${classes.arrow}`
                }
              >
                <p>{year}</p>
              </div>
            ))}
          </div>
          <img src={line} alt="line" />
          <div className={classes.months}>
            {months.map(month => (
              <span
                onClick={() => {
                  showMonthData(month);
                }}
                className={
                  toggleMonth === month
                    ? `${classes.tabs} ${classes.findActive}`
                    : `${classes.tabs}`
                }
              >
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={classes.details}>
        <div className={classes.addLog}>
          <Link to="/add-Log">
            <span>+</span>
          </Link>
        </div>
        {months.map((month) => (
          <div
            className={
              toggleMonth === month
                ? `${classes.data} ${classes.findActiveContent}`
                : `${classes.data}`
            }
          >
            {logs.map((log) => (
              <Card log={log} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyLog;