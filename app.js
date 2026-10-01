document.getElementById('eventTitle').innerHTML = EVENT.titleLine1 + '<br><span>' + EVENT.titleLine2 + '</span>';
document.getElementById('eventMatchup').textContent = EVENT.matchupLabel;
document.getElementById('eventVenue').textContent = EVENT.venue;
document.getElementById('eventDate').textContent = EVENT.dateLabel;
document.getElementById('prizeAmount').textContent = EVENT.prizeAmount;
document.getElementById('rulesFightCount').textContent = 'São ' + EVENT.fights.length + ' confrontos no card. Você precisa escolher um vencedor em cada um.';
document.getElementById('rulesDeadlineTitle').textContent = 'Prazo: ' + EVENT.deadlineLabel;
document.getElementById('rulesPrizeTitle').textContent = 'Prêmio: ' + EVENT.prizeAmount + ' pra quem acertar mais previsões';
document.getElementById('progressCount').innerHTML = '<b>0</b>/' + EVENT.fights.length + ' lutas';

if(WEBAPP_URL.includes('COLE_AQUI')){
  console.warn('⚠️ WEBAPP_URL não configurada.');
}

function normHandle(h){
  return String(h || '').trim().replace(/^@/, '').toLowerCase().replace(/[^a-z0-9._]/g, '').slice(0, 30);
}

function esc(v){
  return String(v == null ? '' : v)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function normEmail(e){
  return String(e || '').trim().toLowerCase();
}

async function emailHash(email){
  return sha256((EVENT.emailSalt || '') + ':' + normEmail(email));
}

async function isEmailAllowed(email){
  const list = EVENT.allowedEmailHashes || [];
  if(list.length === 0) return true; // lista vazia = acesso liberado
  if(!normEmail(email)) return false;
  return list.includes(await emailHash(email));
}

let userEmail = '';

function openGate(){
  const gate = document.getElementById('gate');
  if(gate) gate.style.display = 'none';
  document.body.style.overflow = '';
  refreshMyPicks();
}

(async function initGate(){
  const list = EVENT.allowedEmailHashes || [];
  if(list.length === 0){ openGate(); return; }

  document.body.style.overflow = 'hidden';
  let saved = null;
  try{ saved = sessionStorage.getItem('gateEmail'); }catch(e){}
  if(saved && await isEmailAllowed(saved)){ userEmail = normEmail(saved); openGate(); return; }

  const input = document.getElementById('gateEmail');
  const btn = document.getElementById('gateBtn');
  const msg = document.getElementById('gateMsg');

  async function tryEnter(){
    const val = normEmail(input.value);
    if(!val){ msg.textContent = 'Digite seu e-mail.'; return; }
    if(!(await isEmailAllowed(val))){
      msg.textContent = 'Esse e-mail não está cadastrado. Fale com o organizador.';
      return;
    }
    userEmail = val;
    try{ sessionStorage.setItem('gateEmail', val); }catch(e){}
    openGate();
  }
  btn.addEventListener('click', tryEnter);
  input.addEventListener('keydown', e=>{ if(e.key === 'Enter') tryEnter(); });
})();

function initials(name){
  return name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
}

function tickCountdown(){
  const target = new Date(EVENT.lockTimestamp).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff%86400000)/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);
  document.getElementById('cd-d').textContent = String(d).padStart(2,'0');
  document.getElementById('cd-h').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-m').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-s').textContent = String(s).padStart(2,'0');
  if(diff<=0) lockEverything();
}
let locked = Date.now() > new Date(EVENT.lockTimestamp).getTime();

setInterval(tickCountdown, 1000);
tickCountdown();

function lockEverything(){
  locked = true;
  document.querySelectorAll('.fighter').forEach(f=>f.style.pointerEvents='none');
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'Palpites encerrados';
  document.getElementById('lockTitle').textContent = 'Tempo esgotado';
  document.getElementById('lockSub').textContent = 'O card já começou — não dá mais pra enviar palpites.';
}

const picks = {};
const container = document.getElementById('fightsContainer');

EVENT.fights.forEach(fight=>{
  const card = document.createElement('div');
  card.className = 'fight-card';
  card.id = 'card-' + fight.id;
  card.innerHTML = `
    <div class="fight-tag">
      <span>${fight.weight}</span>
      <span class="${fight.title ? 'title-belt' : ''}">${fight.title ? '🏆 LUTA DE TÍTULO' : ''}</span>
    </div>
    <div class="matchup">
      <div class="fighter" data-fight="${fight.id}" data-side="a">
        <div class="initial">${initials(fight.a.name)}</div>
        <div class="name">${fight.a.name}</div>
        <div class="rec">${fight.a.rec || ''}</div>
      </div>
      <div class="vs-divider display">
        <div class="vs-slash"></div>
        VS
      </div>
      <div class="fighter" data-fight="${fight.id}" data-side="b">
        <div class="initial">${initials(fight.b.name)}</div>
        <div class="name">${fight.b.name}</div>
        <div class="rec">${fight.b.rec || ''}</div>
      </div>
    </div>
  `;
  container.appendChild(card);
});

