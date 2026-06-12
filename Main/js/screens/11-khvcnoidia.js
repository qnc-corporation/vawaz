// ===== LENH VAN CHUYEN DATA & LOGIC =====
// 3 sub-groups: xm_ctct (xi mang CT→CT), vb_ctct (vỏ bao CT→CT), xm_nmcp (xi mang NM→Cang)
// Mã vận chuyển bám theo Mã phân bổ: VC-PB-xxxx-xx (liên kết 1:1 với phân bổ)
const DB_XE=['51B-1234','51B-5678','51C-9012','51D-3456','51B-7890','29C-2345','60C-6789','51B-0123'];
const DB_XE_CLS={'51B-1234':'c1','51B-5678':'c2','51C-9012':'c3','51D-3456':'c4','51B-7890':'c5','29C-2345':'c1','60C-6789':'c2','51B-0123':'c3'};
const DB_XE_SHORT={'51B-1234':'1234','51B-5678':'5678','51C-9012':'9012','51D-3456':'3456','51B-7890':'7890','29C-2345':'2345','60C-6789':'6789','51B-0123':'0123'};
const DB_STATUS_CLS={'Đã giao':'s2','Đang vận chuyển':'s4','Chờ khoi hanh':'s6'};

// Sub-group labels for modal/titles
const DB_SG_LABELS={xm_ctct:'VC xi mang CT→CT',vb_ctct:'VC vỏ bao CT→CT',xm_nmcp:'VC xi mang NM→Cang'};

// Generate DB data from PB_RAW: Mã vận chuyển = VC-{PB code suffix}
// Format: [MaVC, MaPB, Tuyến, Don vi VC, Xe, Tai xe, Sản phẩm, KL, Ngày giao, Đơn hàng, Trạng thái, Ghi chu, sg]
// We pick specific PB entries for each sub-group and create transport plans

// Sub-group 1: VC xi mang công ty → công ty (picking from PB_RAW where sản phẩm = Clinker/Xi măng, tuyến CT→CT)
const DB_XM_CTCT=[
  ['VC-PB-0319-01','PB-0319-01','Cty CP XM Ha Long → Cty VLXD Hai Phong','Giao nhận Ha Long','51B-1234','Nguyen Van A','Clinker',2800,'02/06/2026','DH-2026-0319','Đã giao','Giao hang dừng han','xm_ctct'],
  ['VC-PB-0318-01','PB-0318-01','Cty CP XM Bim Son → Cty VLXD Thanh Hoa','Vận tải Bim Son','51B-5678','Tran Van B','Clinker',3200,'01/06/2026','DH-2026-0318','Đã giao','Giao day du','xm_ctct'],
  ['VC-PB-0317-01','PB-0317-01','Cty CP XM Hoang Long → Cty Xay dừng Ninh Binh','Logistics Hoang Long','51C-9012','Le Van C','Xi măng PCB40',1800,'31/05/2026','DH-2026-0317','Đang vận chuyển','Đang tren duong','xm_ctct'],
  ['VC-PB-0316-02','PB-0316-02','Cty CP XM Mien Bac → Cty VLXD Nam Dinh','VC Mien Bac','51D-3456','Pham Van D','Clinker',2400,'30/05/2026','DH-2026-0316','Đang vận chuyển','Du kien den 15h','xm_ctct'],
  ['VC-PB-0315-01','PB-0315-01','Cty CP XM Sai Gon → Cty VLXD TPHCM','Vận tải Sai Gon','51B-7890','Hoang Van E','Clinker',4100,'29/05/2026','DH-2026-0315','Đã giao','Giao thanh cong','xm_ctct'],
  ['VC-PB-0314-01','PB-0314-01','Cty CP XM Ha Long → Cty TNHH Xay dừng Quang Ninh','Giao nhận Ha Long','29C-2345','Nguyen Van A','Xi măng PCB40',1900,'28/05/2026','DH-2026-0314','Chờ khoi hanh','Chờ xếp lịch xe','xm_ctct'],
  ['VC-PB-0313-01','PB-0313-01','Cty CP XM Bim Son → Cty VLXD Nghe An','Vận tải Bim Son','60C-6789','Tran Van B','Clinker',3600,'27/05/2026','DH-2026-0313','Đã giao','Giao hang xong','xm_ctct'],
  ['VC-PB-0312-02','PB-0312-02','Cty CP XM Hoang Long → Cty Xay dừng Ha Nam','Logistics Hoang Long','51B-0123','Le Van C','Clinker',2200,'26/05/2026','DH-2026-0312','Chờ khoi hanh','Chờ tại xe','xm_ctct'],
];

