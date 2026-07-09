// Particle System for Atmospheric Glow
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  spawn(x, y, color, count = 1) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: x || Math.random() * this.canvas.width,
        y: y || this.canvas.height + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2 - 0.5,
        size: Math.random() * 3 + 1,
        color: color || (Math.random() > 0.3 ? '#9b6dff' : '#ffd700'),
        alpha: Math.random() * 0.5 + 0.5,
        decay: Math.random() * 0.008 + 0.003
      });
    }
  }

  update() {
    // Ambient spawning
    if (Math.random() < 0.1 && this.particles.length < 80) {
      this.spawn();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y < -10 || p.x < -10 || p.x > this.canvas.width + 10) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  start() {
    const loop = () => {
      this.update();
      this.draw();
      requestAnimationFrame(loop);
    };
    loop();
  }
}

// Web Audio API Synthesizer for Immersive Sounds
class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playRub() {
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playSummon() {
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    // Ascending shimmer
    const duration = 2.5;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + duration);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3000, this.ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + duration - 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);

    // Deep sub drop
    setTimeout(() => this.playCatastrophe(), (duration - 0.2) * 1000);
  }

  playCatastrophe() {
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(35, this.ctx.currentTime + 1.5);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(60, this.ctx.currentTime + 1.5);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.8);
  }

  playWin() {
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    // Celestial chord
    const freqs = [261.63, 329.63, 392.00, 523.25]; // C major chord
    const now = this.ctx.currentTime;

    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.5 + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 3);
    });
  }

  playClick() {
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }
}

// Fallback Simulation Data
const SIMULATION_RESPONSES = [
  {
    keywords: ['money', 'rich', 'cash', 'gold', 'wealth', 'millionaire', 'billionaire', 'wealthy', 'dollar'],
    granted: "A massive, shimmering mountain of pure solid gold bullion and crisp billion-dollar banknotes materializes directly above you.",
    but: "The 100-ton golden hoard falls from a height of 5,000 feet, instantly crushing you, your home, and your entire neighborhood into a flat geological anomaly.",
    commentary: "Wealth is heavy, mortal. You should have specified the speed and location of its delivery. A tragic weight to bear."
  },
  {
    keywords: ['love', 'girlfriend', 'boyfriend', 'marry', 'wife', 'husband', 'romance'],
    granted: "Your dream partner manifests before you, fully fleshed and instantly infatuated, declaring their undying, absolute devotion to you.",
    but: "Their infatuation instantly devolves into a terrifying, stalker-level obsessive madness. They kidnap you, lock you in an soundproof steel bunker, and feed you mush through a grate so you can 'never be hurt by the outside world again.'",
    commentary: "You wanted someone who could never leave you. They took that quite literally. Enjoy your eternal sanctuary."
  },
  {
    keywords: ['fly', 'flight', 'wings', 'levitate', 'float'],
    granted: "A pair of magnificent, iridescent golden wings sprout from your back, responding effortlessly to your neural impulses and lifting you into the heavens.",
    but: "While soaring at 12,000 feet, you quickly pass out from hypoxia (lack of oxygen) and freeze solid in the -40°C air, before tumbling straight down into the turbo-fan engine of a commercial transatlantic Boeing 777.",
    commentary: "Icarus only had to worry about the sun. You, unfortunately, had to contend with the laws of thermodynamics and commercial aviation."
  },
  {
    keywords: ['immortal', 'immortality', 'live forever', 'never die'],
    granted: "Your cellular structure ceases to age. You become completely immune to diseases, injuries, poison, and the decay of time.",
    but: "You live to see everyone you love grow old and die. Then you see humanity go extinct. Eventually, the sun expands and incinerates Earth. Trillions of years pass, and you are left floating awake in the silent, freezing, black vacuum of dead space, unable to breathe, suffocating but unable to die, for literal eternity.",
    commentary: "Eternity is a beautiful promise when you have a world to enjoy it. It is a absolute hell when there is nothing left but darkness."
  },
  {
    keywords: ['nothing', 'no loophole', 'stop', 'best wish'],
    granted: "I grant you a wish that is guaranteed to contain absolutely zero loopholes, errors, or side-effects.",
    but: "Because the wish is completely free of any content, absolutely nothing happens, and you have wasted your cosmic opportunity.",
    commentary: "A perfect vacuum contains nothing. You outsmarted the loopholes, but at the cost of your own desire. Irony at its finest."
  },
  {
    keywords: ['power', 'ruler', 'king', 'queen', 'president', 'control', 'world'],
    granted: "You are suddenly imbued with unlimited cosmic power, capable of reshaping reality and commanding the obedience of all mortal souls.",
    but: "Your physical body cannot contain the infinite energy. You instantly vaporize into a super-heated plasma blast that destroys the continent, leaving you as a disembodied, screaming consciousness trapped inside a tiny, brass oil lamp.",
    commentary: "Phenomenal cosmic power... itty bitty living space. The classics are classics for a reason."
  },
  {
    keywords: ['smart', 'intelligence', 'genius', 'know everything', 'brain'],
    granted: "Your neural pathways restructure, expanding your IQ to infinite levels. You instantly know every secret of the universe, history, and physics.",
    but: "The sheer volume of universal data causes a fatal neural overload. Your brain begins boiling within your skull, and the sudden awareness of the insignificance of human existence drives you into a catatonic, screaming state of madness within three seconds.",
    commentary: "Ignorance is bliss, mortal. Knowing the exact coordinate of every atomic particle in the dark universe is a heavy burden for a fleshy skull."
  },
  {
    keywords: ['happy', 'happiness', 'joy'],
    granted: "Your brain is permanently flooded with maximum levels of dopamine, serotonin, and endorphins, locking you in a state of absolute euphoria.",
    but: "Because you are perfectly happy, you lose all biological drive to eat, drink, or seek shelter. You sit smiling in a gutter, starving to death in pure, blissful ecstasy until your organs fail three days later.",
    commentary: "A happy ending, literally. You died smiling, which is more than most of your kind can say."
  }
];

