// ===== A+B for ORIGINAL transactional screens (flow strip + phong phụ trach) =====
(function(){
  const fs=window.buildFlowStrip; if(!fs) return;
  const SR=window.__STEP_ROLE||{}; const chainStr=window.__apprChainStr||(a=>['NV',...a].join(' → '));
  const ORIG={ hopdong:1, phuluc:1, donhang:1, chitietdonhang:1, phanbonhmay:2, vobao:2, chuyentau:3, phieusalan:3, khvcnoidia:3 };
  Object.entries(ORIG).forEach(([pid,step])=>{
    const sec=document.querySelector(`.page[data-page="${pid}"]`); if(!sec) return;
    const role=SR[step]||{nguoi:'--',appr:[]};
    // dept line in header
    const left=sec.querySelector('.phdr .left');
    if(left && !left.querySelector('.dept-line')){
      const d=document.createElement('div');
      d.className='dept-line';
      d.style.cssText='margin-top:6px;font-size:var(--fs3);color:var(--ink3)';
      d.innerHTML=`<i class="bi bi-person-badge"></i> Người thực hiện: <b style="color:var(--ink2)">${role.nguoi}</b>${role.appr.length?` &nbsp;·&nbsp; <i class="bi bi-diagram-3"></i> Phê duyệt: <b style="color:var(--ink2)">${chainStr(role.appr)}</b>`:''}`;
      left.appendChild(d);
    }
    // flow strip after kpis (or after phdr)
    if(!sec.querySelector('.m-chain-wrap')){
      const anchor=sec.querySelector('.kpis')||sec.querySelector('.phdr');
      if(anchor){
        anchor.insertAdjacentHTML('afterend', fs(step));
        const wrap=anchor.nextElementSibling;
        wrap && wrap.querySelectorAll('.m-chain-step:not(.active)').forEach(st=>st.addEventListener('click',()=>switchPage(st.dataset.go)));
      }
    }
  });
})();
