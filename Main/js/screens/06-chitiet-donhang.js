// ===== CHI TIET DON HANG DATA & LOGIC =====
const NM_COLORS={'NM Ha Long':'c1','NM Bim Son':'c3','NM Hoang Long':'c4','NM Mien Bac':'c5','NM Sai Gon':'c2'};
const NM_SHORT={'NM Ha Long':'HL','NM Bim Son':'BS','NM Hoang Long':'HLo','NM Mien Bac':'MB','NM Sai Gon':'SG'};

// Quy cách mapping: product -> default quy cach
const QC_MAP={
  'Clinker':'Bulk','Xi măng PCB40':'PC40 50kg','Xi măng':'Bag 25kg',
  'Thạch cao':'Board 1.2m','Vận tải biển':'Theo chuyen','Dịch vụ cảng':'Theo thang',
  'Giao nhận':'Theo lo','Kiểm đếm':'Theo lo','Chờ dỡ món':'Theo chuyen','Dịch vụ phụ trợ':'Theo lo'
};
// Alternate quy cach for variety
const QC_ALT={
  'Clinker':['Bulk','Loose'],
  'Xi măng PCB40':['PC40 50kg','PC40 jumbo'],
  'Xi măng':['Bag 25kg','Jumbo 1.5T'],
  'Thạch cao':['Board 1.2m','Board 1.5m']
};
// Ma sản phẩm mapping
const SP_CODE_MAP={
  'Clinker':'SP-CLK','Xi măng PCB40':'SP-XM40','Xi măng':'SP-XM',
  'Thạch cao':'SP-TC','Vận tải biển':'SP-VTB','Dịch vụ cảng':'SP-DVC',
  'Giao nhận':'SP-GN','Kiểm đếm':'SP-KD','Chờ dỡ món':'SP-CDM','Dịch vụ phụ trợ':'SP-DVPT'
};

