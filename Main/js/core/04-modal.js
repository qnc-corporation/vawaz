// ===== MODAL / DETAIL POPUP =====
const modalOverlay=document.createElement('div');
modalOverlay.className='modal-overlay';
modalOverlay.id='detail-modal';
document.body.appendChild(modalOverlay);

function closeModal(){modalOverlay.classList.remove('open');document.body.style.overflow='';}
modalOverlay.addEventListener('click',e=>{if(e.target===modalOverlay)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

function openModal(type,data){
  // type: 'hd' | 'pl' | 'dh' | 'pb' | 'vb' | 'ct'
  let iconCls,iconBi,code,sub,fields,actions,related='';
  const cClass=HD_CUST_COLORS[data.customer]||'c1';
  const cShort=HD_CUST_SHORT[data.customer]||'??';

  if(type==='hd'){
    iconCls='hd'; iconBi='file-earmark-text';
    code=data.code; sub='HOP DONG · '+data.code.replace(/-/g,' ');
    const parseKL=v=>{if(!v)return 0;const n=parseFloat(String(v).replace(/,/g,''));return isNaN(n)?0:n;};
    const pct=parseKL(data.klThucHien)&&parseKL(data.klHopĐóng)?Math.min(100,Math.round((parseKL(data.klThucHien)/parseKL(data.klHopĐóng))*100)):0;
    // Build related Phụ lục hợp đồng table
    const relatedPl=PL_DATA.all.filter(d=>d[1]===data.code);
    let plTableHtml='';
    if(relatedPl.length){
      plTableHtml=`
      <div class="m-ct-section">
        <div class="m-ct-title">
          <h4>Phụ lục hợp đồng</h4>
          <span class="cnt">${relatedPl.length} phụ lục</span>
          <span class="m-viewall" data-page="phuluc" data-hd="${data.code}">Xem trang phụ lục <i class="bi bi-arrow-right" style="font-size:10px"></i></span>
        </div>
        <table class="m-ct-table">
          <thead><tr>
            <th>Ma phụ lục</th>
            <th>Loại thay đổi</th>
            <th>Thay đổi</th>
            <th>Ngày ký</th>
            <th>Trạng thái</th>
          </tr></thead>
          <tbody>${relatedPl.map(d=>{
            const changeCls=d[6]==='up'?'up':d[6]==='dn'?'dn':'eq';
            const changeIcon=d[6]==='up'?'bi-arrow-up-short':d[6]==='dn'?'bi-arrow-down-short':'bi-dash';
            return `<tr>
              <td><span class="m-related-item" data-type="pl" data-code="${d[0]}" style="font-size:var(--fs3);padding:2px 6px">${d[0]}</span></td>
              <td>${d[3]}</td>
              <td><span class="pl-change ${changeCls}" style="font-size:var(--fs3)"><i class="bi ${changeIcon}" style="font-size:10px"></i>${d[7]}</span></td>
              <td class="vnum">${d[8]||'—'}</td>
              <td><span class="pill ${d[9]}" style="font-size:9px;padding:1px 6px"><span class="d" style="width:4px;height:4px"></span>${d[10]}</span></td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>`;
    }
    // Build related Đơn hàng table
    const relatedDh=DH_DATA.all.filter(d=>d[1]===data.code);
    let dhTableHtml='';
    if(relatedDh.length){
      const totalVal=relatedDh.reduce((s,d)=>s+d[6],0);
      dhTableHtml=`
      <div class="m-ct-section">
        <div class="m-ct-title">
          <h4>Đơn hàng</h4>
          <span class="cnt">${relatedDh.length} đơn hàng</span>
          <span class="m-viewall" data-page="donhang" data-hd="${data.code}">Xem trang đơn hàng <i class="bi bi-arrow-right" style="font-size:10px"></i></span>
        </div>
        <table class="m-ct-table">
          <thead><tr>
            <th>Mã DH</th>
            <th>Sản phẩm</th>
            <th>Khối lượng</th>
            <th>Chặng</th>
            <th>Giá trị</th>
            <th>SLA</th>
            <th>Trạng thái</th>
          </tr></thead>
          <tbody>${relatedDh.map(d=>{
            const changIdx=parseInt(d[5]);
            const changName=DH_CHANG_NAMES[changIdx]||'—';
            const changCls=changIdx<=2?'s1':changIdx<=4?'s4':changIdx<=6?'s6':'s7';
            const isOverdue=d[7]&&d[7].startsWith('tre');
            const slaDisplay=isOverdue?`<span style="color:var(--err);font-weight:600;font-size:var(--fs3)">${d[7]}</span>`:`<span style="font-size:var(--fs3)">${d[7]||'—'}</span>`;
            return `<tr>
              <td><span class="m-related-item" data-type="dh" data-code="${d[0]}" style="font-size:var(--fs3);padding:2px 6px">${d[0]}</span></td>
              <td>${d[3]}</td>
              <td class="vnum">${d[4]}</td>
              <td><span class="pill ${changCls}" style="font-size:9px;padding:1px 6px"><span class="d" style="width:4px;height:4px"></span>${changName}</span></td>
              <td class="vnum">${d[6]} ty</td>
              <td>${slaDisplay}</td>
              <td><span class="pill ${d[9]}" style="font-size:9px;padding:1px 6px"><span class="d" style="width:4px;height:4px"></span>${d[8]}</span></td>
            </tr>`;
          }).join('')}</tbody>
        </table>
        <div class="m-ct-footer">
          <span class="total">Tổng giá trị: <b>${totalVal.toFixed(1)} ty</b></span>
        </div>
      </div>`;
    }
    fields=`
      <div class="m-chain-wrap">
        <div class="m-chain">
          <div class="m-chain-step${relatedPl.length>0?' has-branch':''} active">
            <div class="m-chain-icon hd"><i class="bi bi-file-earmark-text"></i></div>
            <div class="m-chain-info"><div class="m-chain-label">Hợp đồng</div><div class="m-chain-code">${data.code}</div><div class="m-chain-meta">${data.customer} · ${data.statusText}</div></div>
          </div>
          <div class="m-chain-arrow"><i class="bi bi-chevron-right"></i></div>
          <div class="m-chain-step" data-type="dhlist">
            <div class="m-chain-icon dh"><i class="bi bi-box-seam"></i></div>
            <div class="m-chain-info"><div class="m-chain-label">Đơn hàng</div><div class="m-chain-code">${relatedDh.length} đơn hàng</div><div class="m-chain-meta">Xem danh sách</div></div>
          </div>
        </div>
        ${relatedPl.length>0?`<div class="m-chain-branch">
          <div class="m-chain-branch-hd">
            <i class="bi bi-diagram-2" style="font-size:11px;color:var(--ink4)"></i>
            <span class="m-chain-branch-title">Tiến trình phụ · Phụ lục hợp đồng</span>
            <span class="m-chain-branch-cnt">${relatedPl.length}</span>
          </div>
          <div class="m-chain-branch-items">
            ${relatedPl.map(pl=>`<div class="m-chain-branch-item" data-type="pl" data-code="${pl[0]}"><i class="bi bi-file-earmark-plus"></i><span class="b-code">${pl[0]}</span><span class="b-meta">${pl[3]}</span></div>`).join('')}
          </div>
        </div>`:''}
      </div>
      <div class="m-section"><div class="m-section-title">Thông tin chung</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Ma hợp đồng</div><div class="m-value mono">${data.code}</div></div>
          <div class="m-field"><div class="m-label">Đối tác</div><div class="m-value"><div class="cust"><div class="av2 ${cClass}">${cShort}</div>${data.customer}</div></div></div>
          <div class="m-field"><div class="m-label">Sản phẩm</div><div class="m-value">${data.product}</div></div>
          <div class="m-field"><div class="m-label">Giá trị</div><div class="m-value mono">${data.value}</div></div>
          <div class="m-field"><div class="m-label">Ngày ký</div><div class="m-value mono">${data.dateStart||'—'}</div></div>
          <div class="m-field"><div class="m-label">Ngày het han</div><div class="m-value mono">${data.dateEnd||'—'}</div></div>
        </div>
      </div>
      <div class="m-section"><div class="m-section-title">Khối lượng</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">KL hợp đồng</div><div class="m-value mono">${data.klHopĐóng}</div></div>
          <div class="m-field"><div class="m-label">KL thực hiện</div><div class="m-value mono">${data.klThucHien}</div></div>
          <div class="m-field full"><div class="m-label">Tiến độ</div><div class="m-value"><div style="flex:1;display:flex;align-items:center;gap:8px"><div style="flex:1;height:6px;background:var(--bg4);border-radius:99px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${pct>=80?'var(--ok)':pct>=50?'var(--pri)':'var(--acc)'};border-radius:99px;transition:width .3s"></div></div><span style="font-family:var(--mono);font-size:var(--fs3);font-weight:600;color:${pct>=80?'var(--ok)':pct>=50?'var(--pri)':'var(--acc)'}">${pct}%</span></div></div></div>
        </div>
      </div>
      <div class="m-section"><div class="m-section-title">Trạng thái</div>
        <div class="m-grid">
          <div class="m-field full"><div class="m-label">Trạng thái</div><div class="m-value"><span class="pill ${data.statusCls}"><span class="d"></span>${data.statusText}</span></div></div>
        </div>
      </div>
      ${plTableHtml}
      ${dhTableHtml}`;
    actions=`<button class="tbtn"><i class="bi bi-pencil"></i> Sửa hợp đồng</button><button class="m-btn-secondary"><i class="bi bi-file-earmark-plus"></i> Tạo phụ lục</button><button class="m-btn-secondary"><i class="bi bi-plus-lg"></i> Tạo đơn hàng</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;

  }else if(type==='pl'){
    iconCls='pl'; iconBi='file-earmark-plus';
    code=data.code; sub='PHU LUC · '+data.code.replace(/-/g,' ');
    const changeCls=data.changeDir==='up'?'up':data.changeDir==='dn'?'dn':'eq';
    const changeIcon=data.changeDir==='up'?'bi-arrow-up-short':data.changeDir==='dn'?'bi-arrow-down-short':'bi-dash';
    // Build chain for PL — main: HD; branch: Phu luc (PL is the active branch item)
    const hdFoundPl=findHdByCode(data.hdCode);
    const hdCustomerPl=hdFoundPl?hdFoundPl.customer:'—';
    const hdStatusPl=hdFoundPl?hdFoundPl.statusText:'—';
    const allPlForHd=PL_DATA.all.filter(d=>d[1]===data.hdCode);
    const hdBranchCls=allPlForHd.length>0?' has-branch':'';
    let plBranchHtml='';
    if(allPlForHd.length>0){
      plBranchHtml=`<div class="m-chain-branch">
        <div class="m-chain-branch-hd">
          <i class="bi bi-diagram-2" style="font-size:11px;color:var(--ink4)"></i>
          <span class="m-chain-branch-title">Tiến trình phụ · Phụ lục hợp đồng</span>
          <span class="m-chain-branch-cnt">${allPlForHd.length}</span>
        </div>
        <div class="m-chain-branch-items">
          ${allPlForHd.map(pl=>{
            const isActive=pl[0]===data.code;
            return `<div class="m-chain-branch-item${isActive?' active':''}" ${isActive?'':`data-type="pl" data-code="${pl[0]}"`}><i class="bi bi-file-earmark-plus"></i><span class="b-code">${pl[0]}</span><span class="b-meta">${pl[3]}</span></div>`;
          }).join('')}
        </div>
      </div>`;
    }
    let plChainHtml=`<div class="m-chain-wrap">
      <div class="m-chain">
        <div class="m-chain-step${hdBranchCls}" data-type="hd" data-code="${data.hdCode}">
          <div class="m-chain-icon hd"><i class="bi bi-file-earmark-text"></i></div>
          <div class="m-chain-info"><div class="m-chain-label">Hợp đồng</div><div class="m-chain-code">${data.hdCode}</div><div class="m-chain-meta">${hdCustomerPl} · ${hdStatusPl}</div></div>
        </div>
      </div>
      ${plBranchHtml}
    </div>`;
    fields=`
      ${plChainHtml}
      <div class="m-section"><div class="m-section-title">Thông tin phụ lục</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Ma phụ lục</div><div class="m-value mono">${data.code}</div></div>
          <div class="m-field"><div class="m-label">Hợp đồng goc</div><div class="m-value"><span class="m-related-item" data-type="hd" data-code="${data.hdCode}">${data.hdCode}</span></div></div>
          <div class="m-field"><div class="m-label">Đối tác</div><div class="m-value"><div class="cust"><div class="av2 ${cClass}">${cShort}</div>${data.customer}</div></div></div>
          <div class="m-field"><div class="m-label">Loại thay đổi</div><div class="m-value">${data.changeType}</div></div>
          <div class="m-field"><div class="m-label">Ngày ký</div><div class="m-value mono">${data.dateSign||'—'}</div></div>
          <div class="m-field"><div class="m-label">Trạng thái</div><div class="m-value"><span class="pill ${data.statusCls}"><span class="d"></span>${data.statusText}</span></div></div>
        </div>
      </div>
      <div class="m-section"><div class="m-section-title">Chi tiết thay đổi</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Giá trị cũ</div><div class="m-value mono">${data.oldValue}</div></div>
          <div class="m-field"><div class="m-label">Giá trị mới</div><div class="m-value mono">${data.newValue}</div></div>
          <div class="m-field full"><div class="m-label">Thay đổi</div><div class="m-value"><span class="pl-change ${changeCls}"><i class="bi ${changeIcon}" style="font-size:12px"></i>${data.changeDesc}</span></div></div>
        </div>
      </div>`;
    actions=`<button class="tbtn" style="background:var(--acc)"><i class="bi bi-check-lg"></i> Duyệt phụ lục</button><button class="m-btn-secondary"><i class="bi bi-pencil"></i> Sửa</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;

  }else if(type==='dh'){
    iconCls='dh'; iconBi='box-seam';
    code=data.code; sub='DON HANG · '+data.code.replace(/-/g,' ');
    const changIdx=parseInt(data.changIdx);
    const changName=DH_CHANG_NAMES[changIdx]||'—';
    const isOverdue=data.sla&&data.sla.startsWith('tre');
    const slaDisplay=isOverdue?`<span style="color:var(--err);font-weight:600">${data.sla}</span>`:data.sla||'—';
    const relatedPl=PL_DATA.all.filter(d=>d[1]===data.hdCode).slice(0,5);
    // Build HD chain info
    const hdFound=findHdByCode(data.hdCode);
    const hdCustomer=hdFound?hdFound.customer:'—';
    const hdStatusText=hdFound?hdFound.statusText:'—';
    // Build inheritance chain for DH — main: HD → DH → CT; branch: Phu luc
    let dhChainHtml='';
    if(hdFound){
      const hdBranchCls=relatedPl.length>0?' has-branch':'';
      let dhBranchHtml='';
      if(relatedPl.length>0){
        dhBranchHtml=`<div class="m-chain-branch">
          <div class="m-chain-branch-hd">
            <i class="bi bi-diagram-2" style="font-size:11px;color:var(--ink4)"></i>
            <span class="m-chain-branch-title">Tiến trình phụ · Phụ lục hợp đồng</span>
            <span class="m-chain-branch-cnt">${relatedPl.length}</span>
          </div>
          <div class="m-chain-branch-items">
            ${relatedPl.map(pl=>`<div class="m-chain-branch-item" data-type="pl" data-code="${pl[0]}"><i class="bi bi-file-earmark-plus"></i><span class="b-code">${pl[0]}</span><span class="b-meta">${pl[3]}</span></div>`).join('')}
          </div>
        </div>`;
      }
      const ctCount=CT_RAW.filter(r=>r[0]===data.code).length;
      dhChainHtml=`<div class="m-chain-wrap">
        <div class="m-chain">
          <div class="m-chain-step${hdBranchCls}" data-type="hd" data-code="${data.hdCode}">
            <div class="m-chain-icon hd"><i class="bi bi-file-earmark-text"></i></div>
            <div class="m-chain-info"><div class="m-chain-label">Hợp đồng</div><div class="m-chain-code">${data.hdCode}</div><div class="m-chain-meta">${hdCustomer} · ${hdStatusText}</div></div>
          </div>
          <div class="m-chain-arrow"><i class="bi bi-chevron-right"></i></div>
          <div class="m-chain-step active">
            <div class="m-chain-icon dh"><i class="bi bi-box-seam"></i></div>
            <div class="m-chain-info"><div class="m-chain-label">Đơn hàng</div><div class="m-chain-code">${data.code}</div><div class="m-chain-meta">${data.customer} · ${changName}</div></div>
          </div>
          <div class="m-chain-arrow"><i class="bi bi-chevron-right"></i></div>
          <div class="m-chain-step" data-type="ctlist" data-code="${data.code}">
            <div class="m-chain-icon ct"><i class="bi bi-list-check"></i></div>
            <div class="m-chain-info"><div class="m-chain-label">Chi tiết DH</div><div class="m-chain-code">${ctCount} mặt hàng</div><div class="m-chain-meta">Xem chi tiết đơn hàng</div></div>
          </div>
        </div>
        ${dhBranchHtml}
      </div>`;
    }
    // Build chi tiết đơn hàng table for this DH
    const ctItems=CT_RAW.filter(r=>r[0]===data.code);
    let ctTableHtml='';
    if(ctItems.length){
      const totalKlDat=ctItems.reduce((s,r)=>s+r[6],0);
      const totalKlGiao=ctItems.reduce((s,r)=>s+r[7],0);
      const totalPct=totalKlDat>0?Math.round((totalKlGiao/totalKlDat)*100):0;
      ctTableHtml=`
      <div class="m-ct-section">
        <div class="m-ct-title">
          <h4>Chi tiết đơn hàng</h4>
          <span class="cnt">${ctItems.length} mặt hàng</span>
          <span class="m-viewall" data-dh="${data.code}">Xem trang chi tiết <i class="bi bi-arrow-right" style="font-size:10px"></i></span>
        </div>
        <table class="m-ct-table">
          <thead><tr>
            <th>ID chi tiết</th>
            <th>Mã SP</th>
            <th>Sản phẩm</th>
            <th>Quy cách</th>
            <th>Nhà máy</th>
            <th>KL dat</th>
            <th>KL giao</th>
            <th>Tiến độ</th>
            <th>Trạng thái</th>
          </tr></thead>
          <tbody>${ctItems.map(d=>{
            const nmClass=NM_COLORS[d[5]]||'c1';
            const nmShort=NM_SHORT[d[5]]||'—';
            const isChenh=d[9]==='Chênh lệch';
            const isChoPB=d[9]==='Chờ phân bổ';
            const isDaGiao=d[9]==='Đã giao';
            const rowPct=d[6]>0?Math.min(100,Math.round((d[7]/d[6])*100)):0;
            const barColor=rowPct>=100?'var(--ok)':rowPct>=50?'var(--pri)':'var(--acc)';
            const statusCls=isChenh?'s8':isChoPB?'s4':isDaGiao?'s2':'s4';
            const qcCls=getQcCls(d[4]);
            const klGiaoStyle=isChenh?'color:var(--err);font-weight:600':'';
            const nmDisplay=d[5]==='—'?'<span style="color:var(--ink4)">—</span>':`<div class="cust"><div class="av2 ${nmClass}" style="width:18px;height:18px;font-size:9px;flex:0 0 18px">${nmShort}</div><span style="font-size:var(--fs3)">${d[5]}</span></div>`;
            return `<tr>
              <td><span class="ct-id" style="font-size:var(--fs3)">${d[1]}</span></td>
              <td><span style="font-family:var(--mono);font-size:var(--fs3);color:var(--acc);font-weight:600">${d[2]}</span></td>
              <td>${d[3]}</td>
              <td><span class="ct-qc ${qcCls}" style="font-size:9px;padding:0 5px">${d[4]}</span></td>
              <td>${nmDisplay}</td>
              <td class="vnum">${d[6].toLocaleString('vi-VN')}</td>
              <td class="vnum" style="${klGiaoStyle}">${d[7].toLocaleString('vi-VN')}</td>
              <td><div style="display:flex;align-items:center;gap:4px;min-width:60px"><div style="flex:1;height:4px;background:var(--bg4);border-radius:99px;overflow:hidden"><div style="height:100%;width:${rowPct}%;background:${barColor};border-radius:99px"></div></div><span style="font-family:var(--mono);font-size:9px;font-weight:600;color:${barColor}">${rowPct}%</span></div></td>
              <td><span class="pill ${statusCls}" style="font-size:9px;padding:1px 6px"><span class="d" style="width:4px;height:4px"></span>${d[9]}</span></td>
            </tr>`;
          }).join('')}</tbody>
        </table>
        <div class="m-ct-footer">
          <span class="total">Tong: <b>${totalKlGiao.toLocaleString('vi-VN')}</b> / <b>${totalKlDat.toLocaleString('vi-VN')}</b> tấn · <b style="color:${totalPct>=80?'var(--ok)':totalPct>=50?'var(--acc)':'var(--err)'}">${totalPct}%</b></span>
        </div>
      </div>`;
    }
    fields=`
      ${dhChainHtml}
      <div class="m-section"><div class="m-section-title">Thông tin đơn hàng</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Mã đơn hàng</div><div class="m-value mono">${data.code}</div></div>
          <div class="m-field"><div class="m-label">Hợp đồng goc</div><div class="m-value"><span class="m-related-item" data-type="hd" data-code="${data.hdCode}">${data.hdCode}</span></div></div>
          <div class="m-field"><div class="m-label">Khách hàng</div><div class="m-value"><div class="cust"><div class="av2 ${cClass}">${cShort}</div>${data.customer}</div></div></div>
          <div class="m-field"><div class="m-label">Sản phẩm</div><div class="m-value">${data.product}</div></div>
          <div class="m-field"><div class="m-label">Khối lượng</div><div class="m-value mono">${data.quantity}</div></div>
          <div class="m-field"><div class="m-label">Giá trị</div><div class="m-value mono">${data.value} ty</div></div>
        </div>
      </div>
      <div class="m-section"><div class="m-section-title">Tiến độ & SLA</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Chang hien tai</div><div class="m-value"><span class="pill ${data.changIdx<=2?'s1':data.changIdx<=4?'s4':data.changIdx<=6?'s6':'s7'}"><span class="d"></span>${changName}</span></div></div>
          <div class="m-field"><div class="m-label">SLA</div><div class="m-value">${slaDisplay}</div></div>
          <div class="m-field full"><div class="m-label">Trạng thái</div><div class="m-value"><span class="pill ${data.statusCls}"><span class="d"></span>${data.statusText}</span></div></div>
        </div>
      </div>
      ${ctTableHtml}`;
    if(relatedPl.length){
      related+=`<div class="m-related"><div class="m-related-title">Phụ lục hợp đồng (${relatedPl.length})</div><div class="m-related-list">${relatedPl.map(d=>`<span class="m-related-item" data-type="pl" data-code="${d[0]}">${d[0]}</span>`).join('')}</div></div>`;
    }
    actions=`<button class="tbtn" style="background:var(--ok)"><i class="bi bi-arrow-right"></i> Chuyen chang</button><button class="m-btn-secondary"><i class="bi bi-pencil"></i> Sửa</button><button class="m-btn-secondary" data-action="viewct" data-dh="${data.code}"><i class="bi bi-list-check"></i> Xem chi tiết</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;

  }else if(type==='pb'){
    iconCls='pb'; iconBi='building';
    const maPB=data.maPB;
    const maCT=data.maCT;
    const dhCode=data.dhCode;
    const sp=data.sanPham;
    const nm=data.nhaMay;
    const nmClass=NM_COLORS[nm]||'c1';
    const nmShort=NM_SHORT[nm]||'—';
    code=maPB; sub='PHAN BO NGUON NHA MAY · '+maPB;
    const klDat=data.klDat;
    const klPb=data.klPb;
    const đơnGia=data.đơnGia;
    const thanhTien=klPb*đơnGia;
    const pbPct=klDat>0?Math.min(100,Math.round((klPb/klDat)*100)):0;
    const barColor=pbPct>=100?'var(--ok)':pbPct>=50?'var(--pri)':'var(--acc)';
    const isChenh=data.trangThai==='Chênh lệch';
    const isChoPB=data.trangThai==='Chờ phân bổ';
    const isDaPB=data.trangThai==='Đã phân bổ đủ';
    const statusCls=isChenh?'s8':isChoPB?'s4':isDaPB?'s2':'s4';
    const chenhLabs=Math.abs(klPb-klDat);
    const chenhPct=klDat>0?((chenhLabs/klDat)*100).toFixed(1):'0';
    // Build inheritance chain: HD → PL → DH → CT → PB
    const dhFound=findDhByCode(dhCode);
    const dhCustomer=dhFound?dhFound.customer:'—';
    const dhValue=dhFound?dhFound.value:0;
    const dhChang=dhFound?DH_CHANG_NAMES[parseInt(dhFound.changIdx)]||'—':'—';
    const dhStatusCls=dhFound?dhFound.statusCls:'s4';
    const dhStatusText=dhFound?dhFound.statusText:'—';
    const dhHdCode=dhFound?dhFound.hdCode:'—';
    const cClass2=HD_CUST_COLORS[dhCustomer]||'c1';
    const cShort2=HD_CUST_SHORT[dhCustomer]||'??';
    // Find HD info
    const hdFound=findHdByCode(dhHdCode);
    const hdCustomer=hdFound?hdFound.customer:'—';
    const hdValue=hdFound?hdFound.value:'—';
    const hdStatusText=hdFound?hdFound.statusText:'—';
    const hdStatusCls=hdFound?hdFound.statusCls:'s4';
    const cClass3=HD_CUST_COLORS[hdCustomer]||'c1';
    const cShort3=HD_CUST_SHORT[hdCustomer]||'??';
    // Find PL for this HD
    const relatedPl=PL_DATA.all.filter(d=>d[1]===dhHdCode).slice(0,5);
    // Find CT info
    const ctRow=CT_RAW.find(r=>r[1]===maCT);
    const ctMaSP=ctRow?ctRow[2]:'—';
    const ctSanPham=ctRow?ctRow[3]:'—';
    const ctQuyCach=ctRow?ctRow[4]:'—';
    const ctNhaMay=ctRow?ctRow[5]:'—';
    const ctKlDat=ctRow?ctRow[6]:0;
    const ctKlGiao=ctRow?ctRow[7]:0;
    const ctTrangThai=ctRow?ctRow[9]:'—';
    const ctIsChenh=ctTrangThai==='Chênh lệch';
    const ctStatusCls=ctTrangThai==='Đã giao'?'s2':ctTrangThai==='Chờ phân bổ'?'s4':ctIsChenh?'s8':'s4';
    // Build inheritance chain — main process: HD → DH → CT → PB; branch: Phu luc
    const hdBranchCls=relatedPl.length>0?' has-branch':'';
    let branchHtml='';
    if(relatedPl.length>0){
      branchHtml=`<div class="m-chain-branch">
        <div class="m-chain-branch-hd">
          <i class="bi bi-diagram-2" style="font-size:11px;color:var(--ink4)"></i>
          <span class="m-chain-branch-title">Tiến trình phụ · Phụ lục hợp đồng</span>
          <span class="m-chain-branch-cnt">${relatedPl.length}</span>
        </div>
        <div class="m-chain-branch-items">
          ${relatedPl.map(pl=>`<div class="m-chain-branch-item" data-type="pl" data-code="${pl[0]}"><i class="bi bi-file-earmark-plus"></i><span class="b-code">${pl[0]}</span><span class="b-meta">${pl[3]}</span></div>`).join('')}
        </div>
      </div>`;
    }
    // Find VC records linked to this PB
    const pbVcRecords=DB_SRC.filter(r=>r[1]===maPB);
    let vcStepHtml='';
    if(pbVcRecords.length>0){
      const vc=pbVcRecords[0];
      const vcLabel=DB_SG_LABELS[vc[12]]||'';
      vcStepHtml=`<div class="m-chain-arrow"><i class="bi bi-chevron-right"></i></div>
        <div class="m-chain-step" data-type="db" data-code="${vc[0]}">
          <div class="m-chain-icon db"><i class="bi bi-truck"></i></div>
          <div class="m-chain-info"><div class="m-chain-label">Vận chuyển</div><div class="m-chain-code">${vc[0]}</div><div class="m-chain-meta">${vcLabel}</div></div>
        </div>`;
    }
    let chainHtml=`<div class="m-chain-wrap">
      <div class="m-chain">
        <div class="m-chain-step${hdBranchCls}" data-type="hd" data-code="${dhHdCode}">
          <div class="m-chain-icon hd"><i class="bi bi-file-earmark-text"></i></div>
          <div class="m-chain-info"><div class="m-chain-label">Hợp đồng</div><div class="m-chain-code">${dhHdCode}</div><div class="m-chain-meta">${hdCustomer} · ${hdStatusText}</div></div>
        </div>
        <div class="m-chain-arrow"><i class="bi bi-chevron-right"></i></div>
        <div class="m-chain-step" data-type="dh" data-code="${dhCode}">
          <div class="m-chain-icon dh"><i class="bi bi-box-seam"></i></div>
          <div class="m-chain-info"><div class="m-chain-label">Đơn hàng</div><div class="m-chain-code">${dhCode}</div><div class="m-chain-meta">${dhCustomer} · ${dhChang}</div></div>
        </div>
        <div class="m-chain-arrow"><i class="bi bi-chevron-right"></i></div>
        <div class="m-chain-step" data-type="ct" data-code="${maCT}">
          <div class="m-chain-icon ct"><i class="bi bi-list-check"></i></div>
          <div class="m-chain-info"><div class="m-chain-label">Chi tiết</div><div class="m-chain-code">${maCT}</div><div class="m-chain-meta">${ctMaSP} · ${ctSanPham} · ${ctNhaMay}</div></div>
        </div>
        <div class="m-chain-arrow"><i class="bi bi-chevron-right"></i></div>
        <div class="m-chain-step active">
          <div class="m-chain-icon pb"><i class="bi bi-building"></i></div>
          <div class="m-chain-info"><div class="m-chain-label">Phân bổ</div><div class="m-chain-code">${maPB}</div><div class="m-chain-meta">${nm} · ${data.trangThai}</div></div>
        </div>
        ${vcStepHtml}
      </div>
      ${branchHtml}
    </div>`;
    // All PB rows for same DH
    const sameDhRows=PB_RAW.filter(r=>r[2]===dhCode);
    let sameDhHtml='';
    if(sameDhRows.length>1){
      const totalKlDatDh=sameDhRows.reduce((s,r)=>s+r[5],0);
      const totalKlPbDh=sameDhRows.reduce((s,r)=>s+r[6],0);
      const totalPctDh=totalKlDatDh>0?Math.round((totalKlPbDh/totalKlDatDh)*100):0;
      sameDhHtml=`
      <div class="m-ct-section">
        <div class="m-ct-title">
          <h4>Phân bổ theo nhà máy</h4>
          <span class="cnt">${sameDhRows.length} nhà máy</span>
        </div>
        <table class="m-ct-table">
          <thead><tr>
            <th>Ma PB</th>
            <th>Nhà máy</th>
            <th>KL dat</th>
            <th>KL phân bổ</th>
            <th>Tiến độ</th>
            <th>Trạng thái</th>
          </tr></thead>
          <tbody>${sameDhRows.map(r=>{
            const rNmClass=NM_COLORS[r[4]]||'c1';
            const rNmShort=NM_SHORT[r[4]]||'—';
            const rPct=r[5]>0?Math.min(100,Math.round((r[6]/r[5])*100)):0;
            const rBarCol=rPct>=100?'var(--ok)':rPct>=50?'var(--pri)':'var(--acc)';
            const rIsChenh=r[8]==='Chênh lệch';
            const rIsChoPB=r[8]==='Chờ phân bổ';
            const rIsDaPB=r[8]==='Đã phân bổ đủ';
            const rStatusCls=rIsChenh?'s8':rIsChoPB?'s4':rIsDaPB?'s2':'s4';
            const rNmDisplay=r[4]==='—'?'<span style="color:var(--ink4)">—</span>':`<div class="cust"><div class="av2 ${rNmClass}" style="width:18px;height:18px;font-size:9px;flex:0 0 18px">${rNmShort}</div><span style="font-size:var(--fs3)">${r[4]}</span></div>`;
            const rKlPbStyle=rIsChenh?'color:var(--err);font-weight:600':'';
            const isCurrent=r[0]===maPB;
            return `<tr${isCurrent?' style="background:var(--pri3)"':''}>
              <td><span class="m-related-item" data-type="pb" data-code="${r[0]}" style="font-size:var(--fs3);padding:2px 6px">${r[0]}</span></td>
              <td>${rNmDisplay}</td>
              <td class="vnum">${r[5].toLocaleString('vi-VN')}</td>
              <td class="vnum" style="${rKlPbStyle}">${r[6].toLocaleString('vi-VN')}</td>
              <td><div style="display:flex;align-items:center;gap:4px;min-width:60px"><div style="flex:1;height:4px;background:var(--bg4);border-radius:99px;overflow:hidden"><div style="height:100%;width:${rPct}%;background:${rBarCol};border-radius:99px"></div></div><span style="font-family:var(--mono);font-size:9px;font-weight:600;color:${rBarCol}">${rPct}%</span></div></td>
              <td><span class="pill ${rStatusCls}" style="font-size:9px;padding:1px 6px"><span class="d" style="width:4px;height:4px"></span>${r[8]}</span></td>
            </tr>`;
          }).join('')}</tbody>
        </table>
        <div class="m-ct-footer">
          <span class="total">Tong: <b>${totalKlPbDh.toLocaleString('vi-VN')}</b> / <b>${totalKlDatDh.toLocaleString('vi-VN')}</b> tấn · Tiến độ: <b style="color:${totalPctDh>=80?'var(--ok)':totalPctDh>=50?'var(--pri)':'var(--acc)'}">${totalPctDh}%</b></span>
        </div>
      </div>`;
    }


    fields=`
      ${chainHtml}
      <div class="m-section"><div class="m-section-title">Thông tin phân bổ</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Mã phân bổ</div><div class="m-value mono">${maPB}</div></div>
          <div class="m-field"><div class="m-label">Mã chi tiết</div><div class="m-value"><span class="m-related-item" data-type="ct" data-code="${maCT}">${maCT}</span></div></div>
          <div class="m-field"><div class="m-label">Mã đơn hàng</div><div class="m-value"><span class="m-related-item" data-type="dh" data-code="${dhCode}">${dhCode}</span></div></div>
          <div class="m-field"><div class="m-label">Nhà máy</div><div class="m-value"><div class="cust"><div class="av2 ${nmClass}">${nmShort}</div>${nm==='—'?'Chua xac dinh':nm}</div></div></div>
          <div class="m-field"><div class="m-label">Sản phẩm</div><div class="m-value">${sp}</div></div>
          <div class="m-field"><div class="m-label">Trạng thái</div><div class="m-value"><span class="pill ${statusCls}"><span class="d"></span>${data.trangThai}</span></div></div>
        </div>
      </div>
      <div class="m-section"><div class="m-section-title">Khối lượng & Giá trị</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">KL dat</div><div class="m-value mono">${klDat.toLocaleString('vi-VN')} tan</div></div>
          <div class="m-field"><div class="m-label">KL phân bổ</div><div class="m-value mono" style="${isChenh?'color:var(--err);font-weight:600':''}">${klPb.toLocaleString('vi-VN')} tan</div></div>
          <div class="m-field"><div class="m-label">Chênh lệch</div><div class="m-value mono" style="color:${isChenh?'var(--err)':'var(--ink)'}">${isChenh?'+'+chenhLabs.toLocaleString('vi-VN')+' ('+chenhPct+'%)':'0 tan'}</div></div>
          <div class="m-field"><div class="m-label">Đơn giá</div><div class="m-value mono" style="font-size:var(--fs3)">${đơnGia>=1000?đơnGia.toLocaleString('vi-VN')+' VND/chuyen':đơnGia.toLocaleString('vi-VN')+' VND/tan'}</div></div>
          <div class="m-field"><div class="m-label">Thành tiền</div><div class="m-value mono">${thanhTien>=1e6?(thanhTien/1e6).toFixed(0)+' tr VND':(thanhTien/1e3).toFixed(0)+' tr VND'}</div></div>
          <div class="m-field full"><div class="m-label">Tiến độ phân bổ</div><div class="m-value"><div style="flex:1;display:flex;align-items:center;gap:8px"><div style="flex:1;height:6px;background:var(--bg4);border-radius:99px;overflow:hidden"><div style="height:100%;width:${pbPct}%;background:${barColor};border-radius:99px;transition:width .3s"></div></div><span style="font-family:var(--mono);font-size:var(--fs3);font-weight:600;color:${barColor}">${pbPct}%</span></div></div></div>
        </div>
      </div>
      <div class="m-section"><div class="m-section-title">Thông tin đơn hàng</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Khách hàng</div><div class="m-value"><div class="cust"><div class="av2 ${cClass2}">${cShort2}</div>${dhCustomer}</div></div></div>
          <div class="m-field"><div class="m-label">Giá trị DH</div><div class="m-value mono">${dhValue} ty</div></div>
          <div class="m-field"><div class="m-label">Chặng</div><div class="m-value"><span class="pill ${dhStatusCls}" style="font-size:9px;padding:1px 6px"><span class="d" style="width:4px;height:4px"></span>${dhChang}</span></div></div>
          <div class="m-field"><div class="m-label">Trạng thái DH</div><div class="m-value"><span class="pill ${dhStatusCls}"><span class="d"></span>${dhStatusText}</span></div></div>
        </div>
      </div>
      ${sameDhHtml}`;

    // Action buttons based on status
    if(isChoPB){
      actions=`<button class="tbtn" style="background:var(--pri)"><i class="bi bi-plus-lg"></i> Phân bổ nhà máy</button><button class="m-btn-secondary"><i class="bi bi-arrow-left-right"></i> Chuyen sang DH khac</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }else if(isChenh){
      actions=`<button class="tbtn" style="background:var(--acc)"><i class="bi bi-arrow-repeat"></i> Dieu chính phân bổ</button><button class="m-btn-secondary"><i class="bi bi-pencil"></i> Sửa KL</button><button class="m-btn-secondary"><i class="bi bi-arrow-left-right"></i> Chuyen sang NM khac</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }else if(isDaPB){
      actions=`<button class="m-btn-secondary"><i class="bi bi-eye"></i> Xem chi tiết</button><button class="m-btn-secondary"><i class="bi bi-arrow-left-right"></i> Chuyen sang NM khac</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }else{
      actions=`<button class="tbtn" style="background:var(--pri)"><i class="bi bi-pencil"></i> Dieu chính</button><button class="m-btn-secondary"><i class="bi bi-arrow-left-right"></i> Chuyen sang NM khac</button><button class="m-btn-secondary"><i class="bi bi-plus-lg"></i> Tang KL</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }
  }else if(type==='vb'){
    iconCls='vb'; iconBi='box-seam';
    const maLC=data.maLC;
    code=maLC; sub='VO BAO · '+maLC;
    const loaiVB=data.loaiVoBao;
    const tu=data.tu;
    const den=data.den;
    const soLuong=data.soLuong;
    const trongLuong=data.trongLuong;
    const ngàyLC=data.ngàyLC;
    const trangThai=data.trangThai;
    const ghiChu=data.ghiChu||'—';
    const loaiCls=VB_LOAI_CLS[loaiVB]||'s4';
    const statusCls=VB_STATUS_CLS[trangThai]||'s4';
    const isDangLC=trangThai==='Đang luân chuyển';
    const isChoLC=trangThai==='Chờ luân chuyển';
    const isDaLC=trangThai==='Đã luân chuyển';
    const isTonKho=trangThai==='Tồn kho';
    const fromNm=tu.split(' / ')[0];
    const toNm=den.split(' / ')[0];
    const fromNmClass=NM_COLORS[fromNm]||'c1';
    const fromNmShort=NM_SHORT[fromNm]||'--';
    const toNmClass=NM_COLORS[toNm]||'c1';
    const toNmShort=NM_SHORT[toNm]||'--';
    // Other luân chuyển for same loại vỏ bao
    const sameLoaiRows=VB_RAW.filter(r=>r[1]===loaiVB&&r[0]!==maLC).slice(0,5);
    let sameLoaiHtml='';
    if(sameLoaiRows.length){
      sameLoaiHtml=`
      <div class="m-ct-section">
        <div class="m-ct-title">
          <h4>Luan chuyển khac (${loaiVB})</h4>
          <span class="cnt">${sameLoaiRows.length} chuyen</span>
        </div>
        <table class="m-ct-table">
          <thead><tr>
            <th>Ma LC</th>
            <th>Tu</th>
            <th>Den</th>
            <th>SL</th>
            <th>TG</th>
            <th>Trạng thái</th>
          </tr></thead>
          <tbody>${sameLoaiRows.map(r=>{
            const rStCls=VB_STATUS_CLS[r[7]]||'s4';
            const rFromNm=r[2].split(' / ')[0];
            const rToNm=r[3].split(' / ')[0];
            const rFromShort=NM_SHORT[rFromNm]||'--';
            const rToShort=NM_SHORT[rToNm]||'--';
            return `<tr>
              <td><span style="font-family:var(--mono);font-size:var(--fs3);color:var(--pri)">${r[0]}</span></td>
              <td style="font-size:var(--fs3)">${rFromShort} / ${r[2].split(' / ')[1]}</td>
              <td style="font-size:var(--fs3)">${rToShort} / ${r[3].split(' / ')[1]}</td>
              <td class="vnum" style="font-size:var(--fs3)">${r[4].toLocaleString('vi-VN')}</td>
              <td class="vnum" style="font-size:9px">${r[6]}</td>
              <td><span class="pill ${rStCls}" style="font-size:9px;padding:1px 6px"><span class="d" style="width:4px;height:4px"></span>${r[7]}</span></td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>`;
    }


    fields=`
      <div class="m-section"><div class="m-section-title">Thông tin luân chuyển</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Mã luân chuyển</div><div class="m-value mono">${maLC}</div></div>
          <div class="m-field"><div class="m-label">Loai vỏ bao</div><div class="m-value"><span class="pill ${loaiCls}"><span class="d"></span>${loaiVB}</span></div></div>
          <div class="m-field"><div class="m-label">Ngày luân chuyển</div><div class="m-value mono">${ngàyLC}</div></div>
          <div class="m-field"><div class="m-label">Trạng thái</div><div class="m-value"><span class="pill ${statusCls}"><span class="d"></span>${trangThai}</span></div></div>
        </div>
      </div>
      <div class="m-section"><div class="m-section-title">Dieu chuyen</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Tu (NM/Kho)</div><div class="m-value"><div class="cust"><div class="av2 ${fromNmClass}">${fromNmShort}</div>${tu}</div></div></div>
          <div class="m-field"><div class="m-label">Den (NM/Kho)</div><div class="m-value"><div class="cust"><div class="av2 ${toNmClass}">${toNmShort}</div>${den}</div></div></div>
        </div>
      </div>
      <div class="m-section"><div class="m-section-title">So luong & Trong luong</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">So luong</div><div class="m-value mono">${soLuong.toLocaleString('vi-VN')} cai</div></div>
          <div class="m-field"><div class="m-label">Trong luong</div><div class="m-value mono">${trongLuong.toLocaleString('vi-VN')} kg</div></div>
          <div class="m-field"><div class="m-label">Đơn giá / cai</div><div class="m-value mono" style="font-size:var(--fs3)">${(loaiVB.includes('GI')?'12,500':'8,200')} VND</div></div>
          <div class="m-field"><div class="m-label">Thành tiền</div><div class="m-value mono">${((loaiVB.includes('GI')?12500:8200)*soLuong/1e6).toFixed(1)} tr VND</div></div>
          <div class="m-field full"><div class="m-label">Ghi chu</div><div class="m-value" style="font-size:var(--fs3)">${ghiChu}</div></div>
        </div>
      </div>
      ${sameLoaiHtml}`;

    // Action buttons based on status
    if(isChoLC){
      actions=`<button class="tbtn" style="background:var(--pri)"><i class="bi bi-send"></i> Gửi luân chuyển</button><button class="m-btn-secondary"><i class="bi bi-pencil"></i> Sửa</button><button class="m-btn-secondary"><i class="bi bi-trash3"></i> Hủy</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }else if(isDangLC){
      actions=`<button class="tbtn" style="background:var(--ok)"><i class="bi bi-check-lg"></i> Xác nhận nhan</button><button class="m-btn-secondary"><i class="bi bi-geo-alt"></i> Theo dõi</button><button class="m-btn-secondary"><i class="bi bi-pencil"></i> Sửa</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }else if(isDaLC){
      actions=`<button class="m-btn-secondary"><i class="bi bi-arrow-left-right"></i> Luan chuyển tiep</button><button class="m-btn-secondary"><i class="bi bi-eye"></i> Xem lịch sử</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }else{
      actions=`<button class="tbtn" style="background:var(--acc)"><i class="bi bi-arrow-left-right"></i> Luân chuyển</button><button class="m-btn-secondary"><i class="bi bi-pencil"></i> Sửa SL</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }
  }else if(type==='ct'){
    iconCls='ct'; iconBi='ship';
    const maLo=data.maLo;
    code=maLo; sub='KE HOACH TAU ME · '+maLo;
    const tauBien=data.tauBien;
    const benDi=data.benDi;
    const benDen=data.benDen;
    const klXuat=data.klXuat;
    const ngàyXuat=data.ngàyXuat;
    const dhCode=data.dhCode;
    const trangThai=data.trangThai;
    const ghiChu=data.ghiChu||'—';
    const statusCls=CXT_STATUS_CLS[trangThai]||'s4';
    const tauCls=CXT_TAU_CLS[tauBien]||'c1';
    const tauShort=CXT_TAU_SHORT[tauBien]||'--';
    const isDaXuat=trangThai==='Đã xuất';
    const isDangXuat=trangThai==='Đang xuất';
    const isChoXuat=trangThai==='Chờ xuất';
    const isDaHủy=trangThai==='Đã hủy';
    // Other lo xuất for same tau
    const sameTauRows=CXT_SRC.filter(r=>r[1]===tauBien&&r[0]!==maLo).slice(0,5);
    let sameTauHtml='';
    if(sameTauRows.length){
      sameTauHtml=`
      <div class="m-ct-section">
        <div class="m-ct-title">
          <h4>Lo xuất khac (${tauBien})</h4>
          <span class="cnt">${sameTauRows.length} lo</span>
        </div>
        <table class="m-ct-table">
          <thead><tr>
            <th>Mã lô</th>
            <th>Ber di</th>
            <th>Ber den</th>
            <th>KL (tan)</th>
            <th>Ngay</th>
            <th>Trạng thái</th>
          </tr></thead>
          <tbody>${sameTauRows.map(r=>{
            const rStCls=CXT_STATUS_CLS[r[7]]||'s4';
            return `<tr>
              <td><span class="m-related-item" data-type="ct" data-code="${r[0]}" style="font-size:var(--fs3);padding:2px 6px">${r[0]}</span></td>
              <td style="font-size:var(--fs3)">${r[2]}</td>
              <td style="font-size:var(--fs3)">${r[3]}</td>
              <td class="vnum" style="font-size:var(--fs3)">${r[4].toLocaleString('vi-VN')}</td>
              <td class="vnum" style="font-size:9px">${r[5]}</td>
              <td><span class="pill ${rStCls}" style="font-size:9px;padding:1px 6px"><span class="d" style="width:4px;height:4px"></span>${r[7]}</span></td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>`;
    }

    fields=`
      <div class="m-section"><div class="m-section-title">Thông tin lô xuất</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Ma lô xuất</div><div class="m-value mono">${maLo}</div></div>
          <div class="m-field"><div class="m-label">Tau bien</div><div class="m-value"><div class="cust"><div class="av2 ${tauCls}">${tauShort}</div>${tauBien}</div></div></div>
          <div class="m-field"><div class="m-label">Ngày xuat</div><div class="m-value mono">${ngàyXuat}</div></div>
          <div class="m-field"><div class="m-label">Trạng thái</div><div class="m-value"><span class="pill ${statusCls}"><span class="d"></span>${trangThai}</span></div></div>
        </div>
      </div>
      <div class="m-section"><div class="m-section-title">Hanh trinh</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Ber di</div><div class="m-value">${benDi}</div></div>
          <div class="m-field"><div class="m-label">Ber den</div><div class="m-value">${benDen}</div></div>
        </div>
      </div>
      <div class="m-section"><div class="m-section-title">Khối lượng & Đơn hàng</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">KL xuat</div><div class="m-value mono">${klXuat.toLocaleString('vi-VN')} tan</div></div>
          <div class="m-field"><div class="m-label">Đơn hàng</div><div class="m-value"><span class="m-related-item" data-type="dh" data-code="${dhCode}">${dhCode}</span></div></div>
          <div class="m-field full"><div class="m-label">Ghi chu</div><div class="m-value" style="font-size:var(--fs3)">${ghiChu}</div></div>
        </div>
      </div>
      ${sameTauHtml}`;

    // Action buttons based on status
    if(isChoXuat){
      actions=`<button class="tbtn" style="background:var(--pri)"><i class="bi bi-play-fill"></i> Bắt đầu xuat</button><button class="m-btn-secondary"><i class="bi bi-pencil"></i> Sửa</button><button class="m-btn-secondary"><i class="bi bi-trash3"></i> Hủy</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }else if(isDangXuat){
      actions=`<button class="tbtn" style="background:var(--ok)"><i class="bi bi-check-lg"></i> Xác nhận xuat</button><button class="m-btn-secondary"><i class="bi bi-geo-alt"></i> Theo dõi</button><button class="m-btn-secondary"><i class="bi bi-pencil"></i> Sửa</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }else if(isDaXuat){
      actions=`<button class="m-btn-secondary"><i class="bi bi-arrow-left-right"></i> Tạo lo tiep</button><button class="m-btn-secondary"><i class="bi bi-eye"></i> Xem chi tiết</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }else{
      actions=`<button class="tbtn" style="background:var(--acc)"><i class="bi bi-arrow-repeat"></i> Tạo lai</button><button class="m-btn-secondary"><i class="bi bi-eye"></i> Xem lịch sử</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }
  }else if(type==='psl'){
    iconCls='psl'; iconBi='water';
    const maPSL=data.maPSL;
    code=maPSL; sub='DIEU DO SA LAN · '+maPSL;
    const saLan=data.saLan;
    const boNeo=data.boNeo;
    const sanPham=data.sanPham;
    const soLoXuat=data.soLoXuat;
    const klNhap=data.klNhap;
    const ngàyNhap=data.ngàyNhap;
    const dhCode=data.dhCode;
    const trangThai=data.trangThai;
    const ghiChu=data.ghiChu||'—';
    const statusCls=PSL_STATUS_CLS[trangThai]||'s4';
    const slCls=PSL_SALAN_CLS[saLan]||'c1';
    const slShort=PSL_SALAN_SHORT[saLan]||'--';
    const isDaNhap=trangThai==='Da nhap';
    const isDangNhap=trangThai==='Đang nhập';
    const isChoNhap=trangThai==='Chờ nhập';
    // Other phiếu for same sa lan
    const sameSlRows=PSL_SRC.filter(r=>r[1]===saLan&&r[0]!==maPSL).slice(0,5);
    let sameSlHtml='';
    if(sameSlRows.length){
      sameSlHtml=`
      <div class="m-ct-section">
        <div class="m-ct-title">
          <h4>Phieu khac (${saLan})</h4>
          <span class="cnt">${sameSlRows.length} phiếu</span>
        </div>
        <table class="m-ct-table">
          <thead><tr>
            <th>Ma phiếu</th>
            <th>Bo neo</th>
            <th>Sản phẩm</th>
            <th>KL (tan)</th>
            <th>Ngay</th>
            <th>Trạng thái</th>
          </tr></thead>
          <tbody>${sameSlRows.map(r=>{
            const rStCls=PSL_STATUS_CLS[r[8]]||'s4';
            return `<tr>
              <td><span class="m-related-item" data-type="psl" data-code="${r[0]}" style="font-size:var(--fs3);padding:2px 6px">${r[0]}</span></td>
              <td style="font-size:var(--fs3)">${r[2]}</td>
              <td style="font-size:var(--fs3)">${r[3]}</td>
              <td class="vnum" style="font-size:var(--fs3)">${r[5].toLocaleString('vi-VN')}</td>
              <td class="vnum" style="font-size:9px">${r[6]}</td>
              <td><span class="pill ${rStCls}" style="font-size:9px;padding:1px 6px"><span class="d" style="width:4px;height:4px"></span>${r[8]}</span></td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>`;
    }

    fields=`
      <div class="m-section"><div class="m-section-title">Thông tin phiếu sa lan</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Ma phiếu</div><div class="m-value mono">${maPSL}</div></div>
          <div class="m-field"><div class="m-label">Sa lan</div><div class="m-value"><div class="cust"><div class="av2 ${slCls}">${slShort}</div>${saLan}</div></div></div>
          <div class="m-field"><div class="m-label">Bo neo</div><div class="m-value">${boNeo}</div></div>
          <div class="m-field"><div class="m-label">Ngày nhap</div><div class="m-value mono">${ngàyNhap}</div></div>
          <div class="m-field"><div class="m-label">Trạng thái</div><div class="m-value"><span class="pill ${statusCls}"><span class="d"></span>${trangThai}</span></div></div>
        </div>
      </div>
      <div class="m-section"><div class="m-section-title">Sản phẩm & Khối lượng</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Sản phẩm</div><div class="m-value">${sanPham}</div></div>
          <div class="m-field"><div class="m-label">KL nhập</div><div class="m-value mono">${klNhap.toLocaleString('vi-VN')} tan</div></div>
          <div class="m-field"><div class="m-label">So lô xuất</div><div class="m-value"><span class="m-related-item" data-type="ct" data-code="${soLoXuat}">${soLoXuat}</span></div></div>
          <div class="m-field"><div class="m-label">Đơn hàng</div><div class="m-value"><span class="m-related-item" data-type="dh" data-code="${dhCode}">${dhCode}</span></div></div>
          <div class="m-field full"><div class="m-label">Ghi chu</div><div class="m-value" style="font-size:var(--fs3)">${ghiChu}</div></div>
        </div>
      </div>
      ${sameSlHtml}`;

    // Action buttons based on status
    if(isChoNhap){
      actions=`<button class="tbtn" style="background:var(--pri)"><i class="bi bi-play-fill"></i> Bắt đầu nhap</button><button class="m-btn-secondary"><i class="bi bi-pencil"></i> Sửa</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }else if(isDangNhap){
      actions=`<button class="tbtn" style="background:var(--ok)"><i class="bi bi-check-lg"></i> Xác nhận nhap</button><button class="m-btn-secondary"><i class="bi bi-geo-alt"></i> Theo dõi</button><button class="m-btn-secondary"><i class="bi bi-pencil"></i> Sửa</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }else{
      actions=`<button class="m-btn-secondary"><i class="bi bi-plus-lg"></i> Tạo phiếu tiep</button><button class="m-btn-secondary"><i class="bi bi-eye"></i> Xem chi tiết</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }
  }else if(type==='db'){
    iconCls='db'; iconBi='truck';
    const maVC=data.maVC;
    const maPB=data.maPB;
    const sgLabel=DB_SG_LABELS[data.sg]||'VC nội địa';
    code=maVC; sub=sgLabel.toUpperCase()+' · '+maVC;
    const tuyen=data.tuyen;
    const dvvc=data.dvvc;
    const xe=data.xe;
    const taiXe=data.taiXe;
    const sanPham=data.sanPham;
    const kl=data.kl;
    const ngàyGiao=data.ngàyGiao;
    const dhCode=data.dhCode;
    const trangThai=data.trangThai;
    const ghiChu=data.ghiChu||'—';
    const statusCls=DB_STATUS_CLS[trangThai]||'s4';
    const xeCls=DB_XE_CLS[xe]||'c1';
    const xeShort=DB_XE_SHORT[xe]||'--';
    const isDaGiao=trangThai==='Đã giao';
    const isDangVC=trangThai==='Đang vận chuyển';
    const isChoKH=trangThai==='Chờ khoi hanh';
    // Other plans in same sub-group and same tuyen
    const sameTuyếnRows=DB_SRC.filter(r=>r[12]===data.sg&&r[2]===tuyen&&r[0]!==maVC).slice(0,5);
    let sameTuyếnHtml='';
    if(sameTuyếnRows.length){
      sameTuyếnHtml=`
      <div class="m-ct-section">
        <div class="m-ct-title">
          <h4>Lenh khac (${tuyen.split('→')[0].trim()})</h4>
          <span class="cnt">${sameTuyếnRows.length} lenh</span>
        </div>
        <table class="m-ct-table">
          <thead><tr>
            <th>Ma VC</th>
            <th>Ma PB</th>
            <th>Xe</th>
            <th>Sản phẩm</th>
            <th>KL (tan)</th>
            <th>Trạng thái</th>
          </tr></thead>
          <tbody>${sameTuyếnRows.map(r=>{
            const rStCls=DB_STATUS_CLS[r[10]]||'s4';
            return `<tr>
              <td><span class="m-related-item" data-type="db" data-code="${r[0]}" style="font-size:var(--fs3);padding:2px 6px">${r[0]}</span></td>
              <td><span class="m-related-item" data-type="pb" data-code="${r[1]}" style="font-size:var(--fs3);padding:2px 6px;color:var(--acc)">${r[1]}</span></td>
              <td style="font-size:var(--fs3)">${r[4]}</td>
              <td style="font-size:var(--fs3)">${r[6]}</td>
              <td class="vnum" style="font-size:var(--fs3)">${r[7].toLocaleString('vi-VN')}</td>
              <td><span class="pill ${rStCls}" style="font-size:9px;padding:1px 6px"><span class="d" style="width:4px;height:4px"></span>${r[10]}</span></td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </div>`;
    }

    // Build chain: HD → DH → PB → VC (current)
    let dbChainHtml='';
    const pbData=findPbByCode(maPB);
    if(pbData){
      const pbDhCode=pbData.dhCode;
      const pbDh=findDhByCode(pbDhCode);
      const pbHdCode=pbDh?.hdCode||'';
      const pbHd=findHdByCode(pbHdCode);
      const hdBranchCls=(pbHd&&PL_DATA.all.filter(d=>d[1]===pbHdCode).length>0)?' has-branch':'';
      dbChainHtml=`<div class="m-chain-wrap">
        <div class="m-chain">
          <div class="m-chain-step${hdBranchCls}" data-type="hd" data-code="${pbHdCode}">
            <div class="m-chain-icon hd"><i class="bi bi-file-earmark-text"></i></div>
            <div class="m-chain-info"><div class="m-chain-label">Hợp đồng</div><div class="m-chain-code">${pbHdCode}</div><div class="m-chain-meta">${pbHd?pbHd.customer:''}</div></div>
          </div>
          <div class="m-chain-arrow"><i class="bi bi-chevron-right"></i></div>
          <div class="m-chain-step" data-type="dh" data-code="${pbDhCode}">
            <div class="m-chain-icon dh"><i class="bi bi-box-seam"></i></div>
            <div class="m-chain-info"><div class="m-chain-label">Đơn hàng</div><div class="m-chain-code">${pbDhCode}</div><div class="m-chain-meta">${pbDh?pbDh.chang:''}</div></div>
          </div>
          <div class="m-chain-arrow"><i class="bi bi-chevron-right"></i></div>
          <div class="m-chain-step" data-type="pb" data-code="${maPB}">
            <div class="m-chain-icon pb"><i class="bi bi-building"></i></div>
            <div class="m-chain-info"><div class="m-chain-label">Phân bổ</div><div class="m-chain-code">${maPB}</div><div class="m-chain-meta">${pbData.nhaMay} · ${pbData.trangThai}</div></div>
          </div>
          <div class="m-chain-arrow"><i class="bi bi-chevron-right"></i></div>
          <div class="m-chain-step active">
            <div class="m-chain-icon db"><i class="bi bi-truck"></i></div>
            <div class="m-chain-info"><div class="m-chain-label">Vận chuyển</div><div class="m-chain-code">${maVC}</div><div class="m-chain-meta">${sgLabel}</div></div>
          </div>
        </div>
      </div>`;
    }

    fields=`
      ${dbChainHtml}
      <div class="m-section"><div class="m-section-title">Thông tin kế hoạch</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Ma vận chuyển</div><div class="m-value mono">${maVC}</div></div>
          <div class="m-field"><div class="m-label">Mã phân bổ</div><div class="m-value"><span class="m-related-item" data-type="pb" data-code="${maPB}">${maPB}</span></div></div>
          <div class="m-field"><div class="m-label">Nhóm VC</div><div class="m-value" style="font-size:var(--fs3)"><span class="pill s4" style="font-size:9px;padding:2px 8px"><span class="d"></span>${sgLabel}</span></div></div>
          <div class="m-field"><div class="m-label">Tuyến</div><div class="m-value" style="font-size:var(--fs3)">${tuyen}</div></div>
          <div class="m-field"><div class="m-label">Don vi VC</div><div class="m-value" style="font-size:var(--fs3)">${dvvc}</div></div>
          <div class="m-field"><div class="m-label">Ngày giao</div><div class="m-value mono">${ngàyGiao}</div></div>
          <div class="m-field"><div class="m-label">Trạng thái</div><div class="m-value"><span class="pill ${statusCls}"><span class="d"></span>${trangThai}</span></div></div>
        </div>
      </div>
      <div class="m-section"><div class="m-section-title">Phuong tien & Sản phẩm</div>
        <div class="m-grid">
          <div class="m-field"><div class="m-label">Xe</div><div class="m-value"><div class="cust"><div class="av2 ${xeCls}">${xeShort}</div>${xe}</div></div></div>
          <div class="m-field"><div class="m-label">Tai xe</div><div class="m-value" style="font-size:var(--fs3)">${taiXe}</div></div>
          <div class="m-field"><div class="m-label">Sản phẩm</div><div class="m-value">${sanPham}</div></div>
          <div class="m-field"><div class="m-label">KL vận chuyển</div><div class="m-value mono">${kl.toLocaleString('vi-VN')} tan</div></div>
          <div class="m-field"><div class="m-label">Đơn hàng</div><div class="m-value"><span class="m-related-item" data-type="dh" data-code="${dhCode}">${dhCode}</span></div></div>
          <div class="m-field full"><div class="m-label">Ghi chu</div><div class="m-value" style="font-size:var(--fs3)">${ghiChu}</div></div>
        </div>
      </div>
      ${sameTuyếnHtml}`;

    // Action buttons based on status
    if(isChoKH){
      actions=`<button class="tbtn" style="background:var(--pri)"><i class="bi bi-play-fill"></i> Khoi hanh</button><button class="m-btn-secondary"><i class="bi bi-pencil"></i> Sửa</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }else if(isDangVC){
      actions=`<button class="tbtn" style="background:var(--ok)"><i class="bi bi-check-lg"></i> Xác nhận giao</button><button class="m-btn-secondary"><i class="bi bi-geo-alt"></i> Theo dõi</button><button class="m-btn-secondary"><i class="bi bi-pencil"></i> Sửa</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }else{
      actions=`<button class="m-btn-secondary"><i class="bi bi-plus-lg"></i> Tạo kế hoạch tiep</button><button class="m-btn-secondary"><i class="bi bi-eye"></i> Xem chi tiết</button><button class="m-btn-secondary" style="margin-left:auto"><i class="bi bi-printer"></i> In</button>`;
    }
  }

  modalOverlay.innerHTML=`
    <div class="modal${type==='dh'||type==='hd'||type==='pb'||type==='vb'||type==='ct'||type==='psl'||type==='db'?' wide':''}">
      <div class="modal-hd">
        <div class="m-icon ${iconCls}"><i class="bi bi-${iconBi}"></i></div>
        <div class="m-titles"><div class="m-code">${code}</div><div class="m-sub">${sub}</div></div>
        <div class="m-close" onclick="closeModal()"><i class="bi bi-x-lg"></i></div>
      </div>
      <div class="modal-bd">
        ${fields}
        ${related}
        <div class="m-actions">${actions}</div>
      </div>
    </div>`;

  modalOverlay.classList.add('open');
  document.body.style.overflow='hidden';

  // Wire related item clicks
  modalOverlay.querySelectorAll('.m-related-item').forEach(item=>{
    item.addEventListener('click',()=>{
      const t=item.dataset.type;
      const c=item.dataset.code;
      if(t==='hd'){
        const found=findHdByCode(c);
        if(found)openModal('hd',found);
      }else if(t==='pl'){
        const found=findPlByCode(c);
        if(found)openModal('pl',found);
      }else if(t==='dh'){
        const found=findDhByCode(c);
        if(found)openModal('dh',found);
      }else if(t==='ct'){
        closeModal();
        navigateToCtDetailByCT(c);
      }else if(t==='pb'){
        const found=findPbByCode(c);
        if(found)openModal('pb',found);
      }else if(t==='psl'){
        const found=findPslById(c);
        if(found)openModal('psl',found);
      }else if(t==='db'){
        const found=findDbById(c);
        if(found)openModal('db',found);
      }
    });
  });
  // Wire chain step clicks
  modalOverlay.querySelectorAll('.m-chain-step:not(.active)').forEach(step=>{
    step.addEventListener('click',()=>{
      const t=step.dataset.type;
      const c=step.dataset.code;
      if(t==='hd'){
        const found=findHdByCode(c);
        if(found)openModal('hd',found);
      }else if(t==='pl'){
        const found=findPlByCode(c);
        if(found)openModal('pl',found);
      }else if(t==='dh'){
        const found=findDhByCode(c);
        if(found)openModal('dh',found);
      }else if(t==='ct'){
        closeModal();
        navigateToCtDetailByCT(c);
      }else if(t==='ctlist'){
        closeModal();
        navigateToCtDetail(c);
      }else if(t==='dhlist'){
        // Close modal and navigate to đơn hàng page
        closeModal();
        switchPage('donhang');
      }else if(t==='psl'){
        const found=findPslById(c);
        if(found){closeModal();openModal('psl',found);}
      }else if(t==='db'){
        const found=findDbById(c);
        if(found){closeModal();openModal('db',found);}
      }
    });
  });
  // Wire branch item clicks (sub-process items like Phu luc)
  modalOverlay.querySelectorAll('.m-chain-branch-item:not(.active)').forEach(item=>{
    item.addEventListener('click',()=>{
      const t=item.dataset.type;
      const c=item.dataset.code;
      if(t==='pl'){
        const found=findPlByCode(c);
        if(found)openModal('pl',found);
      }else if(t==='hd'){
        const found=findHdByCode(c);
        if(found)openModal('hd',found);
      }else if(t==='dh'){
        const found=findDhByCode(c);
        if(found)openModal('dh',found);
      }else if(t==='ct'){
        closeModal();
        navigateToCtDetailByCT(c);
      }else if(t==='pb'){
        const found=findPbByCode(c);
        if(found)openModal('pb',found);
      }else if(t==='psl'){
        const found=findPslById(c);
        if(found)openModal('psl',found);
      }else if(t==='db'){
        const found=findDbById(c);
        if(found)openModal('db',found);
      }
    });
  });
  // Wire "Xem trang chi tiết" / "Xem trang phụ lục" / "Xem trang đơn hàng" links
  modalOverlay.querySelectorAll('.m-viewall').forEach(el=>{
    el.addEventListener('click',()=>{
      const dhCode=el.dataset.dh;
      const page=el.dataset.page;
      const hdCode=el.dataset.hd;
      closeModal();
      if(dhCode){
        navigateToCtDetail(dhCode);
      }else if(page==='phuluc'){
        switchPage('phuluc');
      }else if(page==='donhang'){
        switchPage('donhang');
      }
    });
  });
  // Wire "Xem chi tiết" action button
  modalOverlay.querySelectorAll('[data-action="viewct"]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const dhCode=btn.dataset.dh;
      closeModal();
      navigateToCtDetail(dhCode);
    });
  });
}

// Lookup helpers
function findHdByCode(code){
  const all=[...HD_DATA.xk,...HD_DATA.nd,...HD_DATA.dv];
  const d=all.find(r=>r[0]===code);
  if(!d)return null;
  return{code:d[0],customer:d[1],product:d[2],klHopĐóng:d[3],klThucHien:d[4],value:d[5],dateStart:d[6],dateEnd:d[7],statusCls:d[8],statusText:d[9]};
}
function findPlByCode(code){
  const d=PL_DATA.all.find(r=>r[0]===code);
  if(!d)return null;
  return{code:d[0],hdCode:d[1],customer:d[2],changeType:d[3],oldValue:d[4],newValue:d[5],changeDir:d[6],changeDesc:d[7],dateSign:d[8],statusCls:d[9],statusText:d[10]};
}
function findDhByCode(code){
  const d=DH_DATA.all.find(r=>r[0]===code);
  if(!d)return null;
  return{code:d[0],hdCode:d[1],customer:d[2],product:d[3],quantity:d[4],changIdx:d[5],value:d[6],sla:d[7],statusText:d[8],statusCls:d[9]};
}
function isXkDh(code){
  const d=findDhByCode(code);
  return !!(d&&String(d.hdCode).startsWith('HD-XK'));
}
window.isXkDh=isXkDh;
function findPbByDhNm(dhCode,nhaMay){
  const d=PB_RAW.find(r=>r[2]===dhCode&&r[4]===nhaMay);
  if(!d)return null;
  return{maPB:d[0],maCT:d[1],dhCode:d[2],sanPham:d[3],nhaMay:d[4],klDat:d[5],klPb:d[6],đơnGia:d[7],trangThai:d[8]};
}
function findPbByCode(pbCode){
  const d=PB_RAW.find(r=>r[0]===pbCode);
  if(!d)return null;
  return{maPB:d[0],maCT:d[1],dhCode:d[2],sanPham:d[3],nhaMay:d[4],klDat:d[5],klPb:d[6],đơnGia:d[7],trangThai:d[8]};
}
function findVbById(maLC){
  const d=VB_RAW.find(r=>r[0]===maLC);
  if(!d)return null;
  return{maLC:d[0],loaiVoBao:d[1],tu:d[2],den:d[3],soLuong:d[4],trongLuong:d[5],ngàyLC:d[6],trangThai:d[7],ghiChu:d[8]};
}
function findCtById(maLo){
  const d=CXT_SRC.find(r=>r[0]===maLo);
  if(!d)return null;
  return{maLo:d[0],tauBien:d[1],benDi:d[2],benDen:d[3],klXuat:d[4],ngàyXuat:d[5],dhCode:d[6],trangThai:d[7],ghiChu:d[8]};
}
function findPslById(maPSL){
  const d=PSL_SRC.find(r=>r[0]===maPSL);
  if(!d)return null;
  return{maPSL:d[0],saLan:d[1],boNeo:d[2],sanPham:d[3],soLoXuat:d[4],klNhap:d[5],ngàyNhap:d[6],dhCode:d[7],trangThai:d[8],ghiChu:d[9]};
}
function findDbById(maVC){
  const d=DB_SRC.find(r=>r[0]===maVC);
  if(!d)return null;
  return{maVC:d[0],maPB:d[1],tuyen:d[2],dvvc:d[3],xe:d[4],taiXe:d[5],sanPham:d[6],kl:d[7],ngàyGiao:d[8],dhCode:d[9],trangThai:d[10],ghiChu:d[11],sg:d[12]||''};
}

// Attach row click handlers for HD table
document.getElementById('hd-tbody').addEventListener('click',e=>{
  const tr=e.target.closest('tr');
  if(!tr)return;
  const code=tr.querySelector('.oid')?.textContent;
  if(!code)return;
  const found=findHdByCode(code);
  if(found)openModal('hd',found);
});
// Attach row click handlers for PL table
document.getElementById('pl-tbody').addEventListener('click',e=>{
  const tr=e.target.closest('tr');
  if(!tr)return;
  const code=tr.querySelector('.oid')?.textContent;
  if(!code)return;
  const found=findPlByCode(code);
  if(found)openModal('pl',found);
});
// DH table clicks are handled by the listener in the CT section above
// CT table clicks handled inline via .ct-dh-link data attributes
