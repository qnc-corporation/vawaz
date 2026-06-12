// ===== DIEU DO SA LAN DATA & LOGIC =====
const PSL_SALAN=['SL Ha Long 01','SL Bim Son 02','SL Hoang Long 03','SL Mien Bac 04','SL Sai Gon 05','SL Hai Phong 06','SL Nghi Son 07','SL Cua Lo 08'];
const PSL_SALAN_CLS={'SL Ha Long 01':'c1','SL Bim Son 02':'c2','SL Hoang Long 03':'c3','SL Mien Bac 04':'c4','SL Sai Gon 05':'c5','SL Hai Phong 06':'c1','SL Nghi Son 07':'c2','SL Cua Lo 08':'c3'};
const PSL_SALAN_SHORT={'SL Ha Long 01':'HL1','SL Bim Son 02':'BS2','SL Hoang Long 03':'HL3','SL Mien Bac 04':'MB4','SL Sai Gon 05':'SG5','SL Hai Phong 06':'HP6','SL Nghi Son 07':'NS7','SL Cua Lo 08':'CL8'};
const PSL_BEN=['Bo Chuong Duong','Bo Vinh Tan','Bo Nghi Son','Bo Cua Lo','Bo Da Nang','Bo Quy Nhon','Bo Sai Gon','Bo Can Tho'];
const PSL_STATUS_CLS={'Da nhap':'s2','Đang nhập':'s4','Chờ nhập':'s6'};
const PSL_TITLES={all:'Điều độ sà lan — Tất cả',danhap:'Điều độ sà lan — Da nhap',dangnhap:'Điều độ sà lan — Đang nhập',chonhap:'Điều độ sà lan — Chờ nhập'};

// Populate PSL filter dropdowns
(function(){
  const slSel=document.getElementById('psl-filter-salan');
  PSL_SALAN.forEach(s=>{const o=document.createElement('option');o.value=s;o.textContent=s;slSel?.appendChild(o);});
  const benSel=document.getElementById('psl-filter-ben');
  PSL_BEN.forEach(b=>{const o=document.createElement('option');o.value=b;o.textContent=b;benSel?.appendChild(o);});
})();

