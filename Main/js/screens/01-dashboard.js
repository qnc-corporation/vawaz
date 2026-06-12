// ===== JOURNEY =====
const STAGES=[
 ["1","Hợp đồng & DH",6,"2.1 ty",100],
 ["2","Phân bổ & vỏ bao",4,"1.4 ty",100],
 ["3","Vận chuyển",18,"8.2 ty",100],
 ["4","Giao nhận",12,"6.0 ty",100],
 ["5","Làm hàng",8,"5.6 ty",72,"current"],
 ["6","Hải quan XNK",14,"9.1 ty",0],
 ["7","Hóa đơn & QT",11,"4.2 ty",0],
 ["8","Công nợ & tiền",9,"2.8 ty",0],
];
const flow=document.getElementById('flow');
STAGES.forEach(s=>{
  const el=document.createElement('div');
  el.className='stage'+(s[4]==='current'?' current':(s[3]===100?' done':''));
  el.innerHTML=`<div class="top"><div class="n">${s[0]}</div><div class="nm">${s[1]}</div></div>
    <div class="ct"><b>${s[2]}</b> đơn</div>
    <div class="bar"><i style="width:${s[3]}%"></i></div>
    <div class="val">${s[3]}%</div>`;
  flow.appendChild(el);
});

// ===== PIPELINE =====
const PIPE=[
 ["1","HD & DH",6,"Đã ký · chờ phân bổ"],
 ["2","Phân bổ",4,"Chia nguồn · vỏ bao"],
 ["3","Vận chuyển",18,"Trên sà lan/tàu"],
 ["4","Giao nhận",12,"Nhận tại cảng · bàn giao"],
 ["5","Làm hàng",8,"Xếp lên tàu","current"],
 ["6","Hải quan",14,"Hải quan · C/O"],
 ["7","HDon & QT",11,"Chốt giá trị"],
 ["8","Công nợ",9,"Thu hồi"],
];
const max=Math.max(...PIPE.map(p=>p[2]));
const pipe=document.getElementById('pipeline');
let dashStageFilter=null;
PIPE.forEach(p=>{
  const h=Math.round((p[2]/max)*96)+4;
  const cls=p[3]==='current'?' current':'';
  const el=document.createElement('div');
  el.className='bar2 '+cls;
  el.dataset.stage=p[0];
  el.setAttribute('role','button');
  el.setAttribute('tabindex','0');
  el.setAttribute('aria-label',`Chặng ${p[0]}: ${p[1]} — ${p[2]} đơn`);
  el.innerHTML=`<div class="col" style="height:${h}px"></div>
    <div class="v">${p[2]}</div>
    <div class="l" title="${p[1]}"><span class="sn">${p[0]}</span>${p[1]}</div>
    <div class="tip"><b>${p[2]}</b> đơn · ${p[3]}</div>`;
  pipe.appendChild(el);
});

// ===== TABLE =====
const ORDERS=[
  ["DH-2026-0319","Cty CP Xi măng Hạ Long","Clinker","XiLong","s4","8h","2.4 ty","8 phut"],
  ["DH-2026-0318","Vinaconex X1","Clinker","Vina","s3","14h","1.8 ty","22 phut"],
  ["DH-2026-0317","Tập đoàn Hoàng Long","Xi măng PCB40","HoangLong","s2","1d 4h","960 tr","1 gio"],
  ["DH-2026-0316","Cty TNHH VLXD Sai Gon","Clinker","SG","s5","","3.1 ty","2 gio"],
  ["DH-2026-0315","Tổng CTy XNK Mien Bac","Thạch cao","MienBac","s6","","1.84 ty","3 gio"],
  ["DH-2026-0314","Cty CP Đầu tư Xây dựng Ha Noi","Clinker","HaNoi","s6","6h","2.2 ty","5 gio"],
  ["DH-2026-0313","Xi măng Bim Sơn","Clinker","BimSon","s1","","—","Hôm qua"],
  ["DH-2026-0312","Cty CP Xi măng Hạ Long","Clinker","XiLong","s7","tre 18d","680 tr","2 ngày"],
];
const LABELS=["","HD & DH","Phân bổ","Vận chuyển","Giao nhận","Làm hàng","Hải quan XNK","HDon & QT","Công nợ"];
const PRODS={XiLong:"CL",Vina:"VN",SG:"SG","HoangLong":"HL",MienBac:"MB",HaNoi:"HN",BimSon:"BS"};
const COLORS={XiLong:"c3",Vina:"c2",SG:"c1","HoangLong":"c4",MienBac:"c5",HaNoi:"c2",BimSon:"c3"};