// Source data: [Ma DH, Sản phẩm, Nhà máy, KL dat, KL giao, Đơn giá, Trạng thái]
const CT_SRC=[
  ['DH-2026-0319','Clinker','NM Ha Long',5000,3200,480,'Đang giao'],
  ['DH-2026-0319','Clinker','NM Bim Son',5000,1800,480,'Đang giao'],
  ['DH-2026-0319','Clinker','NM Mien Bac',2000,1400,480,'Đang giao'],
  ['DH-2026-0319','Clinker','NM Sai Gon',5000,5000,480,'Đã giao'],
  ['DH-2026-0318','Clinker','NM Ha Long',3200,2100,520,'Đang giao'],
  ['DH-2026-0318','Clinker','NM Hoang Long',3200,0,520,'Chờ phân bổ'],
  ['DH-2026-0317','Xi măng PCB40','NM Mien Bac',2800,2800,345,'Đã giao'],
  ['DH-2026-0317','Xi măng PCB40','NM Ha Long',2800,2800,345,'Đã giao'],
  ['DH-2026-0316','Clinker','NM Sai Gon',8000,0,388,'Chờ phân bổ'],
  ['DH-2026-0316','Clinker','NM Ha Long',8000,4200,388,'Đang giao'],
  ['DH-2026-0316','Clinker','NM Bim Son',8000,6200,388,'Đang giao'],
  ['DH-2026-0315','Thạch cao','NM Ha Long',4600,4600,400,'Đã giao'],
  ['DH-2026-0315','Thạch cao','NM Bim Son',4600,0,400,'Chờ phân bổ'],
  ['DH-2026-0314','Clinker','NM Hoang Long',6000,5800,367,'Đang giao'],
  ['DH-2026-0314','Clinker','NM Bim Son',6000,0,367,'Chờ phân bổ'],
  ['DH-2026-0313','Clinker','NM Ha Long',3500,0,366,'Chờ phân bổ'],
  ['DH-2026-0313','Clinker','NM Hoang Long',3500,3100,366,'Đang giao'],
  ['DH-2026-0312','Clinker','NM Ha Long',2400,2400,283,'Đã giao'],
  ['DH-2026-0311','Thạch cao','NM Mien Bac',1800,1200,228,'Đang giao'],
  ['DH-2026-0311','Thạch cao','NM Ha Long',1800,1800,228,'Đã giao'],
  ['DH-2026-0310','Clinker','NM Hoang Long',9200,9200,370,'Đã giao'],
  ['DH-2026-0310','Clinker','NM Mien Bac',9200,8100,370,'Đang giao'],
  ['DH-2026-0309','Clinker','NM Bim Son',4500,4500,373,'Đã giao'],
  ['DH-2026-0309','Clinker','NM Ha Long',4500,2300,373,'Đang giao'],
  ['DH-2026-0309','Clinker','NM Mien Bac',4500,4500,373,'Đã giao'],
  ['DH-2026-0308','Clinker','NM Ha Long',2800,2200,371,'Đang giao'],
  ['DH-2026-0308','Clinker','NM Bim Son',2800,2800,371,'Đã giao'],
  ['DH-2026-0307','Clinker','NM Bim Son',6400,5100,372,'Đang giao'],
  ['DH-2026-0307','Clinker','NM Ha Long',6400,6400,372,'Đã giao'],
  ['DH-2026-0307','Clinker','NM Sai Gon',6400,5800,372,'Đang giao'],
  ['DH-2026-0306','Thạch cao','NM Mien Bac',3100,3100,219,'Đã giao'],
  ['DH-2026-0306','Thạch cao','NM Sai Gon',3100,2400,219,'Đang giao'],
  ['DH-2026-0305','Clinker','NM Ha Long',2200,2230,373,'Chênh lệch'],
  ['DH-2026-0305','Clinker','NM Hoang Long',2200,2200,373,'Đã giao'],
  ['DH-2026-0304','Clinker','NM Hoang Long',5200,5200,373,'Đã giao'],
  ['DH-2026-0304','Clinker','NM Mien Bac',5200,3900,373,'Đang giao'],
  ['DH-2026-0303','Clinker','NM Bim Son',4000,2600,370,'Đang giao'],
  ['DH-2026-0303','Clinker','NM Ha Long',4000,4000,370,'Đã giao'],
  ['DH-2026-0302','Clinker','NM Sai Gon',3800,3800,374,'Đã giao'],
  ['DH-2026-0302','Clinker','NM Mien Bac',3800,2100,374,'Đang giao'],
  ['DH-2026-0301','Clinker','NM Ha Long',5500,4100,375,'Đang giao'],
  ['DH-2026-0301','Clinker','NM Bim Son',5500,5500,375,'Đã giao'],
  ['DH-2026-0300','Thạch cao','NM Mien Bac',2400,2480,229,'Chênh lệch'],
  ['DH-2026-0300','Thạch cao','NM Ha Long',2400,2400,229,'Đã giao'],
  ['DH-2026-0299','Clinker','NM Hoang Long',1600,1600,375,'Đã giao'],
  ['DH-2026-0299','Clinker','NM Mien Bac',1600,1100,375,'Đang giao'],
  ['DH-2026-0298','Xi măng','NM Sai Gon',1200,1200,367,'Đã giao'],
  ['DH-2026-0320','Clinker','NM Ha Long',12000,8400,373,'Đang giao'],
  ['DH-2026-0320','Clinker','NM Bim Son',12000,5600,373,'Đang giao'],
  ['DH-2026-0320','Clinker','NM Hoang Long',12000,9200,373,'Đang giao'],
  ['DH-2026-0321','Xi măng PCB40','NM Bim Son',6500,3800,320,'Đang giao'],
  ['DH-2026-0321','Xi măng PCB40','NM Ha Long',6500,6500,320,'Đã giao'],
  ['DH-2026-0322','Clinker','NM Hoang Long',8000,0,370,'Chờ phân bổ'],
  ['DH-2026-0323','Xi măng','NM Sai Gon',5000,5000,300,'Đã giao'],
  ['DH-2026-0324','Clinker','NM Mien Bac',3800,3800,374,'Đã giao'],
  ['DH-2026-0324','Clinker','NM Hoang Long',3800,2100,374,'Đang giao'],
  ['DH-2026-0325','Clinker','NM Bim Son',10000,7200,372,'Đang giao'],
  ['DH-2026-0325','Clinker','NM Ha Long',10000,4800,372,'Đang giao'],
  ['DH-2026-0325','Clinker','NM Mien Bac',10000,10000,372,'Đã giao'],
  ['DH-2026-0326','Xi măng','NM Ha Long',4200,4200,319,'Đã giao'],
  ['DH-2026-0327','Clinker','NM Hoang Long',5800,5820,369,'Chênh lệch'],
  ['DH-2026-0328','Xi măng','NM Mien Bac',6400,4200,321,'Đang giao'],
  ['DH-2026-0328','Xi măng','NM Bim Son',6400,6400,321,'Đã giao'],
  ['DH-2026-0329','Thạch cao','NM Ha Long',2200,0,236,'Chờ phân bổ'],
  ['DH-2026-0330','Clinker','NM Bim Son',4600,4600,374,'Đã giao'],
  ['DH-2026-0330','Clinker','NM Mien Bac',4600,2800,374,'Đang giao'],
  ['DH-2026-0331','Clinker','NM Ha Long',7200,7200,372,'Đã giao'],
  ['DH-2026-0331','Clinker','NM Hoang Long',7200,5600,372,'Đang giao'],
  ['DH-2026-0332','Clinker','NM Hoang Long',8500,6800,372,'Đang giao'],
  ['DH-2026-0332','Clinker','NM Mien Bac',8500,5400,372,'Đang giao'],
  ['DH-2026-0332','Clinker','NM Sai Gon',8500,8500,372,'Đã giao'],
  ['DH-2026-0333','Xi măng','NM Mien Bac',3200,3200,319,'Đã giao'],
  ['DH-2026-0333','Xi măng','NM Ha Long',3200,1400,319,'Đang giao'],
  ['DH-2026-0334','Thạch cao','NM Bim Son',1400,0,243,'Chờ phân bổ'],
  ['DH-2026-0335','Clinker','NM Sai Gon',4000,2800,370,'Đang giao'],
  ['DH-2026-0335','Clinker','NM Mien Bac',4000,4000,370,'Đã giao'],
  ['DH-2026-0336','Xi măng','NM Ha Long',5600,5640,371,'Chênh lệch'],
  ['DH-2026-0337','Clinker','NM Bim Son',3400,0,371,'Chờ phân bổ'],
  ['DH-2026-0338','Vận tải biển','—',1,0,420000,'Đang giao'],
  ['DH-2026-0339','Dịch vụ cảng','—',2,1,120000,'Đang giao'],
  ['DH-2026-0340','Giao nhận','—',3,3,53333,'Đã giao'],
  ['DH-2026-0341','Kiểm đếm','—',2,2,50000,'Đã giao'],
  ['DH-2026-0342','Chờ dỡ món','—',1,0,180000,'Đang giao'],
  ['DH-2026-0343','Dịch vụ phụ trợ','—',2,2,45000,'Đã giao'],
  ['DH-2026-0344','Chờ dỡ món','—',1,1,180000,'Đã giao'],
];

