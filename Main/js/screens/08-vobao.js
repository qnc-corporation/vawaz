// ===== PHAN BO / LUAN CHUYEN VO BAO =====
const VB_LOAI=['Vỏ bao PP','Vỏ bao GI','Vỏ bao PP cu','Vỏ bao GI cu'];
const VB_LOAI_CLS={'Vỏ bao PP':'s1','Vỏ bao GI':'s6','Vỏ bao PP cu':'s4','Vỏ bao GI cu':'s4'};
const VB_NM_ARR=['NM Ha Long','NM Bim Son','NM Hoang Long','NM Mien Bac','NM Sai Gon'];
const VB_KHO_ARR=['Kho HL','Kho BS','Kho HLo','Kho MB','Kho SG'];
const VB_STATUS=['Đang luân chuyển','Đã luân chuyển','Tồn kho','Chờ luân chuyển'];
const VB_STATUS_CLS={'Đang luân chuyển':'s4','Đã luân chuyển':'s2','Tồn kho':'s6','Chờ luân chuyển':'s4'};

// Generate mock VB data
// [MaLC, Loai vỏ bao, Tu (NM/Kho), Den (NM/Kho), So luong (cai), Trong luong (kg), Ngày LC, Trạng thái, Ghi chu]
const VB_RAW=[];
const vbSeq={};
function vbId(from,to,loai){
  const key=from+'-'+to+'-'+loai;
  if(!vbSeq[key])vbSeq[key]=0;
  vbSeq[key]++;
  return 'LC-VB-'+String(vbSeq[key]).padStart(3,'0');
}
// Generate luân chuyển data
const vbFromTo=[
  ['NM Ha Long','Kho HL','NM Bim Son','Kho BS'],
  ['NM Bim Son','Kho BS','NM Ha Long','Kho HL'],
  ['NM Hoang Long','Kho HLo','NM Mien Bac','Kho MB'],
  ['NM Mien Bac','Kho MB','NM Sai Gon','Kho SG'],
  ['NM Sai Gon','Kho SG','NM Ha Long','Kho HL'],
  ['NM Ha Long','Kho HL','NM Hoang Long','Kho HLo'],
  ['NM Bim Son','Kho BS','NM Mien Bac','Kho MB'],
  ['NM Hoang Long','Kho HLo','NM Sai Gon','Kho SG'],
  ['NM Mien Bac','Kho MB','NM Bim Son','Kho BS'],
  ['NM Sai Gon','Kho SG','NM Hoang Long','Kho HLo'],
];
const dates=['02/06/2026','01/06/2026','31/05/2026','30/05/2026','29/05/2026','28/05/2026','27/05/2026','26/05/2026','25/05/2026','24/05/2026'];
// Deterministic mock data for VB
const VB_SRC=[
  ['LC-VB-001','Vỏ bao PP','NM Ha Long / Kho HL','NM Bim Son / Kho BS',1200,1020,'02/06/2026','Đang luân chuyển','Đang tren duong'],
  ['LC-VB-002','Vỏ bao GI','NM Ha Long / Kho HL','NM Bim Son / Kho BS',800,880,'02/06/2026','Đang luân chuyển','Đang tren duong'],
  ['LC-VB-003','Vỏ bao PP','NM Bim Son / Kho BS','NM Ha Long / Kho HL',1500,1275,'01/06/2026','Đã luân chuyển',''],
  ['LC-VB-004','Vỏ bao GI','NM Bim Son / Kho BS','NM Ha Long / Kho HL',600,660,'01/06/2026','Đã luân chuyển',''],
  ['LC-VB-005','Vỏ bao PP cu','NM Hoang Long / Kho HLo','NM Mien Bac / Kho MB',400,340,'31/05/2026','Đã luân chuyển',''],
  ['LC-VB-006','Vỏ bao PP','NM Hoang Long / Kho HLo','NM Mien Bac / Kho MB',1800,1530,'31/05/2026','Đang luân chuyển','Đang tren duong'],
  ['LC-VB-007','Vỏ bao GI cu','NM Mien Bac / Kho MB','NM Sai Gon / Kho SG',300,330,'30/05/2026','Tồn kho',''],
  ['LC-VB-008','Vỏ bao GI','NM Mien Bac / Kho MB','NM Sai Gon / Kho SG',900,990,'30/05/2026','Đã luân chuyển',''],
  ['LC-VB-009','Vỏ bao PP','NM Sai Gon / Kho SG','NM Ha Long / Kho HL',2000,1700,'29/05/2026','Đã luân chuyển',''],
  ['LC-VB-010','Vỏ bao PP cu','NM Sai Gon / Kho SG','NM Ha Long / Kho HL',250,213,'29/05/2026','Tồn kho',''],
  ['LC-VB-011','Vỏ bao GI','NM Ha Long / Kho HL','NM Hoang Long / Kho HLo',700,770,'28/05/2026','Đã luân chuyển',''],
  ['LC-VB-012','Vỏ bao PP','NM Bim Son / Kho BS','NM Mien Bac / Kho MB',1100,935,'28/05/2026','Đã luân chuyển',''],
  ['LC-VB-013','Vỏ bao GI cu','NM Hoang Long / Kho HLo','NM Sai Gon / Kho SG',350,385,'27/05/2026','Tồn kho',''],
  ['LC-VB-014','Vỏ bao PP','NM Mien Bac / Kho MB','NM Bim Son / Kho BS',1600,1360,'27/05/2026','Đã luân chuyển',''],
  ['LC-VB-015','Vỏ bao GI','NM Sai Gon / Kho SG','NM Hoang Long / Kho HLo',500,550,'26/05/2026','Chờ luân chuyển','Chờ xe vận chuyển'],
  ['LC-VB-016','Vỏ bao PP cu','NM Ha Long / Kho HL','NM Bim Son / Kho BS',200,170,'26/05/2026','Chờ luân chuyển','Chờ xe vận chuyển'],
  ['LC-VB-017','Vỏ bao PP','NM Bim Son / Kho BS','NM Hoang Long / Kho HLo',900,765,'25/05/2026','Đã luân chuyển',''],
  ['LC-VB-018','Vỏ bao GI','NM Hoang Long / Kho HLo','NM Mien Bac / Kho MB',450,495,'25/05/2026','Chờ luân chuyển','Chờ xe vận chuyển'],
  ['LC-VB-019','Vỏ bao PP cu','NM Mien Bac / Kho MB','NM Sai Gon / Kho SG',150,128,'24/05/2026','Tồn kho',''],
  ['LC-VB-020','Vỏ bao PP','NM Sai Gon / Kho SG','NM Ha Long / Kho HL',1300,1105,'24/05/2026','Chờ luân chuyển','Chờ xe vận chuyển'],
  ['LC-VB-021','Vỏ bao GI cu','NM Ha Long / Kho HL','NM Hoang Long / Kho HLo',180,198,'24/05/2026','Tồn kho',''],
];
VB_SRC.forEach(r=>VB_RAW.push(r));
// Sort by maLC descending
VB_RAW.sort((a,b)=>b[0].localeCompare(a[0]));

