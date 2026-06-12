// Nạp HTML pages rồi load JS theo thứ tự (dev: npx serve Main)
(function(){
  const PAGES=['dashboard','hopdong','canhbao','phuluc','donhang','chitietdonhang','phanbonhmay','vobao','chuyentau','phieusalan','khvcnoidia'];
  const SCRIPTS=[
    'js/core/01-density-toggle.js',
    'js/core/02-sidebar-toggle.js',
    'js/nav/01-sidebar-config.js',
    'js/screens/01-dashboard.js',
    'js/core/03-page-navigation.js',
    'js/screens/02-hopdong.js',
    'js/screens/03-canhbao.js',
    'js/screens/04-phuluc.js',
    'js/screens/05-donhang.js',
    'js/screens/06-chitiet-donhang.js',
    'js/screens/07-phanbo-nhamay.js',
    'js/screens/08-vobao.js',
    'js/screens/09-chuyentau.js',
    'js/screens/10-phieusalan.js',
    'js/screens/11-khvcnoidia.js',
    'js/core/04-modal.js',
    'js/screens/12-auto-generated.js',
    'js/screens/13-danhmuc-hethong-baocao.js',
    'js/screens/14-hoso-lo-360.js',
    'js/screens/15-vobao-360.js',
    'js/screens/16-doichieu.js',
    'js/screens/17-approval-inbox.js',
    'js/vendor/cytoscape.min.js',
    'js/screens/18-flow.js',
    'js/core/05-flow-strip.js',
    'js/nav/02-nav-search.js',
  ];
  const root=document.querySelector('.content');
  const base='html/pages/';

  function loadPagesSync(){
    const xhr=new XMLHttpRequest();
    let html='';
    for(const id of PAGES){
      xhr.open('GET',base+id+'.html',false);
      try{
        xhr.send(null);
        if(xhr.status===200||xhr.status===0) html+=xhr.responseText;
      }catch(e){ console.warn('bootstrap page',id,e); }
    }
    if(html) root.innerHTML=html;
  }

  function loadPages(){
    if(location.protocol==='file:'){
      loadPagesSync();
      return Promise.resolve();
    }
    return Promise.all(PAGES.map(id=>fetch(base+id+'.html').then(r=>r.text())))
      .then(parts=>{ root.innerHTML=parts.join(''); })
      .catch(()=>{ loadPagesSync(); });
  }

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src=src;
      s.onload=resolve;
      s.onerror=()=>reject(new Error('Failed: '+src));
      document.body.appendChild(s);
    });
  }

  loadPages().then(async()=>{
    for(const src of SCRIPTS) await loadScript(src);
    window.dispatchEvent(new Event('qnc-ready'));
  });
})();
