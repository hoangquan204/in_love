import React, { useState, useEffect, useRef } from "react";

const LovePage = () => {
  const startDate = new Date("2025-07-24");
  const [daysTogether, setDaysTogether] = useState(0);
  const [openModal, setOpenModal] = useState(null);
  const [hearts, setHearts] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const updateDays = () => {
      const today = new Date();
      const diffTime = Math.abs(today - startDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setDaysTogether(diffDays);
    };
    updateDays();
    const timer = setInterval(updateDays, 86400000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-12),
        {
          id: Date.now(),
          left: Math.random() * 100,
          duration: 4 + Math.random() * 4,
          size: 10 + Math.random() * 16,
          delay: Math.random() * 2,
        },
      ]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const milestones = [
    {
      label: "Tìm hiểu nhau",
      date: "12/06/2025",
      icon: "🌸",
      desc: "Lần đầu gặp gỡ và những tin nhắn đầu tiên",
    },
    {
      label: "Bắt đầu yêu",
      date: "24/07/2025",
      icon: "💕",
      desc: "Chính thức trở thành của nhau",
    },
    {
      label: "Kỷ niệm 100 ngày",
      date: "01/11/2025",
      icon: "🌙",
      desc: "Trăm ngày bên nhau ngọt ngào",
    },
  ];

  const people = {
    A: {
      name: "Quân",
      img: "https://res.cloudinary.com/dxfjbuybf/image/upload/v1761971931/z7177555632127_9ddb521e5e6d6de048360b09fe0e9c76_ffbzdv.jpg",
      sign: "Sư Tử ♌",
      birthday: "08 / 08 / 2004",
      color: "#f9a8d4",
      role: "Người yêu của em",
    },
    B: {
      name: "Phương",
      img: "https://res.cloudinary.com/dxfjbuybf/image/upload/v1761971931/z7177555636434_8b278565221e0ef024e171170ddf618c_lmrjjw.jpg",
      sign: "Bạch Dương ♈",
      birthday: "29 / 03 / 2004",
      color: "#c4b5fd",
      role: "Người yêu của anh",
    },
  };

  const circumference = 2 * Math.PI * 54;
  const progress = Math.min(daysTogether / 100, 1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Nunito:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .love-root {
          min-height: 100vh;
          background: #0d0610;
          font-family: 'Nunito', sans-serif;
          color: #f0e6f6;
          overflow-x: hidden;
          position: relative;
        }

        .starfield {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(ellipse at 20% 20%, rgba(180,100,220,0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, rgba(240,80,130,0.10) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 50%, rgba(80,20,120,0.15) 0%, transparent 70%);
        }

        .star {
          position: absolute;
          border-radius: 50%;
          background: white;
          animation: twinkle var(--d, 3s) ease-in-out infinite alternate;
          opacity: 0;
        }
        @keyframes twinkle {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: var(--op, 0.7); transform: scale(1.2); }
        }

        .floating-heart {
          position: fixed;
          bottom: -20px;
          font-size: var(--size, 14px);
          animation: floatUp var(--dur, 6s) var(--delay, 0s) ease-in forwards;
          pointer-events: none;
          z-index: 1;
          opacity: 0.6;
        }
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-40vh) rotate(20deg); opacity: 0.5; }
          100% { transform: translateY(-100vh) rotate(-10deg); opacity: 0; }
        }

        .section { position: relative; z-index: 2; }

        /* Hero */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 1.5rem;
          position: relative;
        }

        .hero-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1rem;
          letter-spacing: 0.35em;
          color: #c084fc;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          animation: fadeInDown 1s ease both;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 10vw, 7rem);
          font-weight: 300;
          line-height: 1;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #fce7f3 0%, #e879f9 40%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeInUp 1s 0.3s ease both;
        }

        .hero-amp {
          font-style: italic;
          font-size: 0.6em;
          opacity: 0.7;
        }

        .hero-divider {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e879f9, transparent);
          margin: 2rem auto;
          animation: scaleIn 1s 0.6s ease both;
        }

        .hero-names {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 3rem;
          animation: fadeInUp 1s 0.7s ease both;
        }
        .hero-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 400;
          color: #fce7f3;
          letter-spacing: 0.05em;
        }
        .hero-heart-icon {
          font-size: 1.2rem;
          animation: heartbeat 1.4s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.25); }
          28% { transform: scale(1); }
          42% { transform: scale(1.15); }
          70% { transform: scale(1); }
        }

        /* Profiles */
        .profiles-section {
          padding: 5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .section-label {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.9rem;
          letter-spacing: 0.3em;
          color: #c084fc;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 300;
          color: #fce7f3;
          margin-bottom: 3rem;
          text-align: center;
        }

        .profiles-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 2rem;
          width: 100%;
          max-width: 780px;
        }

        .profile-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(233,121,249,0.2);
          border-radius: 24px;
          padding: 2rem 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }
        .profile-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(233,121,249,0.08), rgba(244,114,182,0.05));
          opacity: 0;
          transition: opacity 0.3s;
          border-radius: inherit;
        }
        .profile-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(233,121,249,0.5);
          box-shadow: 0 20px 60px rgba(233,121,249,0.15);
        }
        .profile-card:hover::before { opacity: 1; }

        .profile-img-wrap {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 1.25rem;
        }
        .profile-img-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e879f9, #f472b6, #e879f9);
          animation: spinRing 6s linear infinite;
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .profile-img-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #0d0610;
        }
        .profile-img-inner img {
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .profile-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 400;
          color: #fce7f3;
          margin-bottom: 0.25rem;
        }
        .profile-role {
          font-size: 0.75rem;
          color: #c084fc;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .profile-detail {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 1rem;
          margin-top: 1rem;
          font-size: 0.8rem;
          color: rgba(240,230,246,0.6);
        }
        .profile-detail span:last-child { color: #f0e6f6; font-weight: 500; }

        .profiles-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .center-heart {
          font-size: 2.5rem;
          animation: heartbeat 1.4s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(244,114,182,0.6));
        }
        .center-since {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.85rem;
          color: rgba(240,230,246,0.5);
          text-align: center;
          line-height: 1.5;
        }

        /* Counter */
        .counter-section {
          padding: 5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .counter-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(233,121,249,0.15);
          border-radius: 32px;
          padding: 3rem 2.5rem;
          text-align: center;
          width: 100%;
          max-width: 480px;
          position: relative;
          overflow: hidden;
        }
        .counter-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(transparent, rgba(233,121,249,0.04), transparent 30%);
          animation: rotateBg 8s linear infinite;
          pointer-events: none;
        }
        @keyframes rotateBg {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .counter-ring-wrap {
          position: relative;
          width: 160px;
          height: 160px;
          margin: 1.5rem auto;
        }
        .counter-ring-wrap svg { transform: rotate(-90deg); }
        .counter-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .counter-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.5rem;
          font-weight: 300;
          line-height: 1;
          background: linear-gradient(135deg, #fce7f3, #e879f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .counter-unit {
          font-size: 0.75rem;
          color: rgba(240,230,246,0.5);
          letter-spacing: 0.1em;
          margin-top: 2px;
        }

        .counter-stats {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 1.5rem;
        }
        .stat-item { text-align: center; }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          font-weight: 400;
          color: #f472b6;
        }
        .stat-label {
          font-size: 0.7rem;
          color: rgba(240,230,246,0.45);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Video */
        .video-section {
          padding: 3rem 1.5rem 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .video-frame {
          width: 100%;
          max-width: 800px;
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(233,121,249,0.2);
          box-shadow: 0 40px 100px rgba(0,0,0,0.5), 0 0 60px rgba(233,121,249,0.1);
        }
        .video-frame video {
          width: 100%;
          height: 420px;
          object-fit: cover;
          display: block;
        }
        .video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(13,6,16,0.6));
          pointer-events: none;
        }

        /* Timeline */
        .timeline-section {
          padding: 5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .timeline {
          width: 100%;
          max-width: 720px;
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-top: 1rem;
        }

        .timeline-item {
          display: grid;
          grid-template-columns: 1fr 60px 1fr;
          align-items: start;
          cursor: pointer;
        }
        .timeline-item:nth-child(odd) .tl-content { grid-column: 1; text-align: right; }
        .timeline-item:nth-child(odd) .tl-empty { grid-column: 3; }
        .timeline-item:nth-child(even) .tl-content { grid-column: 3; text-align: left; }
        .timeline-item:nth-child(even) .tl-empty { grid-column: 1; }

        .tl-center {
          grid-column: 2;
          grid-row: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .tl-line {
          width: 1px;
          flex: 1;
          min-height: 40px;
          background: linear-gradient(to bottom, rgba(233,121,249,0.3), rgba(244,114,182,0.15));
        }
        .tl-dot {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(233,121,249,0.1);
          border: 1px solid rgba(233,121,249,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }
        .tl-dot.active {
          background: linear-gradient(135deg, rgba(233,121,249,0.3), rgba(244,114,182,0.2));
          border-color: #e879f9;
          box-shadow: 0 0 20px rgba(233,121,249,0.3);
          transform: scale(1.1);
        }
        .tl-line-bottom {
          width: 1px;
          flex: 1;
          min-height: 40px;
          background: linear-gradient(to bottom, rgba(244,114,182,0.15), rgba(233,121,249,0.05));
        }

        .tl-content {
          padding: 1.5rem 1rem 2.5rem;
          transition: all 0.3s ease;
        }
        .tl-date {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: #c084fc;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }
        .tl-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 400;
          color: #fce7f3;
          margin-bottom: 0.4rem;
        }
        .tl-desc {
          font-size: 0.8rem;
          color: rgba(240,230,246,0.45);
          line-height: 1.5;
        }

        /* Modal */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(12px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal-card {
          background: #150a1c;
          border: 1px solid rgba(233,121,249,0.25);
          border-radius: 28px;
          padding: 2.5rem 2rem;
          width: 340px;
          text-align: center;
          position: relative;
          animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-close {
          position: absolute;
          top: 1rem; right: 1rem;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: #f0e6f6;
          width: 32px; height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.1rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .modal-close:hover { background: rgba(233,121,249,0.2); }
        .modal-img-wrap {
          width: 120px; height: 120px;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(233,121,249,0.4);
          box-shadow: 0 0 40px rgba(233,121,249,0.2);
        }
        .modal-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .modal-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 400;
          color: #fce7f3;
          margin-bottom: 0.5rem;
        }
        .modal-info {
          font-size: 0.85rem;
          color: rgba(240,230,246,0.55);
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        .modal-info span {
          display: block;
          color: #c084fc;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
          margin-top: 0.75rem;
        }
        .modal-btn {
          background: linear-gradient(135deg, #e879f9, #f472b6);
          color: white;
          border: none;
          padding: 0.7rem 2rem;
          border-radius: 100px;
          font-family: 'Nunito', sans-serif;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 8px 24px rgba(233,121,249,0.3);
        }
        .modal-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(233,121,249,0.4); }

        /* Animations */
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scaleX(0); }
          to { opacity: 1; transform: scaleX(1); }
        }

        /* Responsive */
        @media (max-width: 600px) {
          .profiles-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
          }
          .profiles-center { flex-direction: row; justify-content: center; padding: 0; }
          .timeline-item {
            grid-template-columns: 40px 1fr;
          }
          .timeline-item:nth-child(odd) .tl-content,
          .timeline-item:nth-child(even) .tl-content {
            grid-column: 2;
            text-align: left;
          }
          .timeline-item:nth-child(odd) .tl-empty,
          .timeline-item:nth-child(even) .tl-empty { display: none; }
          .tl-center { grid-column: 1; }
        }
      `}</style>

      <div className="love-root">
        {/* Background */}
        <div className="starfield" />
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              "--d": `${2 + Math.random() * 4}s`,
              "--op": `${0.3 + Math.random() * 0.6}`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Floating hearts */}
        {hearts.map((h) => (
          <div
            key={h.id}
            className="floating-heart"
            style={{
              left: `${h.left}%`,
              "--dur": `${h.duration}s`,
              "--delay": `${h.delay}s`,
              "--size": `${h.size}px`,
            }}
          >
            ♥
          </div>
        ))}

        {/* Hero */}
        <section className="hero section">
          <div className="hero-subtitle">
            Câu chuyện tình yêu của chúng mình
          </div>
          <h1 className="hero-title">
            Quân <span className="hero-amp">&</span> Phương
          </h1>
          <div className="hero-divider" />
          <div className="hero-names">
            <span className="hero-name">Quân</span>
            <span className="hero-heart-icon">❤️</span>
            <span className="hero-name">Phương</span>
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "1.1rem",
              color: "rgba(240,230,246,0.5)",
              animation: "fadeInUp 1s 1s ease both",
            }}
          >
            "Yêu là khi tìm thấy người ấy trong mọi khoảnh khắc bình thường..."
          </p>
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              opacity: 0.4,
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                color: "#c084fc",
              }}
            >
              CUỘN XUỐNG
            </span>
            <div
              style={{
                width: "1px",
                height: "40px",
                background: "linear-gradient(to bottom, #c084fc, transparent)",
                animation: "scaleIn 2s ease-in-out infinite",
              }}
            />
          </div>
        </section>

        {/* Profiles */}
        <section className="profiles-section section">
          <div className="section-label">Nhân vật chính</div>
          <h2 className="section-title">Hai người trong câu chuyện</h2>
          <div className="profiles-grid">
            {Object.entries(people).map(([key, person]) => (
              <div
                key={key}
                className="profile-card"
                onClick={() => setOpenModal(key)}
              >
                <div className="profile-img-wrap">
                  <div
                    className="profile-img-ring"
                    style={{
                      background: `conic-gradient(${person.color}, transparent, ${person.color})`,
                    }}
                  />
                  <div className="profile-img-inner">
                    <img src={person.img} alt={person.name} />
                  </div>
                </div>
                <div className="profile-name">{person.name}</div>
                <div className="profile-role">{person.role}</div>
                <div className="profile-detail">
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.65rem",
                        color: "rgba(240,230,246,0.4)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: "2px",
                      }}
                    >
                      Cung
                    </span>
                    <span style={{ color: person.color, fontWeight: "500" }}>
                      {person.sign}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.65rem",
                        color: "rgba(240,230,246,0.4)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: "2px",
                      }}
                    >
                      Sinh nhật
                    </span>
                    <span>{person.birthday}</span>
                  </div>
                </div>
              </div>
            ))}

            <div
              className="profiles-center"
              style={{ gridColumn: 2, gridRow: 1 }}
            >
              <div className="center-heart">💕</div>
              <div className="center-since">
                Từ
                <br />
                24.07
                <br />
                2025
              </div>
            </div>
          </div>
        </section>

        {/* Counter */}
        <section className="counter-section section">
          <div className="section-label">Hành trình yêu</div>
          <h2 className="section-title">Mỗi ngày là một điều kỳ diệu</h2>
          <div className="counter-card">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "rgba(240,230,246,0.5)",
                marginBottom: "0.5rem",
              }}
            >
              Chúng mình đã bên nhau được
            </p>
            <div className="counter-ring-wrap">
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  stroke="rgba(233,121,249,0.1)"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="54"
                  stroke="url(#ringGrad)"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s ease" }}
                />
                <defs>
                  <linearGradient
                    id="ringGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#e879f9" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="counter-center">
                <div className="counter-number">{daysTogether}</div>
                <div className="counter-unit">NGÀY</div>
              </div>
            </div>
            <div className="counter-stats">
              <div className="stat-item">
                <div className="stat-num">
                  {(daysTogether * 24).toLocaleString()}
                </div>
                <div className="stat-label">Giờ</div>
              </div>
              <div
                style={{ width: "1px", background: "rgba(255,255,255,0.08)" }}
              />
              <div className="stat-item">
                <div className="stat-num">
                  {(daysTogether * 1440).toLocaleString()}
                </div>
                <div className="stat-label">Phút</div>
              </div>
              <div
                style={{ width: "1px", background: "rgba(255,255,255,0.08)" }}
              />
              <div className="stat-item">
                <div className="stat-num">{Math.round(daysTogether / 7)}</div>
                <div className="stat-label">Tuần</div>
              </div>
            </div>
            <div
              style={{
                marginTop: "1.5rem",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "0.95rem",
                color: "#c084fc",
              }}
            >
              ❤ Mãi bên nhau nhé ❤
            </div>
          </div>
        </section>

        {/* Video */}
        <section className="video-section section">
          <div className="section-label">Khoảnh khắc của chúng ta</div>
          <h2 className="section-title" style={{ marginBottom: "2rem" }}>
            Những ký ức đẹp nhất
          </h2>
          <div className="video-frame">
            <video
              src="/video_love_page2.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="video-overlay" />
          </div>
        </section>

        {/* Timeline */}
        <section className="timeline-section section">
          <div className="section-label">Cột mốc</div>
          <h2 className="section-title">Hành trình của chúng mình</h2>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="timeline-item"
                onClick={() => setActiveStep(i === activeStep ? -1 : i)}
              >
                {i % 2 === 0 ? (
                  <>
                    <div
                      className="tl-content"
                      style={{ gridColumn: 1, textAlign: "right" }}
                    >
                      <div className="tl-date">{m.date}</div>
                      <div className="tl-label">{m.label}</div>
                      {activeStep === i && (
                        <div className="tl-desc">{m.desc}</div>
                      )}
                    </div>
                    <div className="tl-center" style={{ gridColumn: 2 }}>
                      {i > 0 && <div className="tl-line" />}
                      <div
                        className={`tl-dot ${activeStep === i ? "active" : ""}`}
                      >
                        {m.icon}
                      </div>
                      {i < milestones.length - 1 && (
                        <div className="tl-line-bottom" />
                      )}
                    </div>
                    <div style={{ gridColumn: 3 }} />
                  </>
                ) : (
                  <>
                    <div style={{ gridColumn: 1 }} />
                    <div className="tl-center" style={{ gridColumn: 2 }}>
                      {i > 0 && <div className="tl-line" />}
                      <div
                        className={`tl-dot ${activeStep === i ? "active" : ""}`}
                      >
                        {m.icon}
                      </div>
                      {i < milestones.length - 1 && (
                        <div className="tl-line-bottom" />
                      )}
                    </div>
                    <div
                      className="tl-content"
                      style={{ gridColumn: 3, textAlign: "left" }}
                    >
                      <div className="tl-date">{m.date}</div>
                      <div className="tl-label">{m.label}</div>
                      {activeStep === i && (
                        <div className="tl-desc">{m.desc}</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer
          className="section"
          style={{
            padding: "4rem 1.5rem",
            textAlign: "center",
            borderTop: "1px solid rgba(233,121,249,0.1)",
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 300,
              color: "#fce7f3",
              marginBottom: "1rem",
            }}
          >
            Quân 💕 Phương
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: "rgba(240,230,246,0.35)",
              fontSize: "0.9rem",
            }}
          >
            Mãi mãi yêu nhau, mỗi ngày một hơn ✨
          </p>
        </footer>

        {/* Modal */}
        {openModal && (
          <div className="modal-backdrop" onClick={handleClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setOpenModal(null)}
              >
                ×
              </button>
              <div className="modal-img-wrap">
                <img src={people[openModal].img} alt={people[openModal].name} />
              </div>
              <div className="modal-name">{people[openModal].name}</div>
              <div className="modal-info">
                <span>Cung hoàng đạo</span>
                {people[openModal].sign}
                <span>Sinh nhật</span>
                {people[openModal].birthday}
                <span>Vai trò</span>
                {people[openModal].role}
              </div>
              <button className="modal-btn" onClick={() => setOpenModal(null)}>
                Đóng 💕
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );

  function handleClose() {
    setOpenModal(null);
  }
};

export default LovePage;