const VB_DATA={all:[],danglc:[],dalc:[],tonkho:[],cho:[]};
VB_RAW.forEach(r=>{
  VB_DATA.all.push(r);
  if(r[7]==='Đang luân chuyển')VB_DATA.danglc.push(r);
  if(r[7]==='Đã luân chuyển')VB_DATA.dalc.push(r);
  if(r[7]==='Tồn kho')VB_DATA.tonkho.push(r);
  if(r[7]==='Chờ luân chuyển')VB_DATA.cho.push(r);
});

// Update VB KPIs
function updateVbKpis(){
  const kpiTotal=document.getElementById('vb-kpi-total');
  const kpiDone=document.getElementById('vb-kpi-done');
  const kpiTransit=document.getElementById('vb-kpi-transit');
  const kpiLow=document.getElementById('vb-kpi-low');
  const totalSl=VB_DATA.all.reduce((s,r)=>s+r[4],0);
  if(kpiTotal)kpiTotal.textContent=totalSl.toLocaleString('vi-VN');
  if(kpiDone)kpiDone.textContent=VB_DATA.dalc.length;
  if(kpiTransit)kpiTransit.textContent=VB_DATA.danglc.length;
  // "Low stock" = ton kho items with SL < 500
  const lowStock=VB_DATA.tonkho.filter(r=>r[4]<500).length;
  if(kpiLow)kpiLow.textContent=lowStock;
}
updateVbKpis();

