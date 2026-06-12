// ===== DON HANG DATA & LOGIC =====
const DH_CHANG_NAMES=['','HD & DH','Phân bổ','Vận chuyển','Giao nhận','Làm hàng','Hải quan XNK','HDon & QT','Công nợ'];
const DH_DATA={
  all:[],
  xk:[
    ['DH-2026-0319','HD-XK-2026-001','Cty CP Xi măng Hạ Long','Clinker','5,000 tan','5',2.4,'8h','Đang làm hàng','s5'],
    ['DH-2026-0318','HD-XK-2026-002','Vinaconex X1','Clinker','3,200 tan','5',1.8,'14h','Đang làm hàng','s5'],
    ['DH-2026-0317','HD-XK-2026-003','Tập đoàn Hoàng Long','Xi măng PCB40','2,800 tan','3',0.96,'1d 4h','Đang vận chuyển','s2'],
    ['DH-2026-0316','HD-XK-2026-004','Cty TNHH VLXD Sai Gon','Clinker','8,000 tan','1',3.1,'—','Chờ phân bổ','s5'],
    ['DH-2026-0315','HD-XK-2026-005','Tổng CTy XNK Mien Bac','Thạch cao','4,600 tan','6',1.84,'—','Chờ chứng từ','s6'],
    ['DH-2026-0314','HD-XK-2026-006','Cty CP Đầu tư Xây dựng Ha Noi','Clinker','6,000 tan','7',2.2,'6h','Chờ quyết toán','s7'],
    ['DH-2026-0313','HD-XK-2026-007','Xi măng Bim Sơn','Clinker','3,500 tan','1',1.28,'—','Chờ phân bổ','s1'],
    ['DH-2026-0312','HD-XK-2026-001','Cty CP Xi măng Hạ Long','Clinker','2,400 tan','8',0.68,'tre 18d','Trễ hạn','s8'],
    ['DH-2026-0311','HD-XK-2026-009','Cty CP Xi măng Hạ Long','Thạch cao','1,800 tan','5',0.41,'3h','Đang làm hàng','s5'],
    ['DH-2026-0310','HD-XK-2026-011','Tập đoàn Hoàng Long','Clinker','9,200 tan','3',3.4,'1d','Đang vận chuyển','s2'],
    ['DH-2026-0309','HD-XK-2026-002','Vinaconex X1','Clinker','4,500 tan','6',1.68,'—','Chờ chứng từ','s2'],
    ['DH-2026-0308','HD-XK-2026-013','Cty XNK Quang Ninh','Clinker','2,800 tan','3',1.04,'2d','Đang vận chuyển','s2'],
    ['DH-2026-0307','HD-XK-2026-003','Tập đoàn Hoàng Long','Clinker','6,400 tan','5',2.38,'12h','Đang làm hàng','s5'],
    ['DH-2026-0306','HD-XK-2026-005','Tổng CTy XNK Mien Bac','Thạch cao','3,100 tan','7',0.68,'—','Chờ quyết toán','s7'],
    ['DH-2026-0305','HD-XK-2026-007','Xi măng Bim Sơn','Clinker','2,200 tan','8',0.82,'tre 5d','Trễ hạn','s8'],
    ['DH-2026-0304','HD-XK-2026-001','Cty CP Xi măng Hạ Long','Clinker','5,200 tan','6',1.94,'—','Chờ chứng từ','s6'],
    ['DH-2026-0303','HD-XK-2026-011','Tập đoàn Hoàng Long','Clinker','4,000 tan','2',1.48,'4h','Đang phân bổ','s2'],
    ['DH-2026-0302','HD-XK-2026-004','Cty TNHH VLXD Sai Gon','Clinker','3,800 tan','6',1.42,'—','Chờ chứng từ','s2'],
    ['DH-2026-0301','HD-XK-2026-006','Cty CP Đầu tư Xây dựng Ha Noi','Clinker','5,500 tan','5',2.06,'10h','Đang làm hàng','s5'],
    ['DH-2026-0300','HD-XK-2026-009','Cty CP Xi măng Hạ Long','Thạch cao','2,400 tan','8',0.55,'tre 2d','Trễ hạn','s8'],
    ['DH-2026-0299','HD-XK-2026-013','Cty XNK Quang Ninh','Clinker','1,600 tan','6',0.6,'—','Chờ chứng từ','s6'],
    ['DH-2026-0298','HD-XK-2026-012','Cty TNHH VLXD Sai Gon','Xi măng','1,200 tan','8',0.44,'tre 32d','Trễ hạn','s8'],
  ],
  nd:[
    ['DH-2026-0320','HD-ND-2026-001','Cty CP Xi măng Hạ Long','Clinker','12,000 tan','3',4.48,'6h','Đang vận chuyển','s2'],
    ['DH-2026-0321','HD-ND-2026-002','Vinaconex X1','Xi măng PCB40','6,500 tan','5',2.08,'1d','Đang làm hàng','s5'],
    ['DH-2026-0322','HD-ND-2026-003','Tập đoàn Hoàng Long','Clinker','8,000 tan','2',2.96,'—','Đang phân bổ','s2'],
    ['DH-2026-0323','HD-ND-2026-004','Cty TNHH VLXD Sai Gon','Xi măng','5,000 tan','7',1.5,'—','Chờ quyết toán','s7'],
    ['DH-2026-0324','HD-ND-2026-005','Tổng CTy XNK Mien Bac','Clinker','3,800 tan','6',1.42,'3h','Chờ chứng từ','s2'],
    ['DH-2026-0325','HD-ND-2026-007','Xi măng Bim Sơn','Clinker','10,000 tan','3',3.72,'8h','Đang vận chuyển','s2'],
    ['DH-2026-0326','HD-ND-2026-001','Cty CP Xi măng Hạ Long','Xi măng','4,200 tan','6',1.34,'—','Chờ chứng từ','s6'],
    ['DH-2026-0327','HD-ND-2026-002','Vinaconex X1','Clinker','5,800 tan','8',2.14,'tre 3d','Trễ hạn','s8'],
    ['DH-2026-0328','HD-ND-2026-009','Cty CP Xi măng Hạ Long','Xi măng','6,400 tan','5',2.05,'16h','Đang làm hàng','s5'],
    ['DH-2026-0329','HD-ND-2026-003','Tập đoàn Hoàng Long','Thạch cao','2,200 tan','1',0.52,'—','Chờ phân bổ','s1'],
    ['DH-2026-0330','HD-ND-2026-005','Tổng CTy XNK Mien Bac','Clinker','4,600 tan','7',1.72,'—','Chờ quyết toán','s7'],
    ['DH-2026-0331','HD-ND-2026-007','Xi măng Bim Sơn','Clinker','7,200 tan','6',2.68,'—','Chờ chứng từ','s2'],
    ['DH-2026-0332','HD-ND-2026-001','Cty CP Xi măng Hạ Long','Clinker','8,500 tan','3',3.16,'2d','Đang vận chuyển','s2'],
    ['DH-2026-0333','HD-ND-2026-002','Vinaconex X1','Xi măng','3,200 tan','6',1.02,'—','Chờ chứng từ','s6'],
    ['DH-2026-0334','HD-ND-2026-011','Tập đoàn Hoàng Long','Thạch cao','1,400 tan','2',0.34,'5h','Đang phân bổ','s2'],
    ['DH-2026-0335','HD-ND-2026-004','Cty TNHH VLXD Sai Gon','Clinker','4,000 tan','5',1.48,'12h','Đang làm hàng','s5'],
    ['DH-2026-0336','HD-ND-2026-007','Xi măng Bim Sơn','Xi măng','5,600 tan','8',2.08,'tre 7d','Trễ hạn','s8'],
    ['DH-2026-0337','HD-ND-2026-009','Cty CP Xi măng Hạ Long','Clinker','3,400 tan','1',1.26,'—','Chờ phân bổ','s1'],
  ],
  dv:[
    ['DH-2026-0338','HD-DV-2026-001','Cty TNHH Vận tải Biển Đông','Vận tải biển','1 chuyen','5',0.42,'1d','Đang làm hàng','s5'],
    ['DH-2026-0339','HD-DV-2026-002','Cty CP Cảng Hải Phòng','Dịch vụ cảng','2 thang','3',0.24,'3d','Đang vận chuyển','s2'],
    ['DH-2026-0340','HD-DV-2026-003','Cty TNHH Giao nhận Vinamac','Giao nhận','3 lo','6',0.16,'—','Chờ chứng từ','s2'],
    ['DH-2026-0341','HD-DV-2026-004','Cty CP Kiểm định HQ Quang Ninh','Kiểm đếm','2 lo','6',0.1,'—','Chờ chứng từ','s6'],
    ['DH-2026-0342','HD-DV-2026-001','Cty TNHH Vận tải Biển Đông','Chờ dỡ món','1 chuyen','5',0.18,'8h','Đang làm hàng','s5'],
    ['DH-2026-0343','HD-DV-2026-007','Cty TNHH Giao nhận Vinamac','Dịch vụ phụ trợ','2 lo','7',0.09,'—','Chờ quyết toán','s7'],
    ['DH-2026-0344','HD-DV-2026-009','Cty TNHH Vận tải Biển Đông','Chờ dỡ món','1 chuyen','8',0.18,'tre 4d','Trễ hạn','s8'],
  ]
};
DH_DATA.all=[...DH_DATA.xk,...DH_DATA.nd,...DH_DATA.dv];

