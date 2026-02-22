// Herramientas de Probabilidad - interactividad unificada
(function(){
  function onReady(fn){ if(document.readyState!=='loading'){fn();} else {document.addEventListener('DOMContentLoaded', fn);} }

  onReady(function(){
    // ================= Conceptos: Generador de Espacio Muestral =================
    const sampleType = document.getElementById('sample-type');
    const sampleOutput = document.getElementById('sample-output');
    function renderSample(){
      if(!sampleType || !sampleOutput) return;
      const type = sampleType.value;
      let omega = [];
      if(type==='coin'){
        omega = ['Cara','Cruz'];
      } else if(type==='two-coins'){
        const faces = ['Cara','Cruz'];
        for(const a of faces){ for(const b of faces){ omega.push(`${a}-${b}`); } }
      } else if(type==='die'){
        omega = [1,2,3,4,5,6];
      } else if(type==='two-dice'){
        for(let a=1;a<=6;a++){ for(let b=1;b<=6;b++){ omega.push(`(${a},${b})`);} }
      }
      sampleOutput.textContent = `Ω = { ${omega.join(', ')} }\n|Ω| = ${omega.length}`;
    }
    if(sampleType){ sampleType.addEventListener('change', renderSample); renderSample(); }

    // ================= Frecuencia: Simulación de Moneda =================
    let total = 0, cara = 0, cruz = 0;
    const btns = document.querySelectorAll('.interactive-tool .btn[data-runs]');
    const barCara = document.getElementById('bar-cara');
    const barCruz = document.getElementById('bar-cruz');
    const statTotal = document.getElementById('stat-total');
    const statCara = document.getElementById('stat-cara');
    const statCruz = document.getElementById('stat-cruz');
    const resetSim = document.getElementById('reset-sim');

    function updateBars(){
      if(!barCara || !barCruz) return;
      const pCara = total? (cara/total):0;
      const pCruz = total? (cruz/total):0;
      barCara.style.height = (10 + pCara*90) + '%';
      barCruz.style.height = (10 + pCruz*90) + '%';
      if(statTotal) statTotal.textContent = total;
      if(statCara) statCara.textContent = `${cara} (${(pCara*100).toFixed(1)}%)`;
      if(statCruz) statCruz.textContent = `${cruz} (${(pCruz*100).toFixed(1)}%)`;
    }
    function runCoin(n){
      for(let i=0;i<n;i++){
        if(Math.random()<0.5){ cara++; } else { cruz++; }
        total++;
      }
      updateBars();
    }
    if(btns && btns.length){ btns.forEach(b=> b.addEventListener('click', ()=> runCoin(parseInt(b.dataset.runs,10)))); }
    if(resetSim){ resetSim.addEventListener('click', ()=>{ total=0; cara=0; cruz=0; updateBars(); }); }
    updateBars();

    // ================= Frecuencia: Simulación de Dado =================
    const diceButtons = document.querySelectorAll('#dice-sim .btn[data-dice-runs]');
    const resetDice = document.getElementById('reset-dice');
    const diceCounts = {1:0,2:0,3:0,4:0,5:0,6:0};
    let diceTotal = 0;
    function updateDiceBars(){
      for(let f=1; f<=6; f++){
        const el = document.getElementById('d'+f);
        if(!el) continue;
        const p = diceTotal? (diceCounts[f]/diceTotal): 0;
        el.style.height = (10 + p*90) + '%';
        el.textContent = `${f}\n${diceCounts[f]} (${(p*100).toFixed(1)}%)`;
      }
    }
    function runDice(n){
      for(let i=0;i<n;i++){
        const r = 1 + Math.floor(Math.random()*6);
        diceCounts[r]++; diceTotal++;
      }
      updateDiceBars();
    }
    if(diceButtons && diceButtons.length){ diceButtons.forEach(b=> b.addEventListener('click', ()=> runDice(parseInt(b.dataset.diceRuns,10)))); }
    if(resetDice){ resetDice.addEventListener('click', ()=>{ for(let f=1;f<=6;f++) diceCounts[f]=0; diceTotal=0; updateDiceBars(); }); }
    updateDiceBars();

    // ================= Reglas: Árbol y Mini Quiz =================
    const treeContainer = document.getElementById('tree-container');
    if(treeContainer){
      const tree = [
        'Inicio',
        ' ├── Cara (1/2)',
        ' │    ├── Cara (1/2)  → P = 1/4',
        ' │    └── Cruz (1/2)  → P = 1/4',
        ' └── Cruz (1/2)',
        '      ├── Cara (1/2)  → P = 1/4',
        '      └── Cruz (1/2)  → P = 1/4'
      ].join('\n');
      treeContainer.textContent = tree;
    }

    const quizQ = document.getElementById('prob-quiz-question');
    const quizOps = document.getElementById('prob-quiz-options');
    const quizFb = document.getElementById('prob-quiz-feedback');
    const qset = [
      { es:'En un dado, P(sacar 1 ó 2) = ?', eu:'Dadoan, P(1 edo 2 ateratzea) = ?', options:['1/6','2/6','3/6','4/6'], answer:'2/6' },
      { es:'Dos monedas: P(2 caras) = ?', eu:'Bi txanpon: P(2 aurpegi) = ?', options:['1/2','1/3','1/4','3/4'], answer:'1/4' },
      { es:'Complementario: si P(llover)=0,3 entonces P(no llover)=?', eu:'Osagarria: P(euria)=0,3 bada, P(euria ez)=?', options:['0,3','0,5','0,7','1,3'], answer:'0,7' }
    ];
    let qi = 0;
    function loadQ(){
      if(!quizQ || !quizOps || !quizFb) return;
      const lang = (localStorage.getItem('language')||'es');
      const q = qset[qi];
      quizQ.textContent = (lang==='es')? q.es : q.eu;
      quizOps.innerHTML=''; quizFb.textContent='';
      q.options.forEach(opt=>{
        const b=document.createElement('button');
        b.className='opcion-quiz';
        b.textContent=opt; b.addEventListener('click', ()=> check(opt, b));
        quizOps.appendChild(b);
      });
    }
    function check(sel, btn){
      const q=qset[qi];
      const correct = sel===q.answer;
      quizFb.textContent = (localStorage.getItem('language')||'es')==='es' ? (correct?'¡Correcto!':'Inténtalo de nuevo') : (correct?'Zuzena!':'Saiatu berriro');
      [...quizOps.children].forEach(b=> b.disabled=true);
      setTimeout(()=>{ qi=(qi+1)%qset.length; loadQ(); }, 1800);
    }
    if(quizQ){ loadQ(); }

    // Re-cargar quiz en cambio de idioma
    const langToggle = document.getElementById('lang-toggle');
    if(langToggle){ langToggle.addEventListener('click', ()=> setTimeout(loadQ, 60)); }
  });
})();
