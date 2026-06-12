// ===== Muc 6: VONG DOI VO BAO (dat -> thieu/bổ sung -> quyết toán -> hoa đơn ban vỏ bao) =====
(function(){
  const content=document.querySelector('.content'); if(!content) return;
  const pill=s=>{const i=s.indexOf('|');return `<span class="pill ${s.slice(0,i)}"><span class="d"></span>${s.slice(i+1)}</span>`;};
  const kpiHtml=k=>`<div class="kpi"><div class="top"><div class="ic ${k[0]}"><i class="bi bi-${k[1]}"></i></div><div class="lbl">${k[2]}</div></div><div class="val">${k[3]}${k[4]?`<span style="font-size:12px;color:var(--ink4);font-weight:400;margin-left:3px">${k[4]}</span>`:''}</div><div class="delta"><span class="chip ${k[5]||'eq'}">${k[6]||''}</span></div></div>`;
  const fmt=n=>n.toLocaleString('en-US');
  // can = SL vỏ bao can theo KL dong; cap = da cap/giao NM; dong = da dong tại NM
  const VBLC=[
   {dh:'DH-2026-0319',nm:'NM Ha Long',loai:'Vỏ bao PP 50kg',can:100000,cap:100000,dong:98800,datCode:'VB-DAT-2026-019',qtCode:'QT-VB-2026-0019',hdCode:'HD-VB-00451',status:'s2|Da quyết toán'},
   {dh:'DH-2026-0318',nm:'NM Bim Son',loai:'Vỏ bao GI 50kg',can:64000,cap:64000,dong:63200,datCode:'VB-DAT-2026-018',qtCode:'',hdCode:'',bosungFrom:'',status:'s4|Du - đang dong'},
   {dh:'DH-2026-0316',nm:'NM Mien Bac',loai:'Vỏ bao PP 50kg',can:160000,cap:140000,dong:120000,datCode:'VB-DAT-2026-016',qtCode:'',hdCode:'',bosungFrom:'NM Ha Long',status:'s8|Thieu - can bổ sung'},
   {dh:'DH-2026-0317',nm:'NM Hoang Long',loai:'Vỏ bao PP 25kg',can:112000,cap:60000,dong:42000,datCode:'VB-DAT-2026-017',qtCode:'',hdCode:'',bosungFrom:'NM Sai Gon',status:'s8|Thieu - can bổ sung'},
  ];
  const sec=document.createElement('div'); sec.className='page'; sec.setAttribute('data-page','vobao360');
  sec.innerHTML=`
    <div class="phdr"><div class="left"><div class="eyebrow">SYS_VOBAO_LC · GIAO DICH</div><h2>Vong doi vỏ bao — <b>dat &rarr; bổ sung &rarr; quyết toán</b></h2><p class="sub">Theo dõi vỏ bao theo đơn hàng: dat theo mau ma &rarr; cap NM dong goi &rarr; thieu thi luân chuyển/cap bổ sung từ NM khac &rarr; quyết toán &rarr; hoa đơn ban vỏ bao.</p></div>
      <div class="right"><button class="tbtn"><i class="bi bi-plus-lg"></i> Tạo đơn dat vỏ bao</button><div class="ico" title="Xuat Excel"><i class="bi bi-file-earmark-spreadsheet"></i></div></div></div>
    <div class="kpis vb-kpis"></div>
    <div class="card"><div class="chd"><h3>Theo dõi vỏ bao theo đơn hàng</h3><span class="small" style="color:var(--ink4)">Click dong để xem vong doi &amp; xu ly bổ sung</span></div>
      <div style="padding:0 4px 4px"><table><thead><tr><th style="padding-left:14px">Đơn hàng</th><th>NM dong goi</th><th>Loai vỏ bao</th><th>SL can</th><th>Da cap NM</th><th>Da dong</th><th>Thieu / Bo sung</th><th style="padding-right:14px">Trạng thái</th></tr></thead><tbody class="vb-tbody"></tbody></table></div></div>`;
  content.appendChild(sec);
  PAGE_MAP['SYS_VOBAO_LC']='vobao360'; CRUMB_MAP['vobao360']='VONG DOI VO BAO';
  const tbody=sec.querySelector('.vb-tbody'); const kbox=sec.querySelector('.vb-kpis');

  function openVbModal(v){
    const thieu=Math.max(v.can-v.cap,0);
    const stages=[
      [1,'Dat vỏ bao (theo mau ma)',`${v.datCode} · ${v.loai} · ${fmt(v.can)} cai`,'Bộ phận Vỏ bao','s2|Da dat','vobaodat'],
      [2,'Cap / giao nhà máy',`${fmt(v.cap)} cai → ${v.nm}`,'Bộ phận Vỏ bao','s2|Da cap','vobao'],
      [3,'Đóng tại nhà máy',`${fmt(v.dong)} cai`,v.nm,(v.dong>=v.can?'s2|Da dong du':'s4|Đang dong'),null],
    ];
    if(thieu>0) stages.push([4,'Thieu &rarr; Luan chuyển / Cap bổ sung',`${fmt(thieu)} cai (luân chuyển từ ${v.bosungFrom||'NM khac'})`,'Phòng Mua bán hàng','s8|Can bổ sung','vobao']);
    stages.push([5,'Quyết toán vỏ bao',v.qtCode||'(chưa quyết toán)','Bộ phận Vỏ bao',(v.qtCode?'s2|Da quyết toán':'s4|Chờ quyết toán'),'quyettoanvobao']);
    stages.push([6,'Hóa đơn ban vỏ bao',v.hdCode||'(chưa xuat)','Phòng Kế toán',(v.hdCode?'s2|Đã xuất':'s4|Chờ xuất'),'hoađơn']);
    const f=(l,vv)=>`<div class="m-field"><div class="m-label">${l}</div><div class="m-value">${vv}</div></div>`;
    const stepHtml=stages.map(s=>{
      const done=s[4].startsWith('s2'),warn=s[4].startsWith('s8');
      const col=warn?'var(--err2)':done?'var(--ok2)':'var(--acc3)',fg=warn?'var(--err)':done?'var(--ok)':'var(--acc)';
      const go=s[5]?`<button class="m-btn-secondary vb-go" data-go="${s[5]}" style="flex:0 0 auto"><i class="bi bi-box-arrow-up-right"></i></button>`:'';
      return `<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--line)">
        <div style="flex:0 0 30px"><div style="width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:${col};color:${fg};font-weight:700">${s[0]}</div></div>
        <div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><b>${s[1]}</b> ${pill(s[4])}</div><div style="font-size:var(--fs2);color:var(--ink2);margin-top:2px">${s[2]}</div><div style="font-size:var(--fs3);color:var(--ink4)"><i class="bi bi-person-badge"></i> ${s[3]}</div></div>
        ${go}</div>`;
    }).join('');
    const bosungBtn=thieu>0?`<button class="tbtn" style="background:var(--acc)"><i class="bi bi-arrow-left-right"></i> Tạo lệnh luân chuyển/bổ sung (${fmt(thieu)} cai)</button>`:'';
    const loBtn=window.openLotDossier&&window.isXkDh?.(v.dh)?`<button class="m-btn-secondary vb-lo"><i class="bi bi-diagram-3"></i> Hồ sơ lô XK</button>`:'';
    modalOverlay.innerHTML=`
      <div class="modal wide">
        <div class="modal-hd"><div class="m-icon dh" style="background:#F3EEFF;color:#7C3AED"><i class="bi bi-bag"></i></div>
          <div class="m-titles"><div class="m-code">${v.dh}</div><div class="m-sub">Vong doi vỏ bao · ${v.nm}</div></div>
          <div class="m-close" onclick="closeModal()"><i class="bi bi-x-lg"></i></div></div>
        <div class="modal-bd">
          <div class="m-section"><div class="m-section-title">Tổng hop vỏ bao</div><div class="m-grid">${f('Đơn hàng',v.dh)}${f('NM dong goi',v.nm)}${f('Loai vỏ bao',v.loai)}${f('SL can',fmt(v.can)+' cai')}${f('Da cap NM',fmt(v.cap)+' cai')}${f('Da dong',fmt(v.dong)+' cai')}${f('Thieu / can bổ sung',(thieu>0?'<b style="color:var(--err)">'+fmt(thieu)+' cai</b>':'0'))}${f('Trạng thái',pill(v.status))}</div></div>
          <div class="m-section"><div class="m-section-title">Vong doi chứng từ vỏ bao</div><div>${stepHtml}</div></div>
          <div class="m-actions">${bosungBtn}${loBtn}<button class="m-btn-secondary"><i class="bi bi-printer"></i> In</button><button class="m-btn-secondary m-close-btn" style="margin-left:auto"><i class="bi bi-x-lg"></i> Đóng</button></div>
        </div></div>`;
    modalOverlay.classList.add('open'); document.body.style.overflow='hidden';
    modalOverlay.querySelector('.m-close-btn').onclick=closeModal;
    modalOverlay.querySelectorAll('.vb-go').forEach(b=>b.addEventListener('click',()=>{closeModal();switchPage(b.dataset.go);}));
    const lo=modalOverlay.querySelector('.vb-lo'); if(lo)lo.onclick=()=>{closeModal();window.openLotDossier(v.dh);};
  }
  function render(){
    const sumCan=VBLC.reduce((a,v)=>a+v.can,0), sumCap=VBLC.reduce((a,v)=>a+v.cap,0);
    const sumThieu=VBLC.reduce((a,v)=>a+Math.max(v.can-v.cap,0),0), nThieu=VBLC.filter(v=>v.can-v.cap>0).length;
    kbox.innerHTML=[['t','bag','SL vỏ bao can',fmt(sumCan),'cai','eq','theo đơn hàng'],['a','box-seam','Da cap NM',fmt(sumCap),'cai','eq','dong goi'],['h','exclamation-triangle','Thieu - can bổ sung',fmt(sumThieu),'cai','dn',nThieu+' đơn hàng'],['s','receipt','Quyết toán / Hóa đơn',VBLC.filter(v=>v.qtCode).length,'lo','eq','ban vỏ bao']].map(kpiHtml).join('');
    tbody.innerHTML='';
    VBLC.forEach(v=>{
      const thieu=Math.max(v.can-v.cap,0);
      const tr=document.createElement('tr'); tr.style.cursor='pointer';
      tr.innerHTML=`<td style="padding-left:14px"><span class="oid">${v.dh}</span></td><td>${v.nm}</td><td>${v.loai}</td><td class="vnum">${fmt(v.can)}</td><td class="vnum">${fmt(v.cap)}</td><td class="vnum">${fmt(v.dong)}</td><td class="vnum"${thieu>0?' style="color:var(--err);font-weight:600"':''}>${thieu>0?fmt(thieu):'0'}</td><td style="padding-right:14px">${pill(v.status)}</td>`;
      tr.addEventListener('click',()=>openVbModal(v));
      tbody.appendChild(tr);
    });
  }
  render();
})();
