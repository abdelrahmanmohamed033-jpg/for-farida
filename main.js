/* ==================================================================
   MAIN.JS (Updated with Neon Pink Matrix Intro)
   ================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------------
     0. INTRO SEQUENCE (Matrix Countdown)
     ---------------------------------------------------------------- */
  const introContainer = document.getElementById('intro-container');
  const mainContent = document.getElementById('main-content');
  const mCanvas = document.getElementById('matrix-canvas');
  const mCtx = mCanvas.getContext('2d');
  const introText = document.getElementById('intro-text');

  function resizeMatrix() {
    mCanvas.width = window.innerWidth;
    mCanvas.height = window.innerHeight;
  }
  resizeMatrix();
  window.addEventListener('resize', resizeMatrix);

  const mChars = 'FARIDA'.split('');
  const mFontSize = 16;
  let columns = mCanvas.width / mFontSize;
  let drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    mCtx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Fades frame to black background
    mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
    
    mCtx.fillStyle = '#FF1493'; // Neon Pink
    mCtx.font = mFontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = mChars[Math.floor(Math.random() * mChars.length)];
      mCtx.fillText(text, i * mFontSize, drops[i] * mFontSize);
      
      if (drops[i] * mFontSize > mCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  const matrixInterval = setInterval(drawMatrix, 100);

  const introSequence = ["3", "2", "1", "HAPPY", "BIRTHDAY", "TO", "MY FUTURE WIFE"  , "FARIDA", "❤️"];
  let introIndex = 0;

  function showNextWord() {
    if (introIndex < introSequence.length) {
      introText.innerText = introSequence[introIndex];
      introText.classList.remove('hide');
      introText.classList.add('show');
      
      setTimeout(() => {
        introText.classList.remove('show');
        introText.classList.add('hide');
        introIndex++;
        setTimeout(showNextWord, 400); 
      }, 800); 
    } else {
      // Intro finished: hide intro, show main site
      clearInterval(matrixInterval);
      introContainer.style.display = 'none';
      mainContent.style.display = 'block';
    }
  }

  setTimeout(showNextWord, 500);


  /* ----------------------------------------------------------------
     1. LOADING SCREEN
     ---------------------------------------------------------------- */
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => loadingScreen.classList.add('hidden'), 900);
  });
  setTimeout(() => loadingScreen.classList.add('hidden'), 3500);


  /* ----------------------------------------------------------------
     2. AMBIENT FLOATING HEARTS & PETALS
     ---------------------------------------------------------------- */
  const heartsLayer = document.getElementById('ambient-hearts');
  const petalsLayer = document.getElementById('ambient-petals');

  function spawnFloatingItem(layer, glyph, opts = {}) {
    const el = document.createElement('span');
    el.className = 'floating-item';
    el.textContent = glyph;
    const size = opts.size || (14 + Math.random() * 18);
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = size + 'px';
    el.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
    const duration = opts.duration || (10 + Math.random() * 10);
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = (Math.random() * 4) + 's';
    layer.appendChild(el);
    setTimeout(() => el.remove(), (duration + 4) * 1000);
  }

  setInterval(() => spawnFloatingItem(heartsLayer, '❤️', { size: 14 + Math.random() * 12 }), 1400);
  setInterval(() => spawnFloatingItem(petalsLayer, '🌸', { size: 14 + Math.random() * 10, duration: 14 }), 2200);


  /* ----------------------------------------------------------------
     3. CURSOR HEART TRAIL
     ---------------------------------------------------------------- */
  const canvas = document.getElementById('cursor-trail');
  const ctx = canvas.getContext('2d');
  function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let trailParticles = [];
  function addTrailParticle(x, y) {
    trailParticles.push({ x, y, life: 1, size: 8 + Math.random() * 6 });
    if (trailParticles.length > 40) trailParticles.shift();
  }
  window.addEventListener('pointermove', (e) => addTrailParticle(e.clientX, e.clientY));

  function drawHeart(x, y, size, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 20, size / 20);
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(-10, -6, -20, 2, 0, 16);
    ctx.bezierCurveTo(20, 2, 10, -6, 0, 6);
    ctx.fillStyle = `rgba(201, 79, 79, ${alpha})`;
    ctx.fill();
    ctx.restore();
  }

  function animateTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trailParticles.forEach(p => {
      drawHeart(p.x, p.y, p.size * p.life, p.life * 0.5);
      p.life -= 0.03;
      p.y -= 0.4;
    });
    trailParticles = trailParticles.filter(p => p.life > 0);
    requestAnimationFrame(animateTrail);
  }
  animateTrail();


  /* ----------------------------------------------------------------
     4. PROPOSAL — "NO" BUTTON CHASE + "YES" BUTTON FLOW
     ---------------------------------------------------------------- */
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const noMessage = document.getElementById('no-message');
  const buttonRow = document.querySelector('.button-row');

  const funnyMessages = [
    'Are you sure?',
    'Think again...',
    "That's impossible ❤️",
    'Nice try 😂',
    'Wrong choice...',
    'You almost got it! (you did not)',
    'Nope, try again 😏'
  ];

  let noAttempts = 0;
  const maxAttempts = funnyMessages.length + 1;

  function moveNoButton() {
    btnNo.classList.add('roaming');
    const btnRect = btnNo.getBoundingClientRect();
    const margin = 20;
    const maxX = window.innerWidth - btnRect.width - margin;
    const maxY = window.innerHeight - btnRect.height - margin;
    const newX = Math.max(margin, Math.random() * maxX);
    const newY = Math.max(margin, Math.random() * maxY);
    btnNo.style.left = newX + 'px';
    btnNo.style.top = newY + 'px';

    const scale = Math.max(0.55, 1 - noAttempts * 0.06);
    btnNo.style.transform = `scale(${scale})`;
  }

  function handleNoEscape() {
    noAttempts++;
    if (noAttempts >= maxAttempts) {
      btnNo.remove();
      const finalLine = document.createElement('p');
      finalLine.className = 'final-answer';
      finalLine.textContent = 'Sorry... Wrong Answer ❤️';
      buttonRow.appendChild(finalLine);
      noMessage.textContent = '';
      return;
    }
    const msg = funnyMessages[Math.min(noAttempts - 1, funnyMessages.length - 1)];
    noMessage.textContent = msg;
    moveNoButton();
  }

  function attachNoButtonHandlers(el) {
    el.addEventListener('pointerenter', handleNoEscape);
    el.addEventListener('touchstart', (e) => { e.preventDefault(); handleNoEscape(); }, { passive: false });
    el.addEventListener('click', (e) => { e.preventDefault(); handleNoEscape(); });
  }
  attachNoButtonHandlers(btnNo);


  const modalBackdrop = document.getElementById('modal-backdrop');
  const modal1 = document.getElementById('modal-1');
  const modal2 = document.getElementById('modal-2');
  const proposalScreen = document.getElementById('proposal');
  const journey = document.getElementById('journey');
  const bgMusic = document.getElementById('bg-music');

  const modalHold = document.getElementById('modal-hold');
  const modalHoldSure = document.getElementById('modal-hold-sure');
  const modalHoldSureSure = document.getElementById('modal-hold-suresure');
  const modalHoldTransition = document.getElementById('modal-hold-transition');
  const modalHoldFinal = document.getElementById('modal-hold-final');

  function openModal(modal) {
    modalBackdrop.classList.add('active');
    modal.classList.add('active');
  }
  function closeModal(modal) {
    modal.classList.remove('active');
    modalBackdrop.classList.remove('active');
  }

  btnYes.addEventListener('click', () => openModal(modal1));

  document.getElementById('modal1-no').addEventListener('click', () => closeModal(modal1));
  document.getElementById('modal1-yes').addEventListener('click', () => {
    closeModal(modal1);
    setTimeout(() => openModal(modal2), 350);
  });

  document.getElementById('modal2-no').addEventListener('click', () => closeModal(modal2));
  document.getElementById('modal2-yes').addEventListener('click', () => {
    closeModal(modal2);
    setTimeout(() => openModal(modalHold), 350);
  });

  document.getElementById('modal-hold-yes').addEventListener('click', () => {
    closeModal(modalHold);
    setTimeout(() => {
      openModal(modalHoldTransition);
      setTimeout(() => {
        closeModal(modalHoldTransition);
        beginJourney();
      }, 2600);
    }, 350);
  });

  document.getElementById('modal-hold-no').addEventListener('click', () => {
    closeModal(modalHold);
    setTimeout(() => openModal(modalHoldSure), 350);
  });

  document.getElementById('modal-hold-sure-yes').addEventListener('click', () => {
    closeModal(modalHoldSure);
    setTimeout(() => openModal(modalHoldSureSure), 350);
  });
  document.getElementById('modal-hold-sure-no').addEventListener('click', () => {
    closeModal(modalHoldSure);
    setTimeout(() => openModal(modalHold), 350);
  });

  document.getElementById('modal-hold-suresure-yes').addEventListener('click', () => {
    closeModal(modalHoldSureSure);
    setTimeout(() => {
      openModal(modalHoldFinal);
      setTimeout(() => {
        closeModal(modalHoldFinal);
        restartProposal();
      }, 2600);
    }, 350);
  });
  document.getElementById('modal-hold-suresure-no').addEventListener('click', () => {
    closeModal(modalHoldSureSure);
    setTimeout(() => openModal(modalHoldSure), 350);
  });

  function restartProposal() {
    noAttempts = 0;
    noMessage.textContent = '';

    let currentNoBtn = document.getElementById('btn-no');
    const finalAnswerLine = buttonRow.querySelector('.final-answer');
    if (finalAnswerLine) finalAnswerLine.remove();

    if (!currentNoBtn) {
      currentNoBtn = document.createElement('button');
      currentNoBtn.id = 'btn-no';
      currentNoBtn.className = 'btn btn-no';
      currentNoBtn.textContent = '💔 No';
      buttonRow.appendChild(currentNoBtn);
      attachNoButtonHandlers(currentNoBtn);
    } else {
      currentNoBtn.classList.remove('roaming');
      currentNoBtn.style.left = '';
      currentNoBtn.style.top = '';
      currentNoBtn.style.transform = '';
    }

    proposalScreen.scrollIntoView({ behavior: 'smooth' });
  }

  function beginJourney() {
    proposalScreen.style.transition = 'opacity 0.9s ease, visibility 0.9s ease';
    proposalScreen.style.opacity = '0';
    setTimeout(() => {
      proposalScreen.style.display = 'none';
      journey.classList.add('active');
      journey.scrollIntoView({ behavior: 'smooth' });
      initScrollReveal();
      initThreadRail();
    }, 900);

    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
      musicToggle.classList.add('playing');
    }).catch(() => {});
  }


  /* ----------------------------------------------------------------
     5. MUSIC TOGGLE
     ---------------------------------------------------------------- */
  const musicToggle = document.getElementById('music-toggle');
  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play().then(() => musicToggle.classList.add('playing')).catch(() => {});
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
    }
  });


  /* ----------------------------------------------------------------
     5b. THREAD RAIL
     ---------------------------------------------------------------- */
  function initThreadRail() {
    const rail = document.getElementById('thread-rail');
    const fill = document.getElementById('thread-fill');
    const heart = document.getElementById('thread-heart');
    rail.classList.add('active');

    function updateThread() {
      const journeyRect = journey.getBoundingClientRect();
      const journeyHeight = journey.scrollHeight;
      const scrolledIntoJourney = -journeyRect.top;
      const progress = Math.min(Math.max(scrolledIntoJourney / (journeyHeight - window.innerHeight), 0), 1);
      fill.style.height = (progress * 100) + '%';
      heart.style.top = (progress * 100) + '%';

      rail.style.opacity = progress > 0.02 ? '1' : '0';
    }

    window.addEventListener('scroll', updateThread, { passive: true });
    updateThread();
  }


  /* ----------------------------------------------------------------
     6. SCROLL REVEAL
     ---------------------------------------------------------------- */
  function initScrollReveal() {
    const fadeTargets = document.querySelectorAll('#journey .fade-target');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.classList.contains('collage')) {
            const polaroids = entry.target.querySelectorAll('.polaroid');
            polaroids.forEach((p, i) => {
              setTimeout(() => p.classList.add('drop-in'), i * 220);
            });
          }
        }
      });
    }, { threshold: 0.2 });

    fadeTargets.forEach(el => observer.observe(el));

    window.addEventListener('scroll', () => {
      document.querySelectorAll('.chapter-number').forEach(num => {
        const rect = num.parentElement.getBoundingClientRect();
        const progress = 1 - Math.min(Math.max(rect.top / window.innerHeight, 0), 1);
        num.style.transform = `translateY(${progress * -30}px)`;
      });
    }, { passive: true });

    initFinaleTrigger();
  }


  /* ----------------------------------------------------------------
     7. FINALE SEQUENCE
     ---------------------------------------------------------------- */
  let finaleStarted = false;

  function initFinaleTrigger() {
    const trigger = document.getElementById('finale-trigger');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !finaleStarted) {
          finaleStarted = true;
          runFinale();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(trigger);
  }

  function runFinale() {
    startFinaleParticles();

    const lines = document.querySelectorAll('.finale-line');
    const title = document.querySelector('.finale-title');
    const heart = document.querySelector('.finale-heart');

    lines.forEach((line, i) => {
      setTimeout(() => line.classList.add('visible'), 900 + i * 1600);
    });
    const lastLineDelay = 900 + lines.length * 1600;
    setTimeout(() => title.classList.add('visible'), lastLineDelay + 400);
    setTimeout(() => heart.classList.add('visible'), lastLineDelay + 900);
  }

  function startFinaleParticles() {
    const fCanvas = document.getElementById('finale-canvas');
    const fCtx = fCanvas.getContext('2d');
    function resize() {
      fCanvas.width = fCanvas.offsetWidth;
      fCanvas.height = fCanvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const glyphs = ['❤️', '💋', '✨', '💫', '🌟'];
    const confettiColors = ['#F6C9D0', '#D4AF37', '#C94F4F', '#B76E79', '#FFFFFF'];

    const particles = [];
    const fireflies = [];

    function spawnParticle() {
      particles.push({
        x: Math.random() * fCanvas.width,
        y: fCanvas.height + 20,
        vx: (Math.random() - 0.5) * 1.4,
        vy: -(0.6 + Math.random() * 1.6),
        size: 14 + Math.random() * 18,
        glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
        rot: Math.random() * 360,
        vr: (Math.random() - 0.5) * 3,
        life: 1,
        isConfetti: Math.random() < 0.3,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)]
      });
    }

    function spawnFirefly() {
      fireflies.push({
        x: Math.random() * fCanvas.width,
        y: Math.random() * fCanvas.height,
        r: 1.5 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4
      });
    }
    for (let i = 0; i < 40; i++) spawnFirefly();

    let spawnTimer = 0;
    let running = true;
    setTimeout(() => { running = false; }, 9000);

    function tick() {
      fCtx.clearRect(0, 0, fCanvas.width, fCanvas.height);

      if (running) {
        spawnTimer++;
        if (spawnTimer % 3 === 0) spawnParticle();
      }

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.0035;
        fCtx.save();
        fCtx.translate(p.x, p.y);
        fCtx.rotate(p.rot * Math.PI / 180);
        fCtx.globalAlpha = Math.max(p.life, 0);
        if (p.isConfetti) {
          fCtx.fillStyle = p.color;
          fCtx.fillRect(-4, -6, 8, 12);
        } else {
          fCtx.font = p.size + 'px sans-serif';
          fCtx.textAlign = 'center';
          fCtx.fillText(p.glyph, 0, 0);
        }
        fCtx.restore();
      });
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].life <= 0 || particles[i].y < -40) particles.splice(i, 1);
      }

      fireflies.forEach(f => {
        f.x += f.speedX;
        f.y += f.speedY;
        f.phase += 0.03;
        const glow = (Math.sin(f.phase) + 1) / 2;
        fCtx.beginPath();
        fCtx.arc(f.x, f.y, f.r + glow * 1.5, 0, Math.PI * 2);
        fCtx.fillStyle = `rgba(212, 175, 55, ${0.3 + glow * 0.5})`;
        fCtx.shadowBlur = 10;
        fCtx.shadowColor = 'rgba(212,175,55,0.8)';
        fCtx.fill();
        fCtx.shadowBlur = 0;
        if (f.x < 0 || f.x > fCanvas.width) f.speedX *= -1;
        if (f.y < 0 || f.y > fCanvas.height) f.speedY *= -1;
      });

      requestAnimationFrame(tick);
    }
    tick();
  }

});