// PSL source data: [Ma PSL, Sa lan, Bo neo, Sản phẩm, So lô xuất, KL nhập (tan), Ngày nhap, Đơn hàng, Trạng thái, Ghi chu]
const PSL_SRC=[
  ['PSL-2026-001','SL Ha Long 01','Bo Chuong Duong','Clinker','LX-2026-001',5200,'02/06/2026','DH-2026-0319','Da nhap','Nhập đầy du theo lô xuất'],
  ['PSL-2026-002','SL Bim Son 02','Bo Vinh Tan','Clinker','LX-2026-002',3800,'01/06/2026','DH-2026-0318','Da nhap','Xi măng nội địa'],
  ['PSL-2026-003','SL Hoang Long 03','Bo Nghi Son','Clinker','LX-2026-003',4500,'31/05/2026','DH-2026-0317','Đang nhập','Đang xếp hàng lên sà lan'],
  ['PSL-2026-004','SL Mien Bac 04','Bo Cua Lo','Xi măng PCB40','LX-2026-004',2800,'30/05/2026','DH-2026-0316','Đang nhập','Xếp 60% khối lượng'],
  ['PSL-2026-005','SL Sai Gon 05','Bo Da Nang','Clinker','LX-2026-005',6100,'29/05/2026','DH-2026-0315','Da nhap','Nhap hoan tat'],
  ['PSL-2026-006','SL Hai Phong 06','Bo Quy Nhon','Thạch cao','LX-2026-006',3200,'28/05/2026','DH-2026-0314','Chờ nhập','Chờ xếp lịch sa lan'],
  ['PSL-2026-007','SL Nghi Son 07','Bo Sai Gon','Clinker','LX-2026-007',4100,'27/05/2026','DH-2026-0313','Da nhap','Nhap hang thanh cong'],
  ['PSL-2026-008','SL Cua Lo 08','Bo Can Tho','Clinker','LX-2026-008',5500,'26/05/2026','DH-2026-0312','Chờ nhập','Chờ dieu dong sa lan'],
  ['PSL-2026-009','SL Ha Long 01','Bo Chuong Duong','Xi măng','LX-2026-009',2900,'25/05/2026','DH-2026-0311','Da nhap','Hang xuất khẩu'],
  ['PSL-2026-010','SL Bim Son 02','Bo Vinh Tan','Thạch cao','LX-2026-010',4700,'24/05/2026','DH-2026-0310','Da nhap','Nhập đầy du'],
  ['PSL-2026-011','SL Hoang Long 03','Bo Nghi Son','Clinker','LX-2026-011',3600,'23/05/2026','DH-2026-0309','Đang nhập','Đang tại hang lên sà lan'],
  ['PSL-2026-012','SL Mien Bac 04','Bo Cua Lo','Clinker','LX-2026-012',5000,'22/05/2026','DH-2026-0308','Chờ nhập','Chờ kiểm tra ham sa lan'],
  ['PSL-2026-013','SL Sai Gon 05','Bo Da Nang','Clinker','LX-2026-013',3400,'21/05/2026','DH-2026-0307','Da nhap','Nhap hoan tat'],
  ['PSL-2026-014','SL Hai Phong 06','Bo Quy Nhon','Xi măng PCB40','LX-2026-014',4200,'20/05/2026','DH-2026-0306','Da nhap','Nhap hang thanh cong'],
  ['PSL-2026-015','SL Nghi Son 07','Bo Sai Gon','Clinker','LX-2026-015',5800,'19/05/2026','DH-2026-0305','Đang nhập','Đang nhập khối lượng'],
  ['PSL-2026-016','SL Cua Lo 08','Bo Can Tho','Thạch cao','LX-2026-016',3100,'18/05/2026','DH-2026-0304','Da nhap','Nhap xong'],
  ['PSL-2026-017','SL Ha Long 01','Bo Nghi Son','Clinker','LX-2026-017',6300,'17/05/2026','DH-2026-0303','Chờ nhập','Chờ phep nhập hàng'],
  ['PSL-2026-018','SL Bim Son 02','Bo Chuong Duong','Clinker','LX-2026-018',2700,'16/05/2026','DH-2026-0302','Da nhap','Giao hang dừng han'],
  ['PSL-2026-019','SL Hoang Long 03','Bo Vinh Tan','Clinker','LX-2026-019',3900,'15/05/2026','DH-2026-0301','Da nhap','Nhap hoan tat'],
  ['PSL-2026-020','SL Mien Bac 04','Bo Cua Lo','Clinker','LX-2026-020',5600,'14/05/2026','DH-2026-0300','Chờ nhập','Chờ phương tiện'],
  ['PSL-2026-021','SL Sai Gon 05','Bo Da Nang','Xi măng','LX-2026-021',2400,'13/05/2026','DH-2026-0299','Da nhap','Nhap thanh cong'],
  ['PSL-2026-022','SL Hai Phong 06','Bo Quy Nhon','Clinker','LX-2026-022',4800,'12/05/2026','DH-2026-0320','Đang nhập','Xếp hang 50%'],
];

const PSL_DATA={all:[],danhap:[],dangnhap:[],chonhap:[]};
PSL_SRC.forEach(r=>{
  PSL_DATA.all.push(r);
  if(r[8]==='Da nhap')PSL_DATA.danhap.push(r);
  if(r[8]==='Đang nhập')PSL_DATA.dangnhap.push(r);
  if(r[8]==='Chờ nhập')PSL_DATA.chonhap.push(r);
});

// KPI updates
document.getElementById('psl-kpi-total').textContent=PSL_DATA.all.length;
document.getElementById('psl-kpi-done').textContent=PSL_DATA.danhap.length;
document.getElementById('psl-kpi-loading').textContent=PSL_DATA.dangnhap.length;
document.getElementById('psl-kpi-pending').textContent=PSL_DATA.chonhap.length;
// Tab counts
document.getElementById('psl-tab-cnt-all').textContent=PSL_DATA.all.length;
document.getElementById('psl-tab-cnt-danhap').textContent=PSL_DATA.danhap.length;
document.getElementById('psl-tab-cnt-dangnhap').textContent=PSL_DATA.dangnhap.length;
document.getElementById('psl-tab-cnt-chonhap').textContent=PSL_DATA.chonhap.length;

let currentPslTab='all';

