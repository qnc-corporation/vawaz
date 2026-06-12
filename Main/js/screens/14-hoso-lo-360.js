// ===== Muc 2: HO SO LO HANG 360 — chi ap dung lo XUAT KHAU (ban di) =====
(function(){
  const content=document.querySelector('.content'); if(!content) return;
  const fs=window.buildFlowStrip; const SR=window.__STEP_ROLE||{}; const chainStr=window.__apprChainStr||(a=>['NV',...a].join(' → '));
  const pill=s=>{const i=s.indexOf('|');return `<span class="pill ${s.slice(0,i)}"><span class="d"></span>${s.slice(i+1)}</span>`;};
  const kpiHtml=k=>`<div class="kpi"><div class="top"><div class="ic ${k[0]}"><i class="bi bi-${k[1]}"></i></div><div class="lbl">${k[2]}</div></div><div class="val" style="font-size:16px">${k[3]}</div><div class="delta"><span class="chip eq">${k[4]||'lô XK'}</span></div></div>`;
  const STEPNAME={1:'Hợp đồng & Đơn hàng',2:'Phân bổ nguồn & Vỏ bao',3:'Kế hoạch vận chuyển',4:'Giao nhận tại cảng',5:'Làm hàng',6:'Hải quan & Chứng từ XNK',7:'Hóa đơn, Quyết toán & Chi phí',8:'Công nợ & Dòng tiền'};
  const STEPGO={1:'donhang',2:'phanbonhmay',3:'khvcnoidia',4:'nhanhangcang',5:'domonkiemdem',6:'tokhaihaiquan',7:'quyettoanhang',8:'congno'};
  const LOAI_XK='Xuất khẩu · Bán đi';
  // doc = [step, code, loại chứng từ, người thực hiện, status(sX|text), goto pageId]
  const LO360=[
   {code:'LO-2026-019',dh:'DH-2026-0319',kh:'TCC — Đài Loan',sp:'Clinker',kl:'5,000 tan',gt:'2.40 ty',loai:LOAI_XK,tiendo:85,docs:[
     [1,'HD-XK-2026-001','Hợp đồng đầu ra','Ms Trang — P.XK','s2|Da ky','hopdong'],
     [1,'DH-2026-0319','Đơn hàng bán','Ms Ha — P.XK','s2|Da xác nhận','donhang'],
     [2,'PB-2026-019','Phân bổ nguồn NM Ha Long','Phòng Vận tải','s2|Đã phân bổ','phanbonhmay'],
     [2,'VB-DAT-2026-019','Dat vỏ bao PP 50kg','Bộ phận Vỏ bao','s2|Đã giao NM','vobaodat'],
     [3,'LVC-2026-0319','Lệnh vận chuyển (sa lan)','NV điều độ P.VT','s2|Da dieu','khvcnoidia'],
     [4,'PC-2026-0782','Phiếu cân hàng (BM13-04-03)','NV giao nhan P.VT','s2|Da xác nhận','phiếucan'],
     [4,'BG-2026-0455','Bàn giao sà lan (niêm chi)','NV giao nhan P.VT','s2|Da bàn giao','bangiaosalan'],
     [5,'LX-2026-0091','Dỡ món & kiểm đếm','NV giám sát XH QN','s2|Khop','domonkiemdem'],
     [6,'105xxxxxxx1','Tờ khai hải quan XK','Bộ phận Hải quan','s2|Thong quan','tokhaihaiquan'],
     [6,'CO-2026-0142','Chứng nhận C/O form E','P.XK (Ms Trang)','s2|Da cap','chungnhan'],
     [7,'QT-H-2026-0061','Quyết toán hàng hóa NCC','P.VT (Ms Ha) · P.XK','s4|Đang đối chiếu','quyettoanhang'],
     [7,'DN-2026-0312','Đề nghị xuất hóa đơn','Ms Trang — P.XK','s4|Chờ xuất','denghihoađơn'],
     [8,'CN-HL-0319','So công nợ (phai thu)','Phòng Kế toán','s4|Chờ thu','congno'],
   ]},
   {code:'LO-2026-018',dh:'DH-2026-0318',kh:'CNBM — Trung Quốc',sp:'Clinker',kl:'3,200 tan',gt:'1.72 ty',loai:LOAI_XK,tiendo:95,docs:[
     [1,'HD-XK-2026-002','Hợp đồng đầu ra','Ms Trang — P.XK','s2|Da ky','hopdong'],
     [1,'DH-2026-0318','Đơn hàng bán','Ms Ha — P.XK','s2|Da xác nhận','donhang'],
     [2,'PB-2026-018','Phân bổ nguồn NM Bim Son','Phòng Vận tải','s2|Đã phân bổ','phanbonhmay'],
     [3,'LVC-2026-0318','Lệnh vận chuyển (sa lan)','NV điều độ P.VT','s2|Da dieu','khvcnoidia'],
     [4,'PC-2026-0781','Phiếu cân hàng (BM13-04-03)','NV giao nhan P.VT','s2|Da xác nhận','phiếucan'],
     [5,'LX-2026-0090','Time sheet (NOR / laytime)','NV giám sát XH QN','s2|Hoan thanh','lamhangtau'],
     [6,'105xxxxxxx2','Tờ khai hải quan XK','Bộ phận Hải quan','s4|Đang xử lý','tokhaihaiquan'],
     [7,'00012845','Hóa đơn ban hang','Phòng Kế toán','s2|Da phat hanh','hoađơn'],
     [8,'CN-VN-0318','So công nợ (phai thu)','Phòng Kế toán','s2|Da thu','congno'],
   ]},
   {code:'LO-2026-016',dh:'DH-2026-0316',kh:'Chip Mong Insee — Campuchia',sp:'Clinker',kl:'8,000 tan',gt:'3.50 ty',loai:LOAI_XK,tiendo:60,docs:[
     [1,'HD-XK-2026-004','Hợp đồng đầu ra','Ms Trang — P.XK','s2|Da ky','hopdong'],
     [1,'DH-2026-0316','Đơn hàng bán','Ms Ha — P.XK','s2|Da xác nhận','donhang'],
     [2,'PB-2026-016','Phân bổ nguồn NM Mien Bac','Phòng Vận tải','s2|Đã phân bổ','phanbonhmay'],
     [3,'LVC-2026-0316','Lệnh vận chuyển (sa lan)','NV điều độ P.VT','s4|Đang vận chuyển','khvcnoidia'],
     [4,'PC-2026-0779','Phiếu cân hàng (BM13-04-03)','NV giao nhan P.VT','s2|Da xác nhận','phiếucan'],
     [6,'105xxxxxxx3','Tờ khai hải quan XK','Bộ phận Hải quan','s2|Thong quan','tokhaihaiquan'],
     [7,'QT-H-2026-0058','Quyết toán hàng hóa NCC','P.VT (Ms Ha) · P.XK','s4|Đang đối chiếu','quyettoanhang'],
     [7,'00012844','Hóa đơn ban hang','Phòng Kế toán','s2|Da phat hanh','hoađơn'],
     [8,'CN-SG-0316','So công nợ (phai thu)','Phòng Kế toán','s8|Qua han','congno'],
   ]},
  ];
  window.__LO360=LO360;
  const sec=document.createElement('div'); sec.className='page'; sec.setAttribute('data-page','hoso360');
  sec.innerHTML=`
    <div class="phdr"><div class="left"><div class="eyebrow">SYS_HOSO_LO · XUẤT KHẨU (BÁN ĐI)</div><h2>Hồ sơ lô hàng 360 — <b>Xuất khẩu</b></h2><p class="sub">Theo dõi toàn bộ chứng từ một lô <b>bán đi (XK)</b> xuyên suốt 8 bước quy trình — từ HĐ đầu ra XK đến thu công nợ. Chỉ áp dụng đơn hàng gắn HĐ <span class="oid">HD-XK-…</span>; đơn nội địa không dùng hồ sơ lô này.</p></div>
      <div class="right"><div class="fgroup"><label style="font-size:var(--fs3);color:var(--ink3);margin-right:6px">Chọn lô XK:</label><select class="lo-sel" style="height:32px;border:1px solid var(--line);border-radius:5px;padding:0 8px;background:var(--bg)">${LO360.map(l=>`<option value="${l.code}">${l.code} · ${l.dh} · ${l.kh}</option>`).join('')}</select></div></div></div>
    <div class="lo-body"></div>`;
  content.appendChild(sec);
  PAGE_MAP['SYS_HOSO_LO']='hoso360'; CRUMB_MAP['hoso360']='HO SO LO XK';
  const body=sec.querySelector('.lo-body'); const sel=sec.querySelector('.lo-sel');

  function openLotDoc(lo,d){
    const step=d[0]; const role=SR[step]||{nguoi:d[3],appr:[]};
    const done=d[4].startsWith('s2'); const rej=/quá hạn|huy|xoa/.test(d[4].toLowerCase());
    const levels=['NV',...role.appr]; const doneCount=rej?0:done?levels.length:1;
    const lvl=(idx,key)=>{const on=!rej&&idx<doneCount,r=rej&&idx>0;return `<div style="flex:1;text-align:center;min-width:62px"><div style="width:26px;height:26px;border-radius:50%;margin:0 auto 4px;display:grid;place-items:center;background:${r?'var(--err2)':on?'var(--ok2)':'var(--bg3)'};color:${r?'var(--err)':on?'var(--ok)':'var(--ink4)'}"><i class="bi bi-${r?'x-lg':on?'check-lg':'clock'}"></i></div><div style="font-size:var(--fs3);color:var(--ink3)">${({NV:'Nhân viên',TP:'Trưởng phòng',GD:'Giám đốc'})[key]||key}</div></div>`;};
    const f=(l,v)=>`<div class="m-field"><div class="m-label">${l}</div><div class="m-value">${v}</div></div>`;
    modalOverlay.innerHTML=`
      <div class="modal wide">
        <div class="modal-hd"><div class="m-icon dh"><i class="bi bi-file-earmark-text"></i></div>
          <div class="m-titles"><div class="m-code">${d[1]}</div><div class="m-sub">${d[2]} · ${lo.code}</div></div>
          <div class="m-close" onclick="closeModal()"><i class="bi bi-x-lg"></i></div></div>
        <div class="modal-bd">
          <div class="m-section"><div class="m-section-title">Thông tin lô hàng</div><div class="m-grid">${f('Mã lô',lo.code)}${f('Khách hàng',lo.kh)}${f('Sản phẩm / KL',lo.sp+' · '+lo.kl)}${f('Giá trị',lo.gt)}${f('Loai',lo.loai)}${f('Trạng thái CT',pill(d[4]))}</div></div>
          <div class="m-section"><div class="m-section-title">Người thực hiện &amp; Phê duyệt (Bước ${step})</div>
            <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap"><div style="flex:1 1 220px"><div class="m-chain-label">Người thực hiện</div><div style="font-weight:600;margin-top:2px">${d[3]}</div></div>
            <div style="display:flex;gap:8px;flex:2 1 260px;max-width:400px">${role.appr.length?levels.map((k,i)=>lvl(i,k)).join(''):'<div style="color:var(--ink4);align-self:center">Không yêu cầu phê duyệt</div>'}</div></div></div>
          <div class="m-section"><div class="m-section-title">Luân chuyển chứng từ (click để mo buoc)</div>${fs?fs(step):''}</div>
          <div class="m-actions"><button class="tbtn lo-goto" data-go="${d[5]}" style="background:var(--pri)"><i class="bi bi-box-arrow-up-right"></i> Mo màn hình: ${d[2]}</button><button class="m-btn-secondary"><i class="bi bi-printer"></i> In</button><button class="m-btn-secondary m-close-btn" style="margin-left:auto"><i class="bi bi-x-lg"></i> Đóng</button></div>
        </div></div>`;
    modalOverlay.classList.add('open'); document.body.style.overflow='hidden';
    modalOverlay.querySelector('.m-close-btn').onclick=closeModal;
    modalOverlay.querySelector('.lo-goto').onclick=()=>{closeModal();switchPage(d[5]);};
    modalOverlay.querySelectorAll('.m-chain-step:not(.active)').forEach(st=>st.addEventListener('click',()=>{closeModal();switchPage(st.dataset.go);}));
  }

  function renderLo(code){
    const lo=LO360.find(l=>l.code===code)||LO360[0];
    const kpis=[['t','building','Khách hàng',lo.kh],['a','box-seam','Sản phẩm · KL',lo.sp+' · '+lo.kl],['s','currency-dollar','Giá trị lo',lo.gt],['h','speedometer2','Tiến độ',lo.tiendo+'%']];
    const byStep={}; lo.docs.forEach(d=>{(byStep[d[0]]=byStep[d[0]]||[]).push(d);});
    let steps='';
    for(let s=1;s<=8;s++){
      const ds=byStep[s]||[]; const role=SR[s]||{nguoi:'--',appr:[]};
      const allDone=ds.length&&ds.every(d=>d[4].startsWith('s2'));
      const col=!ds.length?'var(--bg3)':allDone?'var(--ok2)':'var(--acc3)';
      const fg=!ds.length?'var(--ink4)':allDone?'var(--ok)':'var(--acc)';
      const docChips=ds.length?ds.map(d=>`<div class="lo-doc" data-code="${d[1]}" data-step="${s}" style="display:inline-flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:6px;padding:6px 10px;margin:3px 8px 3px 0;cursor:pointer;background:var(--bg)" onmouseover="this.style.background='var(--bg2)'" onmouseout="this.style.background='var(--bg)'"><span class="oid">${d[1]}</span><span style="color:var(--ink3);font-size:var(--fs2)">${d[2]}</span>${pill(d[4])}</div>`).join('')
        :`<span style="color:var(--ink4);font-size:var(--fs3)">Chua có chứng từ</span>`;
      steps+=`<div style="display:flex;gap:14px;padding:12px 0;border-bottom:1px solid var(--line)">
        <div style="flex:0 0 36px;text-align:center"><div style="width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:${col};color:${fg};font-weight:700">${s}</div></div>
        <div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><b>${STEPNAME[s]}</b><span style="color:var(--ink4);font-size:var(--fs3)"><i class="bi bi-person-badge"></i> ${role.nguoi}</span></div><div style="margin-top:6px">${docChips}</div></div>
        <div style="flex:0 0 auto;align-self:center"><button class="m-btn-secondary lo-open" data-go="${STEPGO[s]}"><i class="bi bi-box-arrow-up-right"></i> Mo màn hình</button></div>
      </div>`;
    }
    body.innerHTML=`<div class="kpis">${kpis.map(kpiHtml).join('')}</div>
      <div class="card"><div class="chd"><h3>Luân chuyển chứng từ — ${lo.code}</h3><span class="small"><span class="pill s2" style="margin-right:6px"><span class="d"></span>${lo.loai}</span>${lo.docs.length} chứng từ · ${lo.dh}</span></div>
        <div style="padding:6px 16px 12px">${steps}</div></div>`;
    body.querySelectorAll('.lo-doc').forEach(el=>el.addEventListener('click',()=>{ const d=lo.docs.find(x=>x[1]===el.dataset.code&&String(x[0])===el.dataset.step); if(d)openLotDoc(lo,d); }));
    body.querySelectorAll('.lo-open').forEach(b=>b.addEventListener('click',()=>switchPage(b.dataset.go)));
  }
  function renderLoPending(dh){
    const d=findDhByCode(dh);
    const hd=d?d.hdCode:'—';
    body.innerHTML=`<div class="card" style="padding:18px 16px">
      <span class="pill s2"><span class="d"></span>${LOAI_XK}</span>
      <h3 style="margin:12px 0 6px;font-size:15px">Chưa có hồ sơ lô chi tiết cho <span class="oid">${dh||'—'}</span></h3>
      <p style="color:var(--ink3);font-size:var(--fs2);line-height:1.5;margin:0 0 14px">Hồ sơ lô 360 chỉ theo dõi lô <b>xuất khẩu (bán đi)</b>. Hiện demo 3 lô XK — chọn lô có sẵn ở góc phải hoặc mở từ đơn XK tương ứng.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${d?`<button class="tbtn lo-open-dh" style="background:var(--pri)"><i class="bi bi-box-seam"></i> Mở đơn ${dh}</button>`:''}
        <button class="m-btn-secondary lo-pick-first"><i class="bi bi-collection"></i> Xem lô demo đầu tiên</button>
      </div>
      ${d?`<p style="margin-top:10px;font-size:var(--fs3);color:var(--ink4)">HĐ: <span class="oid">${hd}</span></p>`:''}
    </div>`;
    body.querySelector('.lo-open-dh')?.addEventListener('click',()=>switchPage('donhang'));
    body.querySelector('.lo-pick-first')?.addEventListener('click',()=>{sel.value=LO360[0].code;renderLo(LO360[0].code);});
  }

  sel.addEventListener('change',()=>renderLo(sel.value));
  window.openLotDossier=dh=>{
    if(!window.isXkDh(dh)) return;
    switchPage('hoso360');
    const lo=LO360.find(l=>l.dh===dh);
    if(lo){ sel.value=lo.code; renderLo(lo.code); }
    else renderLoPending(dh);
  };
  renderLo(LO360[0].code);
})();
