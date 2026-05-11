import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <style>{`
        :root {
          --bg: linear-gradient(160deg, #dfe5f1 0%, #d2d9e8 100%);
          --nav-bg: #050b17;
          --nav-border: #0d2349;
          --text: #fff;
          --accent: #1f4fff;
          --accent-deep: #0d255a;
          --table-header: #070f1f;
        }

        * { box-sizing: border-box; }

        body {
          margin: 0;
          background: var(--bg);
          color: #101010;
          font-family: "Barlow Condensed", Arial, sans-serif;
        }

        .topbar {
          background: linear-gradient(180deg, #020611 0%, var(--nav-bg) 100%);
          color: var(--text);
          min-height: 68px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 2px solid var(--nav-border);
          box-shadow: 0 8px 24px rgba(6, 18, 40, 0.35);
        }

        .topbar-inner {
          width: min(1600px, 95%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .brand {
          font-weight: 800;
          line-height: 0.9;
          font-size: 24px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: white;
          text-decoration: none;
        }

        .brand small {
          display: block;
          font-size: 16px;
          color: #9eb8ea;
        }

        .menu {
          display: flex;
          flex-wrap: wrap;
          gap: 22px;
          font-size: 34px;
          text-transform: uppercase;
          font-weight: 700;
        }

        .menu a {
          color: white;
          text-decoration: none;
          opacity: .92;
        }

        .menu a.active {
          color: #6ea0ff;
          text-shadow: 0 0 14px rgba(79, 128, 255, .45);
        }

        .container {
          width: min(1600px, 83%);
          margin: 70px auto 50px;
          background: linear-gradient(160deg, rgba(255, 255, 255, 0.62), rgba(224, 232, 247, 0.56));
          border: 1px solid rgba(21, 44, 90, 0.18);
          border-radius: 14px;
          padding: 32px 30px 26px;
          box-shadow: 0 16px 40px rgba(13, 37, 90, 0.16);
        }

        .headline-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        h1 {
          margin: 0;
          font-size: clamp(40px, 4vw, 66px);
          text-transform: uppercase;
          letter-spacing: .5px;
          color: var(--accent-deep);
        }

        .season-select {
          border: 2px solid var(--accent);
          color: var(--accent-deep);
          padding: 10px 18px;
          min-width: 170px;
          text-transform: uppercase;
          font-size: 34px;
          font-weight: 700;
          background: linear-gradient(180deg, #f9fbff 0%, #deebff 100%);
        }

        .tabs {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          margin-top: 32px;
          border-bottom: 3px solid var(--accent);
        }

        .tab {
          padding: 14px 20px;
          font-size: 36px;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--accent-deep);
        }

        .tab.active {
          background: linear-gradient(180deg, #2f68ff 0%, #1d47cb 100%);
          color: #fff;
        }

        table {
          width: 100%;
          margin-top: 36px;
          border-collapse: collapse;
          background: #ebeff7;
          border: 1px solid rgba(10, 29, 64, 0.18);
        }

        thead {
          background: var(--table-header);
          color: #fff;
        }

        th, td {
          padding: 14px 16px;
          font-size: 34px;
          text-align: left;
        }

        tbody tr {
          border-bottom: 1px solid #c7d1e6;
        }

        tbody tr:nth-child(even) {
          background: #e0e8f8;
        }

        tbody tr:hover {
          background: #cfdcf8;
        }

        tbody td:first-child {
          font-weight: 700;
          text-align: center;
          width: 70px;
          color: var(--accent-deep);
        }

        .team-cell {
          font-weight: 600;
          color: #081838;
        }
      `}</style>

      <header className="topbar">
        <div className="topbar-inner">
          <Link className="brand" href="/">
            <small>GRIFBALL</small> WORLD LEAGUE
          </Link>

          <nav className="menu">
            <Link href="/" className="active">Standings</Link>
            <Link href="/schedule">Schedule</Link>
            <Link href="/teams">Teams</Link>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <div className="headline-row">
          <h1>GWL Points Standings</h1>
          <div className="season-select">2026 Season ▾</div>
        </div>

        <div className="tabs">
          <div className="tab active">Regular Season</div>
          <div className="tab">Summer Major I</div>
          <div className="tab">Fall Major II</div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Rank</th><th>Team</th><th>GWL Points</th><th>EP</th><th>MW</th><th>ML</th><th>MW%</th><th>GW</th><th>GL</th><th>GW%</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td className="team-cell">Zero Logic</td><td>385</td><td>0</td><td>31</td><td>16</td><td>66%</td><td>112</td><td>81</td><td>58%</td></tr>
            <tr><td>2</td><td className="team-cell">Operation: Doomsday</td><td>320</td><td>0</td><td>30</td><td>15</td><td>66.7%</td><td>101</td><td>76</td><td>57.1%</td></tr>
            <tr><td>3</td><td className="team-cell">Turquoise Jeep</td><td>320</td><td>0</td><td>31</td><td>17</td><td>64.6%</td><td>112</td><td>77</td><td>59.3%</td></tr>
            <tr><td>4</td><td className="team-cell">Paradox Warriors</td><td>305</td><td>0</td><td>27</td><td>17</td><td>61.4%</td><td>105</td><td>73</td><td>59%</td></tr>
            <tr><td>5</td><td className="team-cell">Like Clockwork</td><td>285</td><td>0</td><td>27</td><td>19</td><td>58.7%</td><td>103</td><td>75</td><td>57.9%</td></tr>
            <tr><td>6</td><td className="team-cell">Cloud9 Ascension</td><td>220</td><td>0</td><td>19</td><td>23</td><td>45.2%</td><td>76</td><td>86</td><td>46.9%</td></tr>
            <tr><td>7</td><td className="team-cell">Junkyard Dogs</td><td>190</td><td>0</td><td>18</td><td>20</td><td>47.4%</td><td>80</td><td>75</td><td>51.6%</td></tr>
            <tr><td>8</td><td className="team-cell">Easy As Pie</td><td>190</td><td>0</td><td>18</td><td>21</td><td>46.2%</td><td>75</td><td>80</td><td>48.4%</td></tr>
            <tr><td>9</td><td className="team-cell">The Black List</td><td>170</td><td>0</td><td>18</td><td>21</td><td>46.2%</td><td>73</td><td>89</td><td>45.1%</td></tr>
            <tr><td>10</td><td className="team-cell">Hybrid Theory</td><td>130</td><td>0</td><td>13</td><td>24</td><td>35.1%</td><td>54</td><td>89</td><td>37.8%</td></tr>
          </tbody>
        </table>
      </main>
    </>
  );
}