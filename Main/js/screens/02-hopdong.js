// ===== HOP DONG TABS & DATA =====
const XK_CUST={
  'HD-XK-2026-001':'TCC — Đài Loan',
  'HD-XK-2026-002':'CNBM — Trung Quốc',
  'HD-XK-2026-003':'Republic Cement — Philippines',
  'HD-XK-2026-004':'Chip Mong Insee — Campuchia',
  'HD-XK-2026-005':'Seven Rings — Bangladesh',
  'HD-XK-2026-006':'Semen Indonesia — Indonesia',
  'HD-XK-2026-007':'Mawlamyine Cement — Myanmar',
  'HD-XK-2026-008':'Lao Cement — Lào',
  'HD-XK-2026-009':'YTL Cement — Malaysia',
  'HD-XK-2026-010':'Asia Cement Trading — Singapore',
  'HD-XK-2026-011':'Green Island Cement — Hong Kong',
  'HD-XK-2026-012':'SCG — Thái Lan',
  'HD-XK-2026-013':'Ultratech Cement — Ấn Độ',
  'HD-XK-2026-014':'Asia Cement — Hàn Quốc',
};
const XK_CUST_SHORT={
  'TCC — Đài Loan':'TW','CNBM — Trung Quốc':'CN','Republic Cement — Philippines':'PH',
  'Chip Mong Insee — Campuchia':'KH','Seven Rings — Bangladesh':'BD','Semen Indonesia — Indonesia':'ID',
  'Mawlamyine Cement — Myanmar':'MM','Lao Cement — Lào':'LA','YTL Cement — Malaysia':'MY',
  'Asia Cement Trading — Singapore':'SG','Green Island Cement — Hong Kong':'HK','SCG — Thái Lan':'TH',
  'Ultratech Cement — Ấn Độ':'IN','Asia Cement — Hàn Quốc':'KR',
};
const HD_DATA={
  xk:[
    ['HD-XK-2026-001','TCC — Đài Loan','Clinker','50,000 tan','32,400 tan','18.5 ty','15/03/2026','31/12/2026','s2','Đang hiệu lực'],
    ['HD-XK-2026-002','CNBM — Trung Quốc','Clinker','30,000 tan','28,500 tan','11.2 ty','20/03/2026','30/11/2026','s2','Đang hiệu lực'],
    ['HD-XK-2026-003','Republic Cement — Philippines','Xi măng PCB40','25,000 tan','12,800 tan','8.4 ty','01/04/2026','28/02/2027','s2','Đang hiệu lực'],
    ['HD-XK-2026-004','Chip Mong Insee — Campuchia','Clinker','40,000 tan','0 tan','14.8 ty','--','--','s4','Chờ ký'],
    ['HD-XK-2026-005','Seven Rings — Bangladesh','Thạch cao','15,000 tan','9,200 tan','3.2 ty','10/01/2026','30/09/2026','s2','Đang hiệu lực'],
    ['HD-XK-2026-006','Semen Indonesia — Indonesia','Clinker','35,000 tan','35,000 tan','13.1 ty','05/12/2025','30/06/2026','s4','Sắp hết hạn'],
    ['HD-XK-2026-007','Mawlamyine Cement — Myanmar','Clinker','20,000 tan','14,600 tan','7.4 ty','18/02/2026','31/12/2026','s2','Đang hiệu lực'],
    ['HD-XK-2026-008','Lao Cement — Lào','Xi măng','28,000 tan','0 tan','9.8 ty','--','--','s4','Chờ ký'],
    ['HD-XK-2026-009','YTL Cement — Malaysia','Thạch cao','18,000 tan','6,300 tan','4.1 ty','22/04/2026','31/01/2027','s2','Đang hiệu lực'],
    ['HD-XK-2026-010','Asia Cement Trading — Singapore','Clinker','22,000 tan','22,000 tan','8.2 ty','01/09/2025','31/03/2026','s8','Hết hạn'],
    ['HD-XK-2026-011','Green Island Cement — Hong Kong','Clinker','45,000 tan','18,200 tan','16.7 ty','12/05/2026','30/04/2027','s2','Đang hiệu lực'],
    ['HD-XK-2026-012','SCG — Thái Lan','Xi măng','12,000 tan','12,000 tan','4.2 ty','15/11/2025','15/07/2026','s4','Sắp hết hạn'],
    ['HD-XK-2026-013','Ultratech Cement — Ấn Độ','Clinker','32,000 tan','8,400 tan','11.9 ty','28/04/2026','28/02/2027','s2','Đang hiệu lực'],
    ['HD-XK-2026-014','Asia Cement — Hàn Quốc','Thạch cao','10,000 tan','0 tan','2.3 ty','--','--','s4','Chờ ký'],
  ],
  nd:[
    ['HD-ND-2026-001','Cty CP Xi măng Hạ Long','Clinker','80,000 tan','54,200 tan','29.6 ty','10/01/2026','31/12/2026','s2','Đang hiệu lực'],
    ['HD-ND-2026-002','Vinaconex X1','Xi măng PCB40','45,000 tan','38,100 tan','14.4 ty','15/01/2026','30/11/2026','s2','Đang hiệu lực'],
    ['HD-ND-2026-003','Tập đoàn Hoàng Long','Clinker','60,000 tan','22,800 tan','22.2 ty','01/02/2026','31/12/2026','s2','Đang hiệu lực'],
    ['HD-ND-2026-004','Cty TNHH VLXD Sai Gon','Xi măng','35,000 tan','35,000 tan','10.5 ty','20/12/2025','30/06/2026','s4','Sắp hết hạn'],
    ['HD-ND-2026-005','Tổng CTy XNK Mien Bac','Clinker','25,000 tan','18,600 tan','9.3 ty','05/03/2026','31/12/2026','s2','Đang hiệu lực'],
    ['HD-ND-2026-006','Cty CP Đầu tư Xây dựng Ha Noi','Thạch cao','20,000 tan','12,400 tan','4.8 ty','18/03/2026','30/09/2026','s2','Đang hiệu lực'],
    ['HD-ND-2026-007','Xi măng Bim Sơn','Clinker','55,000 tan','41,200 tan','20.4 ty','01/01/2026','31/12/2026','s2','Đang hiệu lực'],
    ['HD-ND-2026-008','Cty XNK Quang Ninh','Xi măng','30,000 tan','0 tan','8.7 ty','--','--','s4','Chờ ký'],
    ['HD-ND-2026-009','Cty CP Xi măng Hạ Long','Xi măng','40,000 tan','32,800 tan','12.8 ty','10/02/2026','31/10/2026','s2','Đang hiệu lực'],
    ['HD-ND-2026-010','Vinaconex X1','Clinker','50,000 tan','50,000 tan','18.5 ty','01/08/2025','31/01/2026','s8','Hết hạn'],
    ['HD-ND-2026-011','Tập đoàn Hoàng Long','Thạch cao','15,000 tan','6,800 tan','3.6 ty','22/04/2026','31/12/2026','s2','Đang hiệu lực'],
    ['HD-ND-2026-012','Cty TNHH VLXD Sai Gon','Clinker','28,000 tan','28,000 tan','10.4 ty','15/10/2025','15/07/2026','s4','Sắp hết hạn'],
  ],
  dv:[
    ['HD-DV-2026-001','Cty TNHH Vận tải Biển Đông','Vận tải biển','12 chuyen','8 chuyen','4.2 ty','01/01/2026','31/12/2026','s2','Đang hiệu lực'],
    ['HD-DV-2026-002','Cty CP Cảng Hải Phòng','Dịch vụ cảng','24 thang','12 thang','2.8 ty','15/02/2026','14/02/2027','s2','Đang hiệu lực'],
    ['HD-DV-2026-003','Cty TNHH Giao nhận Vinamac','Giao nhận','36 lo','18 lo','1.9 ty','01/03/2026','28/02/2027','s2','Đang hiệu lực'],
    ['HD-DV-2026-004','Cty CP Kiểm định HQ Quang Ninh','Kiểm đếm','20 lo','14 lo','0.96 ty','10/01/2026','31/12/2026','s2','Đang hiệu lực'],
    ['HD-DV-2026-005','Cty TNHH Vận tải Biển Đông','Vận tải biển','8 chuyen','0 chuyen','2.4 ty','--','--','s4','Chờ ký'],
    ['HD-DV-2026-006','Cty CP Cảng Hải Phòng','Làm hàng','15 lo','15 lo','3.1 ty','01/06/2025','31/05/2026','s4','Sắp hết hạn'],
    ['HD-DV-2026-007','Cty TNHH Giao nhận Vinamac','Dịch vụ phụ trợ','30 lo','22 lo','1.4 ty','20/03/2026','20/03/2027','s2','Đang hiệu lực'],
    ['HD-DV-2026-008','Cty CP Kiểm định HQ Quang Ninh','Chứng nhận C/O','18 lo','10 lo','0.72 ty','05/04/2026','05/04/2027','s2','Đang hiệu lực'],
    ['HD-DV-2026-009','Cty TNHH Vận tải Biển Đông','Chờ dỡ món','10 lo','6 lo','1.8 ty','01/02/2026','31/12/2026','s2','Đang hiệu lực'],
    ['HD-DV-2026-010','Cty CP Cảng Hải Phòng','Vận tải nội địa','20 chuyen','20 chuyen','2.2 ty','01/09/2025','28/02/2026','s8','Hết hạn'],
    ['HD-DV-2026-011','Cty TNHH Giao nhận Vinamac','Kiem tra ham','15 lo','0 chuyen','0.54 ty','--','--','s4','Chờ ký'],
  ]
};
const HD_TITLES={xk:'Hợp đồng xuất khẩu — khách nước ngoài',nd:'Hợp đồng nội địa',dv:'Hợp đồng dịch vụ'};
const HD_CUST_COLORS={'TCC — Đài Loan':'c1','CNBM — Trung Quốc':'c2','Republic Cement — Philippines':'c4','Chip Mong Insee — Campuchia':'c3','Seven Rings — Bangladesh':'c5','Semen Indonesia — Indonesia':'c2','Mawlamyine Cement — Myanmar':'c3','Lao Cement — Lào':'c1','YTL Cement — Malaysia':'c4','Asia Cement Trading — Singapore':'c3','Green Island Cement — Hong Kong':'c2','SCG — Thái Lan':'c5','Ultratech Cement — Ấn Độ':'c1','Asia Cement — Hàn Quốc':'c4','Cty CP Xi măng Hạ Long':'c1','Vinaconex X1':'c2','Tập đoàn Hoàng Long':'c4','Cty TNHH VLXD Sai Gon':'c3','Tổng CTy XNK Mien Bac':'c5','Cty CP Đầu tư Xây dựng Ha Noi':'c2','Xi măng Bim Sơn':'c3','Cty XNK Quang Ninh':'c1','Cty TNHH Vận tải Biển Đông':'c1','Cty CP Cảng Hải Phòng':'c2','Cty TNHH Giao nhận Vinamac':'c4','Cty CP Kiểm định HQ Quang Ninh':'c5'};
const HD_CUST_SHORT={...XK_CUST_SHORT,'Cty CP Xi măng Hạ Long':'XHL','Vinaconex X1':'VN','Tập đoàn Hoàng Long':'HL','Cty TNHH VLXD Sai Gon':'SG','Tổng CTy XNK Mien Bac':'MB','Cty CP Đầu tư Xây dựng Ha Noi':'HN','Xi măng Bim Sơn':'BS','Cty XNK Quang Ninh':'QN','Cty TNHH Vận tải Biển Đông':'BD','Cty CP Cảng Hải Phòng':'HP','Cty TNHH Giao nhận Vinamac':'VM','Cty CP Kiểm định HQ Quang Ninh':'KĐ'};