function renderPslTable(tab,salanFilter,benFilter,statusFilter,searchText){
  currentPslTab=tab;
  let data=PSL_DATA[tab]||PSL_DATA.all;
  if(salanFilter)data=data.filter(r=>r[1]===salanFilter);
  if(benFilter)data=data.filter(r=>r[2]===benFilter);
  if(statusFilter)data=data.filter(r=>r[8]===statusFilter);
  if(searchText){const q=searchText.toLowerCase();data=data.filter(r=>r[0].toLowerCase().includes(q)||r[1].toLowerCase().includes(q)||r[3].toLowerCase().includes(q)||r[4].toLowerCase().includes(q)||r[7].toLowerCase().includes(q));}
  const tbody=document.getElementById('psl-tbody');
  const title=document.getElementById('psl-table-title');
  const count=document.getElementById('psl-count');
  const footer=document.getElementById('psl-footer');
  if(title)title.textContent=PSL_TITLES[tab]||'';
  if(count)count.textContent=data.length+' dong';
  if(footer)footer.textContent=data.length+' / '+(PSL_DATA[tab]||PSL_DATA.all).length+' dong';
  tbody.innerHTML='';
  data.forEach(d=>{
    const tr=document.createElement('tr');
    tr.dataset.pslid=d[0];
    const statusCls=PSL_STATUS_CLS[d[8]]||'s4';
    const slCls=PSL_SALAN_CLS[d[1]]||'c1';
    const slShort=PSL_SALAN_SHORT[d[1]]||'--';
    const isChoNhap=d[8]==='Chờ nhập';
    const isDangNhap=d[8]==='Đang nhập';
    const slDisplay=`<div class="cust"><div class="av2 ${slCls}" style="width:18px;height:18px;font-size:9px;flex:0 0 18px">${slShort}</div><span style="font-size:var(--fs3)">${d[1]}</span></div>`;
    const actionBtn=isChoNhap?`<button class="psl-act-btn" data-action="start" title="Bắt đầu nhap"><i class="bi bi-play-fill"></i></button>`:isDangNhap?`<button class="psl-act-btn" data-action="track" title="Theo dõi"><i class="bi bi-geo-alt"></i></button>`:`<button class="psl-act-btn" data-action="view" title="Xem chi tiết"><i class="bi bi-eye"></i></button>`;
    tr.innerHTML=`<td style="padding-left:14px"><span style="font-family:var(--mono);font-weight:600;color:var(--pri);font-size:var(--fs2)">${d[0]}</span></td><td>${slDisplay}</td><td style="font-size:var(--fs3)">${d[2]}</td><td style="font-size:var(--fs3)">${d[3]}</td><td><span style="font-family:var(--mono);font-size:var(--fs3);color:var(--ink3)">${d[4]}</span></td><td class="vnum">${d[5].toLocaleString('vi-VN')}</td><td class="vnum" style="font-size:var(--fs3)">${d[6]}</td><td><span style="font-family:var(--mono);font-size:var(--fs3);color:var(--ink3)">${d[7]}</span></td><td style="padding-right:14px"><span class="pill ${statusCls}"><span class="d"></span>${d[8]}</span></td>`;
    tbody.appendChild(tr);
  });
  // Row clicks → open PSL modal
  tbody.querySelectorAll('tr').forEach(tr=>{
    tr.addEventListener('click',(e)=>{
      if(e.target.closest('.psl-act-btn'))return;
      const pslid=tr.dataset.pslid;
      const found=findPslById(pslid);
      if(found)openModal('psl',found);
    });
  });
  // Action button clicks
  tbody.querySelectorAll('.psl-act-btn').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const pslid=btn.closest('tr').dataset.pslid;
      const found=findPslById(pslid);
      if(found)openModal('psl',found);
    });
  });
}
// PSL Tab switching
document.querySelectorAll('#psl-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#psl-tabs button').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById('psl-filter-salan').value='';
    document.getElementById('psl-filter-ben').value='';
    document.getElementById('psl-filter-status').value='';
    document.getElementById('psl-search').value='';
    renderPslTable(btn.dataset.tab);
  });
});
// PSL filter changes
document.getElementById('psl-filter-salan')?.addEventListener('change',function(){
  const f=getPslFilters();
  renderPslTable(currentPslTab,f.salan,f.ben,f.status,f.search);
});
document.getElementById('psl-filter-ben')?.addEventListener('change',function(){
  const f=getPslFilters();
  renderPslTable(currentPslTab,f.salan,f.ben,f.status,f.search);
});
document.getElementById('psl-filter-status')?.addEventListener('change',function(){
  const f=getPslFilters();
  renderPslTable(currentPslTab,f.salan,f.ben,f.status,f.search);
});
document.getElementById('psl-search')?.addEventListener('input',function(){
  const f=getPslFilters();
  renderPslTable(currentPslTab,f.salan,f.ben,f.status,f.search);
});
function getPslFilters(){
  return{
    salan:document.getElementById('psl-filter-salan')?.value||'',
    ben:document.getElementById('psl-filter-ben')?.value||'',
    status:document.getElementById('psl-filter-status')?.value||'',
    search:document.getElementById('psl-search')?.value||''
  };
}
// PSL Back button
document.getElementById('psl-btn-back')?.addEventListener('click',()=>{
  switchPage('chuyentau');
});
renderPslTable('all');
