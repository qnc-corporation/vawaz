// ===== PHU LUC HOP DONG DATA & LOGIC =====
const PL_DATA={
  all:[],
  xk:[
    ['PL-XK-001','HD-XK-2026-001','Cty CP Xi măng Hạ Long','Điều chỉnh giá','18.5 ty','21.2 ty','up','+2.7 ty','28/05/2026','s2','Đang hiệu lực'],
    ['PL-XK-002','HD-XK-2026-002','Vinaconex X1','Điều chỉnh khối lượng','30,000 tan','35,000 tan','up','+5,000 tan','15/05/2026','s2','Đang hiệu lực'],
    ['PL-XK-003','HD-XK-2026-003','Tập đoàn Hoàng Long','Gia hạn thời hạn','28/02/2027','30/06/2027','up','+4 thang','02/06/2026','s2','Đang hiệu lực'],
    ['PL-XK-004','HD-XK-2026-005','Tổng CTy XNK Mien Bac','Điều chỉnh giá','3.2 ty','2.9 ty','dn','-0.3 ty','20/05/2026','s2','Đang hiệu lực'],
    ['PL-XK-005','HD-XK-2026-006','Cty CP Đầu tư Xây dựng Ha Noi','Điều chỉnh khối lượng','35,000 tan','38,000 tan','up','+3,000 tan','10/05/2026','s4','Chờ duyệt'],
    ['PL-XK-006','HD-XK-2026-007','Xi măng Bim Sơn','Bổ sung điều khoản','—','—','eq','Bo sung DK thanh toán','25/05/2026','s4','Chờ duyệt'],
    ['PL-XK-007','HD-XK-2026-001','Cty CP Xi măng Hạ Long','Điều chỉnh khối lượng','50,000 tan','55,000 tan','up','+5,000 tan','12/04/2026','s2','Đang hiệu lực'],
    ['PL-XK-008','HD-XK-2026-009','Cty CP Xi măng Hạ Long','Gia hạn thời hạn','31/01/2027','30/06/2027','up','+5 thang','01/06/2026','s4','Chờ duyệt'],
    ['PL-XK-009','HD-XK-2026-011','Tập đoàn Hoàng Long','Điều chỉnh giá','16.7 ty','18.2 ty','up','+1.5 ty','18/05/2026','s2','Đang hiệu lực'],
    ['PL-XK-010','HD-XK-2026-012','Cty TNHH VLXD Sai Gon','Điều chỉnh giá','4.2 ty','4.6 ty','up','+0.4 ty','08/05/2026','s6','Sắp hết hạn'],
  ],
  nd:[
    ['PL-ND-001','HD-ND-2026-001','Cty CP Xi măng Hạ Long','Điều chỉnh khối lượng','80,000 tan','92,000 tan','up','+12,000 tan','22/05/2026','s2','Đang hiệu lực'],
    ['PL-ND-002','HD-ND-2026-002','Vinaconex X1','Điều chỉnh giá','14.4 ty','15.8 ty','up','+1.4 ty','18/05/2026','s2','Đang hiệu lực'],
    ['PL-ND-003','HD-ND-2026-003','Tập đoàn Hoàng Long','Gia hạn thời hạn','31/12/2026','31/03/2027','up','+3 thang','05/06/2026','s4','Chờ duyệt'],
    ['PL-ND-004','HD-ND-2026-004','Cty TNHH VLXD Sai Gon','Điều chỉnh giá','10.5 ty','9.8 ty','dn','-0.7 ty','10/05/2026','s2','Đang hiệu lực'],
    ['PL-ND-005','HD-ND-2026-005','Tổng CTy XNK Mien Bac','Bổ sung điều khoản','—','—','eq','Bo sung DK giao hàng','28/05/2026','s2','Đang hiệu lực'],
    ['PL-ND-006','HD-ND-2026-007','Xi măng Bim Sơn','Điều chỉnh khối lượng','55,000 tan','62,000 tan','up','+7,000 tan','15/05/2026','s4','Chờ duyệt'],
    ['PL-ND-007','HD-ND-2026-009','Cty CP Xi măng Hạ Long','Điều chỉnh giá','12.8 ty','13.6 ty','up','+0.8 ty','02/06/2026','s4','Chờ duyệt'],
    ['PL-ND-008','HD-ND-2026-001','Cty CP Xi măng Hạ Long','Điều chỉnh giá','29.6 ty','33.1 ty','up','+3.5 ty','30/04/2026','s2','Đang hiệu lực'],
  ],
  dv:[
    ['PL-DV-001','HD-DV-2026-001','Cty TNHH Vận tải Biển Đông','Điều chỉnh giá','4.2 ty','4.8 ty','up','+0.6 ty','20/05/2026','s2','Đang hiệu lực'],
    ['PL-DV-002','HD-DV-2026-002','Cty CP Cảng Hải Phòng','Gia hạn thời hạn','14/02/2027','14/08/2027','up','+6 thang','25/05/2026','s2','Đang hiệu lực'],
    ['PL-DV-003','HD-DV-2026-003','Cty TNHH Giao nhận Vinamac','Điều chỉnh khối lượng','36 lo','42 lo','up','+6 lo','12/05/2026','s2','Đang hiệu lực'],
    ['PL-DV-004','HD-DV-2026-006','Cty CP Cảng Hải Phòng','Gia hạn thời hạn','31/05/2026','31/12/2026','up','+7 thang','28/05/2026','s4','Chờ duyệt'],
    ['PL-DV-005','HD-DV-2026-007','Cty TNHH Giao nhận Vinamac','Điều chỉnh giá','1.4 ty','1.6 ty','up','+0.2 ty','08/05/2026','s2','Đang hiệu lực'],
  ]
};
// Build 'all' from xk + nd + dv
PL_DATA.all=[...PL_DATA.xk,...PL_DATA.nd,...PL_DATA.dv];