// Build CT_RAW with auto-generated ID chi tiết and quy cach
const CT_RAW=[];
const ctCounters={};
CT_SRC.forEach(r=>{
  const dhCode=r[0];
  if(!ctCounters[dhCode]) ctCounters[dhCode]=0;
  ctCounters[dhCode]++;
  const seq=String(ctCounters[dhCode]).padStart(2,'0');
  const dhShort=dhCode.replace('DH-2026-','');
  const idCT='CT-'+dhShort+'-'+seq;
  const sp=r[1];
  const maSP=SP_CODE_MAP[sp]||'SP-XXX';
  let qc=QC_MAP[sp]||'Bulk';
  const altArr=QC_ALT[sp];
  if(altArr&&altArr.length>1){
    qc=altArr[(ctCounters[dhCode]-1)%altArr.length];
  }
  CT_RAW.push([r[0],idCT,maSP,sp,qc,r[2],r[3],r[4],r[5],r[6]]);
});

// Categorize into tab buckets
const CT_DATA={all:[],danggiao:[],dagiao:[],chenh:[],chophanbo:[]};
CT_RAW.forEach(r=>{
  const st=r[9];
  CT_DATA.all.push(r);
  if(st==='Đang giao')CT_DATA.danggiao.push(r);
  if(st==='Đã giao')CT_DATA.dagiao.push(r);
  if(st==='Chênh lệch')CT_DATA.chenh.push(r);
  if(st==='Chờ phân bổ')CT_DATA.chophanbo.push(r);
});

