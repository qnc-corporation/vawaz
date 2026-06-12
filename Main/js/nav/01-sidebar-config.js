// ===== SIDEBAR =====
const NAV_HINT={
  GD_BAOCAO_TIENDO:'Dashboard tổng quan: KPI, lộ trình 8 chặng, pipeline và đơn ưu tiên cần xử lý.',
  SYS_HOSO_LO:'Theo dõi toàn bộ chứng từ một lô xuất khẩu (bán đi) xuyên suốt 8 bước — từ HĐ XK đến thu công nợ.',
  SYS_FLOW:'Sơ đồ 3 tầng: TX (8 chặng nghiệp vụ), DM (master FK), RPT (view báo cáo) — vị trí bản ghi HĐ/ĐH.',
  SYS_DOICHIEU_CHENH:'Đối chiếu số liệu đầu vào/đầu ra, phát hiện chênh lệch giữa các bước.',
  SYS_DUYET_INBOX:'Hộp thư duyệt: chứng từ, DNTT, hợp đồng… đang chờ bạn phê duyệt.',
  SYS_CANHBAO:'Cảnh báo tự động: công nợ quá hạn, quỹ âm, chênh món, deadline quy trình.',
  DM_HOPDONG:'Hợp đồng bán ra — XK với khách nước ngoài; nội địa với khách trong nước; dịch vụ với đối tác.',
  DM_HOPDONG_NCC:'Hợp đồng mua vào từ NCC/nhà máy, chạy song song HĐ đầu ra.',
  DM_PHULUC_HOPDONG:'Phụ lục điều chỉnh giá, khối lượng, thời hạn hoặc bổ sung điều khoản HĐ.',
  GD_DONHANG:'Đơn hàng bán — kế hoạch giao hàng theo hợp đồng, theo dõi 8 chặng.',
  GD_DONHANG_NCC:'Đơn đặt hàng mua từ nhà cung cấp (B2.1 trong quy trình).',
  GD_DONHANG_CHITIET:'Chi tiết từng dòng sản phẩm trong đơn hàng (mã CT, KL đặt/giao).',
  GD_PHANBO_NHAMAY:'Phân bổ khối lượng đơn hàng cho từng nhà máy nguồn cung.',
  GD_VOBAO_DAT:'Kế hoạch đặt vỏ bao cho lô xuất khẩu.',
  GD_VOBAO:'Luân chuyển vỏ bao giữa nhà máy, kho và đối tác.',
  SYS_VOBAO_LC:'Vòng đời vỏ bao: tồn kho, bổ sung, thu hồi và theo dõi tổng thể.',
  GD_KH_TAU_ME:'Lịch tàu mẹ và lô xuất hàng — kế hoạch xếp hàng lên tàu biển.',
  GD_DIEUDO_SALAN:'Điều độ sà lan/bộ: nhập hàng từ cảng hoặc nhà máy lên khu neo.',
  GD_LENH_VC:'Lệnh vận chuyển nội địa bằng đường bộ, bám theo phân bổ nguồn.',
  GD_NHANHANG_CANG:'Nhận hàng tại cảng hoặc qua cân tại nhà máy.',
  GD_BANGIAO_SALAN:'Biên bản bàn giao sà lan: niêm chi, BB giao nhận, phiếu giao hàng.',
  GD_PHIEUCAN:'Phiếu cân hàng — ghi nhận khối lượng thực tế tại cân.',
  GD_THUHOI_CHUNGTU:'Thu hồi chứng từ gốc: phiếu cân, hóa đơn đỏ về văn phòng.',
  GD_KIEMTRA_HAM:'Kiểm tra hầm hàng, đánh tay hầm trước khi xếp.',
  GD_LAMHANG_TAU:'Time sheet tàu: NOR, laytime và thời gian làm hàng.',
  GD_DOMON_KIEMDEM:'Dỡ món, kiểm đếm hàng trên tàu tại cầu.',
  GD_SUCO_TONTHAT:'Báo rách vỏ, sự cố và tổn thất trong quá trình vận chuyển/xếp hàng.',
  GD_DICHVU_PHUTRO:'Dịch vụ phụ trợ: sàn gạt, neo đậu, bốc xếp…',
  GD_SANLUONG_NGAY:'Sản lượng đóng hàng theo ngày — báo cáo tiến độ làm hàng.',
  GD_TOKHAI_HAIQUAN:'Tờ khai hải quan nhập khẩu / xuất khẩu.',
  GD_THUE_XNK:'Nộp thuế NK, hoàn thuế XK theo quy định hải quan.',
  GD_CHUNGC_HAN:'Chứng nhận xuất xứ (C/O), fumigation, phytosanitary…',
  GD_CHECKLIST_HOSO:'Checklist hồ sơ lô hàng — đủ chứng từ trước khi chốt.',
  GD_TAILIEU_DINHKEM:'Lưu trữ tài liệu scan/PDF đính kèm theo lô.',
  GD_QUYETTOAN_HANG:'Quyết toán hàng hóa với nhà máy hoặc NCC sau khi giao đủ.',
  GD_QUYETTOAN_VT:'Quyết toán cước vận tải, tổn thất với nhà thầu VC.',
  GD_QUYETTOAN_VOBAO:'Quyết toán vỏ bao cho lô xuất khẩu.',
  GD_CHIPHI_VANTAI:'Chi phí phát sinh: phạt, bồi thường bảo hiểm, phụ trội…',
  GD_DENGHI_HOADON:'Đề nghị xuất hóa đơn bán hàng sau quyết toán.',
  GD_HOADON:'Hóa đơn bán hàng và chi tiết từng dòng.',
  GD_VAYTRA_HANG:'Vay/trả hàng đối tác — điều chỉnh công nợ tạm thời.',
  GD_DNTT:'Đề nghị thanh toán (DNTT) trình ký trước khi chi tiền.',
  GD_THANHTOAN:'Phiếu thu/chi thực tế — ghi nhận thanh toán.',
  GD_CONGNO:'Đối chiếu và sổ công nợ với khách, NCC, nhà thầu.',
  GD_THUHOI_CONGNO:'Theo dõi thu hồi nợ, nợ xấu và nhắc thanh toán.',
  GD_SODU_QUY:'Số dư quỹ tiền mặt, ngân hàng và dòng tiền nội bộ.',
  RPT_TIENDO:'Báo cáo tiến độ tàu và nhật ký sà lan theo chuyến.',
  RPT_SANLUONG:'Báo cáo sản lượng, sự cố và chi phí vận tải.',
  RPT_CONGNO:'Tuổi nợ và tiến độ thanh toán công nợ.',
  RPT_DONGTIEN:'Dòng tiền và lãi/lỗ theo từng lô hàng.',
  RPT_GIAOHD:'Đối chiếu khối lượng giao hàng với hóa đơn xuất.',
  'DM_CONGTY · DM_DOITAC':'Danh mục công ty, khách hàng, NCC và nhóm đối tác.',
  'DM_HANGHOA · DM_DONVITINH':'Hàng hóa, hashtag phân loại và đơn vị tính.',
  'DM_VOBAO · DM_NHATHAU':'Loại vỏ bao, NCC vỏ bao và nhà thầu vận chuyển.',
  DM_TIENTE:'Tiền tệ và tỷ giá quy đổi cập nhật theo ngày.',
  'DM_PHUONGTIEN · DM_TUYENDUONG':'Sà lan, tàu biển, xe và tuyến vận chuyển.',
  'DM_DIADIEM · DM_KHO':'Cảng, nhà máy, kho và điểm giao nhận.',
  DM_BANGGIA_VANTAI:'Loại chi phí và bảng giá vận tải theo tuyến.',
  DM_TAIKHOAN:'Tài khoản ngân hàng và quỹ nội bộ.',
  DM_NGUOIDUNG:'Quản lý người dùng và phân quyền chức năng.',
  DM_NGUOIDUNG_DOITAC:'Giới hạn quyền xem dữ liệu theo đối tác/dòng hàng.',
  SYS_DUYET:'Cấu hình luồng duyệt nhiều cấp (NV → TP → GĐ).',
  SYS_TRACKLOG:'Nhật ký thay đổi dữ liệu — ai sửa gì, lúc nào.',
};
const NAV_LABEL={
  SYS_HOSO_LO:'Hồ sơ lô XK 360',
  SYS_FLOW:'Luồng database',
  SYS_DOICHIEU_CHENH:'Đối chiếu chênh lệch',
  SYS_DUYET_INBOX:'Chờ duyệt',
  SYS_CANHBAO:'Cảnh báo hệ thống',
  DM_HOPDONG:'Hợp đồng đầu ra',
  DM_HOPDONG_NCC:'Hợp đồng đầu vào',
  DM_PHULUC_HOPDONG:'Phụ lục HĐ',
  GD_DONHANG:'Đơn hàng bán',
  GD_DONHANG_NCC:'Đơn đặt hàng NCC',
  GD_DONHANG_CHITIET:'Chi tiết đơn hàng',
  GD_PHANBO_NHAMAY:'Phân bổ nhà máy',
  GD_VOBAO_DAT:'Đặt vỏ bao (XK)',
  GD_VOBAO:'Luân chuyển vỏ bao',
  SYS_VOBAO_LC:'Vòng đời vỏ bao',
  GD_KH_TAU_ME:'Kế hoạch tàu mẹ',
  GD_DIEUDO_SALAN:'Điều độ sà lan',
  GD_LENH_VC:'Lệnh vận chuyển',
  GD_NHANHANG_CANG:'Nhận hàng cảng/NM',
  GD_BANGIAO_SALAN:'Bàn giao sà lan',
  GD_PHIEUCAN:'Phiếu cân',
  GD_THUHOI_CHUNGTU:'Thu hồi chứng từ',
  GD_KIEMTRA_HAM:'Kiểm tra hầm',
  GD_LAMHANG_TAU:'Time sheet tàu',
  GD_DOMON_KIEMDEM:'Dỡ món & kiểm đếm',
  GD_SUCO_TONTHAT:'Sự cố & tổn thất',
  GD_DICHVU_PHUTRO:'Dịch vụ phụ trợ',
  GD_SANLUONG_NGAY:'Sản lượng ngày',
  GD_TOKHAI_HAIQUAN:'Tờ khai hải quan',
  GD_THUE_XNK:'Thuế XNK',
  GD_CHUNGC_HAN:'Chứng nhận XNK',
  GD_CHECKLIST_HOSO:'Checklist hồ sơ',
  GD_TAILIEU_DINHKEM:'Tài liệu đính kèm',
  GD_QUYETTOAN_HANG:'Quyết toán hàng',
  GD_QUYETTOAN_VT:'Quyết toán vận tải',
  GD_QUYETTOAN_VOBAO:'Quyết toán vỏ bao',
  GD_CHIPHI_VANTAI:'Chi phí phát sinh',
  GD_DENGHI_HOADON:'Đề nghị xuất HĐ',
  GD_HOADON:'Hóa đơn',
  GD_VAYTRA_HANG:'Vay/trả hàng',
  GD_DNTT:'Đề nghị thanh toán',
  GD_THANHTOAN:'Thanh toán',
  GD_CONGNO:'Sổ công nợ',
  GD_THUHOI_CONGNO:'Thu hồi công nợ',
  GD_SODU_QUY:'Số dư quỹ',
  RPT_TIENDO:'Tiến độ tàu · Sà lan',
  RPT_SANLUONG:'Sản lượng · Sự cố',
  RPT_CONGNO:'Công nợ · Thanh toán',
  RPT_DONGTIEN:'Dòng tiền · Lãi/lỗ',
  RPT_GIAOHD:'Giao hàng ↔ HĐ',
  'DM_CONGTY · DM_DOITAC':'Công ty & đối tác',
  'DM_HANGHOA · DM_DONVITINH':'Hàng hóa & DVT',
  'DM_VOBAO · DM_NHATHAU':'Vỏ bao & nhà thầu',
  DM_TIENTE:'Tiền tệ & tỷ giá',
  'DM_PHUONGTIEN · DM_TUYENDUONG':'Phương tiện & tuyến',
  'DM_DIADIEM · DM_KHO':'Địa điểm & kho',
  DM_BANGGIA_VANTAI:'Bảng giá vận tải',
  DM_TAIKHOAN:'Tài khoản / quỹ',
  DM_NGUOIDUNG:'Người dùng',
  DM_NGUOIDUNG_DOITAC:'Quyền theo đối tác',
  SYS_DUYET:'Duyệt nhiều cấp',
  SYS_TRACKLOG:'Nhật ký thay đổi',
};
const NAV=[
 {sup:1,name:"Tổng quan",sub:"Dashboard",items:[
   {l:"Bảng điều khiển",t:"GD_BAOCAO_TIENDO",c:"",key:1,active:1},
   {l:"Hồ sơ lô XK 360 (bán đi)",t:"SYS_HOSO_LO",c:"",key:1},
   {l:"Luồng database · 8 chặng",t:"SYS_FLOW",c:"",key:1},
   {l:"Đối chiếu chênh lệch (vao/ra)",t:"SYS_DOICHIEU_CHENH",c:"sys"},
   {l:"Chờ tôi duyệt",t:"SYS_DUYET_INBOX",c:"sys"},
   {l:"Cảnh báo (công nợ, dòng tiền, chenh mon, vỏ bao)",t:"SYS_CANHBAO",c:"sys"},
 ]},
 {step:1,name:"Thương mại",sub:"HĐ & đơn hàng",items:[
   {l:"Hợp đồng đầu ra (XK / Nội địa / Dịch vụ)",t:"DM_HOPDONG",c:"dm",key:1},
   {l:"Hợp đồng đầu vào (mua NCC)",t:"DM_HOPDONG_NCC",c:"dm"},
   {l:"Phụ lục hợp đồng",t:"DM_PHULUC_HOPDONG",c:"dm"},
   {l:"Đơn hàng bán (kế hoạch giao hàng)",t:"GD_DONHANG",c:"",key:1},
   {l:"Don dat hang NCC (mua hàng)",t:"GD_DONHANG_NCC",c:""},
   {l:"Chi tiết đơn hàng",t:"GD_DONHANG_CHITIET",c:""},
 ],count:47},
 {step:2,name:"Phân bổ & vỏ bao",sub:"chia nguồn",items:[
   {l:"Phân bổ nguồn nhà máy",t:"GD_PHANBO_NHAMAY",c:"",key:1},
   {l:"Kế hoạch & đặt vỏ bao (XK)",t:"GD_VOBAO_DAT",c:""},
   {l:"Phân bổ / luân chuyển vỏ bao",t:"GD_VOBAO",c:""},
   {l:"Vòng đời & bổ sung vỏ bao",t:"SYS_VOBAO_LC",c:"",key:1},
 ],count:12},
 {step:3,name:"Vận chuyển",sub:"sà lan → neo",items:[
   {l:"Kế hoạch tàu mẹ",t:"GD_KH_TAU_ME",c:"",key:1},
   {l:"Điều độ sà lan / gói phương tiện",t:"GD_DIEUDO_SALAN",c:"",key:1},
   {l:"Lệnh vận chuyển",t:"GD_LENH_VC",c:"",key:1},
 ],count:17},
 {step:4,name:"Giao nhận",sub:"cảng · NM",items:[
   {l:"Nhận hàng tại cảng / qua cân nhà máy",t:"GD_NHANHANG_CANG",c:"",key:1},
   {l:"Bàn giao sà lan (niêm chi, BB giao nhan, phiếu giao hàng)",t:"GD_BANGIAO_SALAN",c:""},
   {l:"Phiếu cân hàng",t:"GD_PHIEUCAN",c:"",key:1},
   {l:"Thu hồi chứng từ (phiếu cân, hóa đơn đỏ)",t:"GD_THUHOI_CHUNGTU",c:""},
 ],count:12},
 {step:5,name:"Làm hàng",sub:"xếp tàu",items:[
   {l:"Kiểm tra / đánh tay hầm",t:"GD_KIEMTRA_HAM",c:""},
   {l:"Time sheet (NOR / laytime)",t:"GD_LAMHANG_TAU",c:""},
   {l:"Dỡ món & kiểm đếm",t:"GD_DOMON_KIEMDEM",c:"",key:1},
   {l:"Báo rách vỏ · Sự cố & tổn thất",t:"GD_SUCO_TONTHAT",c:""},
   {l:"Dịch vụ phụ trợ (sàn gạt...)",t:"GD_DICHVU_PHUTRO",c:""},
   {l:"Sản lượng đóng theo ngày",t:"GD_SANLUONG_NGAY",c:""},
 ],current:1,count:9},
 {step:6,name:"Hải quan XNK",sub:"NK · XK · C/O",items:[
   {l:"Tờ khai hải quan (NK / XK)",t:"GD_TOKHAI_HAIQUAN",c:"",key:1},
   {l:"Thuế XNK (nộp thuế NK / hoan thuế XK)",t:"GD_THUE_XNK",c:""},
   {l:"Chứng nhận (C/O, Fumi, Phyto...)",t:"GD_CHUNGC_HAN",c:""},
   {l:"Checklist hồ sơ lô hàng",t:"GD_CHECKLIST_HOSO",c:""},
   {l:"Tài liệu đính kèm",t:"GD_TAILIEU_DINHKEM",c:""},
 ],count:14},
 {step:7,name:"HĐ & quyết toán",sub:"chốt giá trị",items:[
   {l:"Quyết toán hàng hóa (nhà máy / NCC)",t:"GD_QUYETTOAN_HANG",c:"",key:1},
   {l:"Quyết toán vận tải (nha thau VC)",t:"GD_QUYETTOAN_VT",c:""},
   {l:"Quyết toán vỏ bao (XK)",t:"GD_QUYETTOAN_VOBAO",c:""},
   {l:"Chi phí / phát sinh (phat, bồi thường BH)",t:"GD_CHIPHI_VANTAI",c:""},
   {l:"Đề nghị xuất hóa đơn",t:"GD_DENGHI_HOADON",c:""},
   {l:"Hóa đơn (+ chi tiết)",t:"GD_HOADON",c:"",key:1},
   {l:"Vay / trả hàng đối tác",t:"GD_VAYTRA_HANG",c:""},
 ],count:11},
 {step:8,name:"Công nợ",sub:"TT · thu hồi",items:[
   {l:"Đề nghị thanh toán (DNTT)",t:"GD_DNTT",c:""},
   {l:"Thanh toán (thu / chi)",t:"GD_THANHTOAN",c:"",key:1},
   {l:"Đối chiếu & sổ công nợ",t:"GD_CONGNO",c:"",key:1},
   {l:"Theo dõi & thu hồi công nợ (đọc thực, nợ xấu)",t:"GD_THUHOI_CONGNO",c:""},
   {l:"Số dư quỹ / dòng tiền",t:"GD_SODU_QUY",c:""},
 ],count:9},
 {div:""},
 {sup:1,name:"Báo cáo",sub:"13 BC",items:[
   {l:"Tien độ tàu · Nhật ký sà lan",t:"RPT_TIENDO",c:"rpt",rpt:"tiendotau,nhatkysalan"},
   {l:"Sản lượng · Sự cố · Chi phí",t:"RPT_SANLUONG",c:"rpt",rpt:"sanluong,sucoton,chiphivt"},
   {l:"Công nợ · Tiến độ thanh toán",t:"RPT_CONGNO",c:"rpt",rpt:"tuoino,tiendott"},
   {l:"Dòng tiền · Lãi/lỗ lô hàng",t:"RPT_DONGTIEN",c:"rpt",rpt:"dongtien,lailo"},
   {l:"Đối chiếu giao hàng ↔ hoa đơn",t:"RPT_GIAOHD",c:"rpt",rpt:"giaohd"},
 ]},
 {sup:1,name:"Danh mục",sub:"dữ liệu gốc",items:[
   {l:"Công ty · Đối tác & Nhóm",t:"DM_CONGTY · DM_DOITAC",c:"dm"},
   {l:"Hàng hóa · Hashtag · Đơn vị tính",t:"DM_HANGHOA · DM_DONVITINH",c:"dm"},
   {l:"Vỏ bao · NCC vỏ bao · Nha thau VC",t:"DM_VOBAO · DM_NHATHAU",c:"dm"},
   {l:"Tiền tệ & Tỷ giá",t:"DM_TIENTE",c:"dm"},
   {l:"Phương tiện · Tàu biển · Tuyến",t:"DM_PHUONGTIEN · DM_TUYENDUONG",c:"dm"},
   {l:"Địa điểm · Kho",t:"DM_DIADIEM · DM_KHO",c:"dm"},
   {l:"Loại chi phí · Bang gia VT",t:"DM_BANGGIA_VANTAI",c:"dm"},
   {l:"Tài khoản ngân hàng / quy",t:"DM_TAIKHOAN",c:"dm"},
 ]},
 {sup:1,name:"Hệ thống",sub:"quản trị",items:[
   {l:"Người dùng & Phân quyền",t:"DM_NGUOIDUNG",c:"dm"},
   {l:"Quyền xem đối tác (theo dòng)",t:"DM_NGUOIDUNG_DOITAC",c:"dm"},
   {l:"Duyệt nhiều cấp",t:"SYS_DUYET",c:"sys"},
   {l:"Cấu hình cảnh báo",t:"SYS_CANHBAO",c:"sys"},
   {l:"Nhật ký thay đổi",t:"SYS_TRACKLOG",c:"sys"},
 ]},
];
const NAV_BY_CODE={};
const OVERVIEW_NATIVE=new Set();
NAV.forEach(g=>{(g.items||[]).forEach(it=>{NAV_BY_CODE[it.t]=it;});if(g.sup&&g.name==='Tổng quan')(g.items||[]).forEach(it=>OVERVIEW_NATIVE.add(it.t));});

