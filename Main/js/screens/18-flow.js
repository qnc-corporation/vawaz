// ===== TRANG FLOW — luồng database: TX · DM · RPT =====
(function(){
  const content=document.querySelector('.content'); if(!content) return;

  const STEP_NAME={
    1:'Chặng 1 · Hợp đồng & Đơn hàng',2:'Chặng 2 · Phân bổ & Vỏ bao',3:'Chặng 3 · Vận chuyển',
    4:'Chặng 4 · Giao nhận',5:'Chặng 5 · Làm hàng',6:'Chặng 6 · Hải quan XNK',
    7:'Chặng 7 · Hóa đơn & Quyết toán',8:'Chặng 8 · Công nợ & Dòng tiền',
  };

  const PAGE_TABLE={
    hopdong:'hop_dong',donhang:'don_hang',chitietdonhang:'don_hang_ct',phuluc:'phu_luc_hd',
    phanbonhmay:'phan_bo_nm',vobaodat:'vo_bao_dat',vobao:'vo_bao_lc',
    chuyentau:'kh_tau_me',phieusalan:'dieu_do_sl',khvcnoidia:'lenh_vc',
    nhanhangcang:'nhan_hang',bangiaosalan:'bang_giao_sl','phiếucan':'phieu_can',thuhoichungtu:'thu_hoi_ct',
    kiemtraham:'kt_ham',lamhangtau:'ts_tau',domonkiemdem:'do_mon',sucotonthat:'su_co',dichvuphutro:'dv_phu_tro',
    tokhaihaiquan:'to_khai_hq',thuexnk:'thue_xnk',chungnhan:'chung_nhan',checklisthoso:'checklist_hs',
    quyettoanhang:'qt_hang',quyettoanvt:'qt_vt',denghihoađơn:'dn_hoa_don','hoađơn':'hoa_don',
    dntt:'dntt',thanhtoan:'thanh_toan',congno:'cong_no',
  };

  const SPINE=[
    'hop_dong','don_hang','don_hang_ct','phan_bo_nm','lenh_vc','phieu_can','do_mon',
    'to_khai_hq','qt_hang','hoa_don','cong_no',
  ];

  const DB_STEPS=[
    {n:1,id:'lane1',tables:[
      {id:'hop_dong',label:'hop_dong',fk:''},
      {id:'phu_luc_hd',label:'phu_luc_hop_dong',fk:'hop_dong_id'},
      {id:'don_hang',label:'don_hang',fk:'hop_dong_id'},
      {id:'don_hang_ct',label:'don_hang_chi_tiet',fk:'don_hang_id'},
      {id:'don_hang_ncc',label:'don_hang_ncc',fk:'don_hang_id'},
    ]},
    {n:2,id:'lane2',tables:[
      {id:'phan_bo_nm',label:'phan_bo_nha_may',fk:'don_hang_id'},
      {id:'vo_bao_dat',label:'vo_bao_dat',fk:'don_hang_id'},
      {id:'vo_bao_lc',label:'vo_bao_luan_chuyen',fk:'don_hang_id'},
    ]},
    {n:3,id:'lane3',tables:[
      {id:'kh_tau_me',label:'ke_hoach_tau_me',fk:'don_hang_id'},
      {id:'dieu_do_sl',label:'dieu_do_salan',fk:'don_hang_id'},
      {id:'lenh_vc',label:'lenh_van_chuyen',fk:'don_hang_id'},
    ]},
    {n:4,id:'lane4',tables:[
      {id:'nhan_hang',label:'nhan_hang_cang',fk:'lenh_vc_id'},
      {id:'bang_giao_sl',label:'bang_giao_salan',fk:'lenh_vc_id'},
      {id:'phieu_can',label:'phieu_can',fk:'don_hang_id'},
      {id:'thu_hoi_ct',label:'thu_hoi_chung_tu',fk:'don_hang_id'},
    ]},
    {n:5,id:'lane5',tables:[
      {id:'kt_ham',label:'kiem_tra_ham',fk:'don_hang_id'},
      {id:'ts_tau',label:'lam_hang_tau',fk:'don_hang_id'},
      {id:'do_mon',label:'do_mon_kiem_dem',fk:'don_hang_id'},
      {id:'su_co',label:'su_co_ton_that',fk:'don_hang_id'},
    ]},
    {n:6,id:'lane6',tables:[
      {id:'to_khai_hq',label:'to_khai_hai_quan',fk:'don_hang_id'},
      {id:'thue_xnk',label:'thue_xnk',fk:'to_khai_hq_id'},
      {id:'chung_nhan',label:'chung_nhan_xnk',fk:'don_hang_id'},
      {id:'checklist_hs',label:'checklist_ho_so',fk:'don_hang_id'},
    ]},
    {n:7,id:'lane7',tables:[
      {id:'qt_hang',label:'quyet_toan_hang',fk:'don_hang_id'},
      {id:'qt_vt',label:'quyet_toan_van_tai',fk:'don_hang_id'},
      {id:'dn_hoa_don',label:'de_nghi_hoa_don',fk:'don_hang_id'},
      {id:'hoa_don',label:'hoa_don',fk:'don_hang_id'},
    ]},
    {n:8,id:'lane8',tables:[
      {id:'dntt',label:'de_nghi_thanh_toan',fk:'don_hang_id'},
      {id:'thanh_toan',label:'thanh_toan',fk:'dntt_id'},
      {id:'cong_no',label:'cong_no',fk:'don_hang_id'},
      {id:'thu_hoi_cn',label:'thu_hoi_cong_no',fk:'cong_no_id'},
    ]},
  ];

  const DM_LANE={
    id:'lane_dm',label:'Master data (DM)',tables:[
      {id:'dm_doi_tac',label:'dm_doi_tac',ref:'doi_tac_id'},
      {id:'dm_hang_hoa',label:'dm_hang_hoa',ref:'hang_hoa_id'},
      {id:'dm_dvt',label:'dm_don_vi_tinh',ref:'dvt_id'},
      {id:'dm_vo_bao',label:'dm_vo_bao',ref:'vo_bao_id'},
      {id:'dm_pt_vt',label:'dm_phuong_tien',ref:'phuong_tien_id'},
      {id:'dm_tuyen',label:'dm_tuyen_duong',ref:'tuyen_id'},
      {id:'dm_dia_diem',label:'dm_dia_diem',ref:'dia_diem_id'},
      {id:'dm_banggia',label:'dm_bang_gia_vt',ref:'bang_gia_id'},
      {id:'dm_tiente',label:'dm_tien_te',ref:'tien_te_id'},
      {id:'dm_taikhoan',label:'dm_tai_khoan',ref:'tai_khoan_id'},
    ],
  };

  const RPT_LANE={
    id:'lane_rpt',label:'Report / View (RPT)',tables:[
      {id:'rpt_tiendotau',label:'v_rpt_tien_do_tau'},
      {id:'rpt_salan',label:'v_rpt_nhat_ky_salan'},
      {id:'rpt_sanluong',label:'v_rpt_san_luong'},
      {id:'rpt_sucoton',label:'v_rpt_su_co'},
      {id:'rpt_chiphivt',label:'v_rpt_chi_phi_vt'},
      {id:'rpt_tuoino',label:'v_rpt_tuoi_no'},
      {id:'rpt_dongtien',label:'v_rpt_dong_tien'},
      {id:'rpt_lailo',label:'v_rpt_lai_lo_lo'},
      {id:'rpt_giaohd',label:'v_rpt_giao_hd'},
    ],
  };

  const TX_EDGES=[
    ['hop_dong','don_hang','spine'],['hop_dong','phu_luc_hd','branch'],['don_hang','don_hang_ct','spine'],
    ['don_hang','don_hang_ncc','branch'],['don_hang','phan_bo_nm','spine'],['don_hang','vo_bao_dat','branch'],
    ['phan_bo_nm','lenh_vc','spine'],['don_hang','kh_tau_me','branch'],['lenh_vc','phieu_can','spine'],
    ['phieu_can','bang_giao_sl','branch'],['phieu_can','do_mon','spine'],['do_mon','to_khai_hq','spine'],
    ['to_khai_hq','chung_nhan','branch'],['to_khai_hq','qt_hang','spine'],['qt_hang','hoa_don','spine'],
    ['hoa_don','cong_no','spine'],['cong_no','dntt','branch'],['dntt','thanh_toan','branch'],
  ];

  const REF_EDGES=[
    ['dm_doi_tac','hop_dong'],['dm_doi_tac','don_hang'],
    ['dm_hang_hoa','hop_dong'],['dm_hang_hoa','don_hang_ct'],
    ['dm_dvt','don_hang_ct'],
    ['dm_vo_bao','vo_bao_dat'],['dm_vo_bao','vo_bao_lc'],
    ['dm_pt_vt','lenh_vc'],['dm_pt_vt','kh_tau_me'],['dm_pt_vt','dieu_do_sl'],
    ['dm_tuyen','lenh_vc'],['dm_tuyen','qt_vt'],
    ['dm_dia_diem','phan_bo_nm'],['dm_dia_diem','nhan_hang'],
    ['dm_banggia','qt_vt'],
    ['dm_tiente','hop_dong'],['dm_tiente','hoa_don'],
    ['dm_taikhoan','dntt'],['dm_taikhoan','thanh_toan'],
  ];

  const READ_EDGES=[
    ['don_hang','rpt_lailo'],['lenh_vc','rpt_tiendotau'],['kh_tau_me','rpt_tiendotau'],
    ['dieu_do_sl','rpt_salan'],['lenh_vc','rpt_salan'],
    ['do_mon','rpt_sanluong'],['su_co','rpt_sucoton'],['qt_vt','rpt_chiphivt'],
    ['cong_no','rpt_tuoino'],['thanh_toan','rpt_tuoino'],['dntt','rpt_dongtien'],
    ['qt_hang','rpt_lailo'],['phieu_can','rpt_giaohd'],['hoa_don','rpt_giaohd'],
  ];

  const PRIMARY={1:'don_hang',2:'phan_bo_nm',3:'lenh_vc',4:'phieu_can',5:'do_mon',6:'to_khai_hq',7:'qt_hang',8:'cong_no'};
  const LAYER_NAME={tx:'Transaction (nghiệp vụ)',dm:'Master data (danh mục)',rpt:'Report / View (đọc tổng hợp)'};

  function allHd(){
    const out=[];
    if(window.HD_DATA)['xk','nd','dv'].forEach(t=>(HD_DATA[t]||[]).forEach(r=>out.push({id:r[0],cust:r[1],type:t})));
    return out;
  }
  function dhByHd(hdId){
    return (DH_DATA?.all||[]).filter(r=>r[1]===hdId).map(r=>({id:r[0],hd:r[1],sp:r[3],kl:r[4],chang:parseInt(r[5],10)||1,status:r[8],note:r[9]}));
  }

  function resolvePosition(hdId,dhId){
    const lo=(window.__LO360||[]).find(l=>l.dh===dhId);
    const dh=(DH_DATA?.all||[]).find(r=>r[0]===dhId);
    const chang=dh?parseInt(dh[5],10)||1:1;
    if(lo){
      const pending=lo.docs.find(d=>/^s[48]/.test(d[4]));
      const active=pending||[...lo.docs].reverse().find(d=>d[4].startsWith('s2'))||lo.docs[0];
      if(active){
        const table=PAGE_TABLE[active[5]]||PRIMARY[active[0]]||'don_hang';
        return{step:active[0],table,layer:'tx',recordCode:active[1],recordType:active[2],status:active[4],label:`${active[2]} · ${active[1]}`,chang};
      }
    }
    const table=PRIMARY[chang]||'don_hang';
    return{step:chang,table,layer:'tx',recordCode:dhId,recordType:'don_hang',status:dh?dh[9]:'',label:`${STEP_NAME[chang]} — theo chặng đơn hàng`,chang};
  }

  function doneTables(state,dhId){
    const set=new Set();
    const lo=(window.__LO360||[]).find(l=>l.dh===dhId);
    if(lo) lo.docs.forEach(d=>{ if(d[4].startsWith('s2')){ const t=PAGE_TABLE[d[5]]; if(t) set.add(t); } });
    const idx=SPINE.indexOf(state.table);
    SPINE.forEach((t,i)=>{ if(idx>=0&&i<idx) set.add(t); });
    DB_STEPS.forEach(s=>{ if(s.n<state.step) s.tables.forEach(t=>set.add(t.id)); });
    return set;
  }

  const sec=document.createElement('div');
  sec.className='page';
  sec.setAttribute('data-page','flow');
  sec.innerHTML=`
    <div class="phdr">
      <div class="left">
        <div class="eyebrow">SYS_FLOW · LUỒNG DATABASE</div>
        <h2>Sơ đồ luồng dữ liệu — TX · DM · RPT</h2>
        <p class="sub"><b>8 chặng giữa</b> chỉ là bảng <b>transaction</b> (ghi nghiệp vụ theo HĐ/ĐH). <b>Trái</b>: master data tham chiếu (FK). <b>Phải</b>: báo cáo/view đọc tổng hợp — không ghi ngược vào TX.</p>
      </div>
      <div class="right sw-pickers">
        <div class="fgroup"><label>Hợp đồng</label><select class="sw-hd" style="height:32px;min-width:200px;border:1px solid var(--line);border-radius:5px;padding:0 8px;background:var(--bg)"></select></div>
        <div class="fgroup"><label>Đơn hàng</label><select class="sw-dh" style="height:32px;min-width:200px;border:1px solid var(--line);border-radius:5px;padding:0 8px;background:var(--bg)"></select></div>
      </div>
    </div>

    <div class="card db-layers">
      <div class="db-layer-grid">
        <div><span class="db-layer-tag tx">TX</span><b>Transaction</b> — chứng từ &amp; nghiệp vụ 8 chặng, mỗi dòng gắn <span class="oid">hop_dong_id</span> / <span class="oid">don_hang_id</span></div>
        <div><span class="db-layer-tag dm">DM</span><b>Master data</b> — danh mục ổn định; TX chỉ <em>tham chiếu</em> qua FK (mũi tên cam)</div>
        <div><span class="db-layer-tag rpt">RPT</span><b>Report / View</b> — đọc tổng hợp từ TX; không tham gia luồng ghi (mũi tên tím)</div>
      </div>
    </div>

    <div class="card sw-status">
      <div class="sw-status-grid">
        <div><span class="sw-status-k">Đang ở bảng (TX)</span><div class="sw-status-v sw-cur-table">—</div></div>
        <div><span class="sw-status-k">Chặng</span><div class="sw-status-v sw-cur-step">—</div></div>
        <div><span class="sw-status-k">Bản ghi / trạng thái</span><div class="sw-status-v sw-cur-rec">—</div></div>
        <div><span class="sw-status-k">HĐ · ĐH</span><div class="sw-status-v"><span class="oid sw-id-hd">—</span> · <span class="oid sw-id-dh">—</span></div></div>
      </div>
    </div>

    <div class="card wf-card">
      <div class="chd">
        <h3>ER flow — TX · DM · RPT</h3>
        <span class="small sw-legend">
          <span class="sw-leg done"></span> TX đã ghi
          <span class="sw-leg cur"></span> TX đang ở đây
          <span class="sw-leg dm"></span> DM liên quan
          <span class="sw-leg rpt"></span> RPT đọc từ TX
          <span class="sw-leg spine"></span> Luồng TX chính
        </span>
      </div>
      <div id="db-cy" class="db-cy"></div>
      <p class="db-hint"><i class="bi bi-arrows-move"></i> Kéo pan · cuộn zoom · click bảng xem FK / tầng dữ liệu</p>
    </div>

    <div class="card db-fk-panel" hidden>
      <div class="chd"><h3 class="db-fk-title">—</h3><span class="small db-fk-layer"></span></div>
      <div class="db-fk-body" style="padding:10px 16px 14px;font-size:var(--fs2);color:var(--ink3)"></div>
    </div>`;

  content.appendChild(sec);
  PAGE_MAP['SYS_FLOW']='flow';
  CRUMB_MAP['flow']='LUONG DATABASE';

  const hdSel=sec.querySelector('.sw-hd');
  const dhSel=sec.querySelector('.sw-dh');
  const fkPanel=sec.querySelector('.db-fk-panel');
  let cy=null, edgeSeq=0;

  function addEdge(els,s,t,kind){
    els.push({data:{id:`e${edgeSeq++}`,source:s,target:t,kind}});
  }

  function buildElements(){
    const els=[]; edgeSeq=0;
    const COL=210, ROW=50, DMX=-200, RPTX=DB_STEPS.length*COL+120;

    els.push({data:{id:DM_LANE.id,label:DM_LANE.label}});
    DM_LANE.tables.forEach((t,ti)=>{
      els.push({
        data:{id:t.id,label:t.label,parent:DM_LANE.id,layer:'dm',step:0,fk:'—',ref:t.ref,spine:0},
        position:{x:DMX,y:ti*ROW+46},
      });
    });

    DB_STEPS.forEach((lane,li)=>{
      els.push({data:{id:lane.id,label:STEP_NAME[lane.n]}});
      lane.tables.forEach((t,ti)=>{
        els.push({
          data:{id:t.id,label:t.label,parent:lane.id,layer:'tx',step:lane.n,fk:t.fk||'—',spine:SPINE.includes(t.id)?1:0},
          position:{x:li*COL+108,y:ti*ROW+46},
        });
      });
    });

    els.push({data:{id:RPT_LANE.id,label:RPT_LANE.label}});
    RPT_LANE.tables.forEach((t,ti)=>{
      els.push({
        data:{id:t.id,label:t.label,parent:RPT_LANE.id,layer:'rpt',step:9,fk:'read-only',spine:0},
        position:{x:RPTX,y:ti*ROW+46},
      });
    });

    TX_EDGES.forEach(([s,t,k])=>addEdge(els,s,t,k));
    REF_EDGES.forEach(([s,t])=>addEdge(els,s,t,'ref'));
    READ_EDGES.forEach(([s,t])=>addEdge(els,s,t,'read'));
    return els;
  }

  function initCy(){
    if(cy||!window.cytoscape) return;
    cy=window.cytoscape({
      container:document.getElementById('db-cy'),
      elements:buildElements(),
      style:[
        {selector:'node',style:{
          label:'data(label)','font-size':8,'font-family':'JetBrains Mono,monospace',
          'text-wrap':'wrap','text-max-width':92,'text-valign':'center','text-halign':'center',
          width:100,height:36,'background-color':'#fff','border-width':2,'border-color':'#D0D3D9',color:'#3D3D56',
        }},
        {selector:':parent',style:{
          label:'data(label)','font-size':9,'font-weight':700,'text-valign':'top','text-halign':'center',
          'text-margin-y':-4,'background-opacity':0.07,'border-width':2,'border-style':'dashed',padding:16,
        }},
        {selector:'node[layer = "tx"]',style:{'background-color':'#fff'}},
        {selector:'node[layer = "dm"]',style:{'background-color':'#FEF3E8','border-color':'#F5821F',color:'#9a3412'}},
        {selector:'node[layer = "rpt"]',style:{
          'background-color':'#f5f3ff','border-color':'#8b5cf6','border-style':'dashed',color:'#5b21b6',
        }},
        {selector:':parent[id = "lane_dm"]',style:{'background-color':'#F5821F','border-color':'#FDDDB8'}},
        {selector:':parent[id ^= "lane"]:not([id = "lane_dm"]):not([id = "lane_rpt"])',style:{'background-color':'#04589C','border-color':'#D0E4F5'}},
        {selector:':parent[id = "lane_rpt"]',style:{'background-color':'#8b5cf6','border-color':'#ddd6fe'}},
        {selector:'node[spine = 1]',style:{'border-color':'#04589C','font-weight':600}},
        {selector:'node.done',style:{'background-color':'#E6F7EE','border-color':'#0D9E5F',color:'#047857'}},
        {selector:'node.current',style:{'background-color':'#E8F1F9','border-width':3,'border-color':'#04589C',color:'#03477D','z-index':10}},
        {selector:'node.future',style:{opacity:0.28}},
        {selector:'node.ref-linked',style:{'border-width':3,'box-shadow':'0 0 0 2px #FDDDB8'}},
        {selector:'node.read-linked',style:{'border-width':3,'box-shadow':'0 0 0 2px #ddd6fe'}},
        {selector:'edge',style:{
          width:2,'line-color':'#D0D3D9','target-arrow-color':'#D0D3D9','target-arrow-shape':'triangle',
          'curve-style':'bezier',opacity:0.65,
        }},
        {selector:'edge[kind = "spine"]',style:{width:3,'line-color':'#04589C','target-arrow-color':'#04589C',opacity:1}},
        {selector:'edge[kind = "ref"]',style:{'line-color':'#F5821F','target-arrow-color':'#F5821F','line-style':'dashed',width:2}},
        {selector:'edge[kind = "read"]',style:{'line-color':'#8b5cf6','target-arrow-color':'#8b5cf6','line-style':'dotted',width:2}},
        {selector:'edge.highlight',style:{'line-color':'#03477D',width:4,opacity:1}},
        {selector:'edge.ref-active',style:{width:3,opacity:1}},
        {selector:'edge.read-active',style:{width:3,opacity:1}},
      ],
      layout:{name:'preset'},
      minZoom:0.28,maxZoom:2.2,wheelSensitivity:0.28,
    });

    cy.on('tap','node',evt=>{
      const n=evt.target;
      if(n.isParent()) return;
      const layer=n.data('layer');
      fkPanel.hidden=false;
      sec.querySelector('.db-fk-title').textContent=n.data('label');
      sec.querySelector('.db-fk-layer').textContent=LAYER_NAME[layer]||layer;
      const extra=layer==='dm'?`<div style="margin-top:4px">Cột FK thường gặp: <span class="oid">${n.data('ref')||'—'}</span></div>`
        :layer==='rpt'?`<div style="margin-top:4px">Nguồn: đọc tổng hợp từ bảng TX (không INSERT/UPDATE)</div>`
        :`<div style="margin-top:4px">FK: <span class="oid">${n.data('fk')||'—'}</span> · ${SPINE.includes(n.id())?'Luồng chính':'Nhánh TX'}</div>`;
      sec.querySelector('.db-fk-body').innerHTML=`
        ${layer==='tx'?`<div><b>Chặng ${n.data('step')}</b> · ${STEP_NAME[n.data('step')]}</div>`:`<div><b>${LAYER_NAME[layer]}</b></div>`}
        ${extra}`;
    });
  }

  function paint(state){
    if(!cy) return;
    const done=doneTables(state,dhSel.value);
    const cur=state.table;

    cy.nodes().forEach(n=>{
      if(n.isParent()) return;
      const id=n.id(), layer=n.data('layer');
      n.removeClass('done current future ref-linked read-linked');
      if(layer==='tx'){
        if(id===cur) n.addClass('current');
        else if(done.has(id)) n.addClass('done');
        else n.addClass('future');
      }else if(layer==='dm'){
        if(REF_EDGES.some(([dm,tx])=>dm===id&&(tx===cur||done.has(tx)))) n.addClass('ref-linked');
      }else if(layer==='rpt'){
        if(READ_EDGES.some(([tx,rpt])=>rpt===id&&(tx===cur||done.has(tx)))) n.addClass('read-linked');
      }
    });

    cy.edges().removeClass('highlight ref-active read-active');
    cy.edges().forEach(e=>{
      const k=e.data('kind'), s=e.source().id(), t=e.target().id();
      if((k==='spine'||k==='branch')&&(s===cur||t===cur)) e.addClass('highlight');
      if(k==='ref'&&t===cur) e.addClass('ref-active');
      if(k==='read'&&s===cur) e.addClass('read-active');
    });

    const target=cy.$('#'+cur);
    if(target.length) cy.animate({center:{eles:target},zoom:0.95},{duration:280});

    const st=state.status;
    const pill=st&&st.includes('|')?st.split('|')[1]:state.label;
    sec.querySelector('.sw-cur-table').innerHTML=`<span class="oid">${state.table}</span> <span style="color:var(--ink4);font-weight:400">(TX)</span>`;
    sec.querySelector('.sw-cur-step').textContent=`${state.step}/8 · ${STEP_NAME[state.step]}`;
    sec.querySelector('.sw-cur-rec').innerHTML=`<span class="oid">${state.recordCode}</span> — ${pill}`;
    sec.querySelector('.sw-id-hd').textContent=hdSel.value;
    sec.querySelector('.sw-id-dh').textContent=dhSel.value;
  }

  function fillDh(hdId,keep){
    const list=dhByHd(hdId);
    dhSel.innerHTML=list.length?list.map(d=>`<option value="${d.id}">${d.id} · ${d.sp} · chặng ${d.chang}</option>`).join('')
      :'<option value="">— Không có ĐH —</option>';
    if(keep&&list.some(d=>d.id===keep)) dhSel.value=keep;
  }

  function apply(){
    if(!hdSel.value||!dhSel.value||!cy) return;
    paint(resolvePosition(hdSel.value,dhSel.value));
  }

  function initPickers(){
    const hds=allHd().filter(h=>h.type==='xk');
    hdSel.innerHTML=hds.map(h=>`<option value="${h.id}">${h.id} · ${h.cust}</option>`).join('');
    fillDh(hdSel.value);
    apply();
  }

  function boot(){
    if(!window.cytoscape){
      sec.querySelector('#db-cy').innerHTML='<p style="padding:24px;color:var(--err)">Thiếu cytoscape.min.js — chạy <code>node Main/build.mjs</code>.</p>';
      return;
    }
    initCy();
    if(window.HD_DATA) initPickers();
    else window.addEventListener('qnc-ready',initPickers,{once:true});
  }

  hdSel.addEventListener('change',()=>{ fillDh(hdSel.value); apply(); });
  dhSel.addEventListener('change', apply);
  boot();

  window.__flowShowCase=(hd,dh)=>{
    if(hd) hdSel.value=hd;
    fillDh(hdSel.value,dh);
    if(dh) dhSel.value=dh;
    switchPage('flow');
    apply();
  };
})();
