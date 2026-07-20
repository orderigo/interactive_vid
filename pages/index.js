import { useMemo, useState } from 'react';

const EVENT_NAME = 'ရန်ကုန်အနောက်ပိုင်းတက္ကသိုလ်';
const EVENT_SUBTITLE = '(၂၅) နှစ်မြောက်ငွေရတုအထိမ်းအမှတ်';
const START_YEAR = 2001;
const END_YEAR = 2026;

const imageThemes = [
  'linear-gradient(135deg, rgba(255, 223, 116, 0.9), rgba(255, 119, 168, 0.84))',
  'linear-gradient(135deg, rgba(74, 222, 255, 0.9), rgba(124, 92, 255, 0.84))',
  'linear-gradient(135deg, rgba(103, 255, 199, 0.9), rgba(28, 164, 255, 0.84))',
];

const createYearCards = () => {
  const cards = [[START_YEAR]];

  for (let year = START_YEAR + 1; year < END_YEAR; year += 3) {
    cards.push(
      Array.from({ length: Math.min(3, END_YEAR - year) }, (_, index) => year + index)
    );
  }

  cards.push([END_YEAR]);
  return cards;
};

function MemoryNodes() {
  const nodes = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        x: (index * 37) % 100,
        y: (index * 53) % 100,
        size: 6 + (index % 5) * 4,
        delay: -(index % 10) * 0.7,
        duration: 8 + (index % 6),
      })),
    []
  );

  return (
    <div className="memoryLayer" aria-hidden="true">
      <div className="memoryOrb memoryOrbOne" />
      <div className="memoryOrb memoryOrbTwo" />
      <div className="memoryGrid" />
      <svg className="memoryLines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M4 70 C20 48, 28 85, 45 55 S70 22, 96 40" />
        <path d="M8 28 C26 18, 34 42, 52 30 S78 8, 92 24" />
        <path d="M15 90 C30 70, 54 86, 72 62 S84 42, 98 58" />
      </svg>
      {nodes.map((node) => (
        <span
          className="memoryNode"
          key={node.id}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            animationDelay: `${node.delay}s`,
            animationDuration: `${node.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function YearImagePlaceholder({ year, index }) {
  return (
    <div className="imagePlaceholder" style={{ background: imageThemes[index % imageThemes.length] }}>
      <div className="placeholderGlow" />
      <div className="placeholderIcon">✦</div>
      <div className="placeholderText">Image Placeholder</div>
      <div className="placeholderYear">{year}</div>
    </div>
  );
}

function FireworkShow() {
  return (
    <div className="fireworkLayer" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <span
          className="firework"
          key={index}
          style={{
            left: `${8 + ((index * 13) % 86)}%`,
            top: `${10 + ((index * 17) % 58)}%`,
            animationDelay: `${index * 0.22}s`,
          }}
        />
      ))}
    </div>
  );
}

function YearCard({ years, isFinal }) {
  return (
    <section className={`yearCard ${isFinal ? 'finalCard' : ''}`}>
      {isFinal && <FireworkShow />}
      <div className="eventHeader">
        <p>{EVENT_NAME}</p>
        <span>{EVENT_SUBTITLE}</span>
      </div>
      <div className="cardContent">
        <div className="yearStack">
          {years.map((year) => (
            <h1 className="yearText" key={year}>{year}</h1>
          ))}
        </div>
        <div className={`placeholderGrid count${years.length}`}>
          {years.map((year, index) => (
            <YearImagePlaceholder key={year} year={year} index={index} />
          ))}
        </div>
      </div>
      {isFinal && <div className="finalMessage">Silver Jubilee Memories • 2001–2026</div>}
    </section>
  );
}

export default function Home() {
  const yearCards = useMemo(createYearCards, []);
  const [cardIndex, setCardIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const currentYears = yearCards[cardIndex];
  const isFinal = currentYears.includes(END_YEAR);

  const goToCard = (direction) => {
    setCardIndex((current) => Math.min(Math.max(current + direction, 0), yearCards.length - 1));
  };

  const handlePointerStart = (event) => {
    const point = event.touches ? event.touches[0] : event;
    setTouchStart({ x: point.clientX, y: point.clientY });
  };

  const handlePointerEnd = (event) => {
    if (!touchStart) return;
    const point = event.changedTouches ? event.changedTouches[0] : event;
    const deltaX = point.clientX - touchStart.x;
    const deltaY = point.clientY - touchStart.y;

    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
      goToCard(deltaX < 0 ? 1 : -1);
    }

    setTouchStart(null);
  };

  return (
    <main
      className="appShell"
      onTouchStart={handlePointerStart}
      onTouchEnd={handlePointerEnd}
      onMouseDown={handlePointerStart}
      onMouseUp={handlePointerEnd}
    >
      <MemoryNodes />
      <div className="cardTrack" style={{ transform: `translateX(-${cardIndex * 100}vw)` }}>
        {yearCards.map((years) => (
          <YearCard key={years.join('-')} years={years} isFinal={years.includes(END_YEAR)} />
        ))}
      </div>
      <div className="navigationHint">Swipe / drag left or right to move through memories</div>
      <div className="progressPill">{cardIndex + 1} / {yearCards.length}</div>
    </main>
  );
}