let currentHdTab='xk';
let currentDhTab='all';
function renderHdTable(tab){
  currentHdTab=tab;
  const data=HD_DATA[tab]||[];
  const tbody=document.getElementById('hd-tbody');
  const title=document.getElementById('hd-table-title');
  const count=document.getElementById('hd-count');
  const footer=document.getElementById('hd-footer');
  if(title) title.textContent=HD_TITLES[tab]||'';
  if(count) count.textContent=data.length+' hợp đồng';
  if(footer) footer.textContent=data.length+' / '+data.length+' hợp đồng';
  tbody.innerHTML='';
  data.forEach(d=>{
    const tr=document.createElement('tr');
    const cClass=HD_CUST_COLORS[d[1]]||'c1';
    const cShort=HD_CUST_SHORT[d[1]]||'??';
    const statusCls=d[8];
    const isOverdue=d[9]==='Hết hạn';
    const isExpiring=d[9]==='Sắp hết hạn';
    const statusStyle=isOverdue?'color:var(--err);font-weight:600':isExpiring?'color:var(--acc);font-weight:600':'';
    tr.innerHTML=`
      <td style="padding-left:14px"><span class="oid">${d[0]}</span></td>
      <td><div class="cust"><div class="av2 ${cClass}">${cShort}</div>${d[1]}</div></td>
      <td>${d[2]}</td>
      <td class="vnum">${d[3]}</td>
      <td class="vnum">${d[4]}</td>
      <td class="vnum">${d[5]}</td>
      <td>${d[6]}</td>
      <td>${d[7]}</td>
      <td style="padding-right:14px;${statusStyle}"><span class="pill ${statusCls}"><span class="d"></span>${d[9]}</span></td>`;
    tbody.appendChild(tr);
  });
}
// Tab switching for hợp đồng
document.querySelectorAll('#hd-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#hd-tabs button').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    renderHdTable(btn.dataset.tab);
  });
});
// Initial render
renderHdTable('xk');
