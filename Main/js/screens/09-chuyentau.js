// ===== KE HOACH TAU ME DATA & LOGIC =====
const CXT_TAU=['MV Thai Binh','MV Hoa Sen','MV Vinashin Star','MV Phu Quoc','MV Dragon Pearl','MV Hai Au'];
const CXT_TAU_CLS={'MV Thai Binh':'c1','MV Hoa Sen':'c2','MV Vinashin Star':'c3','MV Phu Quoc':'c4','MV Dragon Pearl':'c5','MV Hai Au':'c6'};
const CXT_TAU_SHORT={'MV Thai Binh':'TB','MV Hoa Sen':'HS','MV Vinashin Star':'VS','MV Phu Quoc':'PQ','MV Dragon Pearl':'DP','MV Hai Au':'HA'};
const CXT_BEN=['Cảng Hải Phòng','Cảng Cửa Lò','Cảng Nghi Sơn','Cảng Đà Nẵng','Cảng Quy Nhơn','Cảng Sài Gòn','Cảng Cần Thơ'];
const CXT_STATUS_CLS={'Đã xuất':'s2','Đang xuất':'s4','Chờ xuất':'s6','Đã hủy':'s5'};
const CXT_TITLES={all:'Kế hoạch tàu mẹ — Tất cả',daxuat:'Kế hoạch tàu mẹ — Đã xuất',dangxuat:'Kế hoạch tàu mẹ — Đang xuất',choxuat:'Kế hoạch tàu mẹ — Chờ xuất',huy:'Kế hoạch tàu mẹ — Đã hủy'};

// Populate filter dropdowns
(function(){
  const tauSel=document.getElementById('cxt-filter-tau');
  CXT_TAU.forEach(t=>{const o=document.createElement('option');o.value=t;o.textContent=t;tauSel?.appendChild(o);});
  const benSel=document.getElementById('cxt-filter-ben');
  CXT_BEN.forEach(b=>{const o=document.createElement('option');o.value=b;o.textContent=b;benSel?.appendChild(o);});
})();

const CXT_SRC=[
  ['LX-2026-001','MV Thai Binh','Cảng Hải Phòng','Cảng Cửa Lò',5200,'02/06/2026','DH-XK-001','Đã xuất','Clinker XK sang Lao'],
  ['LX-2026-002','MV Hoa Sen','Cảng Hải Phòng','Cảng Đà Nẵng',3800,'01/06/2026','DH-XK-002','Đã xuất','Xi măng nội địa'],
  ['LX-2026-003','MV Vinashin Star','Cảng Nghi Sơn','Cảng Quy Nhơn',4500,'31/05/2026','DH-XK-003','Đang xuất','Đang làm hàng'],
  ['LX-2026-004','MV Phu Quoc','Cảng Đà Nẵng','Cảng Sài Gòn',2800,'30/05/2026','DH-XK-004','Đang xuất','Xếp hang lên tàu'],
  ['LX-2026-005','MV Dragon Pearl','Cảng Hải Phòng','Cảng Cần Thơ',6100,'29/05/2026','DH-XK-005','Đã xuất','Clinker mien Tay'],
  ['LX-2026-006','MV Hai Au','Cảng Cửa Lò','Cảng Nghi Sơn',3200,'28/05/2026','DH-XK-006','Chờ xuất','Chờ xếp lịch tàu'],
  ['LX-2026-007','MV Thai Binh','Cảng Hải Phòng','Cảng Đà Nẵng',4100,'27/05/2026','DH-XK-007','Đã xuất','Chuyen hang thuong'],
  ['LX-2026-008','MV Hoa Sen','Cảng Nghi Sơn','Cảng Quy Nhơn',5500,'26/05/2026','DH-XK-008','Chờ xuất','Chờ phép xuất'],
  ['LX-2026-009','MV Vinashin Star','Cảng Đà Nẵng','Cảng Sài Gòn',2900,'25/05/2026','DH-XK-009','Đã xuất','Hang xuất khẩu'],
  ['LX-2026-010','MV Phu Quoc','Cảng Hải Phòng','Cảng Cửa Lò',4700,'24/05/2026','DH-XK-010','Đã hủy','Hủy do thoi tiet'],
  ['LX-2026-011','MV Dragon Pearl','Cảng Cửa Lò','Cảng Cần Thơ',3600,'23/05/2026','DH-XK-011','Đã xuất','Chuyen hang nam'],
  ['LX-2026-012','MV Hai Au','Cảng Hải Phòng','Cảng Quy Nhơn',5000,'22/05/2026','DH-XK-012','Chờ xuất','Chờ kiểm tra ham'],
  ['LX-2026-013','MV Thai Binh','Cảng Nghi Sơn','Cảng Đà Nẵng',3400,'21/05/2026','DH-XK-013','Đang xuất','Đang can hang'],
  ['LX-2026-014','MV Hoa Sen','Cảng Đà Nẵng','Cảng Sài Gòn',4200,'20/05/2026','DH-XK-014','Đã xuất','Xuat hang thanh cong'],
  ['LX-2026-015','MV Vinashin Star','Cảng Hải Phòng','Cảng Cửa Lò',5800,'19/05/2026','DH-XK-015','Đã hủy','Hủy theo yeu cau KH'],
  ['LX-2026-016','MV Phu Quoc','Cảng Cửa Lò','Cảng Nghi Sơn',3100,'18/05/2026','DH-XK-016','Đã xuất','Lo hang binh thuong'],
  ['LX-2026-017','MV Dragon Pearl','Cảng Hải Phòng','Cảng Sài Gòn',6300,'17/05/2026','DH-XK-017','Chờ xuất','Chờ tay tàu'],
  ['LX-2026-018','MV Hai Au','Cảng Nghi Sơn','Cảng Quy Nhơn',2700,'16/05/2026','DH-XK-018','Đã xuất','Giao hang dừng han'],
];

