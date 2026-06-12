// ===== Muc 1: HOP "CHO TOI DUYET" (tong hop chứng từ chờ phê duyệt) =====
(function(){
  const TXN=window.__TXN||[]; const content=document.querySelector('.content');
  const openM=window.__openGenModal; const stOf=window.__apprState;
  if(!content||!openM||!stOf) return;
  const pill=s=>{const i=s.indexOf('|');return `<span class="pill ${s.slice(0,i)}"><span class="d"></span>${s.slice(i+1)}</span>`;};
  const sec=document.createElement('div'); sec.className='page'; sec.setAttribute('data-page','approvalinbox');
  sec.innerHTML=`
    <div class="phdr"><div class="left"><div class="eyebrow">SYS_DUYET_INBOX · HE THONG</div><h2>Chờ tôi duyệt</h2><p class="sub">Tổng hop chứng từ đang chờ phe duyệt (TP / Giám đốc) từ tat ca các buoc quy trinh. Click để mo và duyet.</p></div>
      <div class="right"><button class="tbtn ai-refresh"><i class="bi bi-arrow-clockwise"></i> Lam mới</button></div></div>
    <div class="kpis ai-kpis"></div>
    <div class="card"><div class="chd"><h3>Danh sách chờ duyet</h3><span class="small ai-count"></span></div>
      <div style="padding:0 4px 4px"><table><thead><tr><th style="padding-left:14px">Ma chứng từ</th><th>Bước / Chung tu</th><th>Người thực hiện</th><th>Chờ cap duyet</th><th style="padding-right:14px">Trạng thái</th></tr></thead><tbody class="ai-tbody"></tbody></table></div></div>`;
  content.appendChild(sec);
  PAGE_MAP['SYS_DUYET_INBOX']='approvalinbox'; CRUMB_MAP['approvalinbox']='CHO TOI DUYET';
  const collect=()=>{ const out=[]; TXN.forEach(e=>{ if(!e.role.appr.length) return; const last=e.cfg.cols.length-1;
    e.cfg.rows.forEach(r=>{ if(stOf(r,r[last].slice(r[last].indexOf('|')+1))==='pending') out.push({e,r,last}); }); }); return out; };
  function build(){
    const list=collect(); const tb=sec.querySelector('.ai-tbody'); tb.innerHTML='';
    list.forEach(({e,r,last})=>{
      const tr=document.createElement('tr'); tr.style.cursor='pointer';
      tr.innerHTML=`<td style="padding-left:14px"><span class="oid">${r[0]}</span></td><td>Bước ${e.meta.step} · ${e.cfg.crumb}</td><td>${e.role.nguoi}</td><td><span class="pill s4"><span class="d"></span>Chờ ${e.role.appr.join('/')}</span></td><td style="padding-right:14px">${pill(r[last])}</td>`;
      tr.addEventListener('click',()=>openM(e.cfg,r,e.meta,()=>{ if(e.refresh)e.refresh(); build(); }));
      tb.appendChild(tr);
    });
    sec.querySelector('.ai-count').textContent=list.length+' chứng từ';
    const byLvl=l=>list.filter(x=>x.e.role.appr.includes(l)).length;
    sec.querySelector('.ai-kpis').innerHTML=[['t','inbox','Tổng chờ duyet',list.length,''],['a','arrow-up-circle','Chờ Trưởng phòng',byLvl('TP'),''],['s','person-check','Chờ Giám đốc',byLvl('GD'),''],['h','diagram-3','So buoc lien quan',new Set(list.map(x=>x.e.meta.step)).size,'buoc']].map(k=>`<div class="kpi"><div class="top"><div class="ic ${k[0]}"><i class="bi bi-${k[1]}"></i></div><div class="lbl">${k[2]}</div></div><div class="val">${k[3]}${k[4]?`<span style="font-size:12px;color:var(--ink4);font-weight:400;margin-left:3px">${k[4]}</span>`:''}</div><div class="delta"><span class="chip eq">Hôm nay</span></div></div>`).join('');
  }
  window.refreshApprovalInbox=build;
  sec.querySelector('.ai-refresh').onclick=build;
  build();
})();