// Populate filters
const ctDhFilter=document.getElementById('ct-filter-dh');
const uniqueDh=[...new Set(CT_RAW.map(r=>r[0]))].sort().reverse();
uniqueDh.forEach(dh=>{const o=document.createElement('option');o.value=dh;o.textContent=dh;ctDhFilter.appendChild(o);});

// Update tab counts
function updateCtTabCounts(){
  const keys=['all','danggiao','dagiao','chenh','chophanbo'];
  keys.forEach(k=>{
    const el=document.getElementById('ct-tab-cnt-'+k);
    if(el) el.textContent=CT_DATA[k].length;
  });
  const kpiTotal=document.getElementById('ct-kpi-total');
  const kpiDone=document.getElementById('ct-kpi-done');
  const kpiPartial=document.getElementById('ct-kpi-partial');
  const kpiDiff=document.getElementById('ct-kpi-diff');
  if(kpiTotal) kpiTotal.textContent=CT_DATA.all.length;
  if(kpiDone) kpiDone.textContent=CT_DATA.dagiao.length;
  if(kpiPartial) kpiPartial.textContent=CT_DATA.danggiao.length;
  if(kpiDiff) kpiDiff.innerHTML=CT_DATA.chenh.length+' <span style="font-size:12px;color:var(--ink4);font-weight:400">mặt hàng</span>';
}
updateCtTabCounts();

const CT_TITLES={all:'Chi tiết đơn hàng — Tất cả',danggiao:'Chi tiết đơn hàng — Đang giao',dagiao:'Chi tiết đơn hàng — Đã giao',chenh:'Chi tiết đơn hàng — Chênh lệch',chophanbo:'Chi tiết đơn hàng — Chờ phân bổ'};

function getQcCls(qc){
  if(qc==='Bulk'||qc==='Loose') return 'bulk';
  if(qc.includes('50kg')||qc.includes('Bag')) return 'bag';
  if(qc.includes('jumbo')||qc.includes('Jumbo')) return 'jumbo';
  if(qc.includes('Board')||qc.includes('board')) return 'board';
  return 'svc';
}

let currentCtTab='all';
let currentCtDhFilter='';

