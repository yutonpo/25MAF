// components/Ranking.js
import React, { useEffect, useState } from "react";

const Ranking = () => {
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbwoQEmxgX7SObzmKGOkEJq9nbjZLrWfRP_gddPMKMC3WQ-c_NMgmOPLn7smZE683E0Y/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => a.rank - b.rank);
        setRanks(sorted.slice(0, 4)); // 上位4位まで
      });
  }, []);

  return (
    <div className="ranking">
      <h2>ランキング</h2>
      <ul>
        {ranks.map((r, i) => (
          <li key={i}>
            {r.rank}位 - チーム{r.team}（{r.pint}点）
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