const NAV_PIN_KEY='qnc_nav_pins';
function getNavPins(){
  try{
    const a=JSON.parse(localStorage.getItem(NAV_PIN_KEY)||'[]');
    return Array.isArray(a)?a.filter(c=>NAV_BY_CODE[c]&&!OVERVIEW_NATIVE.has(c)):[];
  }catch{return[];}
}
function setNavPins(arr){localStorage.setItem(NAV_PIN_KEY,JSON.stringify(arr));}
function isNavPinned(code){return getNavPins().includes(code);}
function toggleNavPin(code){
  if(OVERVIEW_NATIVE.has(code)) return;
  let pins=getNavPins();
  pins=pins.includes(code)?pins.filter(c=>c!==code):[...pins,code];
  setNavPins(pins);
}

function createNavItem(it,{pinnable=true,shortcut=false}={}){
  const row=document.createElement('div');
  row.className='item'+(it.key&&!shortcut?' key':'')+(it.active&&!shortcut?' active':'')+(shortcut?' shortcut':'');
  if(it.rpt) row.dataset.rpt=it.rpt;
  row.dataset.code=it.t;
  if(it.href) row.dataset.href=it.href;
  const dotKind=it.c==='dm'?'dm':it.c==='sys'?'sys':it.c==='rpt'?'rpt':'gd';
  const lbl=NAV_LABEL[it.t]||it.l;
  const hint=NAV_HINT[it.t]||'';
  const pinned=isNavPinned(it.t);
  const hintHtml=hint?`<span class="ihint" tabindex="0" aria-label="Chú thích: ${lbl}"><i class="bi bi-info-circle"></i></span>`:'';
  const showPin=pinnable&&!OVERVIEW_NATIVE.has(it.t);
  const pinHtml=showPin?`<button type="button" class="ipin${pinned?' on':''}" data-code="${it.t}" title="${pinned?'Bỏ ghim khỏi Tổng quan':'Ghim lên Tổng quan'}" aria-label="${pinned?'Bỏ ghim khỏi Tổng quan':'Ghim lên Tổng quan'}" aria-pressed="${pinned?'true':'false'}"><i class="bi bi-pin${pinned?'-fill':''}"></i></button>`:'';
  const metaHtml=(hintHtml||pinHtml)?`<span class="item-meta">${hintHtml}${pinHtml}</span>`:'';
  row.innerHTML=`<span class="dot ${dotKind}"></span><span class="ilabel"><span class="ilabel-txt">${lbl}</span>${metaHtml}</span>${hint?`<span class="hint-tip" role="tooltip">${hint}</span>`:''}`;
  row.querySelector('.ihint')?.addEventListener('click',e=>e.stopPropagation());
  row.querySelector('.ipin')?.addEventListener('click',e=>{e.stopPropagation();toggleNavPin(it.t);renderNav();syncNavActive(window.__navPage,window.__navRpt);});
  return row;
}

