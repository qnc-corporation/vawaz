// ===== Muc 3: DOI CHIEU CHENH LECH DAU VAO <-> DAU RA =====
(function(){
  const content=document.querySelector('.content'); if(!content) return;
  const pill=s=>{const i=s.indexOf('|');return `<span class="pill ${s.slice(0,i)}"><span class="d"></span>${s.slice(i+1)}</span>`;};
  const kpiHtml=k=>`<div class="kpi"><div class="top"><div class="ic ${k[0]}"><i class="bi bi-${k[1]}"></i></div><div class="lbl">${k[2]}</div></div><div class="val">${k[3]}${k[4]?`<span style="font-size:12px;color:var(--ink4);font-weight:400;margin-left:3px">${k[4]}</span>`:''}</div><div class="delta"><span class="chip ${k[5]||'eq'}">${k[6]||'Nguong ±0.5%'}</span></div></div>`;
  // Nguong cảnh báo chenh lech: 0.5% (kiem soat chat che đầu vào <-> đầu ra theo QT 01-VT B5.1)
  const TABS=[
   {key:'momon',label:'Dau vao ↔ Dau ra (dỡ món)',desc:'So sanh KL qua can đầu vào với KL dỡ món nuoc tàu biển (đầu ra). Vuot nguong ±0.5% => yeu cau dỡ món lai.',
    cols:['Lo / Đơn hàng','Sản phẩm','KL qua can (đầu vào)','KL dỡ món tau (đầu ra)','Chênh (tan)','%','Nguong','Trạng thái'],num:[2,3,4,5],
    rows:[
     ['LO-2026-019 · DH-2026-0319','Clinker','5,020','4,996','-24','-0.48%','±0.5%','s2|Trong nguong'],
     ['LO-2026-018 · DH-2026-0318','Clinker','3,210','3,176','-34','-1.06%','±0.5%','s8|Vuot nguong'],
     ['LO-2026-016 · DH-2026-0316','Clinker','8,040','7,988','-52','-0.65%','±0.5%','s8|Vuot nguong'],
     ['DH-2026-0317','Xi măng PCB40','2,810','2,800','-10','-0.36%','±0.5%','s2|Trong nguong'],
    ]},
   {key:'cinv',label:'Phiếu cân ↔ Hóa đơn',desc:'So sanh KL tren phiếu cân hang (BM13-04-03) với KL xuất hoa đơn. Chênh lệch => kiểm tra lại phiếu cân.',
    cols:['Lo / Đơn hàng','Phiếu cân (tan)','Hóa đơn (tan)','Chênh (tan)','%','Giá trị chenh','Trạng thái'],num:[1,2,3,4],
    rows:[
     ['DH-2026-0317 · HD-XK-2026-003','25,200','24,800','-400','-1.59%','-12.4 tr','s8|Vuot nguong'],
     ['LO-2026-019 · DH-2026-0319','5,020','5,000','-20','-0.40%','-0.96 tr','s2|Trong nguong'],
     ['LO-2026-018 · DH-2026-0318','3,210','3,200','-10','-0.31%','-0.54 tr','s2|Trong nguong'],
     ['LO-2026-016 · DH-2026-0316','8,040','8,000','-40','-0.50%','-1.92 tr','s2|Trong nguong'],
    ]},
   {key:'ginv',label:'Giao hang ↔ Hóa đơn',desc:'Đối chiếu KL da giao với KL da xuất hoa đơn chờ từng đơn hàng.',
    cols:['Đơn hàng','Khách hàng','Đã giao (tan)','Hóa đơn (tan)','Chênh (tan)','%','Trạng thái'],num:[2,3,4,5],
    rows:[
     ['DH-2026-0312','Cty CP Xi măng Hạ Long','2,400','2,360','-40','-1.67%','s8|Vuot nguong'],
     ['DH-2026-0319','Cty CP Xi măng Hạ Long','5,000','5,000','0','0%','s2|Khop'],
     ['DH-2026-0318','Vinaconex X1','3,200','3,200','0','0%','s2|Khop'],
     ['DH-2026-0316','Cty TNHH VLXD Sai Gon','8,000','7,960','-40','-0.50%','s2|Trong nguong'],
    ]},
  ];
  const sec=document.createElement('div'); sec.className='page'; sec.setAttribute('data-page','doichieu');
  sec.innerHTML=`
    <div class="phdr"><div class="left"><div class="eyebrow">SYS_DOICHIEU_CHENH · KIEM SOAT</div><h2>Đối chiếu chênh lệch đầu vào &harr; đầu ra</h2><p class="sub">Kiem soat chat che muc chenh lệch giữa đầu vào và đầu ra (dỡ món, phiếu cân, hoa đơn) — cảnh báo khi vuot nguong.</p></div>
      <div class="right"><div class="fgroup"><label style="font-size:var(--fs3);color:var(--ink3);margin-right:6px">Nguong:</label><select style="height:32px;border:1px solid var(--line);border-radius:5px;padding:0 8px;background:var(--bg)"><option>±0.5%</option><option>±1.0%</option><option>±0.3%</option></select></div><div class="ico" title="Xuat Excel"><i class="bi bi-file-earmark-spreadsheet"></i></div></div></div>
    <div class="kpis dc-kpis"></div>
    <div class="hd-tabs dc-tabs">${TABS.map((t,i)=>`<button class="${i===0?'on':''}" data-k="${t.key}">${t.label}</button>`).join('')}</div>
    <div class="dc-body"></div>`;
  content.appendChild(sec);
  PAGE_MAP['SYS_DOICHIEU_CHENH']='doichieu'; CRUMB_MAP['doichieu']='DOI CHIEU CHENH LECH';
  const body=sec.querySelector('.dc-body'); const kbox=sec.querySelector('.dc-kpis');

  function openDcModal(tab,r){
    const last=tab.cols.length-1;
    const loCode=(JSON.stringify(r).match(/DH-2026-\d{4}/)||[])[0];
    const fields=tab.cols.map((c,i)=>`<div class="m-field"><div class="m-label">${c}</div><div class="m-value">${i===last?pill(r[i]):r[i]}</div></div>`).join('');
    const vuot=r[last].includes('Vuot');
    const banner=`<div style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:8px;background:${vuot?'var(--err2)':'var(--ok2)'};color:${vuot?'var(--err)':'var(--ok)'};margin-bottom:14px"><i class="bi bi-${vuot?'exclamation-triangle':'check2-circle'}" style="font-size:18px"></i><div><b>${vuot?'Vuot nguong cảnh báo':'Trong nguong chờ phep'}</b><div style="font-size:var(--fs3);opacity:.85">${tab.desc}</div></div></div>`;
    const loBtn=(loCode&&window.openLotDossier&&window.isXkDh?.(loCode))?`<button class="m-btn-secondary m-lo-btn"><i class="bi bi-diagram-3"></i> Hồ sơ lô XK</button>`:'';
    const remon=tab.key==='momon'&&vuot?`<button class="tbtn" style="background:var(--acc)"><i class="bi bi-rulers"></i> Yeu cau dỡ món lai</button>`:'';
    modalOverlay.innerHTML=`
      <div class="modal wide">
        <div class="modal-hd"><div class="m-icon dh" style="background:${vuot?'var(--err2)':'var(--ok2)'};color:${vuot?'var(--err)':'var(--ok)'}"><i class="bi bi-arrow-left-right"></i></div>
          <div class="m-titles"><div class="m-code">${r[0]}</div><div class="m-sub">Đối chiếu: ${tab.label}</div></div>
          <div class="m-close" onclick="closeModal()"><i class="bi bi-x-lg"></i></div></div>
        <div class="modal-bd">${banner}
          <div class="m-section"><div class="m-section-title">Chi tiết đối chiếu</div><div class="m-grid">${fields}</div></div>
          <div class="m-actions">${remon}${loBtn}<button class="m-btn-secondary"><i class="bi bi-printer"></i> In bien ban</button><button class="m-btn-secondary m-close-btn" style="margin-left:auto"><i class="bi bi-x-lg"></i> Đóng</button></div>
        </div></div>`;
    modalOverlay.classList.add('open'); document.body.style.overflow='hidden';
    modalOverlay.querySelector('.m-close-btn').onclick=closeModal;
    const lb=modalOverlay.querySelector('.m-lo-btn'); if(lb)lb.onclick=()=>{closeModal();window.openLotDossier(loCode);};
  }

  function renderTab(key){
    const tab=TABS.find(t=>t.key===key)||TABS[0]; const last=tab.cols.length-1; const num=new Set(tab.num||[]);
    const vuot=tab.rows.filter(r=>r[last].includes('Vuot')).length;
    kbox.innerHTML=[['t','clipboard-data','So đối chiếu',tab.rows.length,'',vuot?'dn':'eq',`${vuot} vuot nguong`],['h','exclamation-triangle','Vuot nguong',vuot,'lo','dn','cần xử lý'],['s','rulers','Nguong cảnh báo','±0.5','%','eq','dỡ món lại nếu vuot'],['a','graph-down','Hao hut','0.7','%','dn','binh quan']].map(kpiHtml).join('');
    const ths=tab.cols.map((c,i)=>`<th${i===0?' style="padding-left:14px"':i===last?' style="padding-right:14px"':''}>${c}</th>`).join('');
    const trs=tab.rows.map(r=>`<tr class="dc-row" style="cursor:pointer">${r.map((cell,i)=>i===0?`<td style="padding-left:14px"><span class="oid">${cell}</span></td>`:i===last?`<td style="padding-right:14px">${pill(cell)}</td>`:`<td class="${num.has(i)?'vnum':''}"${/^-/.test(cell)?' style="color:var(--err)"':''}>${cell}</td>`).join('')}</tr>`).join('');
    body.innerHTML=`<div class="card"><div class="chd"><h3>${tab.label}</h3><span class="small" style="color:var(--ink4)">${tab.desc}</span></div>
      <div style="padding:0 4px 4px"><table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div></div>`;
    body.querySelectorAll('.dc-row').forEach((tr,idx)=>tr.addEventListener('click',()=>openDcModal(tab,tab.rows[idx])));
  }
  sec.querySelectorAll('.dc-tabs button').forEach(b=>b.addEventListener('click',()=>{ sec.querySelectorAll('.dc-tabs button').forEach(x=>x.classList.remove('on')); b.classList.add('on'); renderTab(b.dataset.k); }));
  renderTab('momon');
})();
