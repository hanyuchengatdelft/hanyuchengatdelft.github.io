/* Pages: Home, Roster, Lines/Map, Stations, Article, Glossary */

function HomePage({ onNav, onOpenLoco, onOpenArticle }) {
  return (
    <div className="page">
      <main>
        <div className="crumbs">
          <span>기록보관소</span><span className="sep">/</span>
          <span>Home</span><span className="sep">/</span>
          <span>Front Page</span>
        </div>

        <div className="section-head">
          <div className="title">
            <span className="kr">최신 기록 — 2026년 4월</span>
            <span className="en">From the Current Issue</span>
          </div>
          <div className="meta">
            <div>VOL. XIV · <b>NO. 04</b></div>
            <div>CURATED 24 · IV · MMXXVI</div>
          </div>
        </div>

        <article className="feature" onClick={() => onOpenArticle("red-flag-5100")}>
          <Plate idCode="PL-0001" figure="FIG. 1" tag="4:3" label="Locomotive portrait — Red Flag 5100 №5127, P'yŏngyang Main, 1981" />
          <div>
            <div className="cat">▲ Locomotives · Cover Feature</div>
            <h2>The Long Reign of the Red Flag 5100</h2>
            <span className="kr-sub">붉은기 5100호의 긴 재위 — 50년을 달려온 전기기관차의 초상</span>
            <p className="dek">
              Fifty-two years after the first 5100-series Bo′Bo′Bo′ rolled out of the
              Kim Chŏng-t'ae Works in Wŏnsan, the class remains the single most
              common sight at the head of a mainline train in the DPRK. An engineer's
              portrait, drawn from workshop records and the memory of a retired driver.
            </p>
            <div className="byline">
              <span>By <b>Pak Sŭng-u</b></span>
              <span>14 min read</span>
              <span>19 · IV · 2026</span>
            </div>
          </div>
        </article>

        <div className="section-head">
          <div className="title">
            <span className="kr">특집 기사</span>
            <span className="en">Departments</span>
          </div>
          <div className="meta"><div>THREE ENTRIES</div></div>
        </div>

        <div className="grid-3">
          {[
            { cat: "Infrastructure", title: "Third-rail to pantograph: converting the P'yŏngdŏk branch",
              kr: "평덕선 전화 방식 전환", meta: "12 min · 11 · IV · 2026", idCode: "PL-0102", fig: "FIG. 2" },
            { cat: "Operations", title: "Reading a DPRK timetable: abbreviations, notations, ghost trains",
              kr: "시간표 해독법", meta: "9 min · 03 · IV · 2026", idCode: "PL-0103", fig: "FIG. 3" },
            { cat: "Architecture", title: "The cantilever at Ch'ŏngjin Ch'ŏngnyŏn",
              kr: "청진청년역의 캔틸레버", meta: "6 min · 29 · III · 2026", idCode: "PL-0104", fig: "FIG. 4" }
          ].map((c, i) => (
            <div key={i} className="card" onClick={() => onOpenArticle("x" + i)}>
              <Plate idCode={c.idCode} figure={c.fig} tag="3:2" label={"Archival plate, " + c.title} />
              <div className="cat">▲ {c.cat}</div>
              <h3>{c.title}</h3>
              <span className="kr-sub">{c.kr}</span>
              <div className="meta">{c.meta}</div>
            </div>
          ))}
        </div>

        <div className="section-head">
          <div className="title">
            <span className="kr">차량 명부에서</span>
            <span className="en">From the Roster</span>
          </div>
          <div className="meta">
            <div><b>8</b> classes documented</div>
            <div><a onClick={() => onNav("roster")}>See all →</a></div>
          </div>
        </div>

        <div className="grid-2">
          {LOCOMOTIVES.slice(0, 4).map(l => (
            <div key={l.id} className="card" onClick={() => onOpenLoco(l.id)}>
              <Plate idCode={l.plate} figure={l.class} tag={l.type.split(" ")[0].toUpperCase()} label={l.name + " · works portrait, " + l.builder} />
              <div className="cat">▲ {l.type}</div>
              <h3>{l.name} <span style={{color:"var(--ink-3)", fontWeight:400}}>· {l.class}</span></h3>
              <span className="kr-sub">{l.kr} · {l.builderKr}</span>
              <div className="meta">BUILT {l.year} · {l.built} UNITS · {l.status.toUpperCase()}</div>
            </div>
          ))}
        </div>

        <div className="section-head">
          <div className="title">
            <span className="kr">선로 도표</span>
            <span className="en">Network at a Glance</span>
          </div>
          <div className="meta">
            <div><b>{LINES.length}</b> principal lines</div>
            <div><a onClick={() => onNav("lines")}>Open the map →</a></div>
          </div>
        </div>

        <div className="line-ledger">
          {LINES.map(l => (
            <div key={l.id} className="line-row" onClick={() => onNav("lines")}>
              <div className="swatch" style={{background: l.color}} />
              <div className="name">{l.name}<span className="kr">{l.kr}</span></div>
              <div className="stat"><b>{l.length}</b> km</div>
              <div className="stat"><b>{l.stations}</b> stations</div>
              <div className="stat">electrified {l.electrified}</div>
            </div>
          ))}
        </div>
      </main>
      <Sidebar />
    </div>
  );
}