function renderNav(){
  const nav=document.getElementById('nav');
  nav.innerHTML='';
  const pins=getNavPins();
  NAV.forEach(g=>{
    if('div' in g){const d=document.createElement('div');d.className='divider'+(!g.div?' plain':'');if(g.div)d.textContent=g.div;nav.appendChild(d);return;}
    const wrap=document.createElement('div');
    const openDefault=g.step||(g.sup&&g.name==='Tổng quan');
    wrap.className='grp'+(openDefault?' open':'')+(g.sup?' sup':'');
    const head=document.createElement('div');head.className='head';
    const badge=g.step?g.step:(g.sup?'·':'');
    const countHtml=g.count?`<span class="gcount">${g.count}</span>`:'';
    head.innerHTML=`<div class="step">${badge}</div>
      <div class="gname">${g.name}</div>
      ${countHtml}
      <div class="chev">&#9654;</div>`;
    const items=document.createElement('div');items.className='items';
    if(g.sup&&g.name==='Tổng quan'){
      (g.items||[]).forEach(it=>items.appendChild(createNavItem(it,{pinnable:false})));
      if(pins.length){
        const pd=document.createElement('div');pd.className='pin-divider';pd.textContent='Đã ghim';
        items.appendChild(pd);
        pins.forEach(code=>{const it=NAV_BY_CODE[code];if(it)items.appendChild(createNavItem(it,{pinnable:true,shortcut:true}));});
      }
    }else{
      (g.items||[]).forEach(it=>items.appendChild(createNavItem(it,{pinnable:true})));
    }
    head.onclick=()=>wrap.classList.toggle('open');
    wrap.appendChild(head);wrap.appendChild(items);nav.appendChild(wrap);
  });
}

