import Image from 'next/image';
import { useMemo, useState } from 'react';

const EVENT_NAME = 'ရန်ကုန်အနောက်ပိုင်းတက္ကသိုလ်';
const EVENT_SUBTITLE = '(၂၅) နှစ်မြောက်ငွေရတုအခမ်းအနား';
const FINAL_TITLE = 'ရန်ကုန်အနောက်ပိုင်းတက္ကသိုလ် (၂၅) နှစ်မြောက်ငွေရတုအခမ်းအနား';
const END_YEAR = 2026;

const slideImages = [
  '/img/Screenshot_20260721-101836.png',
  '/img/Screenshot_20260721-101925.png',
  '/img/Screenshot_20260721-102147.png',
  '/img/Screenshot_20260721-103154.png',
  '/img/Screenshot_20260721-105110.png',
];

const slides = [
  {
    year: 2001,
    image: slideImages[0],
    title: 'ကျောင်းအမှတ်တရအစ',
    caption: 'ကျောင်းဓာတ်ပုံကို အကြမ်းထည် placeholder မှာ ထည့်သွင်းပြသထားသည်။',
    time: '0:00 - 0:06',
  },
  {
    year: 2002,
    image: slideImages[1],
    title: 'စာသင်ခန်းနှင့် ကျောင်းလှုပ်ရှားမှု',
    caption: 'လက်ညှိုးဖြင့် ဘယ်ဘက်သို့ ဆွဲလျှင် နောက်နှစ်အမှတ်တရသို့ ပြောင်းပါသည်။',
    time: '0:06 - 0:09',
  },
  {
    year: 2005,
    image: slideImages[2],
    title: 'နှစ်ပတ်လည် / ပညာရေးပွဲ',
    caption: 'တေးဂီတသာဖြင့် အမှတ်တရပုံရိပ်ကို အလင်းတန်းနှင့် ပြသထားသည်။',
    time: '0:09 - 0:12',
  },
  {
    year: 2010,
    image: slideImages[3],
    title: 'ကျောင်းဝန်းကျင်နှင့် စုပေါင်းအမှတ်တရ',
    caption: 'ကျောင်းဝန်းကျင် ရှုခင်း သို့မဟုတ် ဆရာ/ကျောင်းသား စုပေါင်းဓာတ်ပုံနေရာ။',
    time: '0:12 - 0:15',
  },
  {
    year: 2015,
    image: slideImages[4],
    title: 'ဘွဲ့နှင်းသဘင် / Field Trip',
    caption: 'စည်းချက်ပိုတက်လာသော အခန်းကဏ္ဍအတွက် အမှတ်တရဓာတ်ပုံ။',
    time: '0:15 - 0:18',
  },
  {
    year: 2020,
    image: slideImages[0],
    title: 'Online Class / Mask အမှတ်တရ',
    caption: 'COVID-19 ကာလအတွင်း လေ့လာသင်ယူမှုများကို ပြန်လည်မြင်တွေ့စေသည်။',
    time: '0:18 - 0:21',
  },
  {
    year: 2024,
    image: slideImages[1],
    title: 'ပြန်လည်လှုပ်ရှားလာသော ကျောင်းဘဝ',
    caption: 'စာကြည့်တိုက်၊ အားကစားပြိုင်ပွဲနှင့် မကြာသေးမီက လှုပ်ရှားမှုများ။',
    time: '0:21 - 0:24',
  },
  {
    year: END_YEAR,
    isFinal: true,
    time: '0:24 - 0:30',
  },
];

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

function TimelinePhoto({ slide }) {
  return (
    <figure className="timelinePhoto">
      <Image src={slide.image} alt={`${slide.year} ${slide.title}`} fill sizes="(max-width: 820px) 88vw, 48vw" priority draggable="false" />
      <figcaption>
        <span>{slide.time}</span>
        {slide.caption}
      </figcaption>
    </figure>
  );
}

function FireworkShow() {
  return (
    <div className="fireworkLayer" aria-hidden="true">
      {Array.from({ length: 20 }, (_, index) => (
        <span
          className={`firework firework${index % 4}`}
          key={index}
          style={{
            left: `${6 + ((index * 11) % 88)}%`,
            top: `${8 + ((index * 19) % 62)}%`,
            animationDelay: `${index * 0.16}s`,
          }}
        />
      ))}
      {Array.from({ length: 10 }, (_, index) => (
        <span
          className="rocketTrail"
          key={`trail-${index}`}
          style={{
            left: `${10 + index * 9}%`,
            animationDelay: `${index * 0.24}s`,
          }}
        />
      ))}
    </div>
  );
}

function YearCard({ slide }) {
  if (slide.isFinal) {
    return (
      <section className="yearCard finalCard">
        <FireworkShow />
        <div className="eventHeader finalHeader">
          <p>{EVENT_NAME}</p>
          <span>{EVENT_SUBTITLE}</span>
        </div>
        <div className="finalContent">
          <div className="finalYear">2026</div>
          <h1>{FINAL_TITLE}</h1>
          <p>Ta-Da • အောင်ပွဲခံတေးဂီတ • Gold & Silver Fireworks</p>
        </div>
      </section>
    );
  }

  return (
    <section className="yearCard">
      <div className="eventHeader">
        <p>{EVENT_NAME}</p>
        <span>{EVENT_SUBTITLE}</span>
      </div>
      <div className="cardContent">
        <div className="yearStack">
          <span className="slideTime">{slide.time}</span>
          <h1 className="yearText">{slide.year}</h1>
          <h2>{slide.title}</h2>
        </div>
        <TimelinePhoto slide={slide} />
      </div>
    </section>
  );
}

export default function Home() {
  const [cardIndex, setCardIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const goToCard = (direction) => {
    setCardIndex((current) => Math.min(Math.max(current + direction, 0), slides.length - 1));
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
        {slides.map((slide) => (
          <YearCard key={slide.year} slide={slide} />
        ))}
      </div>
      <div className="navigationHint">Swipe / drag left or right • APK/PWA install ပြီး offline ကြည့်နိုင်သည်</div>
      <div className="progressPill">{cardIndex + 1} / {slides.length}</div>
    </main>
  );
}