function renderCtTable(tab,dhFilter){
  currentCtTab=tab;
  currentCtDhFilter=dhFilter||'';
  let data=CT_DATA[tab]||[];
  if(dhFilter) data=data.filter(r=>r[0]===dhFilter);
  const tbody=document.getElementById('ct-tbody');
  const title=document.getElementById('ct-table-title');
  const count=document.getElementById('ct-count');
  const footer=document.getElementById('ct-footer');
  if(title)title.textContent=CT_TITLES[tab]||'';
  if(count)count.textContent=data.length+' mặt hàng';
  if(footer)footer.textContent=data.length+' / '+data.length+' mặt hàng';
  tbody.innerHTML='';
  // Flat rows — no grouping
  data.forEach(d=>{
    const tr=document.createElement('tr');
    const nmClass=NM_COLORS[d[5]]||'c1';
    const nmShort=NM_SHORT[d[5]]||'—';
    const isChenh=d[9]==='Chênh lệch';
    const isChoPB=d[9]==='Chờ phân bổ';
    const isDaGiao=d[9]==='Đã giao';
    const rowPct=d[6]>0?Math.min(100,Math.round((d[7]/d[6])*100)):0;
    const thanhTien=d[8]>=1000?((d[7]*d[8])/1e6).toFixed(0)+' tr':((d[7]*d[8])/1e3).toFixed(0)+' tr';
    const đơnGia=d[8]>=1000?d[8].toLocaleString('vi-VN')+' VND/chuyen':d[8].toLocaleString('vi-VN')+' VND/tan';
    const barColor=rowPct>=100?'var(--ok)':rowPct>=50?'var(--pri)':'var(--acc)';
    const statusCls=isChenh?'s8':isChoPB?'s4':isDaGiao?'s2':'s4';
    const statusText=d[9];
    const nmDisplay=d[5]==='—'?'<span style="color:var(--ink4)">—</span>':`<div class="cust"><div class="av2 ${nmClass}">${nmShort}</div>${d[5]}</div>`;
    const klGiaoStyle=isChenh?'color:var(--err);font-weight:600':'';
    const qcCls=getQcCls(d[4]);
    tr.innerHTML=`<td style="padding-left:14px"><span class="ct-id">${d[1]}</span></td><td><span class="ct-dh-link" data-dh="${d[0]}">${d[0]}</span></td><td><span style="font-family:var(--mono);font-size:var(--fs3);color:var(--acc);font-weight:600">${d[2]}</span></td><td>${d[3]}</td><td><span class="ct-qc ${qcCls}">${d[4]}</span></td><td>${nmDisplay}</td><td class="vnum">${d[6].toLocaleString('vi-VN')}</td><td class="vnum" style="${klGiaoStyle}">${d[7].toLocaleString('vi-VN')}</td><td><div style="display:flex;align-items:center;gap:6px;min-width:80px"><div style="flex:1;height:5px;background:var(--bg4);border-radius:99px;overflow:hidden"><div style="height:100%;width:${rowPct}%;background:${barColor};border-radius:99px"></div></div><span style="font-family:var(--mono);font-size:var(--fs3);font-weight:600;color:${barColor}">${rowPct}%</span></div></td><td class="vnum" style="font-size:var(--fs3)">${đơnGia}</td><td class="vnum">${thanhTien}</td><td style="padding-right:14px"><span class="pill ${statusCls}"><span class="d"></span>${statusText}</span></td>`;
    tbody.appendChild(tr);
  });
  // Click on Ma DH link to navigate to đơn hàng detail
  tbody.querySelectorAll('.ct-dh-link').forEach(el=>{
    el.addEventListener('click',()=>{
      const dhCode=el.dataset.dh;
      document.getElementById('ct-filter-dh').value=dhCode;
      renderCtTable(currentCtTab,dhCode);
    });
  });
}
// Tab switching
document.querySelectorAll('#ct-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#ct-tabs button').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    renderCtTable(btn.dataset.tab,currentCtDhFilter);
  });
});
// DH filter change
document.getElementById('ct-filter-dh')?.addEventListener('change',function(){
  renderCtTable(currentCtTab,this.value);
});
// Back button -> đơn hàng page
document.getElementById('ct-btn-back')?.addEventListener('click',()=>{
  document.getElementById('ct-filter-dh').value='';
  currentCtDhFilter='';
  switchPage('donhang');
});
// Navigation from Đơn hàng page -> open DH modal with CT table
document.getElementById('dh-tbody')?.addEventListener('click',function(e){
  const tr=e.target.closest('tr');
  if(!tr) return;
  // If click is on a pl-link (HD code), open modal for HD
  if(e.target.closest('.pl-link')){
    const code=e.target.closest('.pl-link').textContent.trim();
    const found=findHdByCode(code);
    if(found){e.stopPropagation();openModal('hd',found);return;}
  }
  const oidEl=tr.querySelector('.oid');
  if(!oidEl) return;
  const dhCode=oidEl.textContent.trim();
  const found=findDhByCode(dhCode);
  if(found) openModal('dh',found);
});
// Expose function for external navigation
function navigateToCtDetail(dhCode){
  switchPage('chitietdonhang');
  document.getElementById('ct-filter-dh').value=dhCode;
  document.querySelectorAll('#ct-tabs button').forEach(b=>b.classList.remove('on'));
  document.querySelector('#ct-tabs button[data-tab="all"]')?.classList.add('on');
  renderCtTable('all',dhCode);
}
function navigateToCtDetailByCT(ctCode){
  // Find the DH code from the CT code
  const ctRow=CT_RAW.find(r=>r[1]===ctCode);
  if(!ctRow) return;
  const dhCode=ctRow[0];
  switchPage('chitietdonhang');
  document.getElementById('ct-filter-dh').value=dhCode;
  document.querySelectorAll('#ct-tabs button').forEach(b=>b.classList.remove('on'));
  document.querySelector('#ct-tabs button[data-tab="all"]')?.classList.add('on');
  renderCtTable('all',dhCode);
}
renderCtTable('all','');
