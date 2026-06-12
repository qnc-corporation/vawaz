// ===== NAV SEARCH (NAV_LABEL + NAV_HINT) =====
(function(){
  const inp=document.getElementById('nav-search');
  const drop=document.getElementById('nav-search-drop');
  const wrap=document.getElementById('nav-search-wrap');
  if(!inp||!drop||!wrap) return;

  function navFold(s){
    return (s||'').normalize('NFD').replace(/\p{M}/gu,'').toLowerCase()
      .replace(/đ/g,'d').replace(/[^a-z0-9\s/.-]+/g,' ').replace(/\s+/g,' ').trim();
  }

  const NAV_SEARCH=[];
  NAV.forEach(g=>{
    if(g.div) return;
    (g.items||[]).forEach(it=>{
      const code=it.t;
      const label=NAV_LABEL[code]||it.l;
      const hint=NAV_HINT[code]||'';
      const dot=it.c==='dm'?'dm':it.c==='sys'?'sys':it.c==='rpt'?'rpt':it.c===''?'none':'gd';
      NAV_SEARCH.push({
        code,label,hint,grp:g.name,rpt:it.rpt||'',dot,
        fold:`${navFold(label)} ${navFold(hint)} ${navFold(it.l)} ${navFold(code)}`
      });
    });
  });

  let hits=[], sel=0, deb;

  function scoreItem(item,q,tokens){
    if(!q) return 0;
    const lf=navFold(item.label), hf=navFold(item.hint), cf=navFold(item.code);
    let s=0;
    if(lf===q) s+=120;
    else if(lf.startsWith(q)) s+=95;
    else if(lf.includes(q)) s+=70;
    if(hf.includes(q)) s+=45;
    if(cf.includes(q.replace(/\s/g,''))) s+=35;
    if(tokens.length>1 && !tokens.every(t=>item.fold.includes(t))) return 0;
    if(tokens.length>1) s+=12*tokens.length;
    if(!item.fold.includes(q) && tokens.length===1) return 0;
    return s;
  }

  function searchNav(q){
    const fold=navFold(q);
    if(!fold) return [];
    const tokens=fold.split(' ').filter(Boolean);
    return NAV_SEARCH.map(it=>({it,score:scoreItem(it,fold,tokens)}))
      .filter(x=>x.score>0)
      .sort((a,b)=>b.score-a.score||a.it.label.localeCompare(b.it.label,'vi'))
      .slice(0,12)
      .map(x=>x.it);
  }

  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}

  function renderDrop(list){
    hits=list; sel=0;
    if(!list.length){
      drop.innerHTML='<div class="ns-empty">Không tìm thấy mục menu phù hợp</div>';
      return;
    }
    drop.innerHTML=list.map((it,i)=>`<button type="button" class="ns-item${i===0?' on':''}" role="option" data-code="${esc(it.code)}" data-idx="${i}">
      <span class="ns-dot ${it.dot}"></span>
      <span class="ns-body">
        <div class="ns-label">${esc(it.label)}</div>
        ${it.hint?`<div class="ns-hint">${esc(it.hint)}</div>`:''}
        <div class="ns-grp">${esc(it.grp)}</div>
      </span>
    </button>`).join('');
  }

  function openDrop(){
    drop.hidden=false;
    wrap.classList.add('open');
    inp.classList.add('ns-open');
    inp.setAttribute('aria-expanded','true');
  }

  function closeDrop(){
    drop.hidden=true;
    wrap.classList.remove('open');
    inp.classList.remove('ns-open');
    inp.setAttribute('aria-expanded','false');
    hits=[]; sel=0;
  }

  function pick(idx){
    const it=hits[idx];
    if(!it) return;
    inp.value='';
    closeDrop();
    goToNavCode(it.code);
  }

  function runQuery(){
    const q=inp.value.trim();
    if(!q){ closeDrop(); return; }
    renderDrop(searchNav(q));
    openDrop();
  }

  inp.addEventListener('input',()=>{
    clearTimeout(deb);
    deb=setTimeout(runQuery,80);
  });

  inp.addEventListener('focus',()=>{ if(inp.value.trim()) runQuery(); });

  inp.addEventListener('keydown',e=>{
    if(e.key==='Escape'){ closeDrop(); inp.blur(); return; }
    if(!hits.length){
      if(e.key==='Enter'&&inp.value.trim()){ renderDrop(searchNav(inp.value.trim())); openDrop(); e.preventDefault(); }
      return;
    }
    if(e.key==='ArrowDown'){ e.preventDefault(); sel=Math.min(sel+1,hits.length-1); drop.querySelectorAll('.ns-item').forEach((el,i)=>el.classList.toggle('on',i===sel)); return; }
    if(e.key==='ArrowUp'){ e.preventDefault(); sel=Math.max(sel-1,0); drop.querySelectorAll('.ns-item').forEach((el,i)=>el.classList.toggle('on',i===sel)); return; }
    if(e.key==='Enter'){ e.preventDefault(); pick(sel); }
  });

  drop.addEventListener('mousedown',e=>e.preventDefault());
  drop.addEventListener('click',e=>{
    const btn=e.target.closest('.ns-item');
    if(!btn) return;
    pick(Number(btn.dataset.idx)||0);
  });

  document.addEventListener('click',e=>{
    if(!wrap.contains(e.target)) closeDrop();
  });

  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){
      e.preventDefault();
      inp.focus();
      inp.select();
      if(inp.value.trim()) runQuery();
    }
  });
})();
