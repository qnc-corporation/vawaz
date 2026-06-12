// ===== CANH BAO TABS & DATA =====
const CB_DATA={
  congno:[
    {icon:'hot',bi:'exclamation-triangle',title:'Công nợ <b>DH-2026-0312</b> quá hạn 18 ngày',desc:'Khách <b>Cty CP Xi măng Hạ Long</b> · con <b>680 triệu</b>. Đã gửi nhắc nợ lần 2, can lên DNTT hoặc liên hệ trực tiếp.',ago:'12 phút trước',tag:'GD_CONGNO'},
    {icon:'hot',bi:'exclamation-triangle',title:'Công nợ <b>DH-2026-0298</b> quá hạn 32 ngày',desc:'Khách <b>Cty TNHH VLXD Sai Gon</b> · con <b>1.24 ty</b>. Quá hạn dài, đề nghị tạm ứng dừng giao hàng.',ago:'3 giờ trước',tag:'GD_CONGNO'},
    {icon:'amb',bi:'clock',title:'Công nợ <b>DH-2026-0315</b> sắp đến hạn thanh toán',desc:'Khách <b>Tổng CTy XNK Mien Bac</b> · han TT con <b>3 ngày</b>, so tien <b>1.84 ty</b>. Chưa có thông báo thanh toán.',ago:'5 giờ trước',tag:'GD_CONGNO'},
  ],
  dongtien:[
    {icon:'hot',bi:'cash-stack',title:'Quỹ vận tải âm <b>-540 triệu</b>',desc:' Số dư quỹ vận tải âm từ hôm qua. Cần bổ sung quỹ trước khi thực hiện các lệnh chi phí vận tải. Đề nghị chuyển từ quỹ khác.',ago:'1 giờ trước',tag:'GD_SODU_QUY'},
    {icon:'amb',bi:'wallet2',title:'Quỹ ngân hàng âm <b>-300 triệu</b> tại Vietcombank',desc:'Số dư tài khoản VCB dừng âm. Đang có 2 DNTT chờ duyệt tổng cộng 820 triệu. Cần điều chỉnh lịch chi.',ago:'4 giờ trước',tag:'GD_THANHTOAN'},
  ],
  chenhmon:[
    {icon:'amb',bi:'arrow-left-right',title:'Chênh món <b>12.4 triệu</b> giữa phiếu cân và hóa đơn',desc:'Lo <b>HD-XK-2026-003</b> · Phiếu cân: 25,200 tấn · Hóa đơn: 24,800 tấn · Chênh 400 tấn. Cần kiểm tra lại phiếu cân.',ago:'2 giờ trước',tag:'GD_PHIEUCAN'},
    {icon:'st',bi:'arrow-left-right',title:'Chênh món <b>8.6 triệu</b> giữa giao hàng và thanh toán',desc:'Khách <b>Vinaconex X1</b> · Đã giao 28,500 tấn · Chỉ thanh toán chờ 26,200 tấn. Cần đối chiếu lại công nợ.',ago:'1 ngày trước',tag:'GD_CONGNO'},
  ],
  deadline:[
    {icon:'hot',bi:'alarm',title:'Nộp thuế NK trước khi tàu cập cảng — <b>còn 1 ngày</b>',desc:'Tờ khai NK <b>103xxxxxxx7</b> (DDH-2026-0143) · thuế NK+VAT <b>610 triệu</b>. Phải nộp <b>trước khi tàu cập cảng làm hàng</b> (dự kiến 05/06). Chưa có chứng từ nộp thuế.',ago:'30 phút trước',tag:'GD_THUE_XNK'},
    {icon:'hot',bi:'calendar-x',title:'Hóa đơn gốc gửi KT Thai Binh — <b>hạn mùng 5 (con 2 ngày)</b>',desc:'Con <b>6 lo</b> chưa tập hợp đủ hóa đơn gốc gửi về KT Thai Binh trước <b>ngày 05 tháng sau</b> (B6.3). Lo: DH-2026-0316, 0317, 0319...',ago:'1 giờ trước',tag:'GD_HOADON'},
    {icon:'amb',bi:'clock-history',title:'Chứng từ chuyển hàng chưa về VP — <b>quá 1 ngày</b>',desc:'Lo <b>LO-2026-016</b> (tàu MV Sea Dragon) đã chốt KL nhưng <b>chứng từ chuyển hàng chưa chuyển về VP ngày hôm sau</b> (B5.2). NV giám sát XH QN  cần bàn giao gấp.',ago:'3 giờ trước',tag:'GD_THUHOI_CHUNGTU'},
    {icon:'amb',bi:'calendar-event',title:'Báo cáo tuần/tháng theo chuyến — <b>đến hạn</b>',desc:'Báo cáo hàng tuần chờ từng chuyển hàng/NCC (B6.4, B7.3) đến hạn tổng hợp. Phòng XK & VT chuẩn bị số liệu.',ago:'5 giờ trước',tag:'RPT_TIENDO',rpt:'tiendotau,nhatkysalan'},
  ]
};

function renderCbAlerts(cat){
  const list=document.getElementById('cb-'+cat+'-list');
  if(!list) return;
  const data=CB_DATA[cat]||[];
  list.innerHTML='';
  data.forEach(a=>{
    const div=document.createElement('div');
    div.className='al';
    if(a.tag&&(PAGE_MAP[a.tag]||a.rpt)) div.style.cursor='pointer';
    div.innerHTML=`
      <div class="ai ${a.icon}"><i class="bi bi-${a.bi}"></i></div>
      <div class="at">
        <div class="tl">${a.title}</div>
        <div class="desc">${a.desc}</div>
        <div class="ago">${a.ago}<span class="sep"></span>${a.tag}</div>
      </div>`;
    div.addEventListener('click',()=>{
      if(a.rpt) switchPage('baocao',{rpt:a.rpt});
      else if(a.tag&&PAGE_MAP[a.tag]) switchPage(PAGE_MAP[a.tag]);
    });
    list.appendChild(div);
  });
}
// Tab switching for cảnh báo
document.querySelectorAll('#cb-tabs button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#cb-tabs button').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    const tab=btn.dataset.tab;
    document.querySelectorAll('.cb-section').forEach(s=>s.style.display='none');
    const section=document.getElementById('cb-'+tab);
    if(section) section.style.display='block';
  });
});
// Initial render cảnh báo alerts
renderCbAlerts('congno');
renderCbAlerts('dongtien');
renderCbAlerts('chenhmon');
renderCbAlerts('deadline');
