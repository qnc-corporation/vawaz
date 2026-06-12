// ===== PHAN BO NGUON NHA MAY =====
// Build PB_DATA from CT_RAW — phân bổ = KL giao (thực tế phân bổ chờ nhà máy)
// PB_RAW: [Ma PB, Ma CT, Ma DH, Sản phẩm, Nhà máy, KL dat, KL phân bổ (giao), Đơn giá, Trạng thái phân bổ]
const PB_RAW=[];
const pbCounters={};
CT_RAW.forEach((r,i)=>{
  const dhCode=r[0];
  const maCT=r[1]; // CT-xxxx-xx
  // Generate Ma PB: PB-{DH_short}-{seq}
  const dhShort=dhCode.replace('DH-2026-','');
  if(!pbCounters[dhShort]) pbCounters[dhShort]=0;
  pbCounters[dhShort]++;
  const maPB='PB-'+dhShort+'-'+String(pbCounters[dhShort]).padStart(2,'0');
  const st=r[9]; // trạng thái from CT_RAW
  let pbSt;
  if(st==='Đã giao') pbSt='Đã phân bổ đủ';
  else if(st==='Chờ phân bổ') pbSt='Chờ phân bổ';
  else if(st==='Chênh lệch') pbSt='Chênh lệch';
  else pbSt='Đang phân bổ';
  PB_RAW.push([maPB, maCT, r[0], r[3], r[5], r[6], r[7], r[8], pbSt]);
});
const PB_DATA={all:[],dangphanbo:[],daphanbo:[],chenhpb:[],chophanbo:[]};
PB_RAW.forEach(r=>{
  PB_DATA.all.push(r);
  if(r[8]==='Đang phân bổ')PB_DATA.dangphanbo.push(r);
  if(r[8]==='Đã phân bổ đủ')PB_DATA.daphanbo.push(r);
  if(r[8]==='Chênh lệch')PB_DATA.chenhpb.push(r);
  if(r[8]==='Chờ phân bổ')PB_DATA.chophanbo.push(r);
});
// Populate PB filter
const pbDhFilter=document.getElementById('pb-filter-dh');
const pbUniqueDh=[...new Set(PB_RAW.map(r=>r[2]))].sort().reverse();
pbUniqueDh.forEach(dh=>{const o=document.createElement('option');o.value=dh;o.textContent=dh;pbDhFilter.appendChild(o);});
// Update PB tab counts
function updatePbTabCounts(){
  const keys=['all','dangphanbo','daphanbo','chenhpb','chophanbo'];
  keys.forEach(k=>{
    const el=document.getElementById('pb-tab-cnt-'+k);
    if(el) el.textContent=PB_DATA[k].length;
  });
  const kpiNm=document.getElementById('pb-kpi-nm');
  const kpiDone=document.getElementById('pb-kpi-done');
  const kpiWait=document.getElementById('pb-kpi-wait');
  const kpiDiff=document.getElementById('pb-kpi-diff');
  const uniqueNm=new Set(PB_RAW.filter(r=>r[8]==='Đang phân bổ').map(r=>r[4]));
  if(kpiNm)kpiNm.textContent=uniqueNm.size;
  if(kpiDone)kpiDone.textContent=PB_DATA.daphanbo.length;
  if(kpiWait)kpiWait.textContent=PB_DATA.chophanbo.length;
  if(kpiDiff)kpiDiff.textContent=PB_DATA.chenhpb.length;
}
updatePbTabCounts();

const PB_TITLES={all:'Phân bổ nguồn nhà máy — Tất cả',dangphanbo:'Phân bổ nguồn nhà máy — Đang phân bổ',daphanbo:'Phân bổ nguồn nhà máy — Đã phân bổ đủ',chenhpb:'Phân bổ nguồn nhà máy — Chênh lệch',chophanbo:'Phân bổ nguồn nhà máy — Chờ phân bổ'};

let currentPbTab='all';