function renderDashOrders(stageFilter){
  const tb=document.getElementById('tbody');
  if(!tb) return;
  const filtered=stageFilter?ORDERS.filter(o=>o[4]==='s'+stageFilter):ORDERS;
  tb.innerHTML='';
  filtered.forEach(o=>{
    const tr=document.createElement('tr');
    const cls=o[4];const av=COLORS[o[3]];const short=PRODS[o[3]];
    const overdue=o[5]&&o[5].startsWith('tre');
    const slaHtml=overdue?`<span style="color:var(--err);font-weight:600">${o[5]}</span>`:`${o[5]}`;
    tr.innerHTML=`
    <td style="padding-left:14px"><span class="oid">${o[0]}</span></td>
    <td><div class="cust"><div class="av2 ${av}">${short}</div>${o[1]}</div></td>
    <td>${o[2]}</td>
    <td><span class="pill ${cls}"><span class="d"></span>${LABELS[parseInt(cls.slice(1))]}</span></td>
    <td>${slaHtml}</td>
    <td class="vnum">${o[6]}</td>
    <td style="padding-right:14px"><span style="color:var(--ink4)">${o[7]}</span></td>`;
    tb.appendChild(tr);
  });
  const meta=document.getElementById('dash-orders-meta');
  if(meta){
    meta.textContent=stageFilter
      ?`${filtered.length}/${ORDERS.length} đơn · chặng ${stageFilter}: ${LABELS[stageFilter]||''}`
      :`${ORDERS.length}/${ORDERS.length} đơn · sắp xếp theo deadline`;
  }
  const hint=document.getElementById('pipe-hint');
  if(hint){
    hint.innerHTML=stageFilter
      ?`Đang lọc chặng <b style="color:var(--pri)">${stageFilter}: ${LABELS[stageFilter]||''}</b> · <a href="#" id="pipe-clear" style="color:var(--pri);text-decoration:none">Bỏ lọc</a>`
      :'Bấm chặng để lọc bảng đơn · bấm lại để bỏ lọc';
  }
  pipe?.querySelectorAll('.bar2').forEach(el=>{
    el.classList.toggle('active',!!stageFilter&&el.dataset.stage===String(stageFilter));
    el.setAttribute('aria-pressed',stageFilter&&el.dataset.stage===String(stageFilter)?'true':'false');
  });
}

function setDashStageFilter(stage){
  dashStageFilter=(dashStageFilter===stage)?null:stage;
  renderDashOrders(dashStageFilter);
}

pipe?.addEventListener('click',e=>{
  const bar=e.target.closest('.bar2');
  if(!bar) return;
  setDashStageFilter(parseInt(bar.dataset.stage,10));
});
pipe?.addEventListener('keydown',e=>{
  if(e.key!=='Enter'&&e.key!==' ') return;
  const bar=e.target.closest('.bar2');
  if(!bar) return;
  e.preventDefault();
  setDashStageFilter(parseInt(bar.dataset.stage,10));
});
document.getElementById('pipe-hint')?.addEventListener('click',e=>{
  if(e.target.closest('#pipe-clear')){e.preventDefault();dashStageFilter=null;renderDashOrders(null);}
});

renderDashOrders(null);
// Dashboard table click -> open DH modal
document.getElementById('tbody')?.addEventListener('click',function(e){
  const tr=e.target.closest('tr');
  if(!tr) return;
  const oidEl=tr.querySelector('.oid');
  if(!oidEl) return;
  const dhCode=oidEl.textContent.trim();
  const found=findDhByCode(dhCode);
  if(found) openModal('dh',found);
  else switchPage('donhang');
});
