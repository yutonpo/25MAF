// components/MissionList.js
import React, { useEffect, useState } from "react";
import MissionCard from "./MissionCard";

const MissionList = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbxHpI-Ydq7-sEb1npKHDVkNbq05s-DHCLxTaWdbGWiPE3BKBFK_RdngAoNjo33lW1SP/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        // 空データ排除
        const filtered = data.filter((m) => m.type && m.mission && m.pint);
        setMissions(filtered);
      });
  }, []);

  const chunkedMissions = [];
  for (let i = 0; i < missions.length; i += 12) {
    chunkedMissions.push(missions.slice(i, i + 12));
  }

  return (
    <div className="mission-carousel">
      {chunkedMissions.map((group, idx) => (
        <div className="mission-group" key={idx}>
          {group.map((m, i) => (
            <MissionCard key={i} {...m} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MissionList;
