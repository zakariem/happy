import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [showCard, setShowCard] = useState(false)
  const [balloons, setBalloons] = useState([])
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    // Show card with animation delay
    setTimeout(() => setShowCard(true), 500)
    
    // Generate balloons
    const balloonColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7']
    const newBalloons = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      color: balloonColors[i % balloonColors.length],
      left: Math.random() * 80 + 10,
      delay: Math.random() * 2
    }))
    setBalloons(newBalloons)

    // Generate confetti
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)]
    }))
    setConfetti(newConfetti)
  }, [])

  const playMusic = () => {
    // Create audio context for birthday tune
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [262, 262, 294, 262, 349, 330] // Happy Birthday notes
    
    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.5)
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + index * 0.5)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.5 + 0.4)
      
      oscillator.start(audioContext.currentTime + index * 0.5)
      oscillator.stop(audioContext.currentTime + index * 0.5 + 0.4)
    })
  }

  return (
    <div className="birthday-container">
      {/* Confetti */}
      {confetti.map(piece => (
        <div 
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`
          }}
        />
      ))}

      {/* Balloons */}
      {balloons.map(balloon => (
        <div 
          key={balloon.id}
          className="balloon"
          style={{
            left: `${balloon.left}%`,
            backgroundColor: balloon.color,
            animationDelay: `${balloon.delay}s`
          }}
        >
          <div className="balloon-string"></div>
        </div>
      ))}

      {/* Main Card */}
      <div className={`birthday-card ${showCard ? 'show' : ''}`}>
        <div className="card-header">
          <h1 className="birthday-title">🎉 Happy Birthday! 🎉</h1>
          <h2 className="name">Tom</h2>
        </div>
        
        <div className="card-body">
          <div className="cake">
            <div className="cake-layer cake-bottom"></div>
            <div className="cake-layer cake-middle"></div>
            <div className="cake-layer cake-top"></div>
            <div className="candle"></div>
            <div className="flame"></div>
          </div>
          
          <p className="birthday-message">
            🎂 Wishing you a day filled with happiness and a year filled with joy! 🎂
            <br />
            Hope all your birthday wishes come true! ✨
          </p>
          
          <div className="gift-box">
            <div className="gift">
              <div className="gift-bow"></div>
            </div>
          </div>
        </div>
        
        <div className="card-footer">
          <button className="music-button" onClick={playMusic}>
            🎵 Play Birthday Song 🎵
          </button>
          <p className="signature">With love and best wishes! 💝</p>
        </div>
      </div>

      {/* Dancing emojis */}
      <div className="dancing-emojis">
        <span className="emoji" style={{animationDelay: '0s'}}>🎈</span>
        <span className="emoji" style={{animationDelay: '0.5s'}}>🎊</span>
        <span className="emoji" style={{animationDelay: '1s'}}>🎁</span>
        <span className="emoji" style={{animationDelay: '1.5s'}}>🍰</span>
        <span className="emoji" style={{animationDelay: '2s'}}>🎉</span>
      </div>
    </div>
  )
}

export default App
