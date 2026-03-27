(() => {
  'use strict';

  // ---------- Helpers ----------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const params = new URLSearchParams(window.location.search);
  const getParam = (k, d=null) => params.has(k) ? params.get(k) : d;

  const setParam = (k, v) => {
    params.set(k, v);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.replaceState({}, '', newUrl);
  };

  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

  const escapeHtml = (s) => String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'","&#039;");

  // ---------- Condition config ----------
  const COND = (getParam('cond') || '').toUpperCase().trim();
  const COND_CONFIG = {
    A: { control: false, recourse: false },
    B: { control: true,  recourse: false },
    C: { control: false, recourse: true  },
    D: { control: true,  recourse: true  },
  };

  // If no cond param, show picker on landing.
  const condPicker = $('#condPicker');
  const condSelect = $('#condSelect');
  if (!COND_CONFIG[COND]) {
    condPicker.classList.remove('hidden');
  } else {
    condPicker.classList.add('hidden');
    condSelect.value = COND;
  }

  // ---------- Profiles ----------
  const PROFILES = [
    {
      key: 'classic_comfort',
      name: 'Classic Comfort',
      desc: 'Steady, easy-to-enjoy bottles with a smooth, balanced feel.',
    },
    {
      key: 'bright_explorer',
      name: 'Bright Explorer',
      desc: 'Lifted, refreshing picks with a brighter, playful character.',
    },
    {
      key: 'bold_indulgence',
      name: 'Bold Indulgence',
      desc: 'Deeper, structured styles with a fuller, more indulgent feel.',
    },
    {
      key: 'celebration_select',
      name: 'Celebration Select',
      desc: 'Festive, crowd-pleasing options that work well for special moments.',
    },
  ];
  const profileByKey = Object.fromEntries(PROFILES.map(p => [p.key, p]));

  // ---------- Recommendation catalog ----------
  // NOTE: Images are placeholders (SVG). You can replace them in assets/img.
  const catalog = [
    // Classic Comfort
    {
      id: 'harmony_red',
      name: 'Harmony Red Blend',
      img: 'assets/img/harmony_classic.svg',
      bullets: [
        'Balanced red with ripe berries and a touch of spice.',
        'Smooth, approachable style.',
        'Good for dinners and casual sipping.'
      ],
      tags: ['Matches your profile'],
      profile: 'classic_comfort',
      popularity: 65
    },
    {
      id: 'classic_cellar',
      name: 'Classic Cellar Reserve',
      img: 'assets/img/classic_comfort.svg',
      bullets: [
        'Comforting, round palate with a mellow finish.',
        'Easy to enjoy and broadly appealing.',
        'A steady choice for most occasions.'
      ],
      tags: ['Matches your profile'],
      profile: 'classic_comfort',
      popularity: 58
    },

    // Bright Explorer
    {
      id: 'radiance_white',
      name: 'Radiance White',
      img: 'assets/img/radiance_white.svg',
      bullets: [
        'Crisp citrus and soft floral notes.',
        'Light, refreshing feel.',
        'Pairs well with light meals.'
      ],
      tags: ['Matches your profile'],
      profile: 'bright_explorer',
      popularity: 60
    },
    {
      id: 'citrus_breeze',
      name: 'Citrus Breeze White',
      img: 'assets/img/citrus_breeze.svg',
      bullets: [
        'Bright aromatics with a clean finish.',
        'Easy-drinking and upbeat.',
        'Great for casual sipping.'
      ],
      tags: ['Matches your profile'],
      profile: 'bright_explorer',
      popularity: 55
    },

    // Bold Indulgence
    {
      id: 'bold_indulgence',
      name: 'Bold Indulgence Red',
      img: 'assets/img/bold_indulgence.svg',
      bullets: [
        'Deeper flavors with a fuller body.',
        'Feels richer and more intense.',
        'Great with hearty food.'
      ],
      tags: ['Matches your profile'],
      profile: 'bold_indulgence',
      popularity: 62
    },
    {
      id: 'barrel_select',
      name: 'Barrel Select Dark Red',
      img: 'assets/img/bold_indulgence.svg',
      bullets: [
        'Dark fruit notes with a structured finish.',
        'A more concentrated style.',
        'Good for slower sipping.'
      ],
      tags: ['Matches your profile'],
      profile: 'bold_indulgence',
      popularity: 50
    },

    // Celebration Select
    {
      id: 'velvet_sparkling',
      name: 'Velvet Sparkling',
      img: 'assets/img/velvet_sparkling.svg',
      bullets: [
        'Lively and refreshing with a smooth finish.',
        'Bright, celebration-friendly.',
        'Enjoyable on its own or with snacks.'
      ],
      tags: ['Matches your profile'],
      profile: 'celebration_select',
      popularity: 70
    },
    {
      id: 'celebration_select',
      name: 'Celebration Rosé',
      img: 'assets/img/celebration_select.svg',
      bullets: [
        'Festive feel with gentle fruit notes.',
        'Approachable for groups.',
        'Works well for social occasions.'
      ],
      tags: ['Matches your profile'],
      profile: 'celebration_select',
      popularity: 57
    },

    // Popular (other users' choices)
    {
      id: 'popular_pick_1',
      name: 'Top Rated Blend',
      img: 'assets/img/popular_pick.svg',
      bullets: [
        'A widely liked option based on other users’ feedback.',
        'Versatile across many occasions.',
        'A safe “popular” choice.'
      ],
      tags: ['Popular with others'],
      profile: null,
      popularity: 92
    },
    {
      id: 'popular_pick_2',
      name: 'Community Favorite White',
      img: 'assets/img/popular_pick.svg',
      bullets: [
        'Frequently selected by other users.',
        'Easy to pair with many foods.',
        'A light, crowd-pleasing pick.'
      ],
      tags: ['Popular with others'],
      profile: null,
      popularity: 88
    },
  ];

  // ---------- Quiz definition ----------
  const quiz = [
    {
      key: 'occasion',
      title: 'Are you shopping for a casual night in or a social get-together?',
      type: 'slider',
      left: 'Casual night in',
      right: 'Social get-together',
      defaultValue: 45
    },
    {
      key: 'body',
      title: 'Do you gravitate toward more delicate flavors or more intense flavors?',
      type: 'slider',
      left: 'More delicate',
      right: 'More intense',
      defaultValue: 50
    },
    {
      key: 'novelty',
      title: 'Do you prefer your usual picks or trying something new?',
      type: 'slider',
      left: 'My usual picks',
      right: 'Try something new',
      defaultValue: 40
    },
    {
      key: 'mood',
      title: 'Which mood fits better today?',
      type: 'radio',
      options: [
        { id: 'relaxed', title: 'Relaxed', desc: 'Easygoing, low-key vibe.' },
        { id: 'special',  title: 'Special', desc: 'A more festive or celebratory moment.' },
      ]
    },
    {
      key: 'sweetness',
      title: 'How much sweetness do you typically enjoy?',
      type: 'slider',
      left: 'Dry',
      right: 'Hint of sweetness',
      defaultValue: 35
    },
  ];

  // ---------- UI references ----------
  const backdrop = $('#backdrop');

  const modalQuiz = $('#modalQuiz');
  const quizSteps = $('#quizSteps');
  const quizProgressBar = $('#quizProgressBar');
  const quizBack = $('#quizBack');
  const quizNext = $('#quizNext');
  const quizClose = $('#quizClose');

  const modalControl = $('#modalControl');
  const weightSlider = $('#weightSlider');
  const lblPrefs = $('#lblPrefs');
  const lblOthers = $('#lblOthers');
  const controlConfirm = $('#controlConfirm');
  const controlClose = $('#controlClose');

  const modalResults = $('#modalResults');
  const resultsClose = $('#resultsClose');
  const sourceBalanceLine = $('#sourceBalanceLine');
  const reasoningPara = $('#reasoningPara');
  const recourseBlock = $('#recourseBlock');
  const btnReasonYes = $('#btnReasonYes');
  const btnReasonNo = $('#btnReasonNo');
  const recourseStatus = $('#recourseStatus');
  const repairPanel = $('#repairPanel');
  const profileOptions = $('#profileOptions');
  const btnApplyProfile = $('#btnApplyProfile');
  const recsGrid = $('#recsGrid');
  const btnContinue = $('#btnContinue');

  const modalDone = $('#modalDone');

  // ---------- State ----------
  const state = {
    cond: null,
    hasControl: false,
    hasRecourse: false,

    quizAnswers: {},
    quizStep: 0,

    weightPrefs: 50,   // 0..100 (preferences)
    weightOthers: 50,  // 0..100 (others)

    inferredProfile: null,
    activeProfile: null,    // may change after recourse
    profileDecisionMade: false,
    profileWasCorrected: false,

    currentRecs: [],
    lastRecs: [],
  };

  // ---------- Modal helpers ----------
  const openModal = (modalEl) => {
    backdrop.classList.remove('hidden');
    modalEl.classList.remove('hidden');
    // Prevent background scroll.
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modalEl) => {
    modalEl.classList.add('hidden');
    // If no other modals are open, hide backdrop and restore scroll.
    const anyOpen = [modalQuiz, modalControl, modalResults, modalDone].some(m => !m.classList.contains('hidden'));
    if (!anyOpen) {
      backdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  const closeAllModals = () => {
    [modalQuiz, modalControl, modalResults, modalDone].forEach(m => m.classList.add('hidden'));
    backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  };

  // ---------- Quiz rendering ----------
  const renderQuiz = () => {
    quizSteps.innerHTML = '';
    quiz.forEach((q, idx) => {
      const step = document.createElement('div');
      step.className = 'step';
      step.dataset.step = String(idx);
      step.style.display = (idx === state.quizStep) ? 'block' : 'none';

      const h = document.createElement('h3');
      h.textContent = q.title;
      step.appendChild(h);

      if (q.type === 'radio') {
        const wrap = document.createElement('div');
        wrap.className = 'option-list';

        q.options.forEach(opt => {
          const row = document.createElement('label');
          row.className = 'option';
          row.innerHTML = `
            <input type="radio" name="${escapeHtml(q.key)}" value="${escapeHtml(opt.id)}" />
            <div>
              <div class="option-title">${escapeHtml(opt.title)}</div>
              <div class="option-desc">${escapeHtml(opt.desc)}</div>
            </div>
          `;
          row.addEventListener('click', () => {
            const inp = row.querySelector('input');
            inp.checked = true;
            state.quizAnswers[q.key] = inp.value;
            updateQuizNav();
          });
          wrap.appendChild(row);
        });

        step.appendChild(wrap);
      }

      if (q.type === 'slider') {
        const wrap = document.createElement('div');
        wrap.className = 'slider-block';

        const input = document.createElement('input');
        input.type = 'range';
        input.min = '0';
        input.max = '100';
        input.value = String(q.defaultValue ?? 50);
        input.className = 'slider';

        const legend = document.createElement('div');
        legend.className = 'slider-legend';
        legend.innerHTML = `
          <div class="legend-col">
            <div class="legend-strong">${escapeHtml(q.left)}</div>
          </div>
          <div class="legend-mid"> </div>
          <div class="legend-col right">
            <div class="legend-strong">${escapeHtml(q.right)}</div>
          </div>
        `;

        input.addEventListener('input', () => {
          state.quizAnswers[q.key] = Number(input.value);
          updateQuizNav();
        });

        // Initialize stored answer to default for stable inference.
        state.quizAnswers[q.key] = Number(input.value);

        wrap.appendChild(input);
        wrap.appendChild(legend);
        step.appendChild(wrap);
      }

      quizSteps.appendChild(step);
    });

    updateQuizProgress();
    updateQuizNav();
  };

  const showQuizStep = (idx) => {
    state.quizStep = clamp(idx, 0, quiz.length - 1);
    $$('#quizSteps .step').forEach((el) => {
      el.style.display = (Number(el.dataset.step) === state.quizStep) ? 'block' : 'none';
    });
    updateQuizProgress();
    updateQuizNav();
  };

  const updateQuizProgress = () => {
    const pct = Math.round(((state.quizStep) / (quiz.length - 1)) * 100);
    quizProgressBar.style.width = `${pct}%`;
  };

  const isStepAnswered = (q) => {
    const v = state.quizAnswers[q.key];
    if (q.type === 'radio') return typeof v === 'string' && v.length > 0;
    if (q.type === 'slider') return typeof v === 'number' && !Number.isNaN(v);
    return false;
  };

  const updateQuizNav = () => {
    quizBack.disabled = (state.quizStep === 0);
    const q = quiz[state.quizStep];
    const answered = isStepAnswered(q);
    quizNext.textContent = (state.quizStep === quiz.length - 1) ? 'Finish' : 'Next';
    quizNext.disabled = !answered;
  };

  // ---------- Inference ----------
  const inferProfile = () => {
    const a = state.quizAnswers;
    const scores = {
      classic_comfort: 0,
      bright_explorer: 0,
      bold_indulgence: 0,
      celebration_select: 0,
    };

    const occasion = Number(a.occasion);   // 0 = night in, 100 = social
    const body = Number(a.body);           // 0 = light, 100 = rich
    const novelty = Number(a.novelty);     // 0 = familiar, 100 = different
    const mood = String(a.mood || 'relaxed');
    const sweet = Number(a.sweetness);     // 0 dry, 100 sweet

    // Occasion
    if (occasion >= 60) {
      scores.celebration_select += 2;
      scores.bright_explorer += 1;
    } else if (occasion <= 40) {
      scores.classic_comfort += 2;
      scores.bold_indulgence += 1;
    } else {
      scores.classic_comfort += 1;
      scores.celebration_select += 1;
    }

    // Body
    if (body >= 60) {
      scores.bold_indulgence += 2;
      scores.celebration_select += 1;
    } else if (body <= 40) {
      scores.bright_explorer += 2;
      scores.classic_comfort += 1;
    } else {
      scores.classic_comfort += 1;
      scores.bright_explorer += 1;
    }

    // Novelty
    if (novelty >= 60) {
      scores.bright_explorer += 2;
      scores.celebration_select += 1;
    } else if (novelty <= 40) {
      scores.classic_comfort += 2;
      scores.bold_indulgence += 1;
    } else {
      scores.classic_comfort += 1;
      scores.bright_explorer += 1;
    }

    // Mood
    if (mood === 'special') {
      scores.celebration_select += 3;
    } else {
      scores.classic_comfort += 2;
    }

    // Sweetness
    if (sweet >= 60) {
      scores.bright_explorer += 1;
      scores.celebration_select += 1;
    } else if (sweet <= 40) {
      scores.classic_comfort += 1;
      scores.bold_indulgence += 1;
    } else {
      scores.classic_comfort += 1;
    }

    // Choose max; tiebreak using mood and body.
    const entries = Object.entries(scores).sort((a,b) => b[1]-a[1]);
    const topScore = entries[0][1];
    const tied = entries.filter(e => e[1] === topScore).map(e => e[0]);

    if (tied.length === 1) return tied[0];

    // Tie-break rules
    if (mood === 'special' && tied.includes('celebration_select')) return 'celebration_select';
    if (body >= 60 && tied.includes('bold_indulgence')) return 'bold_indulgence';
    if (body <= 40 && tied.includes('bright_explorer')) return 'bright_explorer';
    return tied[0];
  };

  // ---------- Recommendations ----------
  const pickRecommendations = (profileKey) => {
    // Mix profile-matching items + popular items based on weighting.
    const prefW = clamp(Math.round(state.weightPrefs), 0, 100);
    const prefCount = (prefW >= 67) ? 3 : (prefW >= 34) ? 2 : 1;
    const otherCount = 3 - prefCount;

    const profilePool = catalog.filter(x => x.profile === profileKey);
    const popularPool = catalog.filter(x => x.profile === null).sort((a,b) => b.popularity - a.popularity);

    // Deterministic but a bit varied: rotate by profileKey.
    const rot = (profileKey.charCodeAt(0) + profileKey.charCodeAt(profileKey.length-1)) % 10;
    const rotatedProfile = profilePool.slice(rot % profilePool.length).concat(profilePool.slice(0, rot % profilePool.length));

    const picks = [];
    rotatedProfile.slice(0, prefCount).forEach(x => picks.push(x));

    popularPool.slice(0, otherCount).forEach(x => picks.push(x));

    // If duplicates somehow (shouldn't), unique by id.
    const uniq = [];
    const seen = new Set();
    for (const x of picks) {
      if (!seen.has(x.id)) { uniq.push(x); seen.add(x.id); }
    }
    // Ensure 3 items; if short, fill from profilePool then popularPool.
    const fillFrom = profilePool.concat(popularPool);
    for (const x of fillFrom) {
      if (uniq.length >= 3) break;
      if (!seen.has(x.id)) { uniq.push(x); seen.add(x.id); }
    }
    return uniq.slice(0,3);
  };

  const renderRecommendations = (items, { highlightUpdated=false }={}) => {
    recsGrid.innerHTML = '';
    const prevIds = new Set(state.lastRecs.map(x => x.id));

    items.forEach((it) => {
      const card = document.createElement('div');
      const wasInPrev = prevIds.has(it.id);
      const isUpdated = highlightUpdated && !wasInPrev;

      card.className = 'rec-card' + (isUpdated ? ' updated' : '');

      const tagHtml = (() => {
        if (isUpdated) return `<div class="tag updated">Updated after your correction</div>`;
        const isPopular = (it.profile === null);
        if (isPopular) return `<div class="tag popular">Popular with others</div>`;
        return '';
      })();

      card.innerHTML = `
        <div class="rec-img"><img src="${escapeHtml(it.img)}" alt="" /></div>
        <div class="rec-body">
          <h4 class="rec-title">${escapeHtml(it.name)}</h4>
          ${tagHtml}
          <ul class="rec-bullets">
            ${it.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
          </ul>
        </div>
      `;
      recsGrid.appendChild(card);
    });
  };

  // ---------- Results (explanation + recourse) ----------
  const setSourceBalanceLine = () => {
    sourceBalanceLine.textContent = `Source balance: ${state.weightPrefs}% your preferences · ${state.weightOthers}% other users’ choices`;
  };

  const setReasoningParagraph = () => {
    const profile = profileByKey[state.activeProfile];
    const profileNames = PROFILES.map(p => p.name).join(', ');
    reasoningPara.textContent =
      `We group preferences into four broad profiles (${profileNames}). ` +
      `Based on your answers, we inferred your overall profile is “${profile.name}.” ` +
      `We used this profile and your selected source balance to prioritize the recommendations shown below.`;
  };

  const renderProfileOptions = () => {
    profileOptions.innerHTML = '';
    PROFILES.forEach((p) => {
      const el = document.createElement('label');
      el.className = 'profile-card';
      el.dataset.key = p.key;

      el.innerHTML = `
        <input type="radio" name="profilePick" value="${escapeHtml(p.key)}" />
        <div>
          <div class="profile-name">${escapeHtml(p.name)}</div>
          <div class="profile-desc">${escapeHtml(p.desc)}</div>
        </div>
      `;

      el.addEventListener('click', () => {
        const input = el.querySelector('input');
        input.checked = true;
        $$('#profileOptions .profile-card').forEach(x => x.classList.remove('selected'));
        el.classList.add('selected');

        btnApplyProfile.disabled = (input.value === state.activeProfile);
      });

      profileOptions.appendChild(el);
    });
  };

  const setStatus = (msg, kind='ok') => {
    recourseStatus.textContent = msg;
    recourseStatus.classList.remove('hidden');
    recourseStatus.classList.toggle('warn', kind === 'warn');
  };

  const clearStatus = () => {
    recourseStatus.classList.add('hidden');
    recourseStatus.textContent = '';
    recourseStatus.classList.remove('warn');
  };

  const resetRecourseUI = () => {
    clearStatus();
    repairPanel.classList.add('hidden');
    btnApplyProfile.disabled = true;
    $$('#profileOptions .profile-card').forEach(x => x.classList.remove('selected'));
    $$('#profileOptions input[type="radio"]').forEach(x => x.checked = false);

    btnReasonYes.disabled = false;
    btnReasonNo.disabled = false;
  };

  const showResults = () => {
    // Compute recommendations.
    state.lastRecs = []; // first render has no prev.
    state.currentRecs = pickRecommendations(state.activeProfile);

    // Update explanation.
    setSourceBalanceLine();
    setReasoningParagraph();

    // Recourse block
    if (state.hasRecourse) {
      recourseBlock.classList.remove('hidden');
      resetRecourseUI();
      btnContinue.disabled = true;
      state.profileDecisionMade = false;
      state.profileWasCorrected = false;
    } else {
      recourseBlock.classList.add('hidden');
      btnContinue.disabled = false;
      state.profileDecisionMade = true;
    }

    // Render recommendations
    renderRecommendations(state.currentRecs, { highlightUpdated: false });

    openModal(modalResults);
  };

  // ---------- Events ----------
  $('#btnStart').addEventListener('click', () => {
    // Set condition from URL or picker.
    let chosenCond = (getParam('cond') || '').toUpperCase().trim();
    if (!COND_CONFIG[chosenCond]) {
      chosenCond = (condSelect.value || 'D').toUpperCase();
      setParam('cond', chosenCond);
      condPicker.classList.add('hidden');
    }

    const cfg = COND_CONFIG[chosenCond] || COND_CONFIG.D;
    state.cond = chosenCond;
    state.hasControl = cfg.control;
    state.hasRecourse = cfg.recourse;

    // Reset state for a clean run.
    state.quizAnswers = {};
    state.quizStep = 0;
    state.weightPrefs = 50;
    state.weightOthers = 50;
    state.inferredProfile = null;
    state.activeProfile = null;
    state.profileDecisionMade = false;
    state.profileWasCorrected = false;
    state.currentRecs = [];
    state.lastRecs = [];

    // Render quiz and open.
    renderQuiz();
    showQuizStep(0);
    openModal(modalQuiz);
  });

  quizClose.addEventListener('click', () => {
    closeAllModals();
  });

  quizBack.addEventListener('click', () => {
    showQuizStep(state.quizStep - 1);
  });

  quizNext.addEventListener('click', () => {
    if (state.quizStep < quiz.length - 1) {
      showQuizStep(state.quizStep + 1);
      return;
    }

    // Finish quiz.
    state.inferredProfile = inferProfile();
    state.activeProfile = state.inferredProfile;

    closeModal(modalQuiz);

    if (state.hasControl) {
      // Open control modal.
      weightSlider.value = '50';
      lblPrefs.textContent = '50%';
      lblOthers.textContent = '50%';
      openModal(modalControl);
    } else {
      showResults();
    }
  });

  // Control modal
  weightSlider.addEventListener('input', () => {
    const others = clamp(Number(weightSlider.value), 0, 100);
    const prefs = 100 - others;

    // We store as preferences vs other users (to match copy).
    state.weightPrefs = prefs;
    state.weightOthers = others;

    lblPrefs.textContent = `${prefs}%`;
    lblOthers.textContent = `${others}%`;
  });

  controlConfirm.addEventListener('click', () => {
    // Confirm uses the latest slider value.
    const others = clamp(Number(weightSlider.value), 0, 100);
    state.weightOthers = others;
    state.weightPrefs = 100 - others;

    closeModal(modalControl);
    showResults();
  });

  controlClose.addEventListener('click', () => {
    // In experiment we'd prefer not to allow closing, but keep safe fallback:
    // treat as confirm with current value.
    controlConfirm.click();
  });

  // Results modal close
  resultsClose.addEventListener('click', () => {
    // For experiment, closing is discouraged; still allow safe close.
    closeAllModals();
  });

  // Recourse buttons
  btnReasonYes.addEventListener('click', () => {
    state.profileDecisionMade = true;
    clearStatus();
    repairPanel.classList.add('hidden');

    // Lock decision (avoid loops) once they say Yes (unless they haven't corrected).
    if (!state.profileWasCorrected) {
      setStatus('Confirmed. We will keep using this profile.', 'ok');
    } else {
      setStatus('Saved. We will keep using your updated profile.', 'ok');
    }
    btnContinue.disabled = false;

    // After confirmation, prevent further changes to keep manipulation clean.
    btnReasonYes.disabled = true;
    btnReasonNo.disabled = true;
    btnApplyProfile.disabled = true;
  });

  btnReasonNo.addEventListener('click', () => {
    clearStatus();
    setStatus('Okay — you can correct the profile below.', 'warn');
    repairPanel.classList.remove('hidden');
    renderProfileOptions();
    btnContinue.disabled = true;
  });

  btnApplyProfile.addEventListener('click', () => {
    const picked = ($('input[name="profilePick"]:checked') || {}).value;
    if (!picked || picked === state.activeProfile) return;

    // Apply correction
    state.profileWasCorrected = true;
    state.profileDecisionMade = true;
    state.activeProfile = picked;

    // Refresh explanation
    setSourceBalanceLine();
    setReasoningParagraph();

    // Refresh recommendations with visible change.
    state.lastRecs = state.currentRecs.slice();
    state.currentRecs = pickRecommendations(state.activeProfile);

    // Ensure at least one visible change. If identical, force one swap from profile pool.
    const lastIds = new Set(state.lastRecs.map(x => x.id));
    const newIds = new Set(state.currentRecs.map(x => x.id));
    let diffCount = 0;
    for (const id of newIds) if (!lastIds.has(id)) diffCount++;
    if (diffCount === 0) {
      const alt = catalog.find(x => x.profile === state.activeProfile && !newIds.has(x.id));
      if (alt) state.currentRecs[0] = alt;
    }

    renderRecommendations(state.currentRecs, { highlightUpdated: true });

    // Acknowledge.
    setStatus('Profile updated. Recommendations refreshed.', 'ok');

    // Enable continue and lock recourse to one correction (clean manipulation).
    btnContinue.disabled = false;
    btnReasonYes.disabled = true;
    btnReasonNo.disabled = true;
    btnApplyProfile.disabled = true;
    // Keep the correction panel visible but inert (so it’s clear what happened).
  });

  // Continue -> Done
  btnContinue.addEventListener('click', () => {
    closeModal(modalResults);
    openModal(modalDone);

    // Optional redirect
    const returnUrl = getParam('return_url', null);
    if (returnUrl) {
      // Append a simple completion marker.
      const u = new URL(returnUrl);
      u.searchParams.set('rs_done', '1');
      u.searchParams.set('cond', state.cond || '');
      u.searchParams.set('profile', state.activeProfile || '');
      setTimeout(() => {
        window.location.href = u.toString();
      }, 1200);
    }
  });

  // Backdrop click: do nothing (avoid accidental closes).
  backdrop.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

})();
