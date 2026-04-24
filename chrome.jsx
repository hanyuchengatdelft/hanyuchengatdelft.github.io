/* Shared WordPress-style chrome: admin bar, masthead, nav, sidebar, footer */

const { useState, useEffect, useMemo } = React;

function AdminBar() {
  return (
    <div className="wp-adminbar">
      <span className="logo">W</span>
      <span className="item">조선철도기록보관소</span>
      <span className="sep" />
      <span className="item">+ New</span>
      <span className="item">Edit Page</span>
      <span className="item">Customize</span>
      <span className="spacer" />
      <span className="item"><span className="dot" /> 3 updates</span>
      <span className="sep" />
      <span className="item">Howdy, archivist_kim</span>
    </div>
  );
}

function Masthead() {
  const d = new Date();
  const iso = "주체 " + (d.getFullYear() - 1911) + " (" + d.getFullYear() + ") · 4월 24일";
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <div className="mast-seal kr">鐵</div>
        <div className="mast-title">
          <h1 className="kr">조선민주주의인민공화국 철도기록보관소</h1>
          <div className="en">An Archive of the Railways of the Democratic People's Republic of Korea</div>
        </div>
        <div className="mast-meta">
          <div className="row"><b>VOL. XIV</b></div>
          <div className="row">ISSUE 04 · MMXXVI</div>
          <div className="row">{iso}</div>
          <div className="row">ISSN 2227·0041</div>
        </div>
      </div>
    </header>
  );
}

function PrimaryNav({ current, onNav }) {
  const items = [
    { id: "home",      en: "Home",           kr: "본원" },
    { id: "roster",    en: "Rolling Stock",  kr: "차량" },
    { id: "lines",     en: "Lines & Map",    kr: "선·지도" },
    { id: "stations",  en: "Stations",       kr: "역사" },
    { id: "article",   en: "Long Reads",     kr: "기사" },
    { id: "glossary",  en: "Glossary",       kr: "용어" }
  ];
  return (
    <nav className="primary-nav">
      <div className="primary-nav-inner">
        {items.map(it => (
          <a key={it.id}
             className={current === it.id ? "current" : ""}
             onClick={() => onNav(it.id)}>
            <span>{it.en}</span>
            <span className="kr">{it.kr}</span>
          </a>
        ))}
        <div className="search">⌕  search · 검색</div>
      </div>
    </nav>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="widget">
        <h4>Phrase of the day · 오늘의 말</h4>
        <div className="phrase-card">
          <div className="stamp">DEP'T OF LANG.</div>
          <div className="hangul">렬차가 들어옵니다</div>
          <div className="roman">RYŎLCH'A-GA TŬRŎ-OMNIDA</div>
          <div className="gloss">"The train is arriving." — standard platform announcement on mainline services.</div>
        </div>
      </div>

      <div className="widget">
        <h4>Recent posts · 새 기사</h4>
        <ul>
          {POSTS_RECENT.map((p, i) => (
            <li key={i}>
              <span className="date">{p.d}</span>
              {p.t}
              <span className="kr">{p.kr}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="widget">
        <h4>Categories · 분류</h4>
        <ul>
          {CATEGORIES.map((c, i) => (
            <li key={i}>
              <span className="date">{c.count}</span>
              {c.en}
              <span className="kr">{c.kr}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="widget">
        <h4>Tag cloud · 꼬리표</h4>
        <div className="tag-cloud">
          {TAGS.map(([t, s], i) => (
            <span key={i} className={"tag " + s}>{t}</span>
          ))}
        </div>
      </div>

      <div className="widget">
        <h4>Archive · 보관</h4>
        <div className="archive-list">
          {ARCHIVE_YEARS.map(([y, n], i) => (
            <div key={i} className="year">
              <span>{y} (주체 {+y - 1911})</span>
              <span className="count">{n} entries</span>
            </div>
          ))}
        </div>
      </div>

      <div className="widget">
        <h4>Meta</h4>
        <ul>
          <li>Log in / 로그인</li>
          <li>Entries feed / RSS</li>
          <li>Comments feed</li>
          <li>WordPress.org</li>
        </ul>
      </div>
    </aside>
  );
}

function Footer() {
  return (
    <footer className="site-foot">
      <div className="foot-inner">
        <div className="foot-col">
          <h5>About · 소개</h5>
          <p>
            The Archive is an illustrative, independent project documenting the
            locomotives, lines, stations, and language of rail transport on the
            Korean peninsula north of the 38th parallel. Content is for research
            and educational purposes.
            <span className="kr">본 기록보관소는 조선민주주의인민공화국 철도에 관한 자료를 수집·정리하는 독자적 연구 프로젝트이다.</span>
          </p>
        </div>
        <div className="foot-col">
          <h5>Sections</h5>
          <a>Rolling Stock</a>
          <a>Lines & Map</a>
          <a>Stations</a>
          <a>Long Reads</a>
          <a>Glossary</a>
        </div>
        <div className="foot-col">
          <h5>Resources</h5>
          <a>Timetable archive</a>
          <a>Photo archive</a>
          <a>Technical drawings</a>
          <a>Bibliography</a>
          <a>Submissions</a>
        </div>
        <div className="foot-col">
          <h5>Subscribe</h5>
          <a>Monthly bulletin</a>
          <a>RSS / Atom</a>
          <a>Contact the editor</a>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© MMXXVI — Archive of the Railways of the DPRK · 조선철도기록보관소</span>
        <span>Powered by WordPress · Theme: "Signalman" v2.4</span>
      </div>
    </footer>
  );
}

/* Striped archival image placeholder */
function Plate({ label, idCode, figure, className, tag, style }) {
  return (
    <div className={"plate " + (className || "")} style={style}>
      {idCode ? <div className="corner tl">{idCode}</div> : null}
      {figure ? <div className="corner tr">{figure}</div> : null}
      {tag ? <div className="corner br">{tag}</div> : null}
      <div className="label">{label || "image not digitised"}</div>
    </div>
  );
}

Object.assign(window, { AdminBar, Masthead, PrimaryNav, Sidebar, Footer, Plate });
