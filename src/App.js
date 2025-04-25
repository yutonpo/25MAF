// App.js
import React from "react";
import MissionList from "./components/MissionList";
import Ranking from "./components/Ranking";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>チーム対抗街散策ゲーム</h1>
        <h2>25春 MAF</h2>
      </header>

      <section className="rules">
        <h2>ルール</h2>
        <ul>
          <li>1.ミッション達成の瞬間を撮影して送る</li>
          <li>2.写真にはチームメンバーが１人以上映ること！</li>
          <li>3.ミッションは原則として全員で取り組むこと！(一部例外あり)</li>
          <li>4.ミッションを達成できるのは先着１チームのみ</li>
          <li>5.17時半までにゴールへ向かうこと！</li>
        </ul>
      </section>

      <section className="missions">
        <h2>ミッション一覧</h2>
        <MissionList />
      </section>

      <section className="ranking-section">
        <Ranking />
      </section>
    </div>
  );
}

export default App;