function xkCustByDh(dhCode){
  const r=DH_DATA.xk.find(x=>x[0]===dhCode);
  return r?XK_CUST[r[1]]:null;
}
function syncXkCustomers(){
  HD_DATA.xk.forEach(r=>{ const c=XK_CUST[r[0]]; if(c) r[1]=c; });
  DH_DATA.xk.forEach(r=>{ const c=XK_CUST[r[1]]; if(c) r[2]=c; });
  PL_DATA.xk.forEach(r=>{ const c=XK_CUST[r[1]]; if(c) r[2]=c; });
  PL_DATA.all=[...PL_DATA.xk,...PL_DATA.nd,...PL_DATA.dv];
  ORDERS.forEach(o=>{
    const c=xkCustByDh(o[0]);
    if(!c) return;
    o[1]=c;
    const sh=XK_CUST_SHORT[c]||'XK';
    o[3]=sh;
    PRODS[sh]=sh;
    COLORS[sh]=COLORS[sh]||'c1';
  });
  const patchCb=(a,dh)=>{
    const c=xkCustByDh(dh);
    if(c&&a.desc) a.desc=a.desc.replace(/Khách <b>[^<]+<\/b>/,`Khách <b>${c}</b>`);
  };
  patchCb(CB_DATA.congno[0],'DH-2026-0312');
  patchCb(CB_DATA.congno[1],'DH-2026-0298');
  patchCb(CB_DATA.congno[2],'DH-2026-0315');
  if(CB_DATA.chenhmon[1]) CB_DATA.chenhmon[1].desc='Khách <b>CNBM — Trung Quốc</b> · Đã giao 28,500 tấn · Chỉ thanh toán chờ 26,200 tấn. Cần đối chiếu lại công nợ.';
  const fillCustSel=(id,custs)=>{
    const sel=document.getElementById(id);
    if(!sel) return;
    sel.innerHTML='<option>Tất cả</option>'+custs.map(c=>`<option>${c}</option>`).join('');
  };
  fillCustSel('dh-filter-cust',[...new Set(DH_DATA.all.map(r=>r[2]))].sort());
  fillCustSel('pl-filter-cust',[...new Set(PL_DATA.all.map(r=>r[2]))].sort());
  if(typeof renderDashOrders==='function') renderDashOrders(dashStageFilter);
  if(typeof renderHdTable==='function') renderHdTable(currentHdTab);
  if(typeof renderPlTable==='function') renderPlTable(currentPlTab);
  if(typeof renderDhTable==='function') renderDhTable(currentDhTab);
  if(typeof renderCbAlerts==='function'){ renderCbAlerts('congno'); renderCbAlerts('chenhmon'); }
}