function syncNavActive(pageId,rpt){
  document.querySelectorAll('#nav .item').forEach(it=>it.classList.remove('active'));
  if(!pageId) return;
  document.querySelectorAll('#nav .item').forEach(it=>{
    const code=it.dataset.code;
    if(!code||PAGE_MAP[code]!==pageId) return;
    if(pageId==='baocao'){
      if(rpt&&it.dataset.rpt===rpt) it.classList.add('active');
    }else it.classList.add('active');
  });
}

function focusNavItem(code){
  const el=document.querySelector(`#nav .item[data-code="${code}"]:not(.shortcut)`)
    ||document.querySelector(`#nav .item[data-code="${code}"]`);
  if(!el) return;
  const grp=el.closest('.grp');
  if(grp) grp.classList.add('open');
  el.scrollIntoView({block:'nearest',behavior:'smooth'});
  el.classList.remove('nav-flash');
  void el.offsetWidth;
  el.classList.add('nav-flash');
  setTimeout(()=>el.classList.remove('nav-flash'),1200);
}

function goToNavCode(code){
  const it=NAV_BY_CODE[code];
  if(!it) return;
  const pageId=PAGE_MAP[code];
  if(pageId) switchPage(pageId,it.rpt?{rpt:it.rpt}:undefined);
  focusNavItem(code);
}

renderNav();
document.getElementById('nav').addEventListener('click',e=>{
  if(e.target.closest('.ihint')||e.target.closest('.ipin')) return;
  const it=e.target.closest('#nav .item');
  if(!it) return;
  if(it.dataset.href){ window.open(it.dataset.href,'_blank'); return; }
  const t=it.dataset.code;
  if(!t||!PAGE_MAP[t]) return;
  const rpt=it.dataset.rpt;
  switchPage(PAGE_MAP[t],rpt?{rpt}:undefined);
  const grp=it.closest('.grp');
  if(grp&&!grp.classList.contains('open')) grp.classList.add('open');
});