// Update VB tab counts
function updateVbTabCounts(){
  const keys=['all','danglc','dalc','tonkho','cho'];
  keys.forEach(k=>{
    const el=document.getElementById('vb-tab-cnt-'+k);
    if(el)el.textContent=VB_DATA[k].length;
  });
}
updateVbTabCounts();

const VB_TITLES={all:'Phân bổ / luân chuyển vỏ bao — Tất cả',danglc:'Phân bổ / luân chuyển vỏ bao — Đang luân chuyển',dalc:'Phân bổ / luân chuyển vỏ bao — Đã luân chuyển',tonkho:'Phân bổ / luân chuyển vỏ bao — Tồn kho',cho:'Phân bổ / luân chuyển vỏ bao — Chờ luân chuyển'};

let currentVbTab='all';

function renderVbTable(tab,loaiFilter,nmFilter,khoFilter,searchText){
  currentVbTab=tab;
  let data=VB_DATA[tab]||[];
  if(loaiFilter)data=data.filter(r=>r[1]===loaiFilter);
  if(nmFilter)data=data.filter(r=>r[2].includes(nmFilter)||r[3].includes(nmFilter));
  if(khoFilter)data=data.filter(r=>r[2].includes(khoFilter)||r[3].includes(khoFilter));
  if(searchText){const q=searchText.toLowerCase();data=data.filter(r=>r[0].toLowerCase().includes(q)||r[1].toLowerCase().includes(q)||r[2].toLowerCase().includes(q)||r[3].toLowerCase().includes(q));}
  const tbody=document.getElementById('vb-tbody');
  const title=document.getElementById('vb-table-title');
  const count=document.getElementById('vb-count');
  const footer=document.getElementById('vb-footer');
  if(title)title.textContent=VB_TITLES[tab]||'';
  if(count)count.textContent=data.length+' dong';
  if(footer)footer.textContent=data.length+' / '+data.length+' dong';
  tbody.innerHTML='';
  data.forEach(d=>{
    const tr=document.createElement('tr');
    tr.dataset.vbid=d[0];
    const loaiCls=VB_LOAI_CLS[d[1]]||'s4';
    const statusCls=VB_STATUS_CLS[d[7]]||'s4';
    const isDangLC=d[7]==='Đang luân chuyển';
    const isChoLC=d[7]==='Chờ luân chuyển';
    const isTonKho=d[7]==='Tồn kho';
    // Parse from/to to show NM avatar
    const fromNm=d[2].split(' / ')[0];
    const toNm=d[3].split(' / ')[0];
    const fromNmClass=NM_COLORS[fromNm]||'c1';
    const fromNmShort=NM_SHORT[fromNm]||'--';
    const toNmClass=NM_COLORS[toNm]||'c1';
    const toNmShort=NM_SHORT[toNm]||'--';
    const fromDisplay=`<div class="cust"><div class="av2 ${fromNmClass}" style="width:18px;height:18px;font-size:9px;flex:0 0 18px">${fromNmShort}</div><span style="font-size:var(--fs3)">${d[2]}</span></div>`;
    const toDisplay=`<div class="cust"><div class="av2 ${toNmClass}" style="width:18px;height:18px;font-size:9px;flex:0 0 18px">${toNmShort}</div><span style="font-size:var(--fs3)">${d[3]}</span></div>`;
    const actionBtn=isChoLC?`<button class="vb-act-btn" data-action="send" title="Gửi luân chuyển"><i class="bi bi-send"></i></button>`:isDangLC?`<button class="vb-act-btn" data-action="track" title="Theo dõi"><i class="bi bi-geo-alt"></i></button>`:isTonKho?`<button class="vb-act-btn" data-action="view" title="Xem chi tiết"><i class="bi bi-eye"></i></button>`:`<button class="vb-act-btn" data-action="view" title="Xem chi tiết"><i class="bi bi-eye"></i></button>`;
    tr.innerHTML=`<td style="padding-left:14px"><input type="checkbox" class="vb-row-check" data-vbid="${d[0]}" style="accent-color:var(--pri)"></td><td><span style="font-family:var(--mono);font-weight:600;color:var(--pri);font-size:var(--fs2)">${d[0]}</span></td><td><span class="pill ${loaiCls}" style="font-size:9px;padding:1px 6px"><span class="d" style="width:4px;height:4px"></span>${d[1]}</span></td><td>${fromDisplay}</td><td>${toDisplay}</td><td class="vnum">${d[4].toLocaleString('vi-VN')}</td><td class="vnum">${d[5].toLocaleString('vi-VN')} kg</td><td class="vnum" style="font-size:var(--fs3)">${d[6]}</td><td><span class="pill ${statusCls}"><span class="d"></span>${d[7]}</span></td><td style="padding-right:14px;text-align:center">${actionBtn}</td>`;
    tbody.appendChild(tr);
  });
  // Action button clicks
  tbody.querySelectorAll('.vb-act-btn').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const vbid=btn.closest('tr').dataset.vbid;
      const found=findVbById(vbid);
      if(found)openModal('vb',found);
    });
  });
  // Row clicks
  tbody.querySelectorAll('tr').forEach(tr=>{
    tr.addEventListener('click',(e)=>{
      if(e.target.closest('.vb-act-btn'))return;
      if(e.target.type==='checkbox')return;
      const vbid=tr.dataset.vbid;
      const found=findVbById(vbid);
      if(found)openModal('vb',found);
    });
  });
  // Checkbox handling
  tbody.querySelectorAll('.vb-row-check').forEach(cb=>{
    cb.addEventListener('change',()=>updateVbBulkBar());
  });
}