// Sub-group 2: VC vỏ bao công ty → công ty
const DB_VB_CTCT=[
  ['VC-PB-0319-02','PB-0319-02','Cty CP XM Ha Long → Cty VLXD Hai Phong','Giao nhận Ha Long','51B-1234','Nguyen Van A','Vỏ bao XM',420,'02/06/2026','DH-2026-0319','Đã giao','Giao vỏ bao day du','vb_ctct'],
  ['VC-PB-0318-02','PB-0318-02','Cty CP XM Bim Son → Cty VLXD Thanh Hoa','Vận tải Bim Son','51B-5678','Tran Van B','Vỏ bao XM',380,'01/06/2026','DH-2026-0318','Đang vận chuyển','Đang giao vỏ bao','vb_ctct'],
  ['VC-PB-0316-01','PB-0316-01','Cty CP XM Mien Bac → Cty VLXD Nam Dinh','VC Mien Bac','51D-3456','Pham Van D','Vỏ bao XM',510,'30/05/2026','DH-2026-0316','Đã giao','Luan chuyển xong','vb_ctct'],
  ['VC-PB-0315-02','PB-0315-02','Cty CP XM Sai Gon → Cty VLXD TPHCM','Vận tải Sai Gon','51B-7890','Hoang Van E','Vỏ bao PCB40',290,'29/05/2026','DH-2026-0315','Chờ khoi hanh','Chờ dieu xe chuyen','vb_ctct'],
  ['VC-PB-0317-02','PB-0317-02','Cty CP XM Hoang Long → Cty Xay dừng Ninh Binh','Logistics Hoang Long','51C-9012','Le Van C','Vỏ bao PCB40',350,'28/05/2026','DH-2026-0317','Đang vận chuyển','Hang đang tren duong','vb_ctct'],
  ['VC-PB-0314-02','PB-0314-02','Cty CP XM Ha Long → Cty TNHH Xay dừng Quang Ninh','Giao nhận Ha Long','29C-2345','Do Van F','Vỏ bao XM',460,'27/05/2026','DH-2026-0314','Đã giao','Giao xong','vb_ctct'],
];