container.addEventListener('click', (e)=>{
  if(locked) return;
  const fighterEl = e.target.closest('.fighter');
  if(!fighterEl) return;
  const fightId = fighterEl.dataset.fight;
  const side = fighterEl.dataset.side;
  picks[fightId] = side;

  const card = document.getElementById('card-' + fightId);
  card.querySelectorAll('.fighter').forEach(f=>f.classList.remove('selected'));
  fighterEl.classList.add('selected');
  card.classList.remove('picked-a','picked-b');
  card.classList.add(side === 'a' ? 'picked-a' : 'picked-b');

  updateProgress();
});

function updateProgress(){
  const total = EVENT.fights.length;
  const done = Object.keys(picks).length;
  document.getElementById('progressFill').style.width = (done/total*100) + '%';
  document.getElementById('progressCount').innerHTML = '<b>' + done + '</b>/' + total + ' lutas';
  updateLockState();
}

function updateLockState(){
  const total = EVENT.fights.length;
  const done = Object.keys(picks).length;
  const handle = document.getElementById('igHandle').value.trim();
  const follows = document.getElementById('followCheck').checked;
  const tagged = document.getElementById('tagCheck').checked;
  const allPicked = done === total;

  const lockBar = document.getElementById('lockBar');
  const lockIcon = document.getElementById('lockIcon');
  const lockTitle = document.getElementById('lockTitle');
  const lockSub = document.getElementById('lockSub');
  const btn = document.getElementById('submitBtn');

  if(!allPicked){
    lockBar.classList.remove('locked');
    lockIcon.textContent = '🔓';
    lockTitle.textContent = 'Faltam palpites';
    lockSub.textContent = (total-done) + ' luta(s) sem palpite ainda';
    btn.classList.remove('ready'); btn.disabled = true; btn.textContent = 'Enviar palpites';
    return;
  }
  if(!handle || !follows || !tagged){
    lockBar.classList.remove('locked');
    lockIcon.textContent = '🔓';
    lockTitle.textContent = 'Quase lá';
    lockSub.textContent = !handle ? 'Coloca seu @ do Instagram' : (!follows ? 'Confirma que segue @__ufc_goat__' : 'Confirma que marcou @__ufc_goat__ e 3 amigos nos comentários');
    btn.classList.remove('ready'); btn.disabled = true; btn.textContent = 'Enviar palpites';
    return;
  }
  lockBar.classList.add('locked');
  lockIcon.textContent = '🔒';
  lockTitle.textContent = 'Palpites travados';
  lockSub.textContent = 'Tudo pronto — hora de enviar';
  btn.classList.add('ready'); btn.disabled = locked; btn.textContent = 'Enviar palpites';
}

document.getElementById('igHandle').addEventListener('input', updateLockState);
document.getElementById('followCheck').addEventListener('change', updateLockState);
document.getElementById('tagCheck').addEventListener('change', updateLockState);

function myPicksKey(){ return 'meusPalpites:' + EVENT.id + ':' + (userEmail || 'anon'); }

function saveMyPicks(entry){
  try{
    localStorage.setItem(myPicksKey(), JSON.stringify({
      handle: entry.handle, picks: entry.picks, submittedAt: entry.submittedAt
    }));
  }catch(e){}
  refreshMyPicks();
}

function loadMyPicks(){
  try{
    const raw = localStorage.getItem(myPicksKey());
    return raw ? JSON.parse(raw) : null;
  }catch(e){ return null; }
}

function refreshMyPicks(){
  const btn = document.getElementById('myPicksBtn');
  const box = document.getElementById('myPicksBox');
  if(!btn || !box) return;
  const saved = loadMyPicks();
  btn.hidden = !saved;
  if(!saved) box.hidden = true;
}