/* =========================================
   ROSTER PAGE
   ========================================= */
function RosterPage({ onOpenLoco }) {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const chips = ["all", "electric", "diesel", "steam", "metro"];
  const filtered = LOCOMOTIVES.filter(l => {
    const okFilter = filter === "all" || l.tags.includes(filter);
    const okQ = !q || (l.name + l.class + l.kr).toLowerCase().includes(q.toLowerCase());
    return okFilter && okQ;
  });
  return (
    <div className="page">
      <main>
        <div className="crumbs">
          <span>기록보관소</span><span className="sep">/</span>
          <span>Catalogue</span><span className="sep">/</span>
          <span>Rolling Stock</span>
        </div>
        <div className="section-head">
          <div className="title">
            <span className="kr">차량 명부 · 기관차 및 동차</span>
            <span className="en">Rolling Stock Roster</span>
          </div>
          <div className="meta">
            <div>ENTRIES · <b>{filtered.length}</b> / {LOCOMOTIVES.length}</div>
            <div>LAST REVISED 19 · IV · MMXXVI</div>
          </div>
        </div>

        <p style={{color: "var(--ink-2)", maxWidth: 680, fontSize: "1.05rem", marginBottom: 6}}>
          A working catalogue of every class of motive power and multiple-unit
          stock currently or formerly in service on the national network.
          Each entry records builder, wheel arrangement, electrical
          characteristics where applicable, and the present disposition of
          surviving examples.
        </p>
        <p className="kr" style={{color:"var(--ink-3)", marginBottom: 18}}>
          본 명부는 조선민주주의인민공화국 철도의 기관차 및 동차의 형식별 기록이다.
        </p>

        <div className="filter-bar">
          <span className="label">Filter · 분류</span>
          {chips.map(c => (
            <span key={c} className={"chip " + (filter === c ? "active" : "")} onClick={() => setFilter(c)}>
              {c === "all" ? "All · 전부" : c}
            </span>
          ))}
          <div className="search">
            <span style={{color:"var(--ink-3)"}}>⌕</span>
            <input placeholder="search name or class" value={q} onChange={e => setQ(e.target.value)} />
          </div>
        </div>

        <div className="roster">
          {filtered.map(l => (
            <div key={l.id} className="entry" onClick={() => onOpenLoco(l.id)}>
              <Plate idCode={l.plate} figure={l.class.split(" ")[0]} label={l.name} />
              <div>
                <div className="class">{l.class}</div>
                <h4>{l.name}</h4>
                <div className="kr">{l.kr} · {l.typeKr}</div>
                <dl>
                  <dt>Built</dt><dd>{l.year} · {l.built}</dd>
                  <dt>Wheel</dt><dd>{l.wheel}</dd>
                  <dt>Power</dt><dd>{l.power}</dd>
                  <dt>Top</dt><dd>{l.top}</dd>
                  <dt>Status</dt><dd>{l.status}</dd>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Sidebar />
    </div>
  );
}

/* =========================================
   LINES / MAP PAGE
   ========================================= */
function LinesPage() {
  const [active, setActive] = useState(null);
  const [hidden, setHidden] = useState({});
  const toggle = (id) => setHidden(h => ({ ...h, [id]: !h[id] }));

  // Fictional simplified network coordinates, roughly oriented like a real map
  const NODES = {
    sinuiju:   { x: 110, y: 250, name: "Sinŭiju",     kr: "신의주",   lines: ["pyongui"] },
    anju:      { x: 210, y: 300, name: "Anju",         kr: "안주",     lines: ["pyongui", "pyongdok"] },
    pyongyang: { x: 310, y: 360, name: "P'yŏngyang",   kr: "평양",     lines: ["pyongui","pyongra","pyongbu","pyongdok"] },
    sariwon:   { x: 330, y: 430, name: "Sariwŏn",      kr: "사리원",   lines: ["pyongbu"] },
    kaesong:   { x: 330, y: 520, name: "Kaesŏng",      kr: "개성",     lines: ["pyongbu"] },
    wonsan:    { x: 510, y: 410, name: "Wŏnsan",       kr: "원산",     lines: ["pyongra","kangwon"] },
    koksan:    { x: 430, y: 440, name: "Koksan",       kr: "곡산",     lines: ["kangwon"] },
    hamhung:   { x: 590, y: 350, name: "Hamhŭng",      kr: "함흥",     lines: ["pyongra"] },
    kujang:    { x: 300, y: 280, name: "Kujang",       kr: "구장",     lines: ["pyongdok","manpo"] },
    manpo:     { x: 380, y: 190, name: "Manp'o",       kr: "만포",     lines: ["manpo"] },
    sunchon:   { x: 290, y: 320, name: "Sunch'ŏn",     kr: "순천",     lines: ["manpo","pyongdok"] },
    kimchaek:  { x: 690, y: 280, name: "Kimch'aek",    kr: "김책",     lines: ["pyongra","hambuk"] },
    chongjin:  { x: 770, y: 200, name: "Ch'ŏngjin",    kr: "청진",     lines: ["pyongra","hambuk"] },
    rason:     { x: 870, y: 130, name: "Rasŏn",        kr: "라선",     lines: ["pyongra","hambuk"] },
    tumangang: { x: 900, y: 100, name: "Tumangang",    kr: "두만강",   lines: ["hambuk"] }
  };

  const ROUTES = {
    pyongui:  ["sinuiju","anju","pyongyang"],
    pyongbu:  ["pyongyang","sariwon","kaesong"],
    pyongra:  ["pyongyang","wonsan","hamhung","kimchaek","chongjin","rason"],
    kangwon:  ["koksan","wonsan"],
    manpo:    ["sunchon","kujang","manpo"],
    hambuk:   ["chongjin","rason","tumangang","kimchaek"],
    pyongdok: ["pyongyang","sunchon","kujang","anju"]
  };

  const path = (ids) => {
    return ids.map((id, i) => {
      const n = NODES[id];
      return (i === 0 ? "M" : "L") + n.x + "," + n.y;
    }).join(" ");
  };

  const lineById = Object.fromEntries(LINES.map(l => [l.id, l]));

  return (
    <div className="page full">
      <div className="crumbs">
        <span>기록보관소</span><span className="sep">/</span>
        <span>Network</span><span className="sep">/</span>
        <span>Lines & Map</span>
      </div>
      <div className="section-head">
        <div className="title">
          <span className="kr">국가철도망 — 간략도</span>
          <span className="en">The National Network, in Schematic</span>
        </div>
        <div className="meta">
          <div>SCALE · <b>1 : 2,400,000</b> approx.</div>
          <div>COMPILED 2026</div>
        </div>
      </div>

      <p style={{color:"var(--ink-2)", maxWidth: 820, fontSize: "1.05rem"}}>
        The railway network of the DPRK totals roughly 5,250 route-kilometres,
        approximately 80 % of which is electrified at 3 kV DC. Seven trunk lines
        carry the bulk of traffic. The schematic below is a simplification —
        station positions are approximate and branch lines are omitted for
        clarity. Hover a station for its record; click a legend entry to hide a line.
      </p>

      <div className="map-wrap" style={{marginTop: 20}}>
        <svg viewBox="0 40 1000 560" preserveAspectRatio="xMidYMid meet">
          {/* graticule */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--rule)" strokeWidth="0.5" opacity="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="1000" height="600" fill="url(#grid)" />

          {/* subtle coastline suggestion */}
          <path d="M 40 560 Q 200 540 380 560 T 740 560 L 960 500 L 940 300 L 900 100 L 820 60 L 600 70 L 420 120 L 280 180 L 150 200 L 60 280 Z"
                fill="var(--paper-3)" opacity="0.4" stroke="var(--rule)" strokeDasharray="2 3" strokeWidth="0.6" />

          {/* lines */}
          {Object.entries(ROUTES).map(([id, ids]) => {
            if (hidden[id]) return null;
            return (
              <path key={id} d={path(ids)} className="line" stroke={lineById[id].color}
                    strokeLinecap="round" strokeLinejoin="round" />
            );
          })}

          {/* stations */}
          {Object.entries(NODES).map(([id, n]) => {
            const visible = n.lines.some(l => !hidden[l]);
            if (!visible) return null;
            return (
              <g key={id}>
                <circle className={"station-dot " + (active === id ? "active" : "")}
                        cx={n.x} cy={n.y} r="5"
                        onMouseEnter={() => setActive(id)}
                        onMouseLeave={() => setActive(null)} />
                <text className="station-label" x={n.x + 9} y={n.y - 7}>{n.name}</text>
                <text className="station-label" x={n.x + 9} y={n.y + 4} style={{fontFamily:"var(--serif-kr)", fontSize:9, opacity:0.75}}>{n.kr}</text>
              </g>
            );
          })}
        </svg>

        <div className="map-legend">
          <h5>Lines · 선</h5>
          {LINES.map(l => (
            <div key={l.id} className={"row " + (hidden[l.id] ? "muted" : "")} onClick={() => toggle(l.id)}>
              <span className="swatch" style={{background: l.color}} />
              <span>{l.name}</span>
            </div>
          ))}
        </div>
        <div className="map-compass">N ↑</div>
        <div className="map-scale"><span className="bar" /> 100 km</div>

        {active && (
          <div className="station-popover" style={{
            left: NODES[active].x * (1000/1000) * 0 + 24,
            top: 24
          }}>
            <h5>{NODES[active].name} Station</h5>
            <span className="kr">{NODES[active].kr}역</span>
            <dl>
              <dt>Lines</dt><dd>{NODES[active].lines.map(l => lineById[l].code).join(" · ")}</dd>
              <dt>Code</dt><dd>{active.toUpperCase().slice(0,4)}-{Math.floor((NODES[active].x + NODES[active].y))}</dd>
              <dt>Junction</dt><dd>{NODES[active].lines.length > 1 ? "Yes" : "No"}</dd>
            </dl>
          </div>
        )}
      </div>

      <div className="line-ledger">
        {LINES.map(l => (
          <div key={l.id} className={"line-row " + (hidden[l.id] ? "muted" : "")} onClick={() => toggle(l.id)}>
            <div className="swatch" style={{background: l.color}} />
            <div className="name">{l.name}<span className="kr">{l.kr} · {l.code}</span></div>
            <div className="stat"><b>{l.length}</b> km · <b>{l.stations}</b> st.</div>
            <div className="stat">opened <b>{l.opened}</b> · electrified <b>{l.electrified}</b></div>
            <div className="stat">{l.traffic}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================
   STATIONS PAGE
   ========================================= */
function StationsPage() {
  const [open, setOpen] = useState(null);
  return (
    <div className="page">
      <main>
        <div className="crumbs">
          <span>기록보관소</span><span className="sep">/</span>
          <span>Architecture</span><span className="sep">/</span>
          <span>Stations</span>
        </div>
        <div className="section-head">
          <div className="title">
            <span className="kr">역사 건축 — 선별된 사례</span>
            <span className="en">Stations, Selected</span>
          </div>
          <div className="meta"><div><b>{STATIONS_FEATURED.length}</b> profiles</div></div>
        </div>

        <p style={{color:"var(--ink-2)", maxWidth: 760, fontSize: "1.05rem", marginBottom: 30}}>
          Of the 614 stations on the national network, a handful occupy a
          distinctive place in the architectural record — for their scale, their
          liturgical function at national ceremonies, or the singular sweep of
          their platform canopies. Six are profiled below.
        </p>

        <div className="station-grid">
          {STATIONS_FEATURED.map(s => (
            <div key={s.id} className="station-card" onClick={() => setOpen(s)}>
              <Plate idCode={s.id.toUpperCase().slice(0,4)} figure="STATION" tag={s.arch.split(" ")[0].toUpperCase()} label={s.name + " · façade, principal elevation"} />
              <div className="body">
                <h3>{s.name}</h3>
                <span className="kr">{s.kr} · {s.archKr}</span>
                <div className="stats">
                  <div><b>{s.platforms}</b>platforms</div>
                  <div><b>{s.linesServed}</b>lines served</div>
                  <div><b>{s.built}</b>first built</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {open && (
          <div className="lightbox" onClick={() => setOpen(null)}>
            <div className="frame" onClick={e => e.stopPropagation()}>
              <span className="close" onClick={() => setOpen(null)}>✕ close · 닫기</span>
              <div className="crumbs" style={{marginBottom:10}}>
                <span>Stations</span><span className="sep">/</span><span>{open.name}</span>
              </div>
              <Plate idCode={open.id.toUpperCase()} figure="FIG. 1" tag="INTERIOR" label={open.name + " — principal concourse, looking north-east"} />
              <h3 style={{marginTop: 16}}>{open.name}</h3>
              <div className="kr" style={{fontFamily:"var(--serif-kr)", color:"var(--ink-3)", marginBottom: 14}}>{open.kr} · {open.archKr}</div>
              <table className="spec-table">
                <caption>Station record · 역사 기록</caption>
                <tbody>
                  <tr><th>First built · 준공</th><td>{open.built}</td></tr>
                  <tr><th>Rebuilt · 재건</th><td>{open.rebuilt}</td></tr>
                  <tr><th>Architectural style</th><td>{open.arch}</td></tr>
                  <tr><th>Platforms · 승강대 수</th><td>{open.platforms}</td></tr>
                  <tr><th>Lines served · 노선</th><td>{open.linesServed}</td></tr>
                  <tr><th>Floor area · 연면적</th><td>{open.area}</td></tr>
                </tbody>
              </table>
              <p>{open.note}</p>
            </div>
          </div>
        )}
      </main>
      <Sidebar />
    </div>
  );
}

/* =========================================
   SINGLE ARTICLE / LOCO DETAIL
   ========================================= */
function ArticlePage({ locoId }) {
  const loco = LOCOMOTIVES.find(l => l.id === locoId) || LOCOMOTIVES[1];
  return (
    <div className="page">
      <main>
        <article className="article">
          <div className="crumbs">
            <span>기록보관소</span><span className="sep">/</span>
            <span>Long Reads</span><span className="sep">/</span>
            <span>Locomotives</span>
          </div>

          <Plate className="hero" idCode={loco.plate} figure="FIG. 1" tag="PLATE I" label={loco.name + " №5127 · P'yŏngyang Main depot, summer 1981"} />
          <div className="hero-caption">
            <span className="fig-num">PLATE I</span>
            {loco.name} №5127 standing on shed at P'yŏngyang Main, 1981. Photograph from the archive of the late driver Ryŏ Man-sŏk.
          </div>

          <div style={{fontFamily:"var(--mono)", fontSize:11, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--accent)", marginBottom: 8}}>
            ▲ Cover feature · Locomotives
          </div>
          <h1>The Long Reign of the {loco.name}</h1>
          <span className="kr-title">{loco.kr}의 긴 재위 — {loco.builderKr}의 대표작</span>

          <div className="byline">
            <span>By <b>Pak Sŭng-u</b>, with <b>Ri Hyang-ok</b></span>
            <span>14 min read · 3,820 words</span>
            <span>Published <b>19 · IV · 2026</b></span>
            <span>Filed under <b>Locomotives · Electrification</b></span>
          </div>

          <p className="lede">
            Fifty-two years after the first {loco.name.split(" ")[0]} {loco.name.split(" ")[1] || ""} rolled out of the {loco.builder} in Wŏnsan,
            the class remains the single most common sight at the head of a
            mainline train in the DPRK. That longevity is not an accident of
            preservation; it is the result of a deliberate programme of rolling
            refits that, taken together, have kept a 1970s design credible
            against the gradients of the P'yŏngra Line into the middle of the
            twenty-first century.
          </p>

          <p>
            The original specification was straightforward. Six powered axles in
            a Bo′Bo′Bo′ arrangement, {loco.power} continuous at the rail, {loco.voltage}
            catenary, and a service weight of {loco.weight}. The class was
            conceived explicitly to replace the ageing {"<"}КРАСНЫЙ ФЛАГ 1{">"} on the
            heaviest coal drags out of the P'yŏngdŏk Line. What distinguishes
            the class in hindsight is less its original design than the
            willingness of the works to keep rebuilding it.
          </p>

          <h2>A history in three refits</h2>

          <p>
            The first refit — undertaken in 1988 — replaced the commutator-type
            traction motors with a Hungarian-licensed squirrel-cage design
            adapted to the existing gear ratios. The second, in 1997, introduced
            regenerative braking grids on the cab roof; the third, still
            underway, is swapping the original air compressors for
            screw-type units salvaged from decommissioned M62s.
          </p>

          <blockquote>
            "You can drive a {loco.name.split(" ")[0]} for a month without using the
            brake valve below fifty," the retired driver Ryŏ Man-sŏk remarked in
            1998. "The mountain gives it all back."
          </blockquote>

          <figure>
            <Plate idCode="PL-0127" figure="FIG. 2" tag="WORKS DRAWING" label="General arrangement, Bo′Bo′Bo′ bogie frame — Kim Chŏng-t'ae Works, drawing sheet 14/44" />
            <figcaption><span className="fig-num">FIG. 2</span>Sheet 14/44 of the original works drawing set, reproduced with permission of the Wŏnsan archive.</figcaption>
          </figure>

          <h2>Technical record</h2>

          <table className="spec-table">
            <caption>Class {loco.class} — consolidated data · 형식 {loco.class} 제원</caption>
            <tbody>
              <tr><th>Designation · 형식</th><td>{loco.class} ({loco.kr})</td></tr>
              <tr><th>Type · 종류</th><td>{loco.type} · {loco.typeKr}</td></tr>
              <tr><th>Builder · 제작소</th><td>{loco.builder}</td></tr>
              <tr><th>First built · 초년</th><td>{loco.year}</td></tr>
              <tr><th>Units built · 제작량</th><td>{loco.built}</td></tr>
              <tr><th>Wheel arrangement · 차축배열</th><td>{loco.wheel}</td></tr>
              <tr><th>Track gauge · 궤도</th><td>{loco.gauge}</td></tr>
              <tr><th>Supply voltage · 전압</th><td>{loco.voltage}</td></tr>
              <tr><th>Continuous power · 연속출력</th><td>{loco.power}</td></tr>
              <tr><th>Service weight · 운전정비 중량</th><td>{loco.weight}</td></tr>
              <tr><th>Maximum service speed · 최고운전속도</th><td>{loco.top}</td></tr>
              <tr><th>Current status · 현재 상태</th><td>{loco.status}</td></tr>
            </tbody>
          </table>

          <h2>Operating territory</h2>
          <p>
            {loco.dek} In service today, examples of the class can be seen across
            the electrified network, but the class finds its natural habitat on
            the eastward grind from Kŏch'ang up to the Puraksan tunnels, where
            the combination of six powered axles and full-height dynamic braking
            earns its keep on both the climb and the descent.
          </p>

          <figure>
            <Plate idCode="PL-0203" figure="FIG. 3" tag="FIELD PHOTO" label="Loaded anthracite train at Puraksan summit, 07:40, February — note snow on catenary arms" />
            <figcaption><span className="fig-num">FIG. 3</span>Loaded anthracite train at Puraksan summit, 07:40, February.</figcaption>
          </figure>

          <h2>A note on sources</h2>
          <p>
            This article draws on the class registers held at the Wŏnsan works
            archive; interviews with two retired locomotive engineers; and a
            working spreadsheet maintained informally by the staff of the
            P'yŏngra Line motive-power depot at Hamhŭng. Where figures
            disagree, the works archive is preferred. All inaccuracies are the
            author's.
          </p>

          <div style={{borderTop: "1px solid var(--rule)", marginTop: 40, paddingTop: 20, fontFamily:"var(--mono)", fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", color: "var(--ink-3)"}}>
            <div style={{marginBottom: 6}}>Filed under · <span style={{color:"var(--ink)"}}>Locomotives · {loco.tags.join(" · ")}</span></div>
            <div>Citation · Pak, S. "The Long Reign of the {loco.name}." <i>Archive of the Railways of the DPRK</i>, XIV.4 (2026).</div>
          </div>
        </article>
      </main>
      <Sidebar />
    </div>
  );
}

/* =========================================
   GLOSSARY PAGE
   ========================================= */
function GlossaryPage() {
  return (
    <div className="page">
      <main>
        <div className="crumbs">
          <span>기록보관소</span><span className="sep">/</span>
          <span>Reference</span><span className="sep">/</span>
          <span>Glossary</span>
        </div>
        <div className="section-head">
          <div className="title">
            <span className="kr">조선말 철도 용어</span>
            <span className="en">Korean Railway Vocabulary</span>
          </div>
          <div className="meta"><div><b>{GLOSSARY.length}</b> terms</div><div>McCune–Reischauer</div></div>
        </div>

        <p style={{color:"var(--ink-2)", maxWidth: 720, fontSize:"1.05rem", marginBottom: 26}}>
          A working glossary of the Korean vocabulary of rail transport, with
          Chinese-character etymology (한자) where it clarifies meaning. Spellings
          and preferred usages follow contemporary DPRK orthography; divergences
          from the Southern standard are noted.
        </p>

        <div className="glossary">
          {GLOSSARY.map((g, i) => (
            <div key={i} className="gloss-term">
              {g.hanja && <span className="hanja">{g.hanja}</span>}
              <div className="hangul">{g.hangul}</div>
              <div className="roman">{g.roman}</div>
              <div className="en">{g.en}</div>
              {g.note && <div className="note">— {g.note}</div>}
            </div>
          ))}
        </div>
      </main>
      <Sidebar />
    </div>
  );
}

Object.assign(window, { HomePage, RosterPage, LinesPage, StationsPage, ArticlePage, GlossaryPage });