// Sub-group 3: VC xi mang nhà máy → cang xep
const DB_XM_NMCP=[
  ['VC-PB-0319-03','PB-0319-03','NM Ha Long → Cảng Hải Phòng','Giao nhận Ha Long','51B-1234','Nguyen Van A','Clinker',5200,'02/06/2026','DH-2026-0319','Đã giao','Xếp lên tàu xong','xm_nmcp'],
  ['VC-PB-0318-03','PB-0318-03','NM Bim Son → Cảng Nghi Sơn','Vận tải Bim Son','60C-6789','Tran Van B','Clinker',3600,'01/06/2026','DH-2026-0318','Đã giao','Xếp hang xong','xm_nmcp'],
  ['VC-PB-0316-03','PB-0316-03','NM Mien Bac → Cảng Cửa Lò','VC Mien Bac','51D-3456','Pham Van D','Clinker',2900,'31/05/2026','DH-2026-0316','Chờ khoi hanh','Chờ xe ra cảng','xm_nmcp'],
  ['VC-PB-0315-03','PB-0315-03','NM Ha Long → Cảng Hải Phòng','Giao nhận Trung Viet','51B-0123','Nguyen Van A','Clinker',4800,'30/05/2026','DH-2026-0315','Đang vận chuyển','Đang ra cảng','xm_nmcp'],
  ['VC-PB-0317-03','PB-0317-03','NM Bim Son → Cảng Nghi Sơn','Vận tải Bim Son','51C-9012','Le Van C','Xi măng PCB40',2700,'29/05/2026','DH-2026-0317','Đã giao','Giao tại cang','xm_nmcp'],
  ['VC-PB-0314-03','PB-0314-03','NM Hoang Long → Cang Ninh Co','Logistics Hoang Long','51B-7890','Hoang Van E','Clinker',3400,'28/05/2026','DH-2026-0314','Đang vận chuyển','Du kien den cang 18h','xm_nmcp'],
  ['VC-PB-0313-02','PB-0313-02','NM Sai Gon → Cang Cat Lai','Vận tải Sai Gon','29C-2345','Do Van F','Clinker',4100,'27/05/2026','DH-2026-0313','Chờ khoi hanh','Chờ lệnh dieu xe ra cảng','xm_nmcp'],
  ['VC-PB-0312-01','PB-0312-01','NM Ha Long → Cảng Hải Phòng','Giao nhận Ha Long','51B-5678','Tran Van B','Thạch cao',1500,'26/05/2026','DH-2026-0312','Đã giao','Xếp lên tàu thanh cong','xm_nmcp'],
];

// All source data combined
// Format: [MaVC, MaPB, Tuyến, DVVC, Xe, Tai xe, SP, KL, Ngay, DH, TrangThai, GhiChu, sg]
const DB_SRC=[...DB_XM_CTCT,...DB_VB_CTCT,...DB_XM_NMCP];

// Build per-subgroup data
const DB_SG_DATA={xm_ctct:{all:[],dagiao:[],dangvc:[],chokhoihanh:[]},vb_ctct:{all:[],dagiao:[],dangvc:[],chokhoihanh:[]},xm_nmcp:{all:[],dagiao:[],dangvc:[],chokhoihanh:[]}};
DB_SRC.forEach(r=>{
  const sg=r[12];
  DB_SG_DATA[sg].all.push(r);
  if(r[10]==='Đã giao')DB_SG_DATA[sg].dagiao.push(r);
  if(r[10]==='Đang vận chuyển')DB_SG_DATA[sg].dangvc.push(r);
  if(r[10]==='Chờ khoi hanh')DB_SG_DATA[sg].chokhoihanh.push(r);
});

let currentDbSg='xm_ctct';
let currentDbTab='all';

// Sub-group counts
function updateDbSgCounts(){
  ['xm_ctct','vb_ctct','xm_nmcp'].forEach(sg=>{
    const el=document.getElementById('db-sg-cnt-'+sg);
    if(el) el.textContent=DB_SG_DATA[sg].all.length;
  });
}
updateDbSgCounts();

// Populate filter dropdowns based on current sub-group
function populateDbFilters(sg){
  const tuyenSel=document.getElementById('db-filter-tuyen');
  const dvvcSel=document.getElementById('db-filter-dvvc');
  if(!tuyenSel||!dvvcSel)return;
  tuyenSel.innerHTML='<option value="">Tất cả</option>';
  dvvcSel.innerHTML='<option value="">Tất cả</option>';
  const tuyens=[...new Set(DB_SG_DATA[sg].all.map(r=>r[2]))].sort();
  const dvvcs=[...new Set(DB_SG_DATA[sg].all.map(r=>r[3]))].sort();
  tuyens.forEach(t=>{const o=document.createElement('option');o.value=t;o.textContent=t;tuyenSel.appendChild(o);});
  dvvcs.forEach(d=>{const o=document.createElement('option');o.value=d;o.textContent=d;dvvcSel.appendChild(o);});
}

