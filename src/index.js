import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const baseHtml = document.querySelector(".spreadsheets--item.js-base");
const spreadsheets = document.querySelector(".spreadsheets");
const apiURL = "Googleスプレッドシートのコードを入力してください";

async function loadData() {
  const response = await fetch(apiURL);
  const data = await response.json();
}

// ---- コンポーネント定義 ----

// タイトル
const Title = () => (
  <div className="title-section">
    <div className="title-main">チーム対抗街散策ゲーム</div>
    <div className="title-sub">25春 MAF</div>
  </div>
);

// ルール
const Rules = () => {
  const rules = [
    "1.ミッション達成の瞬間を撮影して送る！",
    "2.写真にはチームメンバーが１人以上映ること！",
    "3.ミッションは原則として全員で取り組むこと！（一部例外あり）",
    "4.ミッションを達成できるのは先着１チームのみ",
    "5.17時半までにゴールへ向かうこと！",
  ];

  return (
    <div className="rules-section">
      {rules.map((rule, index) => (
        <div key={index} className="rule-box">
          {rule}
        </div>
      ))}
    </div>
  );
};

// ミッションカード
const MissionCard = ({ genre, score, text, completed }) => (
  <div
    className={`mission-card ${
      completed === "TRUE" ? "mission-done" : "mission-pending"
    }`}
  >
    <div className="mission-genre">{genre}</div>
    <div className="mission-score">{score}点</div>
    <div className="mission-text">{text}</div>
  </div>
);

// ランキングカード
const RankingCard = ({ rank, team, score }) => (
  <div className="rank-box">
    <div className="rank-title">
      {rank}位 {team}
    </div>
    <div className="rank-score">{score}点</div>
  </div>
);

// ---- メインアプリケーション ----

const App = () => {
  const [missions, setMissions] = useState([]);
  const [ranking, setRanking] = useState([]);

  // ミッション情報の取得
  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbxHpI-Ydq7-sEb1npKHDVkNbq05s-DHCLxTaWdbGWiPE3BKBFK_RdngAoNjo33lW1SP/exec"
    )
      .then((res) => res.json())
      .then((data) => setMissions(data));
  }, []);

  // ランキング情報の取得
  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbwoQEmxgX7SObzmKGOkEJq9nbjZLrWfRP_gddPMKMC3WQ-c_NMgmOPLn7smZE683E0Y/exec"
    )
      .then((res) => res.json())
      .then((data) => setRanking(data));
  }, []);

  // ミッションを12個ずつのページに分ける
  const missionPages = [];
  for (let i = 0; i < missions.length; i += 12) {
    missionPages.push(missions.slice(i, i + 12));
  }

  const responsive = {
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="p-4 space-y-6">
      <Title />
      <Rules />

      <h2 className="text-xl font-bold mt-4">ミッション</h2>
      <div className="carousel-container">
        <Carousel
          responsive={responsive}
          arrows={true}
          swipeable
          draggable
          showDots={true}
        >
          {missionPages.map((group, idx) => (
            <div key={idx} className="grid grid-cols-3 gap-2 px-2">
              {group.map((m, i) => (
                <MissionCard
                  key={i}
                  genre={m.genre}
                  score={m.score}
                  text={m.text}
                  completed={m.completed}
                />
              ))}
            </div>
          ))}
        </Carousel>
      </div>

      <h2 className="text-xl font-bold mt-4">ランキング</h2>
      <div className="ranking-section">
        {ranking.slice(0, 4).map((team, i) => (
          <RankingCard
            key={i}
            rank={i + 1}
            team={team.name}
            score={team.score}
          />
        ))}
      </div>
    </div>
  );
};

// React v18でのマウント方法
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
