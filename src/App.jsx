import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [num, setNum] = useState(0)
  const [limit, setLimit] = useState(108)
  const [isAnimating, setIsAnimating] = useState(false)
  const [completedCycles, setCompletedCycles] = useState(0)
  const [mantra, setMantra] = useState('hare-krishna')
  const [currentDivineName, setCurrentDivineName] = useState('')
  const [currentPadChinh, setCurrentPadChinh] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Bhagwan ke 16 Divine Pad Chinh (Foot Symbols)
  const padChinhNames = {
    rightFoot: [
      { symbol: "🔄", name: "शंख", english: "Conch Shell" },
      { symbol: "☸️", name: "चक्र", english: "Wheel" },
      { symbol: "☂️", name: "छत्र", english: "Parasol" },
      { symbol: "🌾", name: "यव", english: "Barleycorn" },
      { symbol: "⭐", name: "तारा", english: "Star" },
      { symbol: "🚩", name: "ध्वज", english: "Flag" },
      { symbol: "⚡", name: "वज्र", english: "Thunderbolt" },
      { symbol: "🌸", name: "पुष्प", english: "Flower" }
    ],
    leftFoot: [
      { symbol: "🌙", name: "अर्धचन्द्र", english: "Half-moon" },
      { symbol: "🏺", name: "कलश", english: "Water-pot" },
      { symbol: "🔺", name: "त्रिकोण", english: "Triangle" },
      { symbol: "🏹", name: "धनुष", english: "Bow" },
      { symbol: "🌌", name: "आकाश", english: "Sky" },
      { symbol: "🐄", name: "गोपद", english: "Cow's hoofprint" },
      { symbol: "🐠", name: "मत्स्य", english: "Fish" },
      { symbol: "🏔️", name: "स्रवत्पर्वत", english: "Flowing mountain" }
    ]
  }

  // Shastron ke anusaar Radha-Krishna ke 108 Naam
  const divineNames = [
    "श्री कृष्ण", "गोविन्द", "माधव", "वासुदेव", "बलराम", "संकर्षण", "प्रद्युम्न", "अनिरुद्ध",
    "श्री हरि", "नारायण", "पद्मनाभ", "दामोदर", "विष्णु", "केशव", "मधुसूदन", "तृिविक्रम",
    // ... (previous names array continues)
  ]

  // Vrindavan ki divine leela descriptions
  const vrindavanLeelas = [
    "वृंदावन की यमुना तट पर नटवर नाच रहे हैं",
    "गोपियों के संग रास रचा रहे श्याम",
    "कदम्ब के वृक्ष तले बंसी बजा रहे हैं मोहन",
    "गोवर्धन पर्वत उठाए खड़े हैं गिरिधारी",
    "माखन चोरी करते बालगोपाल",
    "राधा रानी के संग कुंज गली में विहार",
    "गोपों के संग गाय चरा रहे हैं गोपाल",
    "कालिया नाग का मर्दन कर रहे हैं दामोदर"
  ]

  const mantras = {
    'radha-name': 'राधे राधे',
    'hare-krishna': 'हरे कृष्ण हरे कृष्ण, कृष्ण कृष्ण हरे हरे | हरे राम हरे राम, राम राम हरे हरे ||',
    // 'krishnay vasudevay': 'कृष्णाय वासुदेवाय हरये परमात्मने । प्रणत: क्लेशनाशाय गोविंदाय नमो नम: ।।'
    
  }

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Har naam ke saath divine name aur pad chinh update karna
  useEffect(() => {
    if (num > 0 && num <= divineNames.length) {
      setCurrentDivineName(divineNames[num - 1])
      
      // Pad chinh selection - alternate between right and left foot
      const padChinhIndex = (num - 1) % 8
      const isRightFoot = num % 2 === 1
      const padChinhArray = isRightFoot ? padChinhNames.rightFoot : padChinhNames.leftFoot
      const currentChinh = padChinhArray[padChinhIndex]
      
      setCurrentPadChinh({
        symbol: currentChinh.symbol,
        name: currentChinh.name,
        english: currentChinh.english,
        foot: isRightFoot ? 'right' : 'left'
      })
    } else {
      setCurrentPadChinh('')
    }
  }, [num])

  function incCount() {
    if (num >= limit) {
      setNum(1)
      setCompletedCycles(prev => prev + 1)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
      return
    }
    setNum(num + 1)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }

  function decCount() {
    if (num === 0) return
    setNum(num - 1)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }

  function incCountBy5() {
    if (num + 5 > limit) {
      setNum(limit)
      return
    }
    setNum(num + 5)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }

  function resetCount() {
    setNum(0)
    setCompletedCycles(0)
    setCurrentDivineName('')
    setCurrentPadChinh('')
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)
  }

  function handleLimitChange(e) {
    const value = Number(e.target.value)
    setLimit(value > 0 ? value : 108)
  }

  function toggleMantra() {
    setMantra(prev => prev === 'hare-krishna' ? 'radha-name' : 'hare-krishna')
  }

  function getVrindavanLeela() {
    return vrindavanLeelas[num % vrindavanLeelas.length]
  }

  const renderFlowerPetals = () => {
    const petals = []
    for (let i = 0; i < 8; i++) {
      petals.push(<div key={i} className="flower-petal" style={{ '--i': i }}></div>)
    }
    return petals
  }

  // Loading Component
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <div className="radhe-radhe-loader">
            <div className="loader-lotus">
              <div className="lotus-petals">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="lotus-petal" style={{ '--index': i }}></div>
                ))}
              </div>
              <div className="lotus-center">
                <div className="radhe-text">राधे</div>
                <div className="radhe-text">राधे</div>
              </div>
            </div>
            <div className="loading-message">
              <div className="loading-shloka">
                "श्री कृष्ण चरणों के चिन्हों से सजी यह दिव्य माला..."
              </div>
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="radha-krishna-counter">
      <div className="divine-background">
        <div className="radha-krishna-silhouette"></div>
        <div className="floating-petals">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="floating-petal" style={{ '--delay': i * 0.5 }}></div>
          ))}
        </div>
        <div className="vrindavan-scene">
          <div className="yamuna-river"></div>
          <div className="kadamb-tree"></div>
          <div className="giriraj-mountain"></div>
        </div>
      </div>
      
      <div className="temple-container">
        <header className="divine-header">
          <div className="deity-icons">
            <div className="krishna-flute"></div>
            <h1>श्री कृष्ण पद चिन्ह माला</h1>
            <div className="radha-crown"></div>
          </div>
          <p className="divine-subtitle">16 दिव्य चरण चिन्हों के साथ</p>
        </header>

        <div className="mantra-section">
          <div className="mantra-display" onClick={toggleMantra}>
            <div className={`mantra-text ${mantra}`}>
              {mantras[mantra]}
            </div>
            <div className="mantra-instruction">
              (मंत्र बदलने के लिए क्लिक करें)
            </div>
          </div>
        </div>

        <div className="counter-section">
          <div className={`lotus-count ${isAnimating ? 'lotus-pulse' : ''}`}>
            <div className="lotus-flower">
              {renderFlowerPetals()}
              <div className="lotus-center">
                <span className="count-number">{num}</span>
              </div>
            </div>
          </div>
          
          {/* Divine Name Display */}
          {currentDivineName && (
            <div className="divine-name-display">
              <div className="divine-name-label">भगवान का नाम:</div>
              <div className="divine-name">{currentDivineName}</div>
            </div>
          )}

          {/* Pad Chinh Display */}
          {/* {currentPadChinh && (
            <div className="pad-chinh-section">
              <div className="charnamrit-feet">
                <div className={`divine-feet ${currentPadChinh.foot}`}>
                  <div className="feet-outline">
                    <div className="feet-symbols">
                      <div className="active-symbol">
                        <span className="symbol-emoji">{currentPadChinh.symbol}</span>
                        <div className="symbol-glow"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pad-chinh-info">
                <div className="chinh-name">{currentPadChinh.name}</div>
                <div className="chinh-english">({currentPadChinh.english})</div>
                <div className="feet-side">
                  {currentPadChinh.foot === 'right' ? 'दायाँ चरण' : 'बायाँ चरण'}
                </div>
              </div>
            </div>
          )} */}

          <div className="vrindavan-leela">
            {/* {getVrindavanLeela()} */}
          </div>

          <div className="mala-visualization">
            <div className="mala-string">
              {Array.from({ length: Math.min(limit, 27) }).map((_, i) => (
                <div 
                  key={i} 
                  className={`mala-bead ${i < num % Math.min(limit, 27) ? 'active' : ''} ${i === num % Math.min(limit, 27) - 1 ? 'radha-glow' : ''}`}
                />
              ))}
            </div>
          </div>

          <div className="cycles-info">
            <div className="cycle-count">
              <span className="cycle-label">पूर्ण माला</span>
              <span className="cycle-number">{completedCycles}</span>
            </div>
            <div className="limit-info">
              <span className="limit-label">मोती संख्या</span>
              <span className="limit-number">{limit}</span>
            </div>
          </div>
        </div>

        <div className="controls-section">
          <div className="main-controls">
            <button className="control-btn decrease-btn" onClick={decCount}>
              <span className="btn-icon">➖</span>
              <span className="btn-text">घटाएं</span>
            </button>
            
            <button className="control-btn increase-btn" onClick={incCount}>
              <span className="btn-icon">➕</span>
              <span className="btn-text">बढ़ाएं</span>
            </button>
          </div>

          <div className="secondary-controls">
            <button className="control-btn skip-btn" onClick={incCountBy5}>
              <span className="btn-icon">🎵</span>
              <span className="btn-text">5 बढ़ाएं</span>
            </button>
            
            <button className="control-btn reset-btn" onClick={resetCount}>
              <span className="btn-icon">🔄</span>
              <span className="btn-text">शुरू से</span>
            </button>
          </div>
        </div>

        <div className="settings-section">
          <div className="limit-setting">
            <label htmlFor="mala-limit" className="setting-label">
              माला की लंबाई
            </label>
            <div className="input-group">
              <input 
                type="number" 
                id="mala-limit"
                value={limit}
                onChange={handleLimitChange}
                min="1"
                max="999"
                className="limit-input"
              />
              <span className="input-suffix">मोती</span>
            </div>
          </div>
        </div>

        <footer className="divine-footer">
          <div className="pad-chinh-guide">
            <div className="guide-title">श्री कृष्ण के 16 दिव्य पद चिन्ह</div>
            <div className="feet-guides">
              <div className="foot-guide right-foot">
                <span className="guide-label">दायाँ चरण:</span>
                <div className="chinh-list">
                  {padChinhNames.rightFoot.map((chinh, index) => (
                    <span key={index} className="chinh-item">
                      {chinh.symbol} {chinh.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="foot-guide left-foot">
                <span className="guide-label">बायाँ चरण:</span>
                <div className="chinh-list">
                  {padChinhNames.leftFoot.map((chinh, index) => (
                    <span key={index} className="chinh-item">
                      {chinh.symbol} {chinh.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="premanand-style">
            भगवान के चरण चिन्हों का स्मरण करते हुए
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App