const PL_TITLES={all:'Phụ lục hợp đồng — Tất cả',xk:'Phụ lục hợp đồng — Xuất khẩu',nd:'Phụ lục hợp đồng — Nội địa',dv:'Phụ lục hợp đồng — Dịch vụ'};

let currentPlTab='all';
function renderPlTable(tab){
  currentPlTab=tab;
  const data=PL_DATA[tab]||[];
  const tbody=document.getElementById('pl-tbody');
  const title=document.getElementById('pl-table-title');
  const count=document.getElementById('pl-count');
  const footer=document.getElementById('pl-footer');
  if(title) title.textContent=PL_TITLES[tab]||'';
  if(count) count.textContent=data.length+' phụ lục';
  if(footer) footer.textContent=data.length+' / '+data.length+' phụ lục';
  tbody.innerHTML='';
  data.forEach(d=>{
    const tr=document.createElement('tr');
    const cClass=HD_CUST_COLORS[d[2]]||'c1';
    const cShort=HD_CUST_SHORT[d[2]]||'??';
    const changeCls=d[6]==='up'?'up':d[6]==='dn'?'dn':'eq';
    const changeIcon=d[6]==='up'?'bi-arrow-up-short':d[6]==='dn'?'bi-arrow-down-short':'bi-dash';
    const isChoDuyệt=d[9]==='s4';
    const statusCls=d[9];
    tr.innerHTML=`
      <td style="padding-left:14px"><span class="oid">${d[0]}</span></td>
      <td><span class="pl-link">${d[1]}</span></td>
      <td><div class="cust"><div class="av2 ${cClass}">${cShort}</div>${d[2]}</div></td>
      <td>${d[3]}</td>
      <td class="vnum">${d[4]}</td>
      <td class="vnum">${d[5]}</td>
      <td><span class="pl-change ${changeCls}"><i class="bi ${changeIcon}" style="font-size:12px"></i>${d[7]}</span></td>
      <td>${d[8]}</td>
      <td style="padding-right:14px"><span class="pill ${statusCls}"><span class="d"></span>${d[10]}</span></td>`;
    tbody.appendChild(tr);
  });
}
// Tab switching for phụ lục
document.querySelectorAll('#pl-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#pl-tabs button').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    renderPlTable(btn.dataset.tab);
  });
});
// Initial render phụ lục
renderPlTable('all');