const DH_TITLES={all:'Đơn hàng — Tất cả',xk:'Đơn hàng xuất khẩu',nd:'Đơn hàng nội địa',dv:'Đơn hàng dịch vụ'};

function renderDhTable(tab){
  currentDhTab=tab;
  const data=DH_DATA[tab]||[];
  const tbody=document.getElementById('dh-tbody');
  const title=document.getElementById('dh-table-title');
  const count=document.getElementById('dh-count');
  const footer=document.getElementById('dh-footer');
  if(title) title.textContent=DH_TITLES[tab]||'';
  if(count) count.textContent=data.length+' đơn';
  if(footer) footer.textContent=data.length+' / '+data.length+' đơn';
  tbody.innerHTML='';
  data.forEach(d=>{
    const tr=document.createElement('tr');
    const cClass=HD_CUST_COLORS[d[2]]||'c1';
    const cShort=HD_CUST_SHORT[d[2]]||'??';
    const changIdx=parseInt(d[5]);
    const changName=DH_CHANG_NAMES[changIdx]||'—';
    const changCls=d[5]<=2?'s1':d[5]<=4?'s4':d[5]<=6?'s6':'s7';
    const isOverdue=d[7]&&d[7].startsWith('tre');
    const slaHtml=isOverdue?`<span style="color:var(--err);font-weight:600">${d[7]}</span>`:d[7]==='—'?'<span style="color:var(--ink4)">—</span>':d[7];
    const statusCls=d[9];
    tr.innerHTML=`
      <td style="padding-left:14px"><span class="oid">${d[0]}</span></td>
      <td><span class="pl-link">${d[1]}</span></td>
      <td><div class="cust"><div class="av2 ${cClass}">${cShort}</div>${d[2]}</div></td>
      <td>${d[3]}</td>
      <td class="vnum">${d[4]}</td>
      <td><span class="pill ${changCls}"><span class="d"></span>${changName}</span></td>
      <td class="vnum">${d[6]} ty</td>
      <td>${slaHtml}</td>
      <td style="padding-right:14px"><span class="pill ${statusCls}"><span class="d"></span>${d[8]}</span></td>`;
    tbody.appendChild(tr);
  });
}
// Tab switching for đơn hàng
document.querySelectorAll('#dh-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#dh-tabs button').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    renderDhTable(btn.dataset.tab);
  });
});
// Initial render đơn hàng (+ sync XK customers)
syncXkCustomers();
