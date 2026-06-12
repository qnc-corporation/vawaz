// ===== AUTO-GENERATED PROCESS SCREENS (B1-B9 coverage) =====
(function(){
  const content=document.querySelector('.content');
  if(!content) return;
  const kpiHtml=k=>`<div class="kpi"><div class="top"><div class="ic ${k[0]}"><i class="bi bi-${k[1]}"></i></div><div class="lbl">${k[2]}</div></div><div class="val">${k[3]}${k[4]?`<span style="font-size:12px;color:var(--ink4);font-weight:400;margin-left:3px">${k[4]}</span>`:''}</div><div class="delta"><span class="chip ${k[5]}">${k[6]}</span>${k[7]}</div></div>`;
  const pill=s=>{const i=s.indexOf('|');return `<span class="pill ${s.slice(0,i)}"><span class="d"></span>${s.slice(i+1)}</span>`;};

  // ---- A: luong luân chuyển chứng từ (9 buoc) ----
  const FLOW9=[
    [1,'Hợp đồng & DH','donhang','file-earmark-text'],
    [2,'Phân bổ & vỏ bao','phanbonhmay','diagram-3'],
    [3,'Vận chuyển','khvcnoidia','truck'],
    [4,'Giao nhận','nhanhangcang','box-arrow-in-down'],
    [5,'Làm hàng','domonkiemdem','rulers'],
    [6,'Hải quan XNK','tokhaihaiquan','file-earmark-ruled'],
    [7,'Hóa đơn & QT','quyettoanhang','receipt'],
    [8,'Công nợ & tiền','congno','wallet2'],
  ];
  // ---- B: phong ban phụ trach theo màn hình ----
  const META={
    hopdongncc:{step:1,dept:'Phòng Mua hàng'}, donhangncc:{step:1,dept:'Phòng Mua hàng'},
    vobaodat:{step:2,dept:'Bộ phận Vỏ bao'},
    nhanhangcang:{step:4,dept:'Phong VT - Giao nhận'}, bangiaosalan:{step:4,dept:'Phong VT - Giao nhận'}, thuhoichungtu:{step:4,dept:'Phong VT - Giao nhận'},
    kiemtraham:{step:5,dept:'Giam sat XH Quang Ninh'}, lamhangtau:{step:5,dept:'Giam sat XH Quang Ninh'}, domonkiemdem:{step:5,dept:'Giam sat XH Quang Ninh'}, sucotonthat:{step:5,dept:'Giam sat XH Quang Ninh'}, dichvuphutro:{step:5,dept:'Phòng Vận tải'}, sanluongngày:{step:5,dept:'Giam sat XH Quang Ninh'},
    tokhaihaiquan:{step:6,dept:'Bộ phận Hải quan'}, thuexnk:{step:6,dept:'Bộ phận Hải quan'}, chungnhan:{step:6,dept:'Phong XNK'}, checklisthoso:{step:6,dept:'Phong XNK'}, tailieudinhkem:{step:6,dept:'Phong XNK'},
    quyettoanhang:{step:7,dept:'Phòng Mua bán hàng'}, quyettoanvt:{step:7,dept:'Phòng Vận tải'}, quyettoanvobao:{step:7,dept:'Bộ phận Vỏ bao'}, chiphivantai:{step:7,dept:'Phòng Vận tải'}, denghihoađơn:{step:7,dept:'Phòng Mua bán hàng'}, hoađơn:{step:7,dept:'Phòng Kế toán'}, vaytrahang:{step:7,dept:'Phòng Mua bán hàng'},
    dntt:{step:8,dept:'Phòng Kế toán'}, thanhtoan:{step:8,dept:'Phòng Kế toán'}, congno:{step:8,dept:'Phòng Kế toán'}, thuhoicongno:{step:8,dept:'Phòng Mua bán hàng'}, soduquy:{step:8,dept:'Phòng Kế toán'},
    dmdoitac:{dept:'Phòng Kinh doanh'}, dmhanghoa:{dept:'Phòng Kế hoạch'}, dmvobao:{dept:'Bộ phận Vỏ bao'}, dmtiente:{dept:'Phòng Kế toán'}, dmphuongtien:{dept:'Phòng Vận tải'}, dmdiadiem:{dept:'Phòng Vận tải'}, dmbanggia:{dept:'Phòng Vận tải'}, dmtaikhoan:{dept:'Phòng Kế toán'},
    sysnguoidung:{dept:'Quản trị hệ thống'}, sysquyendoitac:{dept:'Quản trị hệ thống'}, sysduyet:{dept:'Quản trị hệ thống'}, systracklog:{dept:'Quản trị hệ thống'},
  };
  window.SCREEN_META=META; window.FLOW9=FLOW9;

  // ---- Ma tran Người thực hiện + Phê duyệt (trich từ QT 01-VT & file luân chuyển chứng từ) ----
  // appr = cap phe duyệt bat buoc theo file: TP = Trưởng phòng, GD = Giám đốc
  const STEP_ROLE={
    1:{nguoi:'Ms Ha (KH giao hàng) · Ms Trang (đơn dat hang) — P.XK',appr:['TP','GD']}, // B1, B2.1
    2:{nguoi:'Phòng Mua bán hàng · Bộ phận Vỏ bao',appr:[]},                              // phân bổ/vỏ bao (file 2)
    3:{nguoi:'NV điều độ P.VT (Ha, Viet, A Tung...)',appr:['TP','GD']},                   // B2.2
    4:{nguoi:'NV giao nhan P.VT (Tu, Lai...) · nha thau VT/boc xep',appr:['TP','GD']},    // B2.3, B3
    5:{nguoi:'NV giám sát XH Quang Ninh · đơn vi giảm dinh',appr:[]},                     // B4, B5
    6:{nguoi:'Bộ phận Hải quan · P.XK (Ms Trang)',appr:['TP']},                           // file 2 + B6.2
    7:{nguoi:'Ms Ha — P.VT · Ms Trang — P.XK · Ke toan',appr:['TP','GD']},                // B6, B7
    8:{nguoi:'P.XK (Ms Trang) · Phòng Kế toán',appr:['GD']},                              // B6.3
  };
  const ROLE_OVR={
    donhangncc:{nguoi:'Ms Trang — P.XK (đơn dat hang B2.1)',appr:['TP','GD']},
    quyettoanhang:{nguoi:'Phong VT (Ms Ha chốt tổn thất) · P.XK (Ms Trang)',appr:['TP']},   // B6.1, B6.2
    quyettoanvt:{nguoi:'Ms Ha — P.VT (BB thanh quyết toán B7.2)',appr:['TP','GD']},
    hoađơn:{nguoi:'Phòng Kế toán',appr:['GD']},                                             // file 2: GD duyệt toan bo hoa đơn
    congno:{nguoi:'P.XK (Ms Trang) · Phòng Kế toán',appr:['GD']},                           // B6.3
    dntt:{nguoi:'Phòng Kế toán',appr:['TP','GD']},
  };
  const APPR_LABEL={NV:'Nhân viên',TP:'Trưởng phòng',GD:'Giám đốc'};
  const roleOf=(cfg,meta)=>ROLE_OVR[cfg&&cfg.id]||(meta&&meta.step&&STEP_ROLE[meta.step])||{nguoi:(meta&&meta.dept)||'--',appr:[]};
  const apprChainStr=appr=>['NV',...appr].map(x=>APPR_LABEL[x]||x).join(' → ');
  const APPROVED=new WeakSet();
  const apprState=(row,t)=>{
    if(row&&APPROVED.has(row)) return 'done';
    const s=(t||'').toLowerCase();
    if(/(huy|xoa)/.test(s)) return 'rejected';
    const done=/(da |hoan thanh|thong quan|hieu luc|hoạt động|^dat$|khop|^du$|da cap|tạo mới|duong)/.test(s);
    return done?'done':'pending';
  };
  const apprChip=(state,appr)=>{
    if(state==='rejected') return {t:'Đã hủy',c:'s8'};
    if(!appr.length) return {t:'Không yêu cầu',c:'s1'};
    if(state==='done') return {t:'Đã duyệt: '+appr.join('·'),c:'s2'};
    return {t:'Chờ '+appr.join('/'),c:'s4'};
  };
  window.__STEP_ROLE=STEP_ROLE; window.__apprChainStr=apprChainStr; window.__apprState=apprState;
  const flowStrip=step=>{
    if(!step) return '';
    return `<div class="m-chain-wrap" style="margin-bottom:14px"><div class="m-chain">`+FLOW9.map((f,i)=>{
      const active=f[0]===step;
      const arrow=i?`<div class="m-chain-arrow"><i class="bi bi-chevron-right"></i></div>`:'';
      return arrow+`<div class="m-chain-step${active?' active':''}" data-go="${f[2]}"><div class="m-chain-icon hd"><i class="bi bi-${f[3]}"></i></div><div class="m-chain-info"><div class="m-chain-label">Bước ${f[0]}</div><div class="m-chain-code">${f[1]}</div></div></div>`;
    }).join('')+`</div></div>`;};
  window.buildFlowStrip=flowStrip;

  // ---- Muc 4: Bieu mau in (theo cot BIEU MAU cua quy trinh) ----
  // tpl = {title, code, sign:[...vai tro ky], note}
  const FORM_TEMPLATES={
    donhangncc:{title:'DON DAT HANG',code:'BM-DDH (mau công ty)',sign:['Người lập (P.XK)','Trưởng phòng','Giám đốc','Nhà cung cấp'],note:'Kinh gửi Quy nhà cung cấp, công ty đề nghị cung cap hàng hóa theo noi dừng đơn dat hang dưới đây.'},
    bangiaosalan:{title:'BIEN BAN GIAO NHAN HANG (SA LAN)',code:'BM-BBGN',sign:['Bên giao (NV giao nhan)','Bên nhận (Thuyen truong sa lan)','Don vi giám sát'],note:'Hai bên tiến hành giao nhan hang, kep chi và xác nhận khối lượng, tính trang niêm chi như sau:'},
    quyettoanvt:{title:'BIEN BAN THANH QUYET TOAN KHOI LUONG & BOI THUONG',code:'BM-QTVT',sign:['Dai dien Cty (P.VT)','Nha thau vận chuyển','Trưởng phòng','Giám đốc'],note:'Cac ben thong nhat thanh quyết toán khối lượng vận chuyển, tổn thất và bồi thường (nếu co) như sau:'},
    dntt:{title:'DE NGHI THANH TOAN',code:'BM-DNTT',sign:['Nguoi đề nghị','Ke toan','Trưởng phòng','Giám đốc'],note:'Kinh trình Ban Giám đốc phe duyệt thanh toán khoan chi phí dưới đây theo điều khoản hợp đồng.'},
  };
  function openFormModal(cfg,row,tpl,meta,refresh){
    const last=cfg.cols.length-1;
    const fld=(l,v)=>`<div style="flex:1 1 240px;min-width:240px"><div style="font-size:var(--fs3);color:var(--ink3);margin-bottom:3px">${l}</div><div style="border:1px solid var(--line);border-radius:5px;padding:7px 10px;background:var(--bg);font-weight:500;min-height:32px">${v||'&nbsp;'}</div></div>`;
    const fields=cfg.cols.map((c,i)=>fld(c, i===last?row[i].slice(row[i].indexOf('|')+1):row[i])).join('');
    const sign=n=>`<div style="flex:1;text-align:center;min-width:120px"><div style="font-weight:600;margin-bottom:2px">${n}</div><div style="font-size:var(--fs3);color:var(--ink4)">(ky, ghi ro ho ten)</div><div style="height:54px"></div></div>`;
    modalOverlay.innerHTML=`
      <div class="modal wide">
        <div class="modal-hd no-print"><div class="m-icon dh"><i class="bi bi-file-earmark-ruled"></i></div>
          <div class="m-titles"><div class="m-code">${tpl.title}</div><div class="m-sub">${tpl.code} · ${row[0]}</div></div>
          <div class="m-close" onclick="closeModal()"><i class="bi bi-x-lg"></i></div></div>
        <div class="modal-bd">
          <div style="padding:6px 6px 14px">
            <div style="text-align:center;margin-bottom:14px;border-bottom:1px solid var(--line);padding-bottom:10px">
              <div style="font-weight:700;font-size:15px;letter-spacing:.5px">THANGLONG CEMENTS — QNC</div>
              <div style="font-weight:700;font-size:16px;margin-top:4px">${tpl.title}</div>
              <div style="font-size:var(--fs3);color:var(--ink3);margin-top:2px">${tpl.code} &middot; So: ${row[0]}</div>
            </div>
            <p style="font-size:var(--fs2);color:var(--ink2);margin-bottom:12px">${tpl.note}</p>
            <div style="display:flex;flex-wrap:wrap;gap:12px">${fields}</div>
            <div style="display:flex;gap:12px;margin-top:24px;padding-top:12px;border-top:1px dashed var(--line)">${tpl.sign.map(sign).join('')}</div>
            <div style="text-align:right;font-size:var(--fs3);color:var(--ink4);margin-top:10px">Ngày ..... thang ..... nam 2026</div>
          </div>
          <div class="m-actions no-print"><button class="tbtn m-print-btn" style="background:var(--pri)"><i class="bi bi-printer"></i> In biểu mẫu</button><button class="m-btn-secondary m-back-btn"><i class="bi bi-arrow-left"></i> Quay lại</button><button class="m-btn-secondary m-close-btn" style="margin-left:auto"><i class="bi bi-x-lg"></i> Đóng</button></div>
        </div></div>`;
    modalOverlay.classList.add('open'); document.body.style.overflow='hidden';
    modalOverlay.querySelector('.m-close-btn').onclick=closeModal;
    modalOverlay.querySelector('.m-print-btn').onclick=()=>window.print();
    modalOverlay.querySelector('.m-back-btn').onclick=()=>openGenModal(cfg,row,meta,refresh);
  }
  window.__openFormModal=openFormModal;

  // ---- Muc 7: noi chứng từ sang buoc ke tiep (quyết toán -> DNTT -> thanh toán; quyết toán vỏ bao -> hoa đơn) ----
  const NEXT_ACT={
    quyettoanhang:{label:'Lap DNTT thanh toán NCC / nhà máy',go:'dntt',icon:'file-earmark-plus'},
    quyettoanvt:{label:'Lap DNTT thanh toán nha thau VC',go:'dntt',icon:'file-earmark-plus'},
    quyettoanvobao:{label:'Đề nghị xuất hóa đơn ban vỏ bao',go:'denghihoađơn',icon:'receipt'},
    sucotonthat:{label:'Chuyen quyết toán van tại (bồi thường tổn thất)',go:'quyettoanvt',icon:'truck'},
    denghihoađơn:{label:'Xuat hoa đơn ban hang',go:'hoađơn',icon:'receipt'},
    dntt:{label:'Lap phiếu chi / thanh toán',go:'thanhtoan',icon:'cash-coin'},
    thuhoicongno:{label:'Lap DNTT / phuong an thu hồi',go:'dntt',icon:'file-earmark-plus'},
  };

  // ---- C: modal chi tiết chung (dừng lại .modal cua hệ thống) ----
  function openGenModal(cfg,row,meta,refresh){
    const last=cfg.cols.length-1;
    const statusText=row[last].slice(row[last].indexOf('|')+1);
    const role=roleOf(cfg,meta);
    const state=apprState(row,statusText);
    const levels=['NV',...role.appr];
    const doneCount=state==='rejected'?0:state==='done'?levels.length:1;
    const fields=cfg.cols.map((c,i)=>`<div class="m-field"><div class="m-label">${c}</div><div class="m-value">${i===last?pill(row[i]):row[i]}</div></div>`).join('');
    const lvl=(idx,key)=>{const on=state!=='rejected'&&idx<doneCount,rej=state==='rejected'&&idx>0;return `<div style="flex:1;text-align:center;min-width:62px"><div style="width:26px;height:26px;border-radius:50%;margin:0 auto 4px;display:grid;place-items:center;background:${rej?'var(--err2)':on?'var(--ok2)':'var(--bg3)'};color:${rej?'var(--err)':on?'var(--ok)':'var(--ink4)'}"><i class="bi bi-${rej?'x-lg':on?'check-lg':'clock'}"></i></div><div style="font-size:var(--fs3);color:var(--ink3)">${APPR_LABEL[key]||key}</div></div>`;};
    const apprSec=meta.step?`<div class="m-section"><div class="m-section-title">Người thực hiện &amp; Phê duyệt (theo quy trình)</div>
      <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap">
        <div style="flex:1 1 220px"><div class="m-chain-label">Người thực hiện</div><div style="font-weight:600;margin-top:2px">${role.nguoi}</div></div>
        <div style="display:flex;gap:8px;flex:2 1 260px;max-width:400px">${role.appr.length?levels.map((k,i)=>lvl(i,k)).join(''):'<div style="color:var(--ink4);align-self:center">Không yêu cầu phê duyệt</div>'}</div>
      </div></div>`:'';
    const chain=meta.step?`<div class="m-section"><div class="m-section-title">Luân chuyển chứng từ (click để mo buoc)</div>${flowStrip(meta.step)}</div>`:'';
    const canApprove=meta.step&&role.appr.length&&state==='pending';
    const approveBtn=meta.step?(state==='done'?`<button class="m-btn-secondary" disabled style="opacity:.6"><i class="bi bi-check-all"></i> Đã duyệt</button>`:state==='rejected'?`<button class="m-btn-secondary" disabled style="opacity:.6"><i class="bi bi-x-octagon"></i> Đã hủy</button>`:`<button class="tbtn m-approve-btn" style="background:var(--ok)"><i class="bi bi-check-lg"></i> Duyệt (${role.appr.join('·')})</button>`):'';
    const loCode=(JSON.stringify(row).match(/DH-2026-\d{4}/)||[])[0];
    const loBtn=(loCode&&window.openLotDossier&&window.isXkDh?.(loCode))?`<button class="m-btn-secondary m-lo-btn"><i class="bi bi-diagram-3"></i> Hồ sơ lô XK</button>`:'';
    const tpl=FORM_TEMPLATES[cfg.id];
    const formBtn=tpl?`<button class="m-btn-secondary m-form-btn"><i class="bi bi-file-earmark-ruled"></i> Xem biểu mẫu</button>`:'';
    const nx=NEXT_ACT[cfg.id];
    const nextBtn=nx?`<button class="tbtn m-next-btn" style="background:var(--pri)"><i class="bi bi-${nx.icon}"></i> ${nx.label}</button>`:'';
    modalOverlay.innerHTML=`
      <div class="modal wide">
        <div class="modal-hd"><div class="m-icon dh"><i class="bi bi-file-earmark-text"></i></div>
          <div class="m-titles"><div class="m-code">${row[0]}</div><div class="m-sub">${cfg.crumb}</div></div>
          <div class="m-close" onclick="closeModal()"><i class="bi bi-x-lg"></i></div></div>
        <div class="modal-bd">
          <div class="m-section"><div class="m-section-title">Thông tin chứng từ</div><div class="m-grid">${fields}</div></div>
          ${apprSec}${chain}
          <div class="m-actions">${approveBtn}${nextBtn}${formBtn}${loBtn}<button class="m-btn-secondary m-edit-btn"><i class="bi bi-pencil"></i> Sửa</button><button class="m-btn-secondary m-close-btn" style="margin-left:auto"><i class="bi bi-x-lg"></i> Đóng</button></div>
        </div></div>`;
    modalOverlay.classList.add('open'); document.body.style.overflow='hidden';
    modalOverlay.querySelector('.m-close-btn').onclick=closeModal;
    modalOverlay.querySelectorAll('.m-chain-step:not(.active)').forEach(st=>st.addEventListener('click',()=>{closeModal();switchPage(st.dataset.go);}));
    const ab=modalOverlay.querySelector('.m-approve-btn');
    if(ab) ab.onclick=()=>{ APPROVED.add(row); if(refresh)refresh(); if(window.refreshApprovalInbox)window.refreshApprovalInbox(); openGenModal(cfg,row,meta,refresh); };
    const lb=modalOverlay.querySelector('.m-lo-btn');
    if(lb) lb.onclick=()=>{ closeModal(); window.openLotDossier(loCode); };
    const fb=modalOverlay.querySelector('.m-form-btn');
    if(fb) fb.onclick=()=>openFormModal(cfg,row,tpl,meta,refresh);
    const nb=modalOverlay.querySelector('.m-next-btn');
    if(nb) nb.onclick=()=>{ closeModal(); switchPage(nx.go); };
    const eb=modalOverlay.querySelector('.m-edit-btn');
    if(eb) eb.onclick=()=>openEditModal(cfg,row,meta,refresh);
  }
  window.__openGenModal=openGenModal;

  // ---- Muc 9: form tao/sua chứng từ ----
  function statusCellFromText(t){const s=(t||'').toLowerCase();let c='s2';if(/huy|xoa|quá hạn|loi|^am|nợ xấu|lech|thieu|vuot/.test(s))c='s8';else if(/cho|dang|chua|sap/.test(s))c='s4';return c+'|'+(t||'Moi');}
  function openEditModal(cfg,row,meta,after){
    const last=cfg.cols.length-1; const isEdit=!!row;
    const inp=i=>{
      if(i===last){
        const cur=isEdit?row[i].slice(row[i].indexOf('|')+1):'';
        const opts=(cfg.statusOpts||[]).map(o=>`<option${o===cur?' selected':''}>${o}</option>`).join('');
        return `<div style="flex:1 1 240px;min-width:240px"><div style="font-size:var(--fs3);color:var(--ink3);margin-bottom:3px">${cfg.cols[i]}</div><select class="ef" data-i="${i}" style="width:100%;height:34px;border:1px solid var(--line);border-radius:5px;padding:0 8px;background:var(--bg)">${opts||'<option>Moi</option>'}</select></div>`;
      }
      const v=isEdit?row[i]:'';
      return `<div style="flex:1 1 240px;min-width:240px"><div style="font-size:var(--fs3);color:var(--ink3);margin-bottom:3px">${cfg.cols[i]}</div><input class="ef" data-i="${i}" value="${String(v).replace(/"/g,'&quot;')}" style="width:100%;height:34px;border:1px solid var(--line);border-radius:5px;padding:0 10px;background:var(--bg)"></div>`;
    };
    modalOverlay.innerHTML=`<div class="modal wide"><div class="modal-hd"><div class="m-icon dh"><i class="bi bi-${isEdit?'pencil-square':'plus-lg'}"></i></div><div class="m-titles"><div class="m-code">${isEdit?row[0]:(cfg.addBtn||'Tạo mới')}</div><div class="m-sub">${isEdit?'Sửa chứng từ':'Tạo mới chứng từ'} · ${cfg.crumb}</div></div><div class="m-close" onclick="closeModal()"><i class="bi bi-x-lg"></i></div></div>
      <div class="modal-bd"><div class="m-section"><div class="m-section-title">${isEdit?'Chinh sua thong tin':'Nhap thong tin chứng từ'}</div><div style="display:flex;flex-wrap:wrap;gap:12px">${cfg.cols.map((c,i)=>inp(i)).join('')}</div></div>
        <div class="m-actions"><button class="tbtn m-save-btn" style="background:var(--ok)"><i class="bi bi-check-lg"></i> Luu</button><button class="m-btn-secondary m-close-btn" style="margin-left:auto"><i class="bi bi-x-lg"></i> Hủy</button></div></div></div>`;
    modalOverlay.classList.add('open'); document.body.style.overflow='hidden';
    modalOverlay.querySelector('.m-close-btn').onclick=closeModal;
    modalOverlay.querySelector('.m-save-btn').onclick=()=>{
      const vals=[]; modalOverlay.querySelectorAll('.ef').forEach(el=>{vals[+el.dataset.i]=el.value;});
      const newRow=cfg.cols.map((c,i)=> i===last?statusCellFromText(vals[i]||((cfg.statusOpts||[])[0])||'Moi'):(vals[i]||''));
      if(isEdit){for(let i=0;i<newRow.length;i++) row[i]=newRow[i];}
      else {cfg.rows.unshift(newRow);}
      if(after)after(); if(window.refreshApprovalInbox)window.refreshApprovalInbox();
      closeModal();
    };
  }
  window.__openEditModal=openEditModal;

  function buildScreen(cfg){
    const sec=document.createElement('div');
    sec.className='page'; sec.setAttribute('data-page',cfg.id);
    const meta=META[cfg.id]||{}; const isTxn=!!meta.step;
    const role=roleOf(cfg,meta);
    const num=new Set(cfg.num||[]); const last=cfg.cols.length-1;
    const tabKeys=(cfg.tabs||[]).filter(t=>t[0]!=='all').map(t=>t[0].toLowerCase());
    const tabMatch=(r,tk)=>{const hay=r.join(' ').toLowerCase();tk=tk.toLowerCase();if(!hay.includes(tk))return false;return !tabKeys.some(k=>k.length>tk.length&&hay.includes(k));};
    const ths=cfg.cols.map((c,i)=>{
      const pd=(isTxn&&i===last)?`<th>Phê duyệt</th>`:'';
      return pd+`<th${i===0?' style="padding-left:14px"':i===last?' style="padding-right:14px"':''}>${c}</th>`;
    }).join('');
    const deptLine=isTxn?`<div style="margin-top:6px;font-size:var(--fs3);color:var(--ink3)"><i class="bi bi-person-badge"></i> Người thực hiện: <b style="color:var(--ink2)">${role.nguoi}</b>${role.appr.length?` &nbsp;·&nbsp; <i class="bi bi-diagram-3"></i> Phê duyệt: <b style="color:var(--ink2)">${apprChainStr(role.appr)}</b>`:' &nbsp;·&nbsp; <span style="color:var(--ink4)">Không yêu cầu phê duyệt</span>'}</div>`
      :`<div style="margin-top:6px;font-size:var(--fs3);color:var(--ink3)"><i class="bi bi-people"></i> Phu trach: <b style="color:var(--ink2)">${meta.dept||'--'}</b></div>`;
    sec.innerHTML=`
      <div class="phdr"><div class="left"><div class="eyebrow">${cfg.code} · ${cfg.grp||'GIAO DICH'}</div><h2>${cfg.title}</h2><p class="sub">${cfg.desc||''}</p>${deptLine}</div>
        <div class="right"><button class="tbtn ge-add"><i class="bi bi-plus-lg"></i> ${cfg.addBtn||'Tạo mới'}</button><div class="ico" title="Xuat Excel"><i class="bi bi-file-earmark-spreadsheet"></i></div><div class="ico" title="Bộ lọc"><i class="bi bi-funnel"></i></div></div></div>
      <div class="kpis">${(cfg.kpis||[]).map(kpiHtml).join('')}</div>
      ${flowStrip(meta.step)}
      <div class="hd-tabs">${cfg.tabs.map((t,i)=>{const tk=t[0];const cnt=(tk==='all')?cfg.rows.length:cfg.rows.filter(r=>tabMatch(r,tk)).length;return `<button class="${i===0?'on':''}" data-tk="${tk}">${t[1]} <span class="cnt">${cnt}</span></button>`;}).join('')}</div>
      <div class="hd-filters"><div class="fgroup"><label>Trạng thái:</label><select><option>Tất cả</option>${(cfg.statusOpts||[]).map(o=>`<option>${o}</option>`).join('')}</select></div><div class="fgroup" style="margin-left:auto"><div class="search" style="max-width:240px"><i class="bi bi-search si"></i><input placeholder="Tìm kiem..."></div></div></div>
      <div class="card"><div class="chd"><h3>${cfg.tableTitle||'Danh sách'}</h3><span class="small ge-count">${cfg.rows.length} ban ghi</span><div class="right">${isTxn?'<span class="small" style="color:var(--ink4)">Click dong để xem chi tiết &amp; luân chuyển</span>&nbsp;&nbsp;':''}<a class="cardlink">Xuat Excel <i class="bi bi-download"></i></a></div></div>
        <div style="padding:0 4px 4px"><table><thead><tr>${ths}</tr></thead><tbody class="ge-tbody"></tbody></table></div>
        <div class="tfoot"><span class="small ge-foot"></span><div class="pg"><button>&lsaquo;</button><button class="on">1</button><button>&rsaquo;</button></div></div></div>`;
    content.appendChild(sec);
    sec.querySelectorAll('.m-chain-step:not(.active)').forEach(st=>st.addEventListener('click',()=>switchPage(st.dataset.go)));
    const tbody=sec.querySelector('.ge-tbody');
    const selEl=sec.querySelector('.hd-filters select');
    const inpEl=sec.querySelector('.hd-filters input');
    let curTab=(cfg.tabs[0]&&cfg.tabs[0][0])||'all';
    const stOf=r=>r[last].slice(r[last].indexOf('|')+1);
    const render=rows=>{
      tbody.innerHTML='';
      if(!rows.length){ tbody.innerHTML=`<tr><td colspan="${cfg.cols.length+(isTxn?1:0)}" style="padding:18px 14px;color:var(--ink4);text-align:center">Khong có ban ghi phụ hop</td></tr>`; }
      rows.forEach(r=>{
        const tr=document.createElement('tr');
        const chip=apprChip(apprState(r,stOf(r)),role.appr);
        tr.innerHTML=r.map((cell,i)=>{
          const apprCell=(isTxn&&i===last)?`<td><span class="pill ${chip.c}"><span class="d"></span>${chip.t}</span></td>`:'';
          return apprCell+(i===0?`<td style="padding-left:14px"><span class="oid">${cell}</span></td>`
            : i===last?`<td style="padding-right:14px">${pill(cell)}</td>`
            : `<td class="${num.has(i)?'vnum':''}">${cell}</td>`);
        }).join('');
        if(isTxn){tr.style.cursor='pointer';tr.addEventListener('click',()=>openGenModal(cfg,r,meta,applyFilters));}
        tbody.appendChild(tr);
      });
      sec.querySelector('.ge-count').textContent=rows.length+' ban ghi';
      sec.querySelector('.ge-foot').textContent=rows.length+' / '+cfg.rows.length+' ban ghi';
    };
    function applyFilters(){
      let rows=cfg.rows.slice();
      if(curTab&&curTab!=='all') rows=rows.filter(r=>tabMatch(r,curTab));
      const sv=selEl?selEl.value:''; if(sv&&sv!=='Tất cả') rows=rows.filter(r=>stOf(r)===sv);
      const q=inpEl?inpEl.value.trim().toLowerCase():''; if(q) rows=rows.filter(r=>r.join(' ').toLowerCase().includes(q));
      render(rows);
    }
    if(isTxn){ (window.__TXN=window.__TXN||[]).push({cfg,meta,role,refresh:applyFilters}); }
    applyFilters();
    sec.querySelectorAll('.hd-tabs button').forEach(b=>b.addEventListener('click',()=>{
      sec.querySelectorAll('.hd-tabs button').forEach(x=>x.classList.remove('on'));
      b.classList.add('on'); curTab=b.dataset.tk; applyFilters();
    }));
    if(selEl) selEl.addEventListener('change',applyFilters);
    if(inpEl) inpEl.addEventListener('input',applyFilters);
    const addBtn=sec.querySelector('.ge-add');
    if(addBtn) addBtn.addEventListener('click',()=>openEditModal(cfg,null,meta,applyFilters));
    PAGE_MAP[cfg.code]=cfg.id; CRUMB_MAP[cfg.id]=cfg.crumb;
  }

  const S=[
  /* ---- B1: đầu vào / NCC ---- */
  {id:'hopdongncc',code:'DM_HOPDONG_NCC',crumb:'HOP DONG DAU VAO',title:'Hợp đồng đầu vào — <b>Mua NCC / Nhà máy</b>',desc:'Hợp đồng mua hàng đầu vào với nhà cung cấp / nhà máy, chạy song song với hợp đồng đầu ra.',addBtn:'Tạo HD đầu vào',grp:'DANH MỤC',
   kpis:[['t','file-earmark-text','Tổng HD đầu vào','38','HD','up','+4','so với tháng trước'],['a','currency-dollar','Tổng giá trị','196.4','ty','up','+9.1%','so với T5'],['s','clock-history','Sắp hết hạn','4','HD','dn','3 HD','trong 30 ngày'],['h','pen','Chờ ký','3','HD','eq','2 NM','· 1 NCC']],
   tabs:[['all','Tất cả','38'],['hieu luc','Đang hiệu lực','29'],['chờ ky','Chờ ký','3'],['het han','Sắp hết hạn','4']],statusOpts:['Đang hiệu lực','Chờ ký','Sắp hết hạn'],
   cols:['Ma HD','NCC / Nhà máy','Sản phẩm','KL hợp đồng','Da nhan','Giá trị','Ngày ký','Hiệu lực đến','Trạng thái'],num:[3,4,5],
   rows:[
    ['HD-NCC-2026-001','NM Xi mang Ha Long','Clinker','50,000 tan','32,400 tan','17.8 ty','15/03/2026','31/12/2026','s2|Đang hiệu lực'],
    ['HD-NCC-2026-002','NM Xi mang Bim Son','Clinker','30,000 tan','12,800 tan','10.4 ty','20/03/2026','30/11/2026','s2|Đang hiệu lực'],
    ['HD-NCC-2026-003','NM Hoang Long','Xi măng PCB40','25,000 tan','0 tan','8.1 ty','--','--','s4|Chờ ký'],
    ['HD-NCC-2026-004','NCC Thạch cao Lao','Thạch cao','15,000 tan','9,200 tan','3.0 ty','10/01/2026','30/09/2026','s2|Đang hiệu lực'],
    ['HD-NCC-2026-005','NM Mien Bac','Clinker','35,000 tan','35,000 tan','12.6 ty','05/12/2025','30/06/2026','s5|Sắp hết hạn'],
    ['HD-NCC-2026-006','NM Sai Gon','Xi măng','28,000 tan','0 tan','9.2 ty','--','--','s4|Chờ ký'],
   ]},
  {id:'donhangncc',code:'GD_DONHANG_NCC',crumb:'DON DAT HANG NCC',title:'Don dat hang NCC — <b>Mua hang đầu vào</b>',desc:'Don dat hang gửi nhà cung cấp / nhà máy theo kế hoạch giao hàng (Bước 2.1).',addBtn:'Tạo đơn dat hang',
   kpis:[['t','cart-plus','Don dat hang','64','DDH','up','+12','thang nay'],['a','currency-dollar','Tổng giá trị mua','142.8','ty','up','+8.4%','so với T5'],['s','hourglass-split','Chờ xác nhận','9','DDH','dn','3 NM','cham phan hoi'],['h','truck','Đang giao ve','18','DDH','eq','6 NM','đang vận chuyển']],
   tabs:[['all','Tất cả','64'],['da xác nhận','Da xác nhận','46'],['cho','Chờ xác nhận','9'],['đang giao','Đang giao','9']],statusOpts:['Da xác nhận','Chờ xác nhận','Đang giao'],
   cols:['Ma DDH','NCC','Sản phẩm','Khối lượng','Đơn giá','Thành tiền','Ngày dat','Giao den','Trạng thái'],num:[3,4,5],
   rows:[
    ['DDH-2026-0145','NM Xi mang Ha Long','Clinker','5,000 tan','548,000','2.74 ty','02/06/2026','Cang Cam Pha','s2|Da xác nhận'],
    ['DDH-2026-0144','NM Bim Son','Clinker','3,200 tan','542,000','1.73 ty','01/06/2026','Cang Cam Pha','s1|Đang giao'],
    ['DDH-2026-0143','NM Hoang Long','Xi măng PCB40','2,800 tan','1,180,000','3.30 ty','31/05/2026','NM Hoang Long','s4|Chờ xác nhận'],
    ['DDH-2026-0142','NCC Thạch cao Lao','Thạch cao','4,600 tan','410,000','1.89 ty','30/05/2026','Cang Quang Ninh','s2|Da xác nhận'],
    ['DDH-2026-0141','NM Mien Bac','Clinker','6,000 tan','536,000','3.22 ty','29/05/2026','Cảng Hải Phòng','s1|Đang giao'],
   ]},
  /* ---- B2: dat vỏ bao ---- */
  {id:'vobaodat',code:'GD_VOBAO_DAT',crumb:'KE HOACH & DAT VO BAO',title:'Kế hoạch &amp; dat vỏ bao (XK)',desc:'Dat vỏ bao theo mau ma, quy cach hợp đồng xuất khẩu chờ các nhà máy sản xuất vỏ bao.',addBtn:'Tạo đơn dat vỏ bao',
   kpis:[['t','bag','Don dat vỏ bao','22','đơn','up','+5','thang nay'],['a','box-seam','Tổng số lượng','1.82','triệu','up','+7.2%','so với T5'],['s','hourglass-split','Đang sản xuất','6','đơn','dn','2 NM','cham tiến độ'],['h','check2-circle','Đã giao NM','12','đơn','eq','du dong hang','']],
   tabs:[['all','Tất cả','22'],['da giao','Đã giao','12'],['đang sản xuất','Đang sản xuất','6'],['cho','Chờ dat','4']],statusOpts:['Đã giao','Đang sản xuất','Chờ dat'],
   cols:['Ma dat','Loai vỏ bao','Quy cách / Mau ma','So luong','NM san xuat','NM dong hang','Ngày can','Trạng thái'],num:[3],
   rows:[
    ['VB-DAT-2026-031','Vỏ bao PP','50kg · in 3 mau','120,000','NM Bao bi Tien Phong','NM Ha Long','05/06/2026','s4|Chờ dat'],
    ['VB-DAT-2026-030','Vỏ bao GI','50kg · KraftPP','80,000','NM Bao bi Viet Tri','NM Bim Son','03/06/2026','s1|Đang sản xuất'],
    ['VB-DAT-2026-029','Vỏ bao PP','25kg · in 2 mau','60,000','NM Bao bi Tien Phong','NM Hoang Long','01/06/2026','s2|Đã giao'],
    ['VB-DAT-2026-028','Vỏ bao GI','50kg · valve','100,000','NM Bao bi Viet Tri','NM Mien Bac','30/05/2026','s2|Đã giao'],
   ]},
  /* ---- B4: giao nhan ---- */
  {id:'nhanhangcang',code:'GD_NHANHANG_CANG',crumb:'NHAN HANG TAI CANG',title:'Nhận hàng tại cảng / qua cân nhà máy',desc:'Tiep nhan hang tại cang theo khối lượng qua cân nhà máy, lap phiếu nhan hang (Bước 3.1).',addBtn:'Tạo phiếu nhan',
   kpis:[['t','box-arrow-in-down','Phieu nhan hom nay','23','phiếu','up','+5','so với hôm qua'],['a','truck','Phuong tien','41','luot','eq','12 xe','đang cho'],['s','speedometer2','KL qua can','12,480','tan','up','+8.6%','so với hôm qua'],['h','hourglass','Đang nhan','8','phiếu','dn','2 cang','đang lam']],
   tabs:[['all','Tất cả','23'],['da nhan','Da nhan','15'],['đang nhan','Đang nhan','8']],statusOpts:['Da nhan','Đang nhan'],
   cols:['Ma phiếu','Đơn hàng','Sản phẩm','Phuong tien','KL qua can (tan)','Cang / NM','Ngày nhan','Trạng thái'],num:[4],
   rows:[
    ['PN-2026-0782','DH-2026-0319','Clinker','30C-451.88','420','Cang Cam Pha','03/06/2026','s2|Da nhan'],
    ['PN-2026-0781','DH-2026-0318','Clinker','29H-112.04','380','NM Ha Long','03/06/2026','s2|Da nhan'],
    ['PN-2026-0780','DH-2026-0317','Xi măng PCB40','30C-778.21','310','NM Hoang Long','03/06/2026','s1|Đang nhan'],
    ['PN-2026-0779','DH-2026-0316','Clinker','15B-330.19','450','Cang Quang Ninh','02/06/2026','s1|Đang nhan'],
   ]},
  {id:'bangiaosalan',code:'GD_BANGIAO_SALAN',crumb:'BAN GIAO SA LAN',title:'Bàn giao sà lan — <b>niêm chi · BB giao nhan</b>',desc:'Kep chi sa lan, chup anh ham hang, lap phiếu giao hàng và bien bàn giao nhan chờ sa lan (Bước 3.3).',addBtn:'Tạo bàn giao',
   kpis:[['t','file-earmark-check','Ban giao hom nay','17','sa lan','up','+3','so với hôm qua'],['a','shield-lock','Niem chi','34','niem','eq','2 niem/sa lan',''],['s','images','Co anh ham hang','15','/17','up','88%','da chup'],['h','hourglass','Chờ bàn giao','4','sa lan','dn','đang xếp','']],
   tabs:[['all','Tất cả','17'],['da bàn giao','Da bàn giao','13'],['cho','Chờ bàn giao','4']],statusOpts:['Da bàn giao','Chờ bàn giao'],
   cols:['Ma bàn giao','Sa lan','So niêm chi','Sản phẩm','KL (tan)','BB giao nhan','Ngay','Trạng thái'],num:[4],
   rows:[
    ['BG-2026-0455','SL-Truong Thanh 06','NC-88213 / NC-88214','Clinker','1,200','Da ky','03/06/2026','s2|Da bàn giao'],
    ['BG-2026-0454','SL-Hoang Ha 12','NC-88210 / NC-88211','Clinker','980','Da ky','03/06/2026','s2|Da bàn giao'],
    ['BG-2026-0453','SL-Minh Phu 03','NC-88208','Xi măng','760','Chua ky','02/06/2026','s4|Chờ bàn giao'],
    ['BG-2026-0452','SL-Truong Thanh 09','NC-88205 / NC-88206','Clinker','1,100','Da ky','02/06/2026','s2|Da bàn giao'],
   ]},
  {id:'thuhoichungtu',code:'GD_THUHOI_CHUNGTU',crumb:'THU HOI CHUNG TU',title:'Thu hồi chứng từ',desc:'Thu hồi phiếu cân cang/nhà máy, hoa đơn do, bang ke khối lượng qua can ve van phong (Bước 3.4).',addBtn:'Tạo phiếu thu hồi',
   kpis:[['t','arrow-return-left','Thu hồi hom nay','29','chứng từ','up','+6','so với hôm qua'],['a','file-earmark-text','Phiếu cân','18','phiếu','eq','da về VP',''],['s','receipt','Hóa đơn do','7','HD','dn','3 thieu','chưa ve'],['h','exclamation-triangle','Con thieu','5','chứng từ','dn','can đọc thực','']],
   tabs:[['all','Tất cả','29'],['da thu hồi','Da thu hồi','24'],['con thieu','Con thieu','5']],statusOpts:['Da thu hồi','Con thieu'],
   cols:['Ma thu hồi','Loai chứng từ','Đơn hàng / Lo','Sa lan / Xe','Nguoi thu hồi','Ngay','Trạng thái'],num:[],
   rows:[
    ['TH-2026-0611','Phiếu cân cang','DH-2026-0319','SL-Truong Thanh 06','NV Lai','03/06/2026','s2|Da thu hồi'],
    ['TH-2026-0610','Hóa đơn do','DH-2026-0318','30C-451.88','NV Tu','03/06/2026','s2|Da thu hồi'],
    ['TH-2026-0609','Bang ke qua can','DH-2026-0317','SL-Minh Phu 03','NV Lai','02/06/2026','s8|Con thieu'],
    ['TH-2026-0608','Phiếu cân nhà máy','DH-2026-0316','29H-112.04','NV Tu','02/06/2026','s2|Da thu hồi'],
   ]},
  /* ---- B5: làm hàng ---- */
  {id:'kiemtraham',code:'GD_KIEMTRA_HAM',crumb:'KIEM TRA / DANH TAY HAM',title:'Kiểm tra / đánh tay hầm',desc:'Kiem tra đơn vi đánh tay ham hang da sach trước khi xuất hang lên tàu (Bước 4.1).',addBtn:'Tạo phiếu kiểm tra',
   kpis:[['t','clipboard-check','Kiem tra hom nay','12','ham','up','+2','so với hôm qua'],['a','check2-circle','Dat','9','ham','up','75%','da sach'],['s','x-circle','Chua dat','3','ham','dn','can ve sinh lai',''],['h','people','Giam sat','5','NV','eq','đang truc',''] ],
   tabs:[['all','Tất cả','12'],['dat','Dat','9'],['chưa dat','Chua dat','3']],statusOpts:['Dat','Chua dat'],
   cols:['Ma kiểm tra','Tau bien','Ham so','Ket qua','Nguoi kiểm tra','Ngay','Trạng thái'],num:[],
   rows:[
    ['KT-2026-0233','MV Ocean Star','Ham 1','Sach','NV Giam sat QN','03/06/2026','s2|Dat'],
    ['KT-2026-0232','MV Ocean Star','Ham 2','Con bui','NV Giam sat QN','03/06/2026','s8|Chua dat'],
    ['KT-2026-0231','MV Blue Sky','Ham 1','Sach','NV Giam sat QN','02/06/2026','s2|Dat'],
    ['KT-2026-0230','MV Blue Sky','Ham 3','Sach','NV Giam sat QN','02/06/2026','s2|Dat'],
   ]},
  {id:'lamhangtau',code:'GD_LAMHANG_TAU',crumb:'TIME SHEET (NOR / LAYTIME)',title:'Time sheet (NOR / laytime)',desc:'Theo dõi thoi gian làm hàng: NOR, bat dau/ket thuc xep, laytime, demurrage/despatch.',addBtn:'Tạo time sheet',
   kpis:[['t','clock','Tau đang xếp','3','tau','eq','tại QN',''],['a','hourglass-split','Laytime con','42','gio','dn','2 tau gán han',''],['s','cash-coin','Demurrage dự kiến','-180','tr','dn','1 tau tre','rui ro'],['h','check2-circle','Hoan thanh thang','8','tau','up','+2','so với T5']],
   tabs:[['all','Tất cả','11'],['đang xếp','Đang xep','3'],['hoan thanh','Hoan thanh','8']],statusOpts:['Đang xep','Hoan thanh'],
   cols:['Ma lô xuất','Tau bien','NOR tendered','Bắt đầu xep','Ket thuc','Laytime','Demurrage/Despatch','Trạng thái'],num:[],
   rows:[
    ['LX-2026-0091','MV Ocean Star','01/06 08:00','01/06 14:00','--','72h','--','s1|Đang xep'],
    ['LX-2026-0090','MV Blue Sky','31/05 06:00','31/05 10:00','02/06 18:00','96h','+64 tr despatch','s2|Hoan thanh'],
    ['LX-2026-0089','MV Sea Dragon','29/05 09:00','29/05 15:00','01/06 20:00','72h','-180 tr demurrage','s2|Hoan thanh'],
   ]},
  {id:'domonkiemdem',code:'GD_DOMON_KIEMDEM',crumb:'DO MON & KIEM DEM',title:'Do mon &amp; kiem dem',desc:'Do mon nuoc (clinker) và kiem dem (xi mang) khi xuất hang từ sa lan lên tàu biển (Bước 4.2).',addBtn:'Tạo bien ban',
   kpis:[['t','rulers','Do mon hom nay','9','lo','up','+2','so với hôm qua'],['a','speedometer2','KL chot','8,640','tan','up','+6.1%','so với hôm qua'],['s','arrow-left-right','Chênh lệch','-42','tan','dn','2 lo lech','can kiểm tra'],['h','check2-circle','Khop','7','/9','up','78%','trong nguong']],
   tabs:[['all','Tất cả','9'],['khop','Khop','7'],['chenh lech','Chênh lệch','2']],statusOpts:['Khop','Chênh lệch'],
   cols:['Ma lô xuất','Tau / Sa lan','Sản phẩm','Mon trước','Mon sau','KL dỡ món (tan)','KL kiem dem (tan)','Chênh lệch','Trạng thái'],num:[5,6,7],
   rows:[
    ['LX-2026-0091','SL-Truong Thanh 06','Clinker','1.82 m','3.04 m','1,205','--','+5','s2|Khop'],
    ['LX-2026-0091','SL-Hoang Ha 12','Clinker','1.78 m','2.66 m','978','--','-2','s2|Khop'],
    ['LX-2026-0090','SL-Minh Phu 03','Xi măng','--','--','--','758','-22','s8|Chênh lệch'],
    ['LX-2026-0090','SL-Truong Thanh 09','Clinker','1.80 m','2.92 m','1,096','--','-20','s8|Chênh lệch'],
   ]},
  {id:'sucotonthat',code:'GD_SUCO_TONTHAT',crumb:'BAO RACH VO · SU CO & TON THAT',title:'Báo rách vỏ · Su có &amp; tổn thất',desc:'Kiem soat báo rách vo, lap bien ban xác nhận khối lượng tổn thất từng sa lan để thanh quyết toán.',addBtn:'Tạo bien ban sự cố',
   kpis:[['t','exclamation-triangle','Su có thang','14','vu','dn','+3','so với T5'],['a','box','Bao rach','312','bao','dn','+45','so với T5'],['s','graph-down','KL tổn thất','18.6','tan','dn','0.21%','tren tong'],['h','cash-stack','Giá trị tổn thất','-148','tr','dn','đang doi tru','NCC/VC']],
   tabs:[['all','Tất cả','14'],['đang xu ly','Đang xử lý','6'],['da xu ly','Da xu ly','8']],statusOpts:['Đang xử lý','Da xu ly'],
   cols:['Ma sự cố','Lo / Sa lan','Loai sự cố','So báo rách','KL tổn thất (tan)','Giá trị','Don vi chiu','Ngay','Trạng thái'],num:[3,4,5],
   rows:[
    ['SC-2026-0077','SL-Minh Phu 03','Báo rách vỏ','120','3.0','-24 tr','Nha thau VC','02/06/2026','s4|Đang xử lý'],
    ['SC-2026-0076','SL-Hoang Ha 12','Roi vai khi xuc','--','2.4','-19 tr','Don vi xuc dao','01/06/2026','s2|Da xu ly'],
    ['SC-2026-0075','SL-Truong Thanh 09','Báo rách vỏ','95','2.1','-17 tr','Nha thau VC','01/06/2026','s2|Da xu ly'],
    ['SC-2026-0074','MV Ocean Star','Am uot ham','--','5.2','-42 tr','Bao hiem','31/05/2026','s4|Đang xử lý'],
   ]},
  {id:'dichvuphutro',code:'GD_DICHVU_PHUTRO',crumb:'DICH VU PHU TRO',title:'Dịch vụ phụ trợ (sàn gạt, xuc dao...)',desc:'Quản lý các dịch vụ phụ trợ trong qua trinh làm hàng: sàn gạt, xuc dao, ho tro xếp hàng.',addBtn:'Tạo yeu cau DV',
   kpis:[['t','tools','DV thang nay','26','lan','up','+4','so với T5'],['a','currency-dollar','Chi phi DV','-642','tr','dn','+8%','so với T5'],['s','hourglass','Đang thực hiện','5','DV','eq','tại 2 tau',''],['h','check2-circle','Da nghiem thu','21','DV','up','81%','hoan thanh']],
   tabs:[['all','Tất cả','26'],['da nghiem thu','Da nghiem thu','21'],['dang','Đang thực hiện','5']],statusOpts:['Da nghiem thu','Đang thực hiện'],
   cols:['Ma DV','Loai dịch vụ','Don vi cung cap','Khối lượng','Đơn giá','Thành tiền','Lo lien quan','Trạng thái'],num:[3,4,5],
   rows:[
    ['DV-2026-0188','San gat ham','Cty San gat Quang Ninh','1,200 tan','18,000','21.6 tr','LX-2026-0091','s2|Da nghiem thu'],
    ['DV-2026-0187','Xuc dao','Cty Co gioi Cam Pha','980 tan','22,000','21.6 tr','LX-2026-0091','s1|Đang thực hiện'],
    ['DV-2026-0186','Ho tro xep','Nha thau boc xep HL','760 tan','15,000','11.4 tr','LX-2026-0090','s2|Da nghiem thu'],
   ]},
  {id:'sanluongngày',code:'GD_SANLUONG_NGAY',crumb:'SAN LUONG DONG THEO NGAY',title:'Sản lượng đóng theo ngày',desc:'Theo dõi sản lượng dong hang theo ngày chờ từng tau, luy ke và tiến độ so với kế hoạch.',addBtn:'Nhap sản lượng',
   kpis:[['t','calendar-check','Hôm nay','3,240','tan','up','+12%','so với hôm qua'],['a','bar-chart','Luy ke tau','18,640','tan','up','72%','kế hoạch'],['s','clock-history','So ngày con','2','ngày','eq','dự kiến xong',''],['h','speedometer','Toc do TB','3,100','tan/ngày','up','+5%','so với KH']],
   tabs:[['all','Tất cả','12'],['dat','Dat KH','8'],['duoi','Duoi KH','4']],statusOpts:['Dat KH','Duoi KH'],
   cols:['Ngay','Tau bien','Sản phẩm','KL dong (tan)','Luy ke (tan)','% KH','So sa lan','Trạng thái'],num:[3,4,5,6],
   rows:[
    ['03/06/2026','MV Ocean Star','Clinker','3,240','18,640','72%','4','s2|Dat KH'],
    ['02/06/2026','MV Ocean Star','Clinker','2,980','15,400','60%','3','s8|Duoi KH'],
    ['01/06/2026','MV Ocean Star','Clinker','3,420','12,420','48%','4','s2|Dat KH'],
    ['31/05/2026','MV Blue Sky','Xi măng','2,760','9,000','35%','3','s8|Duoi KH'],
   ]},
  /* ---- B6: hải quan & XNK ---- */
  {id:'tokhaihaiquan',code:'GD_TOKHAI_HAIQUAN',crumb:'TO KHAI HAI QUAN',title:'Tờ khai hải quan (NK / XK)',desc:'Lap to khai nhập khau / xuất khẩu theo quy dinh, theo dõi phan luong và thong quan.',addBtn:'Tạo to khai',
   kpis:[['t','file-earmark-ruled','Tờ khai thang','58','TK','up','+6','so với T5'],['a','check2-circle','Da thong quan','49','TK','up','84%','hoan thanh'],['s','exclamation-circle','Luong do/vang','7','TK','dn','can kiem hoa',''],['h','hourglass','Đang xử lý','9','TK','eq','tại chi cuc',''] ],
   tabs:[['all','Tất cả','58'],['thong quan','Thong quan','49'],['dang','Đang xử lý','9']],statusOpts:['Thong quan','Đang xử lý'],
   cols:['So to khai','Loai','Đơn hàng','Sản phẩm','KL (tan)','Tri gia','Ngày đang ky','Phan luong','Trạng thái'],num:[4,5],
   rows:[
    ['105xxxxxxx1','XK','DH-2026-0319','Clinker','5,000','2.4 ty','02/06/2026','Xanh','s2|Thong quan'],
    ['105xxxxxxx2','XK','DH-2026-0318','Clinker','3,200','1.8 ty','02/06/2026','Vang','s1|Đang xử lý'],
    ['103xxxxxxx7','NK','DDH-2026-0143','Thạch cao','4,600','1.9 ty','01/06/2026','Do','s1|Đang xử lý'],
    ['105xxxxxxx3','XK','DH-2026-0316','Clinker','8,000','3.1 ty','31/05/2026','Xanh','s2|Thong quan'],
   ]},
  {id:'thuexnk',code:'GD_THUE_XNK',crumb:'THUE XNK',title:'Thuế XNK (nộp thuế NK / hoan thuế XK)',desc:'Quản lý nghia vu thuế NK, hoan thuế XK; lap đề nghị nộp thuế trước khi tàu cập cảng.',addBtn:'Tạo đề nghị thue',
   kpis:[['t','receipt','Phải nộp thang','3.84','ty','dn','+0.4 ty','so với T5'],['a','check2-circle','Da nop','2.96','ty','up','77%','hoan thanh'],['s','arrow-counterclockwise','Hoan thuế XK','1.24','ty','up','3 hồ sơ','đang xu ly'],['h','calendar-event','Den han','2','khoan','dn','trong 5 ngày','']],
   tabs:[['all','Tất cả','16'],['da nop','Da nop','11'],['cho','Chờ nop','5']],statusOpts:['Da nop','Chờ nop'],
   cols:['Ma','Loai thue','Tờ khai','So tien','Han nop','Ngày nop','Đơn hàng','Trạng thái'],num:[3],
   rows:[
    ['T-2026-0091','Thue NK','103xxxxxxx7','420 tr','05/06/2026','--','DDH-2026-0143','s4|Chờ nop'],
    ['T-2026-0090','VAT NK','103xxxxxxx7','190 tr','05/06/2026','--','DDH-2026-0143','s4|Chờ nop'],
    ['T-2026-0089','Hoan thuế XK','105xxxxxxx1','-380 tr','--','--','DH-2026-0319','s1|Đang xử lý'],
    ['T-2026-0088','Thue NK','103xxxxxxx5','310 tr','28/05/2026','27/05/2026','DDH-2026-0140','s2|Da nop'],
   ]},
  {id:'chungnhan',code:'GD_CHUNGC_HAN',crumb:'CHUNG NHAN (C/O...)',title:'Chứng nhận (C/O, Fumi, Phyto...)',desc:'Theo dõi cap các chứng nhận xuất xu (C/O), hun trung (Fumi), kiem dich (Phyto) chờ lô hàng.',addBtn:'Tạo hồ sơ chứng nhận',
   kpis:[['t','patch-check','Ho so thang','34','HS','up','+5','so với T5'],['a','check2-circle','Da cap','27','HS','up','79%','hoan thanh'],['s','hourglass','Đang xử lý','7','HS','eq','tại có quan',''],['h','exclamation-circle','Gan han tau','3','HS','dn','can gap','']],
   tabs:[['all','Tất cả','34'],['da cap','Da cap','27'],['dang','Đang xử lý','7']],statusOpts:['Da cap','Đang xử lý'],
   cols:['Ma','Loai chứng nhận','Đơn hàng','Co quan cap','Ngày nop','Ngày cap','Trạng thái'],num:[],
   rows:[
    ['CO-2026-0142','C/O form E','DH-2026-0319','VCCI','02/06/2026','03/06/2026','s2|Da cap'],
    ['FU-2026-0091','Fumigation','DH-2026-0319','Cty Hun trung VN','02/06/2026','--','s1|Đang xử lý'],
    ['CO-2026-0141','C/O form D','DH-2026-0316','VCCI','31/05/2026','01/06/2026','s2|Da cap'],
    ['PH-2026-0033','Phytosanitary','DH-2026-0315','Chi cuc KD','30/05/2026','--','s1|Đang xử lý'],
   ]},
  {id:'checklisthoso',code:'GD_CHECKLIST_HOSO',crumb:'CHECKLIST HO SO LO HANG',title:'Checklist hồ sơ lô hàng',desc:'Kiem tra do day du hồ sơ chứng từ chờ từng lô hàng trước khi quyết toán / cap C/O.',addBtn:'Tạo checklist',
   kpis:[['t','list-check','Lo đang theo dõi','12','lo','eq','đang mo',''],['a','check2-all','Dày du hồ sơ','8','lo','up','67%','san sang QT'],['s','exclamation-triangle','Con thieu','4','lo','dn','can bổ sung',''],['h','percent','TB hoan thanh','86','%','up','+4%','so với T5']],
   tabs:[['all','Tất cả','12'],['day du','Dày du','8'],['con thieu','Con thieu','4']],statusOpts:['Dày du','Con thieu'],
   cols:['Lo hang','Đơn hàng','So muc','Da co','Con thieu','% hoan thanh','Trạng thái'],num:[2,3,4,5],
   rows:[
    ['LO-XK-019','DH-2026-0319','14','14','0','100%','s2|Dày du'],
    ['LO-XK-018','DH-2026-0318','14','12','2','86%','s8|Con thieu'],
    ['LO-XK-017','DH-2026-0317','14','14','0','100%','s2|Dày du'],
    ['LO-XK-016','DH-2026-0316','14','9','5','64%','s8|Con thieu'],
   ]},
  {id:'tailieudinhkem',code:'GD_TAILIEU_DINHKEM',crumb:'TAI LIEU DINH KEM',title:'Tài liệu đính kèm',desc:'Kho tài liệu, chứng từ scan đính kèm theo lô hàng / đơn hàng.',addBtn:'Tai lên tài liệu',
   kpis:[['t','folder','Tai lieu','248','file','up','+22','thang nay'],['a','hdd','Dung luong','1.4','GB','up','+120MB','thang nay'],['s','check2-circle','Đã duyệt','214','file','up','86%','hoan thanh'],['h','hourglass','Chờ duyệt','34','file','eq','2 nguoi',''] ],
   tabs:[['all','Tất cả','248'],['da duyet','Đã duyệt','214'],['cho','Chờ duyệt','34']],statusOpts:['Đã duyệt','Chờ duyệt'],
   cols:['Ten tài liệu','Loai','Lo / Đơn hàng','Nguoi tại len','Dung luong','Ngay','Trạng thái'],num:[],
   rows:[
    ['BL_DH0319.pdf','Bill of Lading','DH-2026-0319','Ms Trang','420 KB','03/06/2026','s2|Đã duyệt'],
    ['Invoice_DH0319.pdf','Hóa đơn TM','DH-2026-0319','Ms Trang','180 KB','03/06/2026','s2|Đã duyệt'],
    ['PackingList_0318.xlsx','Packing list','DH-2026-0318','Ms Ha','96 KB','02/06/2026','s4|Chờ duyệt'],
    ['Anh_ham_0319.zip','Anh ham hang','DH-2026-0319','NV Giam sat','12 MB','02/06/2026','s4|Chờ duyệt'],
   ]},
  /* ---- B7: hoa đơn, quyết toán ---- */
  {id:'quyettoanhang',code:'GD_QUYETTOAN_HANG',crumb:'QUYET TOAN HANG HOA',title:'Quyết toán hàng hóa (nhà máy / NCC)',desc:'Đối chiếu sản lượng đầu vào - đầu ra, chốt khối lượng và giá trị quyết toán với nhà máy / NCC.',addBtn:'Tạo quyết toán',
   kpis:[['t','file-earmark-check','QT thang','22','lo','up','+4','so với T5'],['a','currency-dollar','Giá trị QT','86.4','ty','up','+7%','so với T5'],['s','arrow-left-right','Chênh lệch','-1.2','ty','dn','tong tổn thất',''],['h','hourglass','Đang đối chiếu','6','lo','eq','với 3 NCC',''] ],
   tabs:[['all','Tất cả','22'],['da quyết toán','Da quyết toán','16'],['đang đối chiếu','Đang đối chiếu','6']],statusOpts:['Da quyết toán','Đang đối chiếu'],
   cols:['Ma QT','Đối tác (NM/NCC)','Lo hang','KL đầu vào','KL đầu ra','Chênh lệch','Giá trị QT','Trạng thái'],num:[3,4,5,6],
   rows:[
    ['QT-H-2026-0061','NM Xi mang Ha Long','LO-XK-019','5,000','4,980','-20','2.40 ty','s2|Da quyết toán'],
    ['QT-H-2026-0060','NM Bim Son','LO-XK-018','3,200','3,176','-24','1.72 ty','s4|Đang đối chiếu'],
    ['QT-H-2026-0059','NCC Thạch cao Lao','LO-XK-017','4,600','4,580','-20','1.88 ty','s2|Da quyết toán'],
    ['QT-H-2026-0058','NM Mien Bac','LO-XK-016','6,000','5,948','-52','3.18 ty','s4|Đang đối chiếu'],
   ]},
  {id:'quyettoanvt',code:'GD_QUYETTOAN_VT',crumb:'QUYET TOAN VAN TAI',title:'Quyết toán vận tải (nha thau VC)',desc:'Lap bien ban thanh quyết toán khối lượng, bồi thường tổn thất và đề nghị thanh toán chờ nha thau VC.',addBtn:'Tạo quyết toán VT',
   kpis:[['t','truck','QT van tại thang','19','BB','up','+3','so với T5'],['a','currency-dollar','Chi phi VC','-12.8','ty','dn','+6%','so với T5'],['s','dash-circle','Boi thuong tru','-186','tr','dn','tổn thất hang',''],['h','hourglass','Chờ duyệt','5','BB','eq','TP/GD',''] ],
   tabs:[['all','Tất cả','19'],['da quyết toán','Da quyết toán','14'],['cho','Chờ duyệt','5']],statusOpts:['Da quyết toán','Chờ duyệt'],
   cols:['Ma QT','Nha thau VC','Tuyến','KL VC (tan)','Đơn giá','Thành tiền','Boi thuong','Trạng thái'],num:[3,4,5,6],
   rows:[
    ['QT-VT-2026-0044','SL Truong Thanh','Cam Pha - QN','1,205','62,000','74.7 tr','-12 tr','s2|Da quyết toán'],
    ['QT-VT-2026-0043','SL Hoang Ha','Hai Phong - QN','978','68,000','66.5 tr','0','s4|Chờ duyệt'],
    ['QT-VT-2026-0042','VT Biển Đông','QN - Da Nang','2,400','185,000','444 tr','-42 tr','s2|Da quyết toán'],
   ]},
  {id:'quyettoanvobao',code:'GD_QUYETTOAN_VOBAO',crumb:'QUYET TOAN VO BAO',title:'Quyết toán vỏ bao (XK)',desc:'Quyết toán vỏ bao cua tau xuất khẩu, lap đề nghị xuất hoa đơn ban vỏ bao.',addBtn:'Tạo quyết toán vỏ bao',
   kpis:[['t','bag-check','QT vỏ bao thang','8','tau','up','+2','so với T5'],['a','box-seam','SL quyết toán','640','nghin','up','+5%','so với T5'],['s','arrow-left-right','Chênh lệch','-3,200','cai','dn','hao hut',''],['h','hourglass','Đang đối chiếu','3','tau','eq','với NM',''] ],
   tabs:[['all','Tất cả','8'],['da quyết toán','Da quyết toán','5'],['đang đối chiếu','Đang đối chiếu','3']],statusOpts:['Da quyết toán','Đang đối chiếu'],
   cols:['Ma QT','Tau XK','Loai vỏ bao','SL cap','SL dong','Chênh lệch','Giá trị','Trạng thái'],num:[3,4,5],
   rows:[
    ['QT-VB-2026-0019','MV Ocean Star','Vỏ bao PP','120,000','118,800','-1,200','648 tr','s2|Da quyết toán'],
    ['QT-VB-2026-0018','MV Blue Sky','Vỏ bao GI','80,000','79,200','-800','456 tr','s4|Đang đối chiếu'],
    ['QT-VB-2026-0017','MV Sea Dragon','Vỏ bao PP','100,000','98,800','-1,200','540 tr','s2|Da quyết toán'],
   ]},
  {id:'chiphivantai',code:'GD_CHIPHI_VANTAI',crumb:'CHI PHI / PHAT SINH',title:'Chi phí / phát sinh (phat, bồi thường BH)',desc:'Theo dõi chi phí van tại và các khoan phát sinh: phat thoi gian, bồi thường bao hiem.',addBtn:'Tạo chi phí',
   kpis:[['t','wallet2','Chi phi thang','-14.2','ty','dn','+8%','so với T5'],['a','exclamation-octagon','Phat phát sinh','-320','tr','dn','3 vu','tre thoi gian'],['s','shield-check','Boi thuong BH','+180','tr','up','1 vu','đang doi'],['h','hourglass','Chờ duyệt','6','khoan','eq','TP/GD',''] ],
   tabs:[['all','Tất cả','28'],['da duyet','Đã duyệt','22'],['cho','Chờ duyệt','6']],statusOpts:['Đã duyệt','Chờ duyệt'],
   cols:['Ma chi phí','Loai','Lo / Tuyến','So tien','Phat / Boi thuong','Đối tác','Ngay','Trạng thái'],num:[3,4],
   rows:[
    ['CP-2026-0231','Cuoc sa lan','Cam Pha - QN','-74.7 tr','--','SL Truong Thanh','02/06/2026','s2|Đã duyệt'],
    ['CP-2026-0230','Phat laytime','MV Sea Dragon','-180 tr','Phat','Chu tau','01/06/2026','s4|Chờ duyệt'],
    ['CP-2026-0229','Boi thuong BH','SL Minh Phu 03','+180 tr','Boi thuong','Bao hiem PVI','31/05/2026','s1|Đang doi'],
   ]},
  {id:'denghihoađơn',code:'GD_DENGHI_HOADON',crumb:'DE NGHI XUAT HOA DON',title:'Đề nghị xuất hóa đơn',desc:'Lap đề nghị xuất hoa đơn ban hang sau khi quyết toán lô hàng với nhà máy và khách hàng.',addBtn:'Tạo đề nghị',
   kpis:[['t','file-earmark-plus','Đề nghị thang','41','DN','up','+6','so với T5'],['a','currency-dollar','Giá trị','92.4','ty','up','+7%','so với T5'],['s','check2-circle','Đã xuất HD','33','DN','up','80%','hoan thanh'],['h','hourglass','Chờ xuất','8','DN','eq','KT xu ly',''] ],
   tabs:[['all','Tất cả','41'],['da xuat','Đã xuất','33'],['chờ xuat','Chờ xuất','8']],statusOpts:['Đã xuất','Chờ xuất'],
   cols:['Ma DN','Đơn hàng','Khách hàng','Noi dung','Giá trị','Nguoi đề nghị','Ngay','Trạng thái'],num:[4],
   rows:[
    ['DN-2026-0312','DH-2026-0319','Cty CP Xi măng Hạ Long','Ban Clinker lo 019','2.40 ty','Ms Trang','03/06/2026','s4|Chờ xuất'],
    ['DN-2026-0311','DH-2026-0318','Vinaconex X1','Ban Clinker lo 018','1.72 ty','Ms Trang','03/06/2026','s2|Đã xuất'],
    ['DN-2026-0310','DH-2026-0316','Cty TNHH VLXD Sai Gon','Ban Clinker lo 016','3.18 ty','Ms Ha','02/06/2026','s2|Đã xuất'],
   ]},
  {id:'hoađơn',code:'GD_HOADON',crumb:'HOA DON',title:'Hóa đơn (+ chi tiết)',desc:'Quản lý hoa đơn ban hang da phat hanh, đối chiếu với đề nghị và quyết toán.',addBtn:'Xuat hoa đơn',
   kpis:[['t','receipt','Hóa đơn thang','156','HD','up','+14','so với T5'],['a','currency-dollar','Doanh thu','248.6','ty','up','+11%','so với T5'],['s','percent','VAT đầu ra','24.8','ty','up','+1.1 ty','so với T5'],['h','hourglass','Chờ phat hanh','8','HD','eq','đang ky so',''] ],
   tabs:[['all','Tất cả','156'],['da phat hanh','Da phat hanh','148'],['cho','Chờ phat hanh','8']],statusOpts:['Da phat hanh','Chờ phat hanh'],
   cols:['So hoa đơn','Đơn hàng','Khách hàng','Tien hang','VAT','Tổng cong','Ngày xuat','Trạng thái'],num:[3,4,5],
   rows:[
    ['00012845','DH-2026-0318','Vinaconex X1','1.72 ty','172 tr','1.89 ty','03/06/2026','s2|Da phat hanh'],
    ['00012844','DH-2026-0316','Cty TNHH VLXD Sai Gon','3.18 ty','318 tr','3.50 ty','02/06/2026','s2|Da phat hanh'],
    ['--','DH-2026-0319','Cty CP Xi măng Hạ Long','2.40 ty','240 tr','2.64 ty','--','s4|Chờ phat hanh'],
   ]},
  {id:'vaytrahang',code:'GD_VAYTRA_HANG',crumb:'VAY / TRA HANG DOI TAC',title:'Vay / trả hàng đối tác',desc:'Theo dõi công nợ hàng hóa: vay hang và tra hang doi với các đối tác, nhà máy.',addBtn:'Tạo phiếu vay/tra',
   kpis:[['t','arrow-left-right','Giao dich thang','18','phiếu','eq','6 đối tác',''],['a','box-arrow-down','Đang vay','2,400','tan','dn','3 đối tác',''],['s','box-arrow-up','Phai tra','1,800','tan','dn','can can doi',''],['h','exclamation-triangle','Qua han tra','1','phiếu','dn','cần xử lý','']],
   tabs:[['all','Tất cả','18'],['da tra','Da tra','12'],['con no','Con no','6']],statusOpts:['Da tra','Con no'],
   cols:['Ma','Đối tác','Sản phẩm','KL vay (tan)','KL tra (tan)','Con lại (tan)','Ngay','Trạng thái'],num:[3,4,5],
   rows:[
    ['VT-2026-0033','NM Ha Long','Clinker','1,200','1,200','0','28/05/2026','s2|Da tra'],
    ['VT-2026-0032','NM Bim Son','Clinker','800','300','500','30/05/2026','s8|Con no'],
    ['VT-2026-0031','NM Hoang Long','Xi măng','600','600','0','25/05/2026','s2|Da tra'],
   ]},
  /* ---- B8: công nợ & dòng tiền ---- */
  {id:'dntt',code:'GD_DNTT',crumb:'DE NGHI THANH TOAN (DNTT)',title:'Đề nghị thanh toán (DNTT)',desc:'Lap đề nghị thanh toán chờ NCC, nha thau, chi phí; trinh duyệt nhiều cấp.',addBtn:'Tạo DNTT',
   kpis:[['t','file-earmark-text','DNTT thang','72','DN','up','+9','so với T5'],['a','currency-dollar','Giá trị','64.2','ty','up','+6%','so với T5'],['s','check2-circle','Đã duyệt','58','DN','up','81%','hoan thanh'],['h','hourglass','Chờ duyệt','14','DN','dn','TP/GD','cần xử lý']],
   tabs:[['all','Tất cả','72'],['da duyet','Đã duyệt','58'],['cho','Chờ duyệt','14']],statusOpts:['Đã duyệt','Chờ duyệt'],
   cols:['Ma DNTT','Đối tác','Noi dung','So tien','Han TT','Nguoi đề nghị','Duyệt','Trạng thái'],num:[3],
   rows:[
    ['DNTT-2026-0488','NM Ha Long','Mua Clinker DDH-0145','2.74 ty','08/06/2026','Ms Trang','GD','s2|Đã duyệt'],
    ['DNTT-2026-0487','SL Truong Thanh','Cuoc VC QT-VT-0044','74.7 tr','06/06/2026','Ms Ha','TP','s4|Chờ duyệt'],
    ['DNTT-2026-0486','Bao bi Tien Phong','Vỏ bao VB-DAT-031','648 tr','10/06/2026','NV Vỏ bao','GD','s4|Chờ duyệt'],
   ]},
  {id:'thanhtoan',code:'GD_THANHTOAN',crumb:'THANH TOAN (THU / CHI)',title:'Thanh toán (thu / chi)',desc:'Ghi nhan các giao dich thu / chi gán với tài khoản ngân hàng và quy.',addBtn:'Tạo phiếu thu/chi',
   kpis:[['t','arrow-down-circle','Thu thang','186.4','ty','up','+12%','so với T5'],['a','arrow-up-circle','Chi thang','142.8','ty','dn','+7%','so với T5'],['s','wallet2','Dòng tiền rong','+43.6','ty','up','duong','an toan'],['h','hourglass','Chờ hach toan','7','phiếu','eq','KT xu ly',''] ],
   tabs:[['all','Tất cả','248'],['thu','Thu','132'],['chi','Chi','116']],statusOpts:['Da hach toan','Chờ hach toan'],
   cols:['Ma phiếu','Loai','Đối tác','So tien','Tai khoan / Quy','Ngay','Chung tu','Trạng thái'],num:[3],
   rows:[
    ['PT-2026-0921','Thu','CNBM — Trung Quốc','1.89 ty','VCB - 0451','03/06/2026','HD 00012845','s2|Da hach toan'],
    ['PC-2026-0640','Chi','NM Ha Long','2.74 ty','VCB - 0451','03/06/2026','DNTT-0488','s2|Da hach toan'],
    ['PT-2026-0920','Thu','Chip Mong Insee — Campuchia','3.50 ty','BIDV - 7782','02/06/2026','HD 00012844','s4|Chờ hach toan'],
   ]},
  {id:'congno',code:'GD_CONGNO',crumb:'DOI CHIEU & SO CONG NO',title:'Đối chiếu &amp; so công nợ',desc:'So công nợ phai thu / phai tra theo dõi tac, đối chiếu theo điều khoản hợp đồng.',addBtn:'Tạo bien ban đối chiếu',
   kpis:[['t','arrow-down-left','Phai thu','86.4','ty','dn','-4%','so với T5'],['a','arrow-up-right','Phai tra','62.8','ty','dn','-2%','so với T5'],['s','exclamation-triangle','Qua han','8.2','ty','dn','5 đối tác','rui ro'],['h','people','Đối tác','42','ben','eq','đang theo dõi',''] ],
   tabs:[['all','Tất cả','42'],['phai thu','Phai thu','24'],['phai tra','Phai tra','18']],statusOpts:['Phai thu','Phai tra'],
   cols:['Đối tác','Loai','Dau ky','Phat sinh','Da TT','Con lai','Qua han','Trạng thái'],num:[2,3,4,5],
   rows:[
    ['TCC — Đài Loan','Phai thu','12.4 ty','8.2 ty','14.0 ty','6.6 ty','680 tr','s4|Phai thu'],
    ['CNBM — Trung Quốc','Phai thu','4.2 ty','6.8 ty','9.1 ty','1.9 ty','0','s2|Phai thu'],
    ['NM Ha Long','Phai tra','8.6 ty','12.4 ty','15.2 ty','5.8 ty','0','s4|Phai tra'],
    ['SL Truong Thanh','Phai tra','1.2 ty','3.4 ty','3.4 ty','1.2 ty','0','s4|Phai tra'],
   ]},
  {id:'thuhoicongno',code:'GD_THUHOI_CONGNO',crumb:'THEO DOI & THU HOI CONG NO',title:'Theo dõi &amp; thu hồi công nợ',desc:'Theo dõi han thanh toán, đọc thực thu hồi; tong hop hồ sơ nợ xấu để trinh phuong an.',addBtn:'Ghi nhan nhắc nợ',
   kpis:[['t','exclamation-triangle','Qua han','8.2','ty','dn','5 đơn','can đọc thực'],['a','clock-history','Sap đến hạn','4.6','ty','dn','3 đơn','trong 7 ngày'],['s','telephone','Da nhắc nợ','12','luot','eq','tuan nay',''],['h','x-octagon','No xau','1','đơn','dn','680 tr','trinh GD']],
   tabs:[['all','Tất cả','12'],['quá hạn','Qua han','5'],['trong han','Trong han','7']],statusOpts:['Qua han','Trong han'],
   cols:['Đơn hàng','Khách hàng','So tien','Han TT','Qua han (ngày)','Lan nhac','Nguy co','Trạng thái'],num:[2,4,5],
   rows:[
    ['DH-2026-0312','Cty CP Xi măng Hạ Long','680 tr','16/05/2026','18','2','Cao','s8|Qua han'],
    ['DH-2026-0298','Cty TNHH VLXD Sai Gon','1.24 ty','02/05/2026','32','3','No xau','s8|Qua han'],
    ['DH-2026-0315','Tổng CTy XNK Mien Bac','1.84 ty','06/06/2026','-3','0','Thap','s4|Trong han'],
    ['DH-2026-0319','Cty CP Xi măng Hạ Long','2.64 ty','13/06/2026','-10','0','Thap','s2|Trong han'],
   ]},
  {id:'soduquy',code:'GD_SODU_QUY',crumb:'SO DU QUY / DONG TIEN',title:'Số dư quỹ / dòng tiền',desc:'Theo dõi số dư các quy và tài khoản ngân hàng, dòng tiền thu/chi trong ky.',addBtn:'Dieu chuyển quy',
   kpis:[['t','bank','Tổng số dư','38.4','ty','up','+3.2 ty','so với dau ky'],['a','arrow-down-circle','Thu trong ky','186.4','ty','up','+12%','so với T5'],['s','arrow-up-circle','Chi trong ky','142.8','ty','dn','+7%','so với T5'],['h','exclamation-triangle','Quy am','1','quy','dn','-540 tr','can bổ sung']],
   tabs:[['all','Tất cả','7'],['duong','Duong','6'],['am','Am','1']],statusOpts:['Duong','Am'],
   cols:['Quy / Tai khoan','Loai','Dau ky','Thu','Chi','Số dư','Cập nhật','Trạng thái'],num:[2,3,4,5],
   rows:[
    ['VCB - 0451','Ngán hang','18.2 ty','86.4 ty','78.2 ty','26.4 ty','08:42','s2|Duong'],
    ['BIDV - 7782','Ngán hang','6.4 ty','42.8 ty','38.6 ty','10.6 ty','08:42','s2|Duong'],
    ['Quy tien mat','Tien mat','1.8 ty','4.2 ty','4.0 ty','2.0 ty','08:42','s2|Duong'],
    ['Quy van tai','Quy','0.4 ty','12.4 ty','13.34 ty','-540 tr','08:42','s8|Am'],
   ]},
  ];
  S.forEach(cfg=>{
    if(!cfg.rows||!cfg.cols) return;
    const dhCol=cfg.cols.findIndex(c=>/đơn hàng/i.test(c));
    const custCol=cfg.cols.findIndex(c=>/khách hàng|đối tác/i.test(c));
    if(dhCol<0||custCol<0) return;
    cfg.rows.forEach(r=>{ const c=xkCustByDh(r[dhCol]); if(c) r[custCol]=c; });
  });
  S.forEach(buildScreen);
  window.buildListScreen=buildScreen;

  // ===== SPECIAL: PHIEU CAN HANG (BM13-04-03) =====
  (function(){
    const fld=(l,v,m)=>`<div style="flex:1 1 ${m||220}px;min-width:${m||220}px"><div style="font-size:var(--fs3);color:var(--ink3);margin-bottom:3px">${l}</div><div style="border:1px solid var(--line);border-radius:5px;padding:7px 10px;background:var(--bg);font-weight:500;min-height:32px">${v||'&nbsp;'}</div></div>`;
    const sign=n=>`<div style="flex:1;text-align:center"><div style="font-weight:600;margin-bottom:4px">${n}</div><div style="font-size:var(--fs3);color:var(--ink4)">(ky, ghi ro ho ten)</div><div style="height:48px"></div></div>`;
    const sec=document.createElement('div');
    sec.className='page'; sec.setAttribute('data-page','phiếucan');
    sec.innerHTML=`
      <div class="phdr"><div class="left"><div class="eyebrow">GD_PHIEUCAN · GIAO DICH</div><h2>Phiếu cân hàng <b>(BM13-04-03)</b></h2><p class="sub">Phiếu cân hàng / lệnh nhập kho theo bieu mau BM13-04-03 - Phong VT &amp; GN.</p></div>
        <div class="right"><button class="tbtn"><i class="bi bi-plus-lg"></i> Tạo phiếu cân</button><div class="ico" title="In phiếu"><i class="bi bi-printer"></i></div><div class="ico" title="Xuat Excel"><i class="bi bi-file-earmark-spreadsheet"></i></div></div></div>
      <div class="kpis">
        ${[['t','clipboard-data','Phiếu cân hom nay','23','phiếu','up','+5','so với hôm qua'],['a','speedometer2','Tổng KL can','12,480','tan','up','+8.6%','so với hôm qua'],['s','truck','Luot xe','41','luot','eq','12 đang cho',''],['h','arrow-left-right','Chênh món','-42','tan','dn','2 lo lech','can kiểm tra']].map(k=>`<div class="kpi"><div class="top"><div class="ic ${k[0]}"><i class="bi bi-${k[1]}"></i></div><div class="lbl">${k[2]}</div></div><div class="val">${k[3]}<span style="font-size:12px;color:var(--ink4);font-weight:400;margin-left:3px">${k[4]}</span></div><div class="delta"><span class="chip ${k[5]}">${k[6]}</span>${k[7]}</div></div>`).join('')}
      </div>
      <div class="card" style="margin-bottom:14px">
        <div class="chd"><h3>Bieu mau phiếu cân hang</h3><span class="small">So phiếu: ...../NC 1 TLCC</span><div class="right"><a class="cardlink">In phiếu <i class="bi bi-printer"></i></a></div></div>
        <div style="padding:14px">
          <div style="text-align:center;margin-bottom:14px;border-bottom:1px solid var(--line);padding-bottom:10px">
            <div style="font-weight:700;font-size:15px;letter-spacing:.5px">THANGLONG CEMENTS</div>
            <div style="font-weight:700;font-size:16px;margin-top:4px">PHIEU CAN HANG / LENH NHAP KHO</div>
            <div style="font-size:var(--fs3);color:var(--ink3);margin-top:2px">BM13-04-03 &middot; Phong VT &amp; GN</div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:12px">
            ${fld('So xe chuyển cho','30C-451.88')}
            ${fld('Ten hàng hóa','Clinker')}
            ${fld('So lệnh nhập kho','LNK-2026-0782')}
            ${fld('Khách hàng','TCC — Đài Loan')}
            ${fld('Ho ten người nhan','Nguyen Van A')}
            ${fld('CMND/CCCD','0010xxxxxxxx')}
            ${fld('Trong luong xe không tai','13.20 tan')}
            ${fld('Trong luong xe có tai','45.20 tan')}
            ${fld('Trong luong hang','32.00 tan')}
            ${fld('So luong','32,000 kg')}
            ${fld('Ngày can','03/06/2026')}
            ${fld('Gio vao','08:15')}
            ${fld('Gio ra','08:42')}
            ${fld('Ngày lap phiếu','03/06/2026')}
          </div>
          <div style="display:flex;gap:12px;margin-top:22px;padding-top:12px;border-top:1px dashed var(--line)">
            ${sign('NV Can hang')}${sign('Khách hàng')}${sign('Thu kho')}${sign('Bao ve')}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="chd"><h3>Phiếu cân gán day</h3><span class="small">23 phiếu hom nay</span><div class="right"><a class="cardlink">Xuat Excel <i class="bi bi-download"></i></a></div></div>
        <div style="padding:0 4px 4px"><table><thead><tr>
          <th style="padding-left:14px">So phiếu</th><th>So xe</th><th>Ten hang</th><th>Khách hàng</th><th>Lenh NK</th><th>TL không tai</th><th>TL có tai</th><th>TL hang (tan)</th><th>Ngày can</th><th style="padding-right:14px">Trạng thái</th>
        </tr></thead><tbody>${[
          ['PC-2026-0782','30C-451.88','Clinker','TCC — Đài Loan','LNK-0782','13.20','45.20','32.00','03/06/2026','s2|Da xác nhận'],
          ['PC-2026-0781','29H-112.04','Clinker','CNBM — Trung Quốc','LNK-0781','12.80','41.30','28.50','03/06/2026','s2|Da xác nhận'],
          ['PC-2026-0780','30C-778.21','Xi măng PCB40','Republic Cement — Philippines','LNK-0780','13.00','44.10','31.10','03/06/2026','s4|Chờ xác nhận'],
          ['PC-2026-0779','15B-330.19','Clinker','Chip Mong Insee — Campuchia','LNK-0779','13.40','58.40','45.00','02/06/2026','s2|Da xác nhận'],
        ].map(r=>`<tr>
          <td style="padding-left:14px"><span class="oid">${r[0]}</span></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td>
          <td class="vnum">${r[5]}</td><td class="vnum">${r[6]}</td><td class="vnum">${r[7]}</td><td>${r[8]}</td>
          <td style="padding-right:14px"><span class="pill ${r[9].slice(0,r[9].indexOf('|'))}"><span class="d"></span>${r[9].slice(r[9].indexOf('|')+1)}</span></td></tr>`).join('')}</tbody></table></div>
      </div>`;
    content.appendChild(sec);
    PAGE_MAP['GD_PHIEUCAN']='phiếucan'; CRUMB_MAP['phiếucan']='PHIEU CAN HANG';
  })();
})();