const CXT_DATA={all:[],daxuat:[],dangxuat:[],choxuat:[],huy:[]};
CXT_SRC.forEach(r=>{
  CXT_DATA.all.push(r);
  if(r[7]==='Đã xuất')CXT_DATA.daxuat.push(r);
  if(r[7]==='Đang xuất')CXT_DATA.dangxuat.push(r);
  if(r[7]==='Chờ xuất')CXT_DATA.choxuat.push(r);
  if(r[7]==='Đã hủy')CXT_DATA.huy.push(r);
});

// KPI updates
document.getElementById('cxt-kpi-total').textContent=CXT_DATA.all.length;
document.getElementById('cxt-kpi-done').textContent=CXT_DATA.daxuat.length;
document.getElementById('cxt-kpi-loading').textContent=CXT_DATA.dangxuat.length;
document.getElementById('cxt-kpi-pending').textContent=CXT_DATA.choxuat.length;
// Tab counts
document.getElementById('cxt-tab-cnt-all').textContent=CXT_DATA.all.length;
document.getElementById('cxt-tab-cnt-daxuat').textContent=CXT_DATA.daxuat.length;
document.getElementById('cxt-tab-cnt-dangxuat').textContent=CXT_DATA.dangxuat.length;
document.getElementById('cxt-tab-cnt-choxuat').textContent=CXT_DATA.choxuat.length;
document.getElementById('cxt-tab-cnt-huy').textContent=CXT_DATA.huy.length;

let currentCxtTab='all';