function renderMyPicks(){
  const box = document.getElementById('myPicksBox');
  const saved = loadMyPicks();
  if(!saved){ box.hidden = true; return; }
  const when = new Date(saved.submittedAt).toLocaleString('pt-BR', {dateStyle:'short', timeStyle:'short'});
  const rows = EVENT.fights.map(f=>{
    const side = saved.picks[f.id];
    const chosen = side === 'a' ? f.a.name : (side === 'b' ? f.b.name : '—');
    return '<li><span class="vs">' + esc(f.a.name) + ' x ' + esc(f.b.name) + '</span><b>' + esc(chosen) + '</b></li>';
  }).join('');
  box.innerHTML = '<h3 class="display">Seus palpites</h3>'
    + '<small>@' + esc(saved.handle) + ' · enviado em ' + esc(when) + '</small>'
    + '<ul>' + rows + '</ul>';
  box.hidden = false;
}

document.getElementById('myPicksBtn').addEventListener('click', ()=>{
  const box = document.getElementById('myPicksBox');
  if(box.hidden){ renderMyPicks(); box.scrollIntoView({behavior:'smooth', block:'nearest'}); }
  else { box.hidden = true; }
});

document.getElementById('submitBtn').addEventListener('click', async ()=>{
  if(locked) return;
  const handleRaw = normHandle(document.getElementById('igHandle').value);
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  if(!(await isEmailAllowed(userEmail))){
    alert('Faça a entrada com um e-mail cadastrado.');
    btn.disabled = false; btn.textContent = 'Enviar palpites';
    return;
  }

  const entry = {
    handle: handleRaw,
    email: userEmail,
    event: EVENT.id,
    picks: picks,
    confirmouSeguir: document.getElementById('followCheck').checked,
    confirmouMarcarAmigos: document.getElementById('tagCheck').checked,
    submittedAt: new Date().toISOString()
  };

  try{
    const res = await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'palpite', ...entry })
    });
    const json = await res.json();
    if(!json.ok) throw new Error(json.error || 'Falha ao salvar');

    saveMyPicks(entry);
    document.getElementById('confirmHandle').textContent = '@' + handleRaw;
    const confirmBox = document.getElementById('confirmBox');
    confirmBox.querySelector('.big').textContent = json.updated ? 'PALPITE ATUALIZADO ✅' : 'PALPITE TRAVADO ✅';
    confirmBox.classList.add('show');
    confirmBox.scrollIntoView({behavior:'smooth', block:'center'});
    btn.textContent = json.updated ? 'Palpite atualizado ✅' : 'Palpite enviado ✅';
  }catch(err){
    btn.disabled = false;
    btn.textContent = 'Enviar palpites';
    alert('Deu ruim ao salvar. Tenta de novo em alguns segundos.');
    console.error(err);
  }
});

let adminUnlocked = false;
let adminSecret = null;

async function sha256(text){
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(x=>x.toString(16).padStart(2,'0')).join('');
}

function initAdminAccess(){
  const params = new URLSearchParams(window.location.search);
  if(params.get('admin') !== '1') return;

  const footer = document.querySelector('footer');
  const btn = document.createElement('button');
  btn.className = 'admin-link';
  btn.textContent = 'painel do organizador';
  btn.onclick = toggleAdmin;
  footer.appendChild(document.createElement('br'));
  footer.appendChild(btn);
}
initAdminAccess();

async function toggleAdmin(){
  const panel = document.getElementById('adminPanel');
  if(panel.classList.contains('show')){
    panel.classList.remove('show');
    return;
  }
  if(!adminUnlocked){
    const attempt = prompt('Senha do painel do organizador:');
    if(attempt === null) return;
    const attemptHash = await sha256(attempt);
    if(attemptHash !== EVENT.adminPinHash){
      alert('Senha incorreta.');
      return;
    }
    adminUnlocked = true;
    adminSecret = attempt;
  }
  panel.classList.add('show');
  renderResultsForm();
}

function renderResultsForm(){
  const form = document.getElementById('resultsForm');
  form.innerHTML = EVENT.fights.map(f => `
    <div class="result-fight">
      <div class="rf-label">${f.weight}${f.title ? ' · TÍTULO' : ''}</div>
      <div class="result-options" id="result-${f.id}">
        <label data-side="a"><input type="radio" name="result-${f.id}" value="a"> ${f.a.name}</label>
        <label data-side="b"><input type="radio" name="result-${f.id}" value="b"> ${f.b.name}</label>
      </div>
    </div>
  `).join('');

  form.querySelectorAll('.result-options').forEach(group=>{
    group.addEventListener('change', (e)=>{
      group.querySelectorAll('label').forEach(l=>l.classList.remove('chosen'));
      e.target.closest('label').classList.add('chosen');
    });
  });

  fetch(`${WEBAPP_URL}?action=resultados&secret=${encodeURIComponent(adminSecret)}`)
    .then(r=>r.json())
    .then(json=>{
      if(!json.results) return;
      Object.keys(json.results).forEach(fightId=>{
        const input = form.querySelector(`input[name="result-${fightId}"][value="${json.results[fightId]}"]`);
        if(input){ input.checked = true; input.closest('label').classList.add('chosen'); }
      });
    }).catch(()=>{});
}