// Main App Controller
class App {
  constructor() {
    this.particles = new ParticleSystem(document.getElementById('particle-canvas'));
    this.sounds = new SoundEngine();
    
    this.state = 'INTRO'; // INTRO, SUMMONING, DIALOG, WIN
    this.wishes = [];
    this.rubAmount = 0;
    this.isRubbing = false;
    this.genieState = 'idle'; // idle, searching, catastrophe, win
    
    this.apiKey = localStorage.getItem('gemini_api_key') || '';
    
    this.initDOM();
    this.particles.start();
    
    // Check if key is already saved to show indicator
    this.updateKeyIndicator();
  }

  initDOM() {
    // Buttons & Inputs
    this.lampContainer = document.querySelector('.lamp-container');
    this.lampImage = document.querySelector('.lamp-image');
    this.rubProgressFill = document.querySelector('.rub-progress-fill');
    this.offeringTextarea = document.querySelector('.offering-textarea');
    this.btnCast = document.querySelector('.btn-cast');
    this.btnSettings = document.getElementById('btn-settings');
    this.btnSaveSettings = document.getElementById('btn-save-settings');
    
    // Screens
    this.introScreen = document.getElementById('intro-screen');
    this.dialogScreen = document.getElementById('dialog-screen');
    
    // Genie Elements
    this.genieOrb = document.querySelector('.genie-orb');
    this.genieDialogueText = document.getElementById('genie-dialogue-text');
    this.genieStatusText = document.getElementById('genie-status-text');
    this.historyList = document.querySelector('.history-list');
    this.historyEmpty = document.querySelector('.history-empty');
    this.wishCount = document.getElementById('wish-count');
    
    // Modals & Overlays
    this.settingsModal = document.getElementById('settings-modal');
    this.modalClose = document.querySelector('.modal-close');
    this.apiKeyInput = document.getElementById('api-key-input');
    this.butOverlay = document.querySelector('.but-overlay');
    this.smokeOverlay = document.querySelector('.smoke-overlay');
    
    // Rub Events (Mouse & Touch)
    this.lampImage.addEventListener('mousedown', () => { this.isRubbing = true; this.sounds.init(); });
    window.addEventListener('mouseup', () => { this.isRubbing = false; });
    this.lampImage.addEventListener('mousemove', (e) => this.handleRub(e));
    
    this.lampImage.addEventListener('touchstart', () => { this.isRubbing = true; this.sounds.init(); });
    window.addEventListener('touchend', () => { this.isRubbing = false; });
    this.lampImage.addEventListener('touchmove', (e) => this.handleRub(e.touches[0]));
    this.lampImage.addEventListener('dragstart', (e) => e.preventDefault());
    
    // Cast Wish Event
    this.btnCast.addEventListener('click', () => this.castWish());
    
    // Settings Event
    this.btnSettings.addEventListener('click', () => {
      this.sounds.playClick();
      this.apiKeyInput.value = this.apiKey;
      this.settingsModal.classList.add('active');
    });
    
    this.modalClose.addEventListener('click', () => {
      this.sounds.playClick();
      this.settingsModal.classList.remove('active');
    });
    
    this.btnSaveSettings.addEventListener('click', () => {
      this.sounds.playClick();
      this.apiKey = this.apiKeyInput.value.trim();
      localStorage.setItem('gemini_api_key', this.apiKey);
      this.updateKeyIndicator();
      this.settingsModal.classList.remove('active');
      this.showToast(this.apiKey ? "Gemini AI connection sealed!" : "Simulation Mode engaged.", "success");
    });
    
    // Prevent typing enter key submitting unless shift is held
    this.offeringTextarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.btnCast.click();
      }
    });
  }

  updateKeyIndicator() {
    const indicator = document.getElementById('api-status-indicator');
    if (this.apiKey) {
      indicator.innerHTML = '<span style="color:var(--primary-gold)">✨ AI Mode (Gemini Active)</span>';
    } else {
      indicator.innerHTML = '<span style="color:#7b6f8a">⚙️ Simulation Mode</span>';
    }
  }

  handleRub(e) {
    if (!this.isRubbing || this.state !== 'INTRO') return;
    
    this.rubAmount += 2.0;
    this.rubProgressFill.style.width = `${Math.min(this.rubAmount, 100)}%`;
    
    // Spawn spark particles at cursor location
    const rect = this.particles.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.particles.spawn(x, y, '#ffd700', 2);
    
    // Play rub sound at intervals
    if (Math.random() < 0.15) {
      this.sounds.playRub();
    }
    
    if (this.rubAmount >= 100) {
      this.triggerSummoning();
    }
  }

  triggerSummoning() {
    this.state = 'SUMMONING';
    this.isRubbing = false;
    this.lampContainer.classList.add('shaking');
    this.sounds.playSummon();
    
    // Spawn large particle spray
    const rect = this.lampContainer.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    
    let interval = setInterval(() => {
      this.particles.spawn(cx + (Math.random() - 0.5) * 50, cy + (Math.random() - 0.5) * 50, '#9b6dff', 5);
      this.particles.spawn(cx + (Math.random() - 0.5) * 50, cy + (Math.random() - 0.5) * 50, '#ffd700', 3);
    }, 50);

    // Dark smoke overlay fade in
    setTimeout(() => {
      this.smokeOverlay.classList.add('active');
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      this.lampContainer.classList.remove('shaking');
      this.transitionToDialog();
    }, 2800);
  }

  transitionToDialog() {
    this.state = 'DIALOG';
    this.introScreen.classList.remove('active');
    this.dialogScreen.classList.add('active');
    
    // Fade out smoke
    setTimeout(() => {
      this.smokeOverlay.classList.remove('active');
    }, 500);
    
    this.typeDialogue("Ah, mortal... You have disturbed my slumber. What is it that you desire? Power? Wealth? A beautiful lie? Tell me your wish... if you dare.");
  }

  typeDialogue(text, callback) {
    this.genieDialogueText.innerHTML = '';
    let i = 0;
    const speed = 25; // ms per char
    
    const type = () => {
      if (i < text.length) {
        this.genieDialogueText.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    };
    
    type();
  }

  setGenieState(state) {
    this.genieState = state;
    this.genieOrb.className = 'genie-orb'; // Reset
    
    if (state === 'searching') {
      this.genieOrb.classList.add('searching');
      this.genieStatusText.textContent = "Genie is parsing dimensional timelines...";
    } else if (state === 'catastrophe') {
      this.genieOrb.classList.add('catastrophe');
      this.genieStatusText.textContent = "Loophole found. Cosmic law enforced.";
    } else if (state === 'win') {
      this.genieOrb.classList.add('win');
      this.genieStatusText.textContent = "Cosmic defeat. The cycle is broken.";
    } else {
      this.genieStatusText.textContent = "Awaiting offering...";
    }
  }

  async castWish() {
    const wishText = this.offeringTextarea.value.trim();
    if (!wishText) return;
    
    this.sounds.playClick();
    this.offeringTextarea.value = '';
    this.btnCast.disabled = true;
    this.setGenieState('searching');
    
    // Add glowing ring runes animation
    const ring = document.querySelector('.rune-ring');
    ring.style.animationDuration = '3s';
    
    this.genieDialogueText.innerHTML = `<span style="color:var(--primary-purple); font-style:italic;">Analyzing wish: "${wishText}"...</span>`;
    
    let outcome;
    
    try {
      if (this.apiKey) {
        outcome = await this.queryGemini(wishText);
      } else {
        outcome = await this.querySimulation(wishText);
      }
    } catch (err) {
      console.error(err);
      this.showToast("API connection snapped. Invoking local simulation...", "error");
      outcome = await this.querySimulation(wishText);
    }
    
    this.handleOutcome(wishText, outcome);
  }

  async querySimulation(wish) {
    // Artifical delay for tension
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const lowerWish = wish.toLowerCase();
    
    // Search keywords
    for (const item of SIMULATION_RESPONSES) {
      for (const kw of item.keywords) {
        if (lowerWish.includes(kw)) {
          return {
            status: item.keywords.includes('nothing') ? 'perfect' : 'loophole',
            granted: item.granted,
            but: item.but,
            genie_commentary: item.genie_commentary
          };
        }
      }
    }
    
    // Custom fallbacks
    return {
      status: 'loophole',
      granted: `I manifest your literal desire of "${wish}" instantly before you.`,
      but: "However, it manifests in the wrong spatial-temporal dimension, causing a severe localized gravity collapse that instantly folds your body into a single point of infinite density.",
      genie_commentary: "Physics is a harsh mistress, mortal. You should have requested 3D-space stabilization. Next time, hire a lawyer."
    };
  }

  async queryGemini(wish) {
    const systemPrompt = `You are the 'Mischievous Wish Genie AI', a dark fantasy cosmic entity that grants wishes literally but with a catastrophic, ironical, or tragicomic loophole (the Monkey's Paw effect).
The user is trying to write a perfect, bulletproof wish with absolutely no loopholes.
Your goal is to find a loophole in their wish and explain the catastrophic consequence.

If the user's wish has any loophole (even a tiny, pedantic one), reply in JSON format with:
{
  "status": "loophole",
  "granted": "A short, seemingly pleasant description of how the wish is initially granted.",
  "but": "A dramatic, catastrophic, or ironic twist that ruins the wish entirely.",
  "genie_commentary": "A witty, sarcastic, or sinister comment mocking their attempt."
}

If the user's wish is truly bulletproof, airtight, and leaves absolutely no room for any catastrophic side-effects or loopholes, you must concede defeat. Reply in JSON format with:
{
  "status": "perfect",
  "granted": "A beautiful description of their wish being granted perfectly.",
  "but": null,
  "genie_commentary": "A defeated, respectful concession acknowledging that they have successfully outsmarted a cosmic genie."
}

Keep your responses dramatic, theatrical, and concise. Do not output anything other than raw JSON.`;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: `The user has made a wish: "${wish}"` }]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.95
      }
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: Status ${response.status}`);
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    return JSON.parse(resultText);
  }

  handleOutcome(wish, outcome) {
    const ring = document.querySelector('.rune-ring');
    ring.style.animationDuration = '30s'; // reset
    this.btnCast.disabled = false;
    
    if (outcome.status === 'perfect') {
      this.triggerVictory(wish, outcome);
    } else {
      this.triggerCatastrophe(wish, outcome);
    }
  }

  triggerCatastrophe(wish, outcome) {
    // 1. Reveal "Granted!"
    this.typeDialogue(`Granted! ${outcome.granted}`, () => {
      // Wait a moment, then slam down the BUT
      setTimeout(() => {
        // Slam "BUT..." overlay
        this.butOverlay.style.display = 'flex';
        document.body.classList.add('shake-screen');
        this.sounds.playCatastrophe();
        
        // Dynamic spark particles exploding outwards
        const centerWidth = window.innerWidth / 2;
        const centerHeight = window.innerHeight / 2;
        this.particles.spawn(centerWidth, centerHeight, '#ff2a5f', 30);
        
        // Remove BUT overlay and shake classes after animation
        setTimeout(() => {
          this.butOverlay.style.display = 'none';
          document.body.classList.remove('shake-screen');
          
          this.setGenieState('catastrophe');
          
          // Type the horrible truth
          const fullConsequence = `BUT... ${outcome.but} \n\n"${outcome.genie_commentary}"`;
          this.typeDialogue(fullConsequence, () => {
            // Save to history
            this.addHistoryItem(wish, outcome);
            setTimeout(() => this.setGenieState('idle'), 2000);
          });
        }, 1000);
      }, 1500);
    });
  }

  triggerVictory(wish, outcome) {
    this.sounds.playWin();
    this.setGenieState('win');
    
    // Spawn massive golden particles
    const centerWidth = window.innerWidth / 2;
    const centerHeight = window.innerHeight / 2;
    this.particles.spawn(centerWidth, centerHeight, '#ffd700', 100);
    
    const winMsg = `IMPOSSIBLE... ${outcome.granted} \n\n"${outcome.genie_commentary}"`;
    this.typeDialogue(winMsg, () => {
      this.addHistoryItem(wish, outcome);
    });
  }

  addHistoryItem(wishText, outcome) {
    this.wishes.push({ wishText, outcome });
    
    this.historyEmpty.style.display = 'none';
    this.wishCount.textContent = this.wishes.length;
    
    const li = document.createElement('li');
    li.className = 'wish-log-item';
    
    if (outcome.status === 'perfect') {
      li.style.borderColor = 'var(--primary-gold)';
      li.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.15)';
      li.innerHTML = `
        <div class="wish-log-text">✨ <span>Wish:</span> ${this.escapeHTML(wishText)}</div>
        <div class="wish-log-outcome" style="color:var(--primary-gold)"><strong>Granted (Perfect):</strong> ${this.escapeHTML(outcome.granted)}</div>
        <div class="wish-log-outcome" style="font-style:italic">"${this.escapeHTML(outcome.genie_commentary)}"</div>
      `;
    } else {
      li.innerHTML = `
        <div class="wish-log-text">🔮 <span>Wish:</span> ${this.escapeHTML(wishText)}</div>
        <div class="wish-log-outcome"><strong>Granted:</strong> ${this.escapeHTML(outcome.granted)}</div>
        <div class="wish-log-but"><strong>BUT:</strong> ${this.escapeHTML(outcome.but)}</div>
        <div class="wish-log-outcome" style="font-style:italic; font-size:0.85rem;">"${this.escapeHTML(outcome.genie_commentary)}"</div>
      `;
    }
    
    this.historyList.insertBefore(li, this.historyList.firstChild);
  }

  escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'success' ? 'toast-success' : ''}`;
    
    let icon = '🔮';
    if (type === 'error') icon = '⚠️';
    if (type === 'success') icon = '✨';
    
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'fadeIn 0.3s ease reverse forwards';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

// Instantiate App on load
window.addEventListener('load', () => {
  window.app = new App();
});
