// ===== SIDEBAR TOGGLE =====
const SB_COLLAPSED_KEY='qnc_sb_collapsed';
function setSidebarCollapsed(collapsed,persist){
  document.body.classList.toggle('sb-collapsed',collapsed);
  const btn=document.getElementById('sbToggle');
  if(btn){
    btn.setAttribute('aria-expanded',String(!collapsed));
    btn.title=collapsed?'Hien menu dieu huong':'Ẩn menu điều hướng';
    const ic=btn.querySelector('i');
    if(ic) ic.className=collapsed?'bi bi-layout-sidebar-inset':'bi bi-layout-sidebar';
  }
  if(persist!==false) localStorage.setItem(SB_COLLAPSED_KEY,collapsed?'1':'0');
}
(function initSidebarToggle(){
  if(localStorage.getItem(SB_COLLAPSED_KEY)==='1') setSidebarCollapsed(true,false);
  document.getElementById('sbToggle')?.addEventListener('click',()=>{
    setSidebarCollapsed(!document.body.classList.contains('sb-collapsed'));
  });
})();