async function saveResults(){
  if(!adminUnlocked){ alert('Acesso não autorizado.'); return; }
  const results = {};
  EVENT.fights.forEach(f=>{
    const checked = document.querySelector(`input[name="result-${f.id}"]:checked`);
    if(checked) results[f.id] = checked.value;
  });
  try{
    const res = await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'resultados', secret: adminSecret, results })
    });
    const json = await res.json();
    if(!json.ok) throw new Error(json.error || 'Falha ao salvar');
    alert('Resultados salvos: ' + Object.keys(results).length + '/' + EVENT.fights.length + ' lutas.');
  }catch(err){
    alert('Erro ao salvar resultados: ' + err);
  }
}

async function calcRanking(){
  if(!adminUnlocked){ alert('Acesso não autorizado.'); return; }
  const out = document.getElementById('rankingOutput');
  out.innerHTML = 'Calculando...';

  let results;
  try{
    const r = await fetch(`${WEBAPP_URL}?action=resultados&secret=${encodeURIComponent(adminSecret)}`);
    const json = await r.json();
    results = json.results || {};
  }catch(e){ results = {}; }

  const resolvedCount = Object.keys(results).length;
  if(resolvedCount === 0){
    out.innerHTML = '<p style="color:var(--text-dim); font-size:14px;">Nenhum resultado salvo ainda. Preencha e clique em "Salvar resultados" primeiro.</p>';
    return;
  }

  let entries;
  try{
    const r = await fetch(`${WEBAPP_URL}?action=palpites&secret=${encodeURIComponent(adminSecret)}`);
    const json = await r.json();
    entries = (json.entries || []).filter(e => e.event === EVENT.id);
  }catch(e){ entries = []; }

  if(entries.length === 0){
    out.innerHTML = '<p style="color:var(--text-dim); font-size:14px;">Nenhum palpite encontrado.</p>';
    return;
  }

  const scored = entries.map(entry=>{
    let acertos = 0;
    EVENT.fights.forEach(f=>{
      if(results[f.id] && entry.picks[f.id] === results[f.id]) acertos++;
    });
    const desqualificado = !entry.confirmouSeguir || !entry.confirmouMarcarAmigos;
    return { handle: entry.handle, acertos, desqualificado, totalLutas: EVENT.fights.length };
  });

  scored.sort((a,b)=> b.acertos - a.acertos);

  const maxAcertos = scored.filter(s=>!s.desqualificado).reduce((m,s)=>Math.max(m,s.acertos), -1);

  let html = `<p style="font-size:13px; color:var(--text-dim); margin-bottom:8px;">
    ${resolvedCount}/${EVENT.fights.length} lutas com resultado salvo ${resolvedCount < EVENT.fights.length ? '— ranking ainda parcial' : ''}
  </p>`;
  html += '<table class="ranking-table"><thead><tr><th>#</th><th>@Instagram</th><th>Acertos</th><th></th></tr></thead><tbody>';
  scored.forEach((s, i)=>{
    const isLeader = !s.desqualificado && s.acertos === maxAcertos && maxAcertos >= 0;
    html += `<tr class="${s.desqualificado ? 'dq' : (isLeader ? 'leader' : '')}">
      <td class="pos">${i+1}</td>
      <td>@${esc(s.handle)}${s.desqualificado ? '<span class="dq-tag">desclassificado</span>' : ''}</td>
      <td>${s.acertos}/${s.totalLutas}</td>
      <td>${isLeader ? '🏆' : ''}</td>
    </tr>`;
  });
  html += '</tbody></table>';
  out.innerHTML = html;
}

async function loadAdminData(){
  if(!adminUnlocked){ alert('Acesso não autorizado.'); return; }
  const out = document.getElementById('adminOutput');
  out.value = 'Carregando...';
  try{
    const r = await fetch(`${WEBAPP_URL}?action=palpites&secret=${encodeURIComponent(adminSecret)}`);
    const json = await r.json();
    const entries = (json.entries || []).filter(e => e.event === EVENT.id);
    if(entries.length === 0){
      out.value = 'Nenhum palpite encontrado ainda para ' + EVENT.id + '.';
      return;
    }
    out.value = entries.map(e=>JSON.stringify(e)).join('\n\n');
  }catch(err){
    out.value = 'Erro ao carregar: ' + err;
  }
}