function updateDbKpis(sg){
  const d=DB_SG_DATA[sg];
  document.getElementById('db-kpi-total').textContent=d.all.length;
  document.getElementById('db-kpi-done').textContent=d.dagiao.length;
  document.getElementById('db-kpi-transit').textContent=d.dangvc.length;
  document.getElementById('db-kpi-pending').textContent=d.chokhoihanh.length;
  document.getElementById('db-tab-cnt-all').textContent=d.all.length;
  document.getElementById('db-tab-cnt-dagiao').textContent=d.dagiao.length;
  document.getElementById('db-tab-cnt-dangvc').textContent=d.dangvc.length;
  document.getElementById('db-tab-cnt-chokhoihanh').textContent=d.chokhoihanh.length;
}

const DB_TITLES={all:'Lệnh vận chuyển — Tất cả',dagiao:'Lệnh vận chuyển — Đã giao',dangvc:'Lệnh vận chuyển — Đang vận chuyển',chokhoihanh:'Lệnh vận chuyển — Chờ khoi hanh'};

function renderDbTable(tab,tuyenFilter,dvvcFilter,statusFilter,searchText){
  currentDbTab=tab;
  const sgData=DB_SG_DATA[currentDbSg];
  let data=sgData[tab]||sgData.all;
  if(tuyenFilter)data=data.filter(r=>r[2]===tuyenFilter);
  if(dvvcFilter)data=data.filter(r=>r[3]===dvvcFilter);
  if(statusFilter)data=data.filter(r=>r[10]===statusFilter);
  if(searchText){const q=searchText.toLowerCase();data=data.filter(r=>r[0].toLowerCase().includes(q)||r[1].toLowerCase().includes(q)||r[2].toLowerCase().includes(q)||r[4].toLowerCase().includes(q)||r[5].toLowerCase().includes(q)||r[9].toLowerCase().includes(q));}
  const tbody=document.getElementById('db-tbody');
  const title=document.getElementById('db-table-title');
  const count=document.getElementById('db-count');
  const footer=document.getElementById('db-footer');
  const sgLabel=DB_SG_LABELS[currentDbSg]||'';
  if(title)title.textContent=sgLabel+' — '+(DB_TITLES[tab]||'').split('—')[1]?.trim()||DB_TITLES[tab]||'';
  if(count)count.textContent=data.length+' dong';
  if(footer)footer.textContent=data.length+' / '+(sgData[tab]||sgData.all).length+' dong';
  tbody.innerHTML='';
  data.forEach(d=>{
    const tr=document.createElement('tr');
    tr.dataset.dbid=d[0];
    const statusCls=DB_STATUS_CLS[d[10]]||'s4';
    const xeCls=DB_XE_CLS[d[4]]||'c1';
    const xeShort=DB_XE_SHORT[d[4]]||'--';
    const isChoKH=d[10]==='Chờ khoi hanh';
    const isDangVC=d[10]==='Đang vận chuyển';
    const xeDisplay=`<div class="cust"><div class="av2 ${xeCls}" style="width:18px;height:18px;font-size:8px;flex:0 0 18px">${xeShort}</div><span style="font-family:var(--mono);font-size:var(--fs3);color:var(--ink2)">${d[4]}</span></div>`;
    const actionBtn=isChoKH?`<button class="db-act-btn" data-action="start" title="Khoi hanh"><i class="bi bi-play-fill"></i></button>`:isDangVC?`<button class="db-act-btn" data-action="track" title="Theo dõi"><i class="bi bi-geo-alt"></i></button>`:`<button class="db-act-btn" data-action="view" title="Xem chi tiết"><i class="bi bi-eye"></i></button>`;
    tr.innerHTML=`<td style="padding-left:14px"><span style="font-family:var(--mono);font-weight:600;color:var(--pri);font-size:var(--fs2)">${d[0]}</span></td><td><span class="m-related-item" data-type="pb" data-code="${d[1]}" style="font-family:var(--mono);font-size:var(--fs3);color:var(--acc);font-weight:500;padding:0;cursor:pointer">${d[1]}</span></td><td style="font-size:var(--fs3);max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d[2]}</td><td style="font-size:var(--fs3)">${d[3]}</td><td>${xeDisplay}</td><td style="font-size:var(--fs3)">${d[5]}</td><td style="font-size:var(--fs3)">${d[6]}</td><td class="vnum">${d[7].toLocaleString('vi-VN')}</td><td class="vnum" style="font-size:var(--fs3)">${d[8]}</td><td><span style="font-family:var(--mono);font-size:var(--fs3);color:var(--ink3)">${d[9]}</span></td><td style="padding-right:14px"><span class="pill ${statusCls}"><span class="d"></span>${d[10]}</span></td>`;
    tbody.appendChild(tr);
  });
  // Row clicks → open DB modal
  tbody.querySelectorAll('tr').forEach(tr=>{
    tr.addEventListener('click',(e)=>{
      if(e.target.closest('.db-act-btn'))return;
      if(e.target.closest('.m-related-item'))return;
      const dbid=tr.dataset.dbid;
      const found=findDbById(dbid);
      if(found)openModal('db',found);
    });
  });
  // PB link clicks in table
  tbody.querySelectorAll('.m-related-item[data-type="pb"]').forEach(el=>{
    el.addEventListener('click',(e)=>{
      e.stopPropagation();
      const pbCode=el.dataset.code;
      const found=findPbByCode(pbCode);
      if(found)openModal('pb',found);
    });
  });
  // Action button clicks
  tbody.querySelectorAll('.db-act-btn').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const dbid=btn.closest('tr').dataset.dbid;
      const found=findDbById(dbid);
      if(found)openModal('db',found);
    });
  });
}