// VB filter helpers
function getVbFilters(){
  return{
    loai:document.getElementById('vb-filter-loai')?.value||'',
    nm:document.getElementById('vb-filter-nm')?.value||'',
    kho:document.getElementById('vb-filter-kho')?.value||'',
    search:document.getElementById('vb-search')?.value||''
  };
}
// VB Tab switching
document.querySelectorAll('#vb-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#vb-tabs button').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById('vb-filter-loai').value='';
    document.getElementById('vb-filter-nm').value='';
    document.getElementById('vb-filter-kho').value='';
    document.getElementById('vb-search').value='';
    renderVbTable(btn.dataset.tab);
  });
});
// VB filter change handlers
document.getElementById('vb-filter-loai')?.addEventListener('change',()=>{const f=getVbFilters();renderVbTable(currentVbTab,f.loai,f.nm,f.kho,f.search);});
document.getElementById('vb-filter-nm')?.addEventListener('change',()=>{const f=getVbFilters();renderVbTable(currentVbTab,f.loai,f.nm,f.kho,f.search);});
document.getElementById('vb-filter-kho')?.addEventListener('change',()=>{const f=getVbFilters();renderVbTable(currentVbTab,f.loai,f.nm,f.kho,f.search);});
document.getElementById('vb-search')?.addEventListener('input',()=>{const f=getVbFilters();renderVbTable(currentVbTab,f.loai,f.nm,f.kho,f.search);});
// VB select-all
document.getElementById('vb-select-all')?.addEventListener('change',function(){
  document.querySelectorAll('.vb-row-check').forEach(cb=>{cb.checked=this.checked;});
  updateVbBulkBar();
});
// VB bulk bar
function updateVbBulkBar(){
  const checked=document.querySelectorAll('.vb-row-check:checked');
  const bar=document.getElementById('vb-bulk-bar');
  const cnt=document.getElementById('vb-selected-count');
  if(bar)bar.style.display=checked.length?'flex':'none';
  if(cnt)cnt.textContent=checked.length+' dòng chọn';
}
document.getElementById('vb-clear-sel')?.addEventListener('click',()=>{
  document.querySelectorAll('.vb-row-check').forEach(cb=>{cb.checked=false;});
  const sa=document.getElementById('vb-select-all');if(sa)sa.checked=false;
  updateVbBulkBar();
});
// VB Back button
document.getElementById('vb-btn-back')?.addEventListener('click',()=>{
  switchPage('phanbonhmay');
});
renderVbTable('all');
