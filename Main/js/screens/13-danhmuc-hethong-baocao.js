// ===== DANH MỤC / HE THONG / BAO CAO =====
(function(){
  const B=window.buildListScreen;
  if(!B) return;
  const DM=[
  /* ---- Danh mục ---- */
  {id:'dmdoitac',code:'DM_CONGTY · DM_DOITAC',crumb:'CONG TY · DOI TAC',grp:'DANH MỤC',title:'Công ty · Đối tác &amp; Nhóm',desc:'Danh mục công ty, khách hàng, nhà cung cấp, nha thau và nhóm đối tác.',addBtn:'Tạo đối tác',tableTitle:'Danh sách đối tác',
   kpis:[['t','people','Đối tác','248','ben','up','+12','thang nay'],['a','person-badge','Khách hàng','96','KH','eq','đang giao dich',''],['s','truck','NCC / Nhà máy','84','NCC','eq','đầu vào',''],['h','tools','Nha thau VC','68','NT','eq','van tai/DV','']],
   tabs:[['all','Tất cả','248'],['khach','Khách hàng','96'],['ncc','NCC','84'],['nha thau','Nha thau','68']],statusOpts:['Hoat dong','Ngung'],
   cols:['Ma','Ten đối tác','Loai','Nhóm','MST','Dien thoai','Công nợ','Trạng thái'],num:[6],
   rows:[
    ['DT-0012','Cty CP Xi măng Hạ Long','Khách hàng','Nhóm A','0101xxxxxx','0203 765 xxx','6.6 ty','s2|Hoat dong'],
    ['DT-0045','NM Xi mang Bim Son','NCC','Nhà máy','2800xxxxxx','0237 862 xxx','5.8 ty','s2|Hoat dong'],
    ['DT-0088','SL Truong Thanh','Nha thau','Vận tải','5701xxxxxx','0912 334 xxx','1.2 ty','s2|Hoat dong'],
    ['DT-0102','Cty TNHH VLXD Sai Gon','Khách hàng','Nhóm B','0312xxxxxx','028 3765 xxx','1.24 ty','s4|Hoat dong'],
   ]},
  {id:'dmhanghoa',code:'DM_HANGHOA · DM_DONVITINH',crumb:'HANG HOA · DVT',grp:'DANH MỤC',title:'Hàng hóa · Hashtag · Đơn vị tính',desc:'Danh mục hàng hóa, nhom, hashtag phan loại và đơn vi tinh.',addBtn:'Tạo hàng hóa',tableTitle:'Danh sách hàng hóa',
   kpis:[['t','box-seam','Mat hang','42','SP','up','+3','thang nay'],['a','tags','Hashtag','28','tag','eq','phân loại',''],['s','rulers','Đơn vị tính','6','DVT','eq','tấn, kg, bao',''],['h','grid','Nhóm hang','5','nhom','eq','clinker, XM...','']],
   tabs:[['all','Tất cả','42'],['clinker','Clinker','12'],['xi mang','Xi măng','18'],['thach cao','Thạch cao','6']],statusOpts:['Hoat dong','Ngung'],
   cols:['Ma SP','Ten hàng hóa','Nhóm','Hashtag','DVT','Quy cách','Trạng thái'],num:[],
   rows:[
    ['SP-001','Clinker','Clinker','#clinker #xuatkhau','tan','Roi','s2|Hoat dong'],
    ['SP-014','Xi măng PCB40','Xi măng','#ximang #bao','tan','Bao 50kg','s2|Hoat dong'],
    ['SP-022','Xi măng PCB30','Xi măng','#ximang #roi','tan','Roi','s2|Hoat dong'],
    ['SP-031','Thạch cao','Thạch cao','#thachcao #nhapkhau','tan','Roi','s2|Hoat dong'],
   ]},
  {id:'dmvobao',code:'DM_VOBAO · DM_NHATHAU',crumb:'VO BAO · NHA THAU VC',grp:'DANH MỤC',title:'Vỏ bao · NCC vỏ bao · Nha thau VC',desc:'Danh mục loại vỏ bao, nhà cung cấp vỏ bao và nha thau vận chuyển.',addBtn:'Tạo mới',tableTitle:'Danh sách',
   kpis:[['t','bag','Loai vỏ bao','8','loai','eq','PP, GI...',''],['a','building','NCC vỏ bao','6','NCC','eq','sản xuất',''],['s','truck','Nha thau VC','68','NT','eq','sa lan/xe',''],['h','diagram-3','Tuyến','24','tuyen','eq','đang khai thac','']],
   tabs:[['all','Tất cả','82'],['vỏ bao','Vỏ bao','8'],['ncc vỏ bao','NCC vỏ bao','6'],['nha thau','Nha thau VC','68']],statusOpts:['Hoat dong','Ngung'],
   cols:['Ma','Ten','Loai','Quy cách / Tuyến','Đối tác','Trạng thái'],num:[],
   rows:[
    ['VB-PP50','Vỏ bao PP 50kg','Vỏ bao','50kg · in 3 mau','NM Bao bi Tien Phong','s2|Hoat dong'],
    ['VB-GI50','Vỏ bao GI 50kg','Vỏ bao','50kg · valve','NM Bao bi Viet Tri','s2|Hoat dong'],
    ['NT-SL01','SL Truong Thanh','Nha thau VC','Cam Pha - QN','Cty Vận tải Truong Thanh','s2|Hoat dong'],
    ['NT-BD01','VT Biển Đông','Nha thau VC','QN - Da Nang','Cty TNHH Vận tải Biển Đông','s2|Hoat dong'],
   ]},
  {id:'dmtiente',code:'DM_TIENTE',crumb:'TIEN TE & TY GIA',grp:'DANH MỤC',title:'Tien te &amp; Tỷ giá',desc:'Danh mục tiền tệ và tỷ giá quy đổi cap nhat theo ngày.',addBtn:'Cập nhật tỷ giá',tableTitle:'Danh sách tiền tệ',
   kpis:[['t','currency-exchange','Tien te','5','loai','eq','VND, USD...',''],['a','graph-up','USD/VND','25,420','','up','+0.2%','hom nay'],['s','graph-up','EUR/VND','27,680','','dn','-0.1%','hom nay'],['h','arrow-repeat','Cập nhật','08:42','','eq','hom nay','từ DB']],
   tabs:[['all','Tất cả','5']],statusOpts:['Hoat dong'],
   cols:['Ma','Tien te','Tỷ giá (VND)','Loai','Cập nhật','Trạng thái'],num:[2],
   rows:[
    ['VND','Viet Nam Đóng','1','Goc','08:42','s2|Hoat dong'],
    ['USD','US Dollar','25,420','Ngoai te','08:42','s2|Hoat dong'],
    ['EUR','Euro','27,680','Ngoai te','08:42','s2|Hoat dong'],
    ['CNY','Nhan dan te','3,512','Ngoai te','08:42','s2|Hoat dong'],
   ]},
  {id:'dmphuongtien',code:'DM_PHUONGTIEN · DM_TUYENDUONG',crumb:'PHUONG TIEN · TUYEN',grp:'DANH MỤC',title:'Phương tiện · Tàu biển · Tuyến',desc:'Danh mục sa lan, tàu biển, xe và tuyến vận chuyển.',addBtn:'Tạo phương tiện',tableTitle:'Danh sách phương tiện',
   kpis:[['t','water','Sa lan','86','chiec','eq','đang khai thac',''],['a','tsunami','Tau bien','24','tau','eq','tuyến XK',''],['s','truck','Xe','142','xe','eq','van tại bo',''],['h','diagram-3','Tuyến','24','tuyen','eq','đang dung','']],
   tabs:[['all','Tất cả','276'],['sa lan','Sa lan','86'],['tàu biển','Tau bien','24'],['xe','Xe','142'],['tuyen','Tuyến','24']],statusOpts:['Hoat dong','Bao tri'],
   cols:['Ma','Ten / Bien so','Loai','Trong tai','Tuyến','Don vi','Trạng thái'],num:[],
   rows:[
    ['SL-TT06','SL Truong Thanh 06','Sa lan','1,500 tan','Cam Pha - QN','VT Truong Thanh','s2|Hoat dong'],
    ['TB-OS','MV Ocean Star','Tau bien','12,000 tan','QN - Manila','Chu tau VOSCO','s2|Hoat dong'],
    ['XE-451','30C-451.88','Xe','40 tan','Cang - NM','VT Biển Đông','s2|Hoat dong'],
    ['XE-330','15B-330.19','Xe','45 tan','Cang - Kho','VT Truong Thanh','s5|Bao tri'],
   ]},
  {id:'dmdiadiem',code:'DM_DIADIEM · DM_KHO',crumb:'DIA DIEM · KHO',grp:'DANH MỤC',title:'Địa điểm · Kho',desc:'Danh mục cang, nhà máy, kho và địa điểm giao nhan.',addBtn:'Tạo địa điểm',tableTitle:'Danh sách địa điểm',
   kpis:[['t','geo-alt','Dia diem','38','diem','eq','cang/NM/kho',''],['a','water','Cang','12','cang','eq','xuat/nhap',''],['s','building','Nhà máy','14','NM','eq','đầu vào',''],['h','box-seam','Kho','5','kho','eq','luu hang','']],
   tabs:[['all','Tất cả','38'],['cang','Cang','12'],['nhà máy','Nhà máy','14'],['kho','Kho','5']],statusOpts:['Hoat dong','Ngung'],
   cols:['Ma','Ten','Loai','Khu vuc','Suc chua','Trạng thái'],num:[],
   rows:[
    ['DD-CP','Cang Cam Pha','Cang','Quang Ninh','--','s2|Hoat dong'],
    ['DD-HL','NM Xi mang Ha Long','Nhà máy','Quang Ninh','--','s2|Hoat dong'],
    ['KHO-HL','Kho Ha Long','Kho','Quang Ninh','15,000 tan','s2|Hoat dong'],
    ['DD-HP','Cảng Hải Phòng','Cang','Hai Phong','--','s2|Hoat dong'],
   ]},
  {id:'dmbanggia',code:'DM_BANGGIA_VANTAI',crumb:'LOAI CHI PHI · BANG GIA VT',grp:'DANH MỤC',title:'Loại chi phí · Bang gia van tai',desc:'Danh mục loại chi phí và bảng giá van tại theo tuyen, phương tiện.',addBtn:'Tạo bảng giá',tableTitle:'Bang gia van tai',
   kpis:[['t','list-ul','Loại chi phí','18','loai','eq','VC, DV...',''],['a','table','Đóng gia','142','dong','up','+8','thang nay'],['s','calendar-check','Hieu luc','128','dong','eq','đang ap dung',''],['h','clock-history','Sắp hết hạn','6','dong','dn','can cap nhat','']],
   tabs:[['all','Tất cả','142']],statusOpts:['Hieu luc','Hết hạn'],
   cols:['Ma','Tuyến / Loai','Phuong tien','Đơn giá','DVT','Hieu luc','Trạng thái'],num:[3],
   rows:[
    ['BG-001','Cam Pha - QN','Sa lan','62,000','d/tan','01/01/2026','s2|Hieu luc'],
    ['BG-014','Hai Phong - QN','Sa lan','68,000','d/tan','01/01/2026','s2|Hieu luc'],
    ['BG-022','QN - Da Nang','Tau bien','185,000','d/tan','01/03/2026','s2|Hieu luc'],
    ['BG-031','San gat','Co gioi','18,000','d/tan','01/06/2025','s5|Hết hạn'],
   ]},
  {id:'dmtaikhoan',code:'DM_TAIKHOAN',crumb:'TAI KHOAN NH / QUY',grp:'DANH MỤC',title:'Tài khoản ngân hàng / quy',desc:'Danh mục tài khoản ngân hàng và các quy nội bộ.',addBtn:'Tạo tài khoản',tableTitle:'Danh sách tài khoản',
   kpis:[['t','bank','Tai khoan','7','TK','eq','NH + quy',''],['a','wallet2','Tổng số dư','38.4','ty','up','+3.2 ty','so với dau ky'],['s','building','Ngán hang','3','NH','eq','VCB, BIDV...',''],['h','exclamation-triangle','Quy am','1','quy','dn','-540 tr','can bổ sung']],
   tabs:[['all','Tất cả','7'],['ngân hàng','Ngán hang','4'],['quy','Quy','3']],statusOpts:['Hoat dong'],
   cols:['Ma','Ten TK / Quy','Ngán hang','So TK','Loai','Số dư','Trạng thái'],num:[5],
   rows:[
    ['TK-VCB1','TK chính VCB','Vietcombank','00451xxxxxx','Ngán hang','26.4 ty','s2|Hoat dong'],
    ['TK-BIDV1','TK BIDV','BIDV','77820xxxxxx','Ngán hang','10.6 ty','s2|Hoat dong'],
    ['QUY-TM','Quy tien mat','--','--','Quy','2.0 ty','s2|Hoat dong'],
    ['QUY-VT','Quy van tai','--','--','Quy','-540 tr','s8|Hoat dong'],
   ]},
  /* ---- Hệ thống ---- */
  {id:'sysnguoidung',code:'DM_NGUOIDUNG',crumb:'NGUOI DUNG & PHAN QUYEN',grp:'HE THONG',title:'Nguoi dừng &amp; Phan quyen',desc:'Quản lý tài khoản người dùng, phong ban và vai tro phân quyền.',addBtn:'Tạo người dùng',tableTitle:'Danh sách người dùng',
   kpis:[['t','people','Nguoi dung','64','user','up','+4','thang nay'],['a','person-check','Đang hoạt động','58','user','eq','online 12',''],['s','shield-lock','Vai tro','9','role','eq','phân quyền',''],['h','person-x','Bi khoa','6','user','dn','het han/nghi','']],
   tabs:[['all','Tất cả','64'],['hoạt động','Đang hoạt động','58'],['khoa','Khoa','6']],statusOpts:['Hoat dong','Khoa'],
   cols:['Ma NV','Ho ten','Phong ban','Vai tro','Email','Lan đang nhập','Trạng thái'],num:[],
   rows:[
    ['NV-012','Nguyễn An','Ban Giám đốc','Admin','an@cement.com.vn','03/06 08:40','s2|Hoat dong'],
    ['NV-045','Tran Thi Ha','Phòng Vận tải','Trưởng phòng','ha@cement.com.vn','03/06 08:12','s2|Hoat dong'],
    ['NV-067','Le Thi Trang','Phong XNK','Nhân viên','trang@cement.com.vn','03/06 07:58','s2|Hoat dong'],
    ['NV-088','Pham Van Tu','Phòng Vận tải','Nhân viên','tu@cement.com.vn','28/05 16:20','s8|Khoa'],
   ]},
  {id:'sysquyendoitac',code:'DM_NGUOIDUNG_DOITAC',crumb:'QUYEN XEM DOI TAC',grp:'HE THONG',title:'Quyền xem đối tác (theo dòng)',desc:'Phan quyền xem du lieu theo dõi tac o muc dong (row-level security).',addBtn:'Cap quyen',tableTitle:'Danh sách phân quyền',
   kpis:[['t','shield-check','Quy tac','38','quy tac','eq','đang ap dung',''],['a','people','Nguoi dung','24','user','eq','có gioi han',''],['s','eye','Pham vi','4','muc','eq','toan bo/nhom...',''],['h','clock-history','Cập nhật','02/06','','eq','gán nhat','']],
   tabs:[['all','Tất cả','38']],statusOpts:['Hieu luc'],
   cols:['Nguoi dung','Phong ban','Đối tác được xem','Pham vi','Cap boi','Trạng thái'],num:[],
   rows:[
    ['Le Thi Trang','Phong XNK','Nhóm KH xuất khẩu','Theo nhom','Admin','s2|Hieu luc'],
    ['Tran Thi Ha','Phòng Vận tải','Nha thau VC','Theo loai','Admin','s2|Hieu luc'],
    ['Pham Van Tu','Phòng Vận tải','3 NCC được gan','Theo dong','Trưởng phòng','s2|Hieu luc'],
   ]},
  {id:'sysduyet',code:'SYS_DUYET',crumb:'DUYET NHIEU CAP',grp:'HE THONG',title:'Duyệt nhiều cấp',desc:'Cau hinh luong duyệt nhiều cấp (Nhân viên - TP - Giám đốc) theo quy trình và han muc.',addBtn:'Tạo luong duyet',tableTitle:'Luong duyet',
   kpis:[['t','diagram-3','Luong duyet','12','luong','eq','đang ap dung',''],['a','check2-circle','Chờ duyệt','27','muc','dn','cần xử lý',''],['s','layers','Cap toi da','3','cap','eq','NV-TP-GD',''],['h','clock','TB thoi gian','4.2','gio','up','-0.6h','cai thien']],
   tabs:[['all','Tất cả','12']],statusOpts:['Hieu luc'],
   cols:['Quy trinh','Cap 1','Cap 2','Cap 3','Han muc','Trạng thái'],num:[],
   rows:[
    ['Hợp đồng','Trưởng phòng','Giám đốc','--','Khong gioi han','s2|Hieu luc'],
    ['DNTT','Ke toan','Trưởng phòng','Giám đốc','> 500 tr','s2|Hieu luc'],
    ['Quyết toán VT','Trưởng phòng','Giám đốc','--','> 100 tr','s2|Hieu luc'],
    ['Phieu chi','Ke toan','Trưởng phòng','--','< 100 tr','s2|Hieu luc'],
   ]},
  {id:'systracklog',code:'SYS_TRACKLOG',crumb:'NHAT KY THAY DOI',grp:'HE THONG',title:'Nhật ký thay đổi',desc:'Nhat ky audit các thao tác tạo / sua / xoa tren toan hệ thống.',addBtn:'Xuat nhật ký',tableTitle:'Nhat ky hệ thống',
   kpis:[['t','journal-text','Su kien hom nay','1,284','log','up','+8%','so với hôm qua'],['a','pencil','Sửa','486','log','eq','hom nay',''],['s','plus-circle','Tạo mới','642','log','eq','hom nay',''],['h','trash','Xoa','12','log','dn','can ra soat','']],
   tabs:[['all','Tất cả','1284'],['tao','Tạo mới','642'],['sua','Sửa','486'],['xoa','Xoa','12']],statusOpts:['Tạo mới','Sửa','Xoa'],
   cols:['Thoi gian','Nguoi dung','Hanh dong','Doi tuong','Truoc','Sau','Trạng thái'],num:[],
   rows:[
    ['03/06 08:41','Le Thi Trang','Sửa','DH-2026-0319','Chờ làm hàng','Đang làm hàng','s4|Sửa'],
    ['03/06 08:36','Tran Thi Ha','Tạo mới','BG-2026-0455','--','Da bàn giao','s2|Tạo mới'],
    ['03/06 08:20','Pham Van Tu','Xoa','PN-2026-0770','Nhap nham','--','s8|Xoa'],
    ['03/06 08:05','Nguyễn An','Sửa','DNTT-2026-0487','Chờ duyệt','Đã duyệt','s4|Sửa'],
   ]},
  ];
  DM.forEach(B);

  // ===== BAO CAO (hub) =====
  const content=document.querySelector('.content');
  if(content){
    const sec=document.createElement('div');
    sec.className='page'; sec.setAttribute('data-page','baocao');
    const pill=s=>{const i=s.indexOf('|');return `<span class="pill ${s.slice(0,i)}"><span class="d"></span>${s.slice(i+1)}</span>`;};
    const kpiCard=k=>`<div class="kpi"><div class="top"><div class="ic ${k[0]}"><i class="bi bi-${k[1]}"></i></div><div class="lbl">${k[2]}</div></div><div class="val">${k[3]}${k[4]?`<span style="font-size:12px;color:var(--ink4);font-weight:400;margin-left:3px">${k[4]}</span>`:''}</div><div class="delta"><span class="chip ${k[5]||'eq'}">${k[6]||'Tháng 6/2026'}</span></div></div>`;
    const hubKpis=[['t','currency-dollar','Doanh thu tháng','248.6','ty','up','+11%'],['a','graph-up-arrow','Lai gop','38.4','ty','up','+9%'],['s','arrow-down-left','Công nợ phải thu','86.4','ty','dn','-4%'],['h','box-seam','San luong XK','142','nghin tan','up','+6%']];
    const cats=[['speedometer2','Tien độ tàu bien','Tiến độ xếp hàng từng tau','tiendotau'],['water','Nhật ký sà lan','Lich su điều độ, van chuyển sa lan','nhatkysalan'],['bar-chart','San luong dong hang','San luong theo ngày','sanluong'],['exclamation-triangle','Sự cố & tổn thất','Báo rách vỏ, tổn thất','sucoton'],['truck','Chi phi van tai','Chi phi theo tuyen, nha thau','chiphivt'],['arrow-down-left','Công nợ phải thu','Tuoi no, đối tác, quá hạn','tuoino'],['calendar-check','Tiến độ thanh toán','DNTT, da/chờ chi','tiendott'],['cash-stack','Dòng tiền','Thu/chi theo ky','dongtien'],['graph-up','Lãi/lỗ lô hàng','Hieu qua từng lo XK/ND','lailo'],['arrow-left-right','Giao hang ↔ Hóa đơn','Đối chiếu KL giao và hoa đơn','giaohd'],['receipt','Thue & hoan thuế XNK','Thue NK, hoan thuế XK','thue'],['file-earmark-check','Quyết toán NCC','Đối chiếu, quyết toán NCC','qtncc'],['bag','Vỏ bao','Dat/cap/thieu/quyết toán vỏ bao','vobao']];
    const revBars=[['T1',182],['T2',198],['T3',221],['T4',206],['T5',224],['T6',248]];
    const REPORTS={
      tiendotau:{title:'Báo cáo tiến độ tàu biển',kpis:[['t','tsunami','Tau đang xếp','2','tau'],['a','speedometer2','KL da xep','48,240','tan'],['s','clock-history','NOR cho','2','tau']],view:{type:'table',cols:['Tau bien','Lo','KL kế hoạch','Da xep','%','NOR tendered','Trạng thái'],num:[2,3],rows:[['MV Ocean Star','LO-2026-019','22,000','18,640','85%','01/06 08:00','s4|Đang xep'],['MV Blue Sky','LO-2026-018','16,000','15,200','95%','31/05 06:00','s2|Sap hoan thanh'],['MV Sea Dragon','LO-2026-016','24,000','14,400','60%','29/05 09:00','s4|Đang xep']]}},
      nhatkysalan:{title:'Nhật ký sà lan',kpis:[['t','water','Chuyen trong thang','86','chuyen'],['a','box-seam','KL vận chuyển','64,800','tan']],view:{type:'table',cols:['Ngay','Sa lan','Tuyến','KL (tan)','Đơn hàng','Trạng thái'],num:[3],rows:[['03/06','SL Truong Thanh 06','Cam Pha - QN','1,205','DH-2026-0319','s2|Đã giao'],['03/06','SL Hoang Ha 12','Hai Phong - QN','978','DH-2026-0318','s2|Đã giao'],['02/06','SL Minh Phu 03','Cam Pha - QN','760','DH-2026-0316','s4|Đang VC'],['02/06','SL Truong Thanh 09','Cam Pha - QN','1,096','DH-2026-0319','s2|Đã giao']]}},
      sanluong:{title:'San luong dong hang theo ngày',kpis:[['t','bar-chart','Luy ke tau','18,640','tan'],['a','speedometer','Toc do TB','3,100','tan/ngày']],view:{type:'bars',label:'San luong dong (tan/ngày)',bars:[['29/05',3420],['30/05',2980],['31/05',2760],['01/06',3420],['02/06',2980],['03/06',3240]]}},
      sucoton:{title:'Sự cố & tổn thất',kpis:[['t','exclamation-triangle','So vu','18','vu'],['a','graph-down','KL tổn thất','28.6','tan'],['s','cash-stack','Giá trị','-230','tr']],view:{type:'table',cols:['Loai sự cố','So vu','KL tổn thất (tan)','Giá trị','Don vi chiu','Trạng thái'],num:[1,2],rows:[['Báo rách vỏ','8','10.2','-82 tr','Nha thau VC','s4|Đang xử lý'],['Roi vai khi xuc','3','4.8','-38 tr','Don vi xuc dao','s2|Da xu ly'],['Am uot ham','2','5.2','-42 tr','Bao hiem','s4|Đang doi'],['Hao hut dỡ món','5','8.4','-68 tr','Theo dõi','s2|Trong nguong']]}},
      chiphivt:{title:'Chi phi van tai',kpis:[['t','truck','Tổng chuyen','78','chuyen'],['a','wallet2','Chi phi','-7.56','ty']],view:{type:'table',cols:['Tuyến','So chuyen','KL (tan)','Chi phi','Đơn giá TB','Trạng thái'],num:[1,2],rows:[['Cam Pha - QN','42','52,400','-3.25 ty','62,000/tan','s2|Da QT'],['Hai Phong - QN','28','28,600','-1.94 ty','68,000/tan','s2|Da QT'],['QN - Da Nang','8','12,800','-2.37 ty','185,000/tan','s4|Chờ QT']]}},
      tuoino:{title:'Công nợ phải thu — Tuoi no',kpis:[['t','arrow-down-left','Phai thu','86.4','ty'],['h','exclamation-triangle','Qua han','8.2','ty'],['s','x-octagon','No xau','1.24','ty']],view:{type:'table',cols:['Đối tác','Tổng no','0-30 ngày','31-60 ngày','>60 ngày','Qua han','Trạng thái'],num:[1,2,3,4,5],rows:[['Cty CP Xi măng Hạ Long','6.6 ty','5.2 ty','0.72 ty','0.68 ty','680 tr','s4|Theo dõi'],['Cty TNHH VLXD Sai Gon','1.24 ty','0','0','1.24 ty','1.24 ty','s8|No xau'],['Vinaconex X1','1.9 ty','1.9 ty','0','0','0','s2|Tot'],['Tổng CTy XNK Mien Bac','1.84 ty','1.84 ty','0','0','0','s2|Tot']]}},
      tiendott:{title:'Tiến độ thanh toán',kpis:[['t','calendar-check','DNTT thang','65.0','ty'],['a','check2-circle','Da chi','48.0','ty']],view:{type:'table',cols:['Tuan','Tổng DNTT','Da chi','Con lai','% hoan thanh','Trạng thái'],num:[1,2,3],rows:[['Tuan 1','18.4 ty','16.2 ty','2.2 ty','88%','s2|Tot'],['Tuan 2','22.6 ty','19.8 ty','2.8 ty','88%','s2|Tot'],['Tuan 3','14.2 ty','9.6 ty','4.6 ty','68%','s4|Cham'],['Tuan 4','9.8 ty','2.4 ty','7.4 ty','24%','s4|Đang chi']]}},
      dongtien:{title:'Dòng tiền (cash flow)',kpis:[['t','arrow-down-circle','Thu 6 thang','1,196','ty'],['a','arrow-up-circle','Chi 6 thang','1,047','ty'],['s','wallet2','Rộng','+149','ty']],view:{type:'table',cols:['Thang','Thu','Chi','Dòng tiền rong','Trạng thái'],num:[1,2,3],rows:[['T1','162 ty','148 ty','+14 ty','s2|Duong'],['T2','178 ty','156 ty','+22 ty','s2|Duong'],['T3','198 ty','172 ty','+26 ty','s2|Duong'],['T4','186 ty','168 ty','+18 ty','s2|Duong'],['T5','224 ty','198 ty','+26 ty','s2|Duong'],['T6','248 ty','205 ty','+43 ty','s2|Duong']]}},
      lailo:{title:'Lai/lo theo lô hàng',kpis:[['t','graph-up','Lai gop thang','38.4','ty'],['a','percent','Bien TB','15.4','%']],view:{type:'table',cols:['Lo / Đơn hàng','Doanh thu','Gia von','Chi phi','Lai/lo','Bien %'],num:[1,2,3,4],rows:[['LO-2026-019','2.40 ty','1.92 ty','0.18 ty','+0.30 ty','12.5%'],['LO-2026-018','1.72 ty','1.38 ty','0.12 ty','+0.22 ty','12.8%'],['LO-2026-016','3.50 ty','2.86 ty','0.34 ty','+0.30 ty','8.6%'],['LO-2026-014','0.96 ty','0.82 ty','0.10 ty','+0.04 ty','4.2%']]}},
      giaohd:{title:'Đối chiếu giao hàng ↔ hoa đơn',kpis:[['t','arrow-left-right','Don đối chiếu','4','đơn'],['h','exclamation-triangle','Lech','1','đơn']],view:{type:'table',cols:['Đơn hàng','Khách hàng','Đã giao (tan)','Hóa đơn (tan)','Chenh','%','Trạng thái'],num:[2,3,4],rows:[['DH-2026-0312','TCC — Đài Loan','2,400','2,360','-40','-1.67%','s8|Lech'],['DH-2026-0319','TCC — Đài Loan','5,000','5,000','0','0%','s2|Khop'],['DH-2026-0318','CNBM — Trung Quốc','3,200','3,200','0','0%','s2|Khop'],['DH-2026-0316','Chip Mong Insee — Campuchia','8,000','7,960','-40','-0.50%','s2|Trong nguong']]}},
      thue:{title:'Thue & hoan thuế XNK',kpis:[['t','receipt','Phải nộp','5.76','ty'],['a','check2-circle','Da nop','4.88','ty'],['s','arrow-counterclockwise','Hoan thue','1.24','ty']],view:{type:'table',cols:['Loai thue','Phải nộp','Da nop','Hoan','Con lai','Trạng thái'],num:[1,2,3,4],rows:[['Thue NK','3.84 ty','2.96 ty','0','0.88 ty','s4|Con phai nop'],['VAT NK','1.92 ty','1.92 ty','0','0','s2|Da nop'],['Hoan thuế XK','0','0','1.24 ty','-1.24 ty','s4|Đang hoan']]}},
      qtncc:{title:'Quyết toán nhà cung cấp',kpis:[['t','file-earmark-check','Lo QT','22','lo'],['a','currency-dollar','Giá trị QT','86.4','ty']],view:{type:'table',cols:['NCC / Nhà máy','KL đối chiếu (tan)','Da QT (tan)','Chenh','Giá trị QT','Trạng thái'],num:[1,2],rows:[['NM Xi mang Ha Long','4,980','4,980','-20','2.40 ty','s2|Da QT'],['NM Bim Son','3,176','3,176','-24','1.72 ty','s4|Đang đối chiếu'],['NCC Thạch cao Lao','4,580','4,580','-20','1.88 ty','s2|Da QT'],['NM Mien Bac','5,948','5,948','-52','3.18 ty','s4|Đang đối chiếu']]}},
      vobao:{title:'Báo cáo vỏ bao',kpis:[['t','bag','SL can','436,000','cai'],['h','exclamation-triangle','Thieu','72,000','cai']],view:{type:'table',cols:['Đơn hàng','Nhà máy','Loai','SL can','Da cap','Thieu','Trạng thái'],num:[3,4,5],rows:[['DH-2026-0319','NM Ha Long','PP 50kg','100,000','100,000','0','s2|Da QT'],['DH-2026-0318','NM Bim Son','GI 50kg','64,000','64,000','0','s4|Đang dong'],['DH-2026-0316','NM Mien Bac','PP 50kg','160,000','140,000','20,000','s8|Thieu'],['DH-2026-0317','NM Hoang Long','PP 25kg','112,000','60,000','52,000','s8|Thieu']]}},
    };
    function tableHtml(v){
      const last=v.cols.length-1, num=new Set(v.num||[]);
      const ths=v.cols.map((c,i)=>`<th${i===0?' style="padding-left:14px"':i===last?' style="padding-right:14px"':''}>${c}</th>`).join('');
      const trs=v.rows.map(r=>`<tr>${r.map((cell,i)=>i===0?`<td style="padding-left:14px"><span class="oid">${cell}</span></td>`:i===last?`<td style="padding-right:14px">${pill(cell)}</td>`:`<td class="${num.has(i)?'vnum':''}"${/^-/.test(cell)?' style="color:var(--err)"':''}>${cell}</td>`).join('')}</tr>`).join('');
      return `<div style="padding:0 4px 4px"><table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
    }
    function barsHtml(v){
      const mx=Math.max(...v.bars.map(b=>b[1]));
      return `<div style="padding:18px;display:flex;align-items:flex-end;gap:14px;height:220px">${v.bars.map(b=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px"><div style="font-size:var(--fs3);color:var(--ink3)">${b[1].toLocaleString('en-US')}</div><div style="width:56%;background:var(--pri);border-radius:4px 4px 0 0;height:${Math.round(b[1]/mx*150)+10}px"></div><div style="font-size:var(--fs3);color:var(--ink4)">${b[0]}</div></div>`).join('')}</div>`;
    }
    sec.innerHTML=`
      <div class="phdr"><div class="left"><div class="eyebrow">RPT_* · BAO CAO</div><h2>Báo cáo &amp; Phân tích</h2><p class="sub">Trung tam 13 báo cáo vận hành và tại chính — chon mot báo cáo để xem chi tiết (tuần/tháng theo chuyển &amp; NCC).</p></div>
        <div class="right"><button class="tbtn"><i class="bi bi-calendar3"></i> Tháng 6/2026</button><div class="ico" title="Xuat Excel"><i class="bi bi-file-earmark-spreadsheet"></i></div></div></div>
      <div class="bc-body"></div>`;
    content.appendChild(sec);
    const body=sec.querySelector('.bc-body');
    function renderHub(){
      const mx=Math.max(...revBars.map(b=>b[1]));
      body.innerHTML=`
        <div class="kpis">${hubKpis.map(kpiCard).join('')}</div>
        <div class="card" style="margin-bottom:14px"><div class="chd"><h3>Doanh thu 6 thang (ty dong)</h3><span class="small">Luy ke 1,279 ty</span></div>
          <div style="padding:18px 18px 14px;display:flex;align-items:flex-end;gap:14px;height:210px">${revBars.map(b=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px"><div style="font-size:var(--fs3);color:var(--ink3)">${b[1]}</div><div style="width:60%;background:var(--pri);border-radius:4px 4px 0 0;height:${Math.round(b[1]/mx*150)+10}px"></div><div style="font-size:var(--fs3);color:var(--ink4)">${b[0]}</div></div>`).join('')}</div></div>
        <div class="card"><div class="chd"><h3>Danh mục báo cáo</h3><span class="small">13 báo cáo · click để xem</span></div>
          <div style="padding:14px;display:flex;flex-wrap:wrap;gap:12px">${cats.map(c=>`<div class="bc-tile" data-key="${c[3]}" style="flex:1 1 240px;min-width:240px;border:1px solid var(--line);border-radius:8px;padding:14px;background:var(--bg);cursor:pointer" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,.08)'" onmouseout="this.style.boxShadow='none'"><div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><div class="ic t" style="width:30px;height:30px;border-radius:6px;display:grid;place-items:center"><i class="bi bi-${c[0]}"></i></div><div style="font-weight:600">${c[1]}</div></div><div style="font-size:var(--fs3);color:var(--ink3)">${c[2]}</div></div>`).join('')}</div></div>`;
      body.querySelectorAll('.bc-tile').forEach(t=>t.addEventListener('click',()=>switchPage('baocao',{rpt:t.dataset.key})));
    }
    function reportBlock(key){
      const r=REPORTS[key]; if(!r) return '';
      return `${r.kpis?`<div class="kpis">${r.kpis.map(kpiCard).join('')}</div>`:''}
        <div class="card" style="margin-bottom:14px"><div class="chd"><h3>${r.title}</h3><div class="right"><a class="cardlink">Xuat Excel <i class="bi bi-download"></i></a></div></div>
          ${r.view.type==='bars'?barsHtml(r.view):tableHtml(r.view)}</div>`;
    }
    function renderReport(key){
      const r=REPORTS[key]; if(!r){renderHub();return;}
      body.innerHTML=`
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px"><button type="button" class="m-btn-secondary bc-back"><i class="bi bi-arrow-left"></i> Danh mục báo cáo</button><h2 style="font-size:18px">${r.title}</h2><span style="margin-left:auto;font-size:var(--fs3);color:var(--ink4)">Ky: Tháng 6/2026</span></div>
        ${reportBlock(key)}`;
      body.querySelector('.bc-back').onclick=renderHub;
    }
    function renderReports(keys){
      const validKeys=keys.filter(k=>REPORTS[k]);
      if(!validKeys.length){renderHub();return;}
      const title=validKeys.length===1?REPORTS[validKeys[0]].title:validKeys.map(k=>REPORTS[k].title).join(' · ');
      body.innerHTML=`
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px"><button type="button" class="m-btn-secondary bc-back"><i class="bi bi-arrow-left"></i> Danh mục báo cáo</button><h2 style="font-size:18px">${title}</h2><span style="margin-left:auto;font-size:var(--fs3);color:var(--ink4)">Ky: Tháng 6/2026</span></div>
        ${keys.map(k=>reportBlock(k)).join('')}`;
      body.querySelector('.bc-back').onclick=renderHub;
    }
    window.__openBaocaoHub=renderHub;
    window.__openBaocaoReport=function(spec){
      const keys=String(spec).split(',').map(s=>s.trim()).filter(Boolean);
      if(keys.length===1) renderReport(keys[0]);
      else renderReports(keys);
    };
    renderHub();
  }
})();
