import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";


import styles from '@/styles/Countdown.module.css';

const CountdownTimer = () => {

  // const deadline = new Date(
  //   '2023-11-15').toISOString()

  return (
    <div className={styles.countdownContainer}>
      <Countdown date={'2023-11-15'} />
    </div>
  );
};

export default CountdownTimer;