function renderPbTable(tab,dhFilter,nmFilter,spFilter,searchText){
  currentPbTab=tab;
  let data=PB_DATA[tab]||[];
  if(dhFilter) data=data.filter(r=>r[2]===dhFilter);
  if(nmFilter) data=data.filter(r=>r[4]===nmFilter);
  if(spFilter) data=data.filter(r=>r[3]===spFilter);
  if(searchText){const q=searchText.toLowerCase();data=data.filter(r=>r[0].toLowerCase().includes(q)||r[1].toLowerCase().includes(q)||r[2].toLowerCase().includes(q)||r[3].toLowerCase().includes(q)||r[4].toLowerCase().includes(q));}
  const tbody=document.getElementById('pb-tbody');
  const title=document.getElementById('pb-table-title');
  const count=document.getElementById('pb-count');
  const footer=document.getElementById('pb-footer');
  if(title)title.textContent=PB_TITLES[tab]||'';
  if(count)count.textContent=data.length+' dong';
  if(footer)footer.textContent=data.length+' / '+data.length+' dong';
  tbody.innerHTML='';
  data.forEach(d=>{
    const tr=document.createElement('tr');
    tr.dataset.pb=d[0];
    tr.dataset.ct=d[1];
    tr.dataset.dh=d[2];
    tr.dataset.nm=d[4];
    const nmClass=NM_COLORS[d[4]]||'c1';
    const nmShort=NM_SHORT[d[4]]||'—';
    const isChenh=d[8]==='Chênh lệch';
    const isChoPB=d[8]==='Chờ phân bổ';
    const isDaPB=d[8]==='Đã phân bổ đủ';
    const pbPct=d[5]>0?Math.min(100,Math.round((d[6]/d[5])*100)):0;
    const thanhTien=d[7]>=1000?((d[6]*d[7])/1e6).toFixed(0)+' tr':((d[6]*d[7])/1e3).toFixed(0)+' tr';
    const đơnGia=d[7]>=1000?d[7].toLocaleString('vi-VN')+' VND/chuyen':d[7].toLocaleString('vi-VN')+' VND/tan';
    const barColor=pbPct>=100?'var(--ok)':pbPct>=50?'var(--pri)':'var(--acc)';
    const statusCls=isChenh?'s8':isChoPB?'s4':isDaPB?'s2':'s4';
    const nmDisplay=d[4]==='—'?'<span style="color:var(--ink4)">—</span>':`<div class="cust"><div class="av2 ${nmClass}">${nmShort}</div>${d[4]}</div>`;
    const klPbStyle=isChenh?'color:var(--err);font-weight:600':'';
    const actionBtn=isChoPB?`<button class="pb-act-btn" data-action="assign" title="Phân bổ nhà máy"><i class="bi bi-plus-circle"></i></button>`:isChenh?`<button class="pb-act-btn" data-action="adjust" title="Dieu chính"><i class="bi bi-arrow-repeat"></i></button>`:`<button class="pb-act-btn" data-action="view" title="Xem chi tiết"><i class="bi bi-eye"></i></button>`;
    tr.innerHTML=`<td style="padding-left:14px"><input type="checkbox" class="pb-row-check" data-dh="${d[2]}" data-nm="${d[4]}" style="accent-color:var(--pri)"></td><td><span class="pb-code-link" data-pb="${d[0]}">${d[0]}</span></td><td><span class="ct-code-link" data-ct="${d[1]}">${d[1]}</span></td><td><span class="ct-dh-link" data-dh="${d[2]}">${d[2]}</span></td><td>${d[3]}</td><td>${nmDisplay}</td><td class="vnum">${d[5].toLocaleString('vi-VN')}</td><td class="vnum" style="${klPbStyle}">${d[6].toLocaleString('vi-VN')}</td><td><div class="pb-nm-bar"><div class="bar"><i style="width:${pbPct}%;background:${barColor}"></i></div><span class="pct" style="color:${barColor}">${pbPct}%</span></div></td><td class="vnum" style="font-size:var(--fs3)">${đơnGia}</td><td class="vnum">${thanhTien}</td><td><span class="pill ${statusCls}"><span class="d"></span>${d[8]}</span></td><td style="padding-right:14px;text-align:center">${actionBtn}</td>`;
    tbody.appendChild(tr);
  });
  // Click on Ma PB link to open PB modal
  tbody.querySelectorAll('.pb-code-link').forEach(el=>{
    el.addEventListener('click',(e)=>{
      e.stopPropagation();
      const found=findPbByCode(el.dataset.pb);
      if(found)openModal('pb',found);
    });
  });
  // Click on Ma CT link to navigate to chi tiết đơn hàng
  tbody.querySelectorAll('.ct-code-link').forEach(el=>{
    el.addEventListener('click',(e)=>{
      e.stopPropagation();
      navigateToCtDetailByCT(el.dataset.ct);
    });
  });
  // Click on Ma DH link to navigate to chi tiết đơn hàng
  tbody.querySelectorAll('.ct-dh-link').forEach(el=>{
    el.addEventListener('click',(e)=>{
      e.stopPropagation();
      navigateToCtDetail(el.dataset.dh);
    });
  });
  // Click on action button
  tbody.querySelectorAll('.pb-act-btn').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const tr=btn.closest('tr');
      const pbCode=tr.dataset.pb;
      const found=findPbByCode(pbCode);
      if(found)openModal('pb',found);
    });
  });
  // Click on row to open PB detail modal
  tbody.querySelectorAll('tr').forEach(tr=>{
    tr.addEventListener('click',(e)=>{
      if(e.target.closest('.pb-code-link'))return;
      if(e.target.closest('.ct-code-link'))return;
      if(e.target.closest('.ct-dh-link'))return;
      if(e.target.closest('.pb-act-btn'))return;
      if(e.target.type==='checkbox')return;
      const pbCode=tr.dataset.pb;
      const found=findPbByCode(pbCode);
      if(found)openModal('pb',found);
    });
  });
  // Checkbox handling
  tbody.querySelectorAll('.pb-row-check').forEach(cb=>{
    cb.addEventListener('change',()=>{
      updatePbBulkBar();
    });
  });
}
// PB Tab switching
document.querySelectorAll('#pb-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#pb-tabs button').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById('pb-filter-dh').value='';
    document.getElementById('pb-filter-nm').value='';
    document.getElementById('pb-filter-sp').value='';
    document.getElementById('pb-search').value='';
    renderPbTable(btn.dataset.tab);
  });
});
// Helper to get current filter values
function getPbFilters(){
  return{
    dh:document.getElementById('pb-filter-dh')?.value||'',
    nm:document.getElementById('pb-filter-nm')?.value||'',
    sp:document.getElementById('pb-filter-sp')?.value||'',
    search:document.getElementById('pb-search')?.value||''
  };
}
// PB DH filter change
document.getElementById('pb-filter-dh')?.addEventListener('change',function(){
  const f=getPbFilters();
  renderPbTable(currentPbTab,f.dh,f.nm,f.sp,f.search);
});
// PB NM filter change
document.getElementById('pb-filter-nm')?.addEventListener('change',function(){
  const f=getPbFilters();
  renderPbTable(currentPbTab,f.dh,f.nm,f.sp,f.search);
});
// PB SP filter change
document.getElementById('pb-filter-sp')?.addEventListener('change',function(){
  const f=getPbFilters();
  renderPbTable(currentPbTab,f.dh,f.nm,f.sp,f.search);
});
// PB search
document.getElementById('pb-search')?.addEventListener('input',function(){
  const f=getPbFilters();
  renderPbTable(currentPbTab,f.dh,f.nm,f.sp,f.search);
});
// PB select-all checkbox
document.getElementById('pb-select-all')?.addEventListener('change',function(){
  const checked=this.checked;
  document.querySelectorAll('.pb-row-check').forEach(cb=>{cb.checked=checked;});
  updatePbBulkBar();
});
// PB bulk bar update
function updatePbBulkBar(){
  const checked=document.querySelectorAll('.pb-row-check:checked');
  const bar=document.getElementById('pb-bulk-bar');
  const cnt=document.getElementById('pb-selected-count');
  if(bar){
    bar.style.display=checked.length?'flex':'none';
  }
  if(cnt)cnt.textContent=checked.length+' dòng chọn';
}
// PB clear selection
document.getElementById('pb-clear-sel')?.addEventListener('click',()=>{
  document.querySelectorAll('.pb-row-check').forEach(cb=>{cb.checked=false;});
  const sa=document.getElementById('pb-select-all');if(sa)sa.checked=false;
  updatePbBulkBar();
});
// PB Back button
document.getElementById('pb-btn-back')?.addEventListener('click',()=>{
  switchPage('donhang');
});
renderPbTable('all');
