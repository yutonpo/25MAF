// components/MissionCard.js
import React from "react";

const MissionCard = ({ type, mission, pont, team }) => {
  if ((team = "")) {
    return (
      <div className="mission-card">
        <h3>{type}</h3>
        <p>{mission}</p>
        <p>得点: {pont}</p>
      </div>
    );
  } else if (team != "") {
    return (
      <div className="confirmed">
        <h3>{type}</h3>
        <p>{mission}</p>
        <p>得点: {pont}</p>
      </div>
    );
  }
};

export default MissionCard;
