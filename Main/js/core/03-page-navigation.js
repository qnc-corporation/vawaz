// ===== PAGE NAVIGATION =====
const PAGE_MAP={
  'DM_HOPDONG':'hopdong',
  'DM_PHULUC_HOPDONG':'phuluc',
  'GD_DONHANG':'donhang',
  'GD_DONHANG_CHITIET':'chitietdonhang',
  'GD_PHANBO_NHAMAY':'phanbonhmay',
  'GD_VOBAO':'vobao',
  'GD_KH_TAU_ME':'chuyentau',
  'GD_DIEUDO_SALAN':'phieusalan',
  'GD_LENH_VC':'khvcnoidia',
  'SYS_CANHBAO':'canhbao',
  'GD_BAOCAO_TIENDO':'dashboard',
  'RPT_TIENDO':'baocao','RPT_SANLUONG':'baocao','RPT_CONGNO':'baocao',
  'RPT_DONGTIEN':'baocao','RPT_GIAOHD':'baocao'
};
const CRUMB_MAP={dashboard:'TỔNG QUAN',hopdong:'HỢP ĐỒNG',phuluc:'PHỤ LỤC HỢP ĐỒNG',donhang:'ĐƠN HÀNG',chitietdonhang:'CHI TIẾT ĐƠN HÀNG',phanbonhmay:'PHÂN BỔ NGUỒN NHÀ MÁY',vobao:'VỎ BAO',chuyentau:'KẾ HOẠCH TÀU MẸ',phieusalan:'ĐIỀU ĐỘ SÀ LAN',khvcnoidia:'LỆNH VẬN CHUYỂN',canhbao:'CẢNH BÁO',baocao:'BÁO CÁO'};

function switchPage(pageId,opts){
  window.__navPage=pageId;
  window.__navRpt=opts?.rpt||'';
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target=document.querySelector(`.page[data-page="${pageId}"]`);
  if(target) target.classList.add('active');
  if(pageId==='baocao'){
    if(opts?.rpt && window.__openBaocaoReport) window.__openBaocaoReport(opts.rpt);
    else if(window.__openBaocaoHub) window.__openBaocaoHub();
  }
  syncNavActive(pageId,opts?.rpt);
  const crumb=document.getElementById('crumb-page');
  if(crumb) crumb.textContent=CRUMB_MAP[pageId]||pageId.toUpperCase();
  document.querySelector('.main').scrollTop=0;
}

// Topbar bell → canhbao page
document.querySelector('.tbi[title="Cảnh báo"]')?.addEventListener('click',()=>switchPage('canhbao'));

// Dashboard KPI cards → navigate
document.getElementById('dash-kpis')?.addEventListener('click',e=>{
  const card=e.target.closest('.kpi[data-go]');
  if(!card) return;
  const go=card.dataset.go;
  if(go.includes(':')){
    const [page,rpt]=go.split(':');
    switchPage(page,{rpt});
  }else switchPage(go);
});