function renderCxtTable(tab,tauFilter,benFilter,statusFilter,searchText){
  currentCxtTab=tab;
  let data=CXT_DATA[tab]||CXT_DATA.all;
  if(tauFilter)data=data.filter(r=>r[1]===tauFilter);
  if(benFilter)data=data.filter(r=>r[2]===benFilter||r[3]===benFilter);
  if(statusFilter)data=data.filter(r=>r[7]===statusFilter);
  if(searchText){const q=searchText.toLowerCase();data=data.filter(r=>r[0].toLowerCase().includes(q)||r[1].toLowerCase().includes(q)||r[2].toLowerCase().includes(q)||r[3].toLowerCase().includes(q)||r[6].toLowerCase().includes(q));}
  const tbody=document.getElementById('cxt-tbody');
  const title=document.getElementById('cxt-table-title');
  const count=document.getElementById('cxt-count');
  const footer=document.getElementById('cxt-footer');
  if(title)title.textContent=CXT_TITLES[tab]||'';
  if(count)count.textContent=data.length+' dong';
  if(footer)footer.textContent=data.length+' / '+(CXT_DATA[tab]||CXT_DATA.all).length+' dong';
  tbody.innerHTML='';
  data.forEach(d=>{
    const tr=document.createElement('tr');
    tr.dataset.cxtid=d[0];
    const statusCls=CXT_STATUS_CLS[d[7]]||'s4';
    const tauCls=CXT_TAU_CLS[d[1]]||'c1';
    const tauShort=CXT_TAU_SHORT[d[1]]||'--';
    const isChoXuat=d[7]==='Chờ xuất';
    const isDangXuat=d[7]==='Đang xuất';
    const isDaHủy=d[7]==='Đã hủy';
    const tauDisplay=`<div class="cust"><div class="av2 ${tauCls}" style="width:18px;height:18px;font-size:9px;flex:0 0 18px">${tauShort}</div><span style="font-size:var(--fs3)">${d[1]}</span></div>`;
    const actionBtn=isChoXuat?`<button class="cxt-act-btn" data-action="start" title="Bắt đầu xuat"><i class="bi bi-play-fill"></i></button>`:isDangXuat?`<button class="cxt-act-btn" data-action="track" title="Theo dõi"><i class="bi bi-geo-alt"></i></button>`:isDaHủy?`<button class="cxt-act-btn" data-action="view" title="Xem"><i class="bi bi-eye"></i></button>`:`<button class="cxt-act-btn" data-action="view" title="Xem chi tiết"><i class="bi bi-eye"></i></button>`;
    tr.innerHTML=`<td style="padding-left:14px"><input type="checkbox" class="cxt-row-check" data-cxtid="${d[0]}" style="accent-color:var(--pri)"></td><td><span style="font-family:var(--mono);font-weight:600;color:var(--pri);font-size:var(--fs2)">${d[0]}</span></td><td>${tauDisplay}</td><td style="font-size:var(--fs3)">${d[2]}</td><td style="font-size:var(--fs3)">${d[3]}</td><td class="vnum">${d[4].toLocaleString('vi-VN')}</td><td class="vnum" style="font-size:var(--fs3)">${d[5]}</td><td><span style="font-family:var(--mono);font-size:var(--fs3);color:var(--ink3)">${d[6]}</span></td><td><span class="pill ${statusCls}"><span class="d"></span>${d[7]}</span></td><td style="padding-right:14px;text-align:center">${actionBtn}</td>`;
    tbody.appendChild(tr);
  });
  // Action button clicks
  tbody.querySelectorAll('.cxt-act-btn').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const cxtid=btn.closest('tr').dataset.cxtid;
      const found=findCtById(cxtid);
      if(found)openModal('ct',found);
    });
  });
  // Row clicks
  tbody.querySelectorAll('tr').forEach(tr=>{
    tr.addEventListener('click',(e)=>{
      if(e.target.closest('.cxt-act-btn'))return;
      if(e.target.type==='checkbox')return;
      const cxtid=tr.dataset.cxtid;
      const found=findCtById(cxtid);
      if(found)openModal('ct',found);
    });
  });
  // Checkbox handling
  tbody.querySelectorAll('.cxt-row-check').forEach(cb=>{
    cb.addEventListener('change',()=>updateCxtBulkBar());
  });
}

function getCxtFilters(){
  return{
    tau:document.getElementById('cxt-filter-tau')?.value||'',
    ben:document.getElementById('cxt-filter-ben')?.value||'',
    status:document.getElementById('cxt-filter-status')?.value||'',
    search:document.getElementById('cxt-search')?.value||''
  };
}
// CXT Tab switching
document.querySelectorAll('#cxt-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#cxt-tabs button').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById('cxt-filter-tau').value='';
    document.getElementById('cxt-filter-ben').value='';
    document.getElementById('cxt-filter-status').value='';
    document.getElementById('cxt-search').value='';
    renderCxtTable(btn.dataset.tab);
  });
});
// CXT filter change handlers
document.getElementById('cxt-filter-tau')?.addEventListener('change',()=>{const f=getCxtFilters();renderCxtTable(currentCxtTab,f.tau,f.ben,f.status,f.search);});
document.getElementById('cxt-filter-ben')?.addEventListener('change',()=>{const f=getCxtFilters();renderCxtTable(currentCxtTab,f.tau,f.ben,f.status,f.search);});
document.getElementById('cxt-filter-status')?.addEventListener('change',()=>{const f=getCxtFilters();renderCxtTable(currentCxtTab,f.tau,f.ben,f.status,f.search);});
document.getElementById('cxt-search')?.addEventListener('input',()=>{const f=getCxtFilters();renderCxtTable(currentCxtTab,f.tau,f.ben,f.status,f.search);});
// CXT select-all
document.getElementById('cxt-select-all')?.addEventListener('change',function(){
  document.querySelectorAll('.cxt-row-check').forEach(cb=>{cb.checked=this.checked;});
  updateCxtBulkBar();
});
// CXT bulk bar
function updateCxtBulkBar(){
  const checked=document.querySelectorAll('.cxt-row-check:checked');
  const bar=document.getElementById('cxt-bulk-bar');
  const cnt=document.getElementById('cxt-selected-count');
  if(bar)bar.style.display=checked.length?'flex':'none';
  if(cnt)cnt.textContent=checked.length+' dòng chọn';
}
document.getElementById('cxt-clear-sel')?.addEventListener('click',()=>{
  document.querySelectorAll('.cxt-row-check').forEach(cb=>{cb.checked=false;});
  const sa=document.getElementById('cxt-select-all');if(sa)sa.checked=false;
  updateCxtBulkBar();
});
// CXT Back button
document.getElementById('cxt-btn-back')?.addEventListener('click',()=>{
  switchPage('vobao');
});
renderCxtTable('all');