// Sub-group tab switching
document.querySelectorAll('#db-sg-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#db-sg-tabs button').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    currentDbSg=btn.dataset.sg;
    // Reset filters
    document.getElementById('db-filter-tuyen').value='';
    document.getElementById('db-filter-dvvc').value='';
    document.getElementById('db-filter-status').value='';
    document.getElementById('db-search').value='';
    // Reset status tabs to "Tất cả"
    document.querySelectorAll('#db-tabs button').forEach(b=>b.classList.remove('on'));
    document.querySelector('#db-tabs button[data-tab="all"]').classList.add('on');
    currentDbTab='all';
    populateDbFilters(currentDbSg);
    updateDbKpis(currentDbSg);
    renderDbTable('all');
  });
});

// DB Tab switching
document.querySelectorAll('#db-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#db-tabs button').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById('db-filter-tuyen').value='';
    document.getElementById('db-filter-dvvc').value='';
    document.getElementById('db-filter-status').value='';
    document.getElementById('db-search').value='';
    renderDbTable(btn.dataset.tab);
  });
});
// DB filter changes
document.getElementById('db-filter-tuyen')?.addEventListener('change',function(){
  const f=getDbFilters();
  renderDbTable(currentDbTab,f.tuyen,f.dvvc,f.status,f.search);
});
document.getElementById('db-filter-dvvc')?.addEventListener('change',function(){
  const f=getDbFilters();
  renderDbTable(currentDbTab,f.tuyen,f.dvvc,f.status,f.search);
});
document.getElementById('db-filter-status')?.addEventListener('change',function(){
  const f=getDbFilters();
  renderDbTable(currentDbTab,f.tuyen,f.dvvc,f.status,f.search);
});
document.getElementById('db-search')?.addEventListener('input',function(){
  const f=getDbFilters();
  renderDbTable(currentDbTab,f.tuyen,f.dvvc,f.status,f.search);
});
function getDbFilters(){
  return{
    tuyen:document.getElementById('db-filter-tuyen')?.value||'',
    dvvc:document.getElementById('db-filter-dvvc')?.value||'',
    status:document.getElementById('db-filter-status')?.value||'',
    search:document.getElementById('db-search')?.value||''
  };
}
// DB Back button
document.getElementById('db-btn-back')?.addEventListener('click',()=>{
  switchPage('chuyentau');
});
// Initial render
populateDbFilters('xm_ctct');
updateDbKpis('xm_ctct');
renderDbTable('all');
