import { useState, useEffect, useRef, useMemo } from 'react'
import './App.css'

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add('scroll-revealed')
            })
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
      }
    )

    const elements = document.querySelectorAll('[data-scroll-reveal]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

const BIRTHDAY_MESSAGE = {
  title: "Happiest birthday, dear Dulavaiiiiiiiiii😍❤️‍🔥",
  paragraphs: [
    "You are truly my sister's favourite man! Her pasandida mard😩🫀✨",
    "I always pray that you stay happy and healthy, and may Allah fulfill all your wishes.",
    "My sister loves you soooo much, bhaiya… so please never hurt her. Take care of her, cherish her, and hold her close. And please marry her soon….this is my only request as your younger brother! The more love you give my sister, the more special you will become to our whole family. 🥹🤌🏻",
    "Lastly, I just want to say… may you always stay happy with my sister, may the both of you stay blessed together, and may every birthday of yours be celebrated with her by your side….that's my heartfelt wish. 🥺",
  ],
  closing: "Once again, happy birthday Duluuuu❤️🎉",
  signature: "With love,\nYour one and only shala, Tarif 😜",
  footer: "Mylea's Pasandida Mard🌚❤️"
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  opacity: number
}

function App() {
  const [phase, setPhase] = useState<'entrance' | 'button' | 'transition' | 'content'>('entrance')
  const [entranceComplete, setEntranceComplete] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showSurprise, setShowSurprise] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useScrollReveal()

  const particles = useMemo(() => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: 20 + Math.random() * 15,
        delay: Math.random() * -15,
        opacity: Math.random() * 0.3 + 0.1
      })
    }
    return newParticles
  }, [])

  const twinkles = useMemo(() => {
    const newTwinkles = []
    for (let i = 0; i < 4; i++) {
      newTwinkles.push({
        id: i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 2
      })
    }
    return newTwinkles
  }, [])

  useEffect(() => {
    const entranceTimer = setTimeout(() => {
      setEntranceComplete(true)
      setPhase('button')
    }, 3500)

    return () => clearTimeout(entranceTimer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleEnter = () => {
    setPhase('transition')
    
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.play().catch(() => {})
    }

    setTimeout(() => {
      setPhase('content')
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleEnter()
    }
  }

  const handleSurpriseClick = () => {
    setShowSurprise(true)
  }

  return (
    <div className="app" ref={containerRef}>
      <audio ref={audioRef} src="/music.mp3" loop />
      
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      
      <div className="film-grain" />
      <div className="vignette" />
      <div className="light-sweep" />
      
      <div className="particles-container">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              '--start-x': `${p.x}%`,
              '--start-y': `${p.y}%`,
              '--size': `${p.size}px`,
              '--duration': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--opacity': p.opacity
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="twinkles-container">
        {twinkles.map(t => (
          <div
            key={t.id}
            className="twinkle"
            style={{
              left: `${t.x}%`,
              top: `${t.y}%`,
              animationDelay: `${t.delay}s`,
              animationDuration: `${t.duration}s`
            }}
          />
        ))}
      </div>

      <div 
        className="spotlight"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.04) 0%, transparent 20%)`
        }}
      />

      <div className={`letterbox letterbox-top ${entranceComplete ? 'letterbox-hide' : ''}`} />
      <div className={`letterbox letterbox-bottom ${entranceComplete ? 'letterbox-hide' : ''}`} />

      <div className={`entrance-overlay ${phase !== 'entrance' ? 'entrance-fade' : ''}`}>
        <div className="entrance-content">
          <div className="spotlight-circle" />
          <div className="entrance-icon">✦</div>
          <div className="entrance-text">A Special Message</div>
          <div className="entrance-subtext">For Someone Special</div>
        </div>
      </div>

      {(phase === 'button' || phase === 'transition') && (
        <div className={`enter-button-container ${phase === 'transition' ? 'fade-out' : 'fade-in'}`}>
          <button 
            className="enter-button"
            onClick={handleEnter}
            onKeyDown={handleKeyDown}
            aria-label="Tap to enter and view the birthday message"
            tabIndex={0}
          >
            <span className="enter-button-icon">❖</span>
            <span className="enter-button-text">Tap to Enter</span>
            <span className="enter-button-glow" />
          </button>
        </div>
      )}

      <div className={`main-content ${phase === 'content' ? 'content-reveal' : ''}`}>
        <div className="content-wrapper">
          <header className="hero" data-scroll-reveal id="hero-section">
            <div className="hero-frame">
              <div className="hero-glow" />
              <div className="ornament ornament-top">✧ ✦ ✧</div>
              <div className="decorative-line decorative-line-top" />
              <h1 className="title">
                <span className="title-main">Happiest birthday, dear</span>
                <span 
                  className="title-name clickable-name" 
                  onClick={handleSurpriseClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleSurpriseClick()
                    }
                  }}
                >
                  Dulavaiiiiiiiiii😍❤️‍🔥
                </span>
              </h1>
              <div className="decorative-line decorative-line-bottom" />
              <div className="ornament ornament-bottom">✧ ✦ ✧</div>
            </div>
          </header>

          <main className="message-container">
            {BIRTHDAY_MESSAGE.paragraphs.map((paragraph, index) => (
              <div 
                key={index} 
                className={`glass-panel panel-${index + 1}`}
                data-scroll-reveal
                id={`panel-${index}`}
                style={{ 
                  animationDelay: `${0.4 + index * 0.25}s`,
                  '--panel-index': index
                } as React.CSSProperties}
              >
                <div className="panel-light-sweep" />
                <div className="panel-border-glow" />
                {index === 0 && <span className="drop-cap">{paragraph.charAt(0)}</span>}
                <p className="message-text">
                  {index === 0 ? paragraph.slice(1) : paragraph}
                </p>
              </div>
            ))}

            <div className="closing-section" data-scroll-reveal id="closing-section">
              <div className="closing-ornament">— ✦ —</div>
              
              <div className="glass-panel closing-panel" style={{ animationDelay: '1.4s' }}>
                <div className="closing-glow" />
                <p className="closing-text">{BIRTHDAY_MESSAGE.closing}</p>
              </div>

              <div className="signature-block" style={{ animationDelay: '1.6s' }}>
                <div className="signature-line" />
                <p className="signature">
                  {BIRTHDAY_MESSAGE.signature.split('\n').map((line, i) => (
                    <span key={i} className="signature-line-text" style={{ animationDelay: `${1.7 + i * 0.2}s` }}>
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div className="footer-badge" style={{ animationDelay: '2s' }}>
                <div className="badge-shimmer" />
                <span className="footer-text">{BIRTHDAY_MESSAGE.footer}</span>
              </div>
            </div>
          </main>

          <footer className="page-footer">
            <div className="footer-ornament">
              <span className="ornament-line" />
              <span className="ornament-star">✦</span>
              <span className="ornament-line" />
            </div>
            <div className="decorative-dots">
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
            </div>
          </footer>
        </div>
      </div>

      <div className="lens-flares">
        <div className="lens-flare flare-1" />
        <div className="lens-flare flare-2" />
        <div className="lens-flare flare-3" />
        <div className="lens-flare flare-4" />
      </div>

      {showSurprise && (
        <div className="surprise-overlay" onClick={() => setShowSurprise(false)}>
          <div className="surprise-content" onClick={(e) => e.stopPropagation()}>
            <div className="surprise-sparkles">
              <span>🎉</span>
              <span>👑</span>
              <span>🎉</span>
            </div>
            <div className="surprise-title">
              To the World's Best Dulabhai
            </div>
            <div className="surprise-message">
              You're not just my sister's husband — you're the best brother-in-law anyone could ever ask for!
            </div>
            <div className="surprise-submessage">
              May your life always be filled with love, laughter, and endless happiness with my sister by your side.
            </div>
            <div className="surprise-hearts">
              <span>💖</span>
              <span>🌟</span>
              <span>💖</span>
            </div>
            <button className="surprise-close" onClick={() => setShowSurprise(false)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
