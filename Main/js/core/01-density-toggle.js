// ===== DENSITY TOGGLE =====
document.querySelectorAll('.density-sel button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.density-sel button').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    document.body.setAttribute('data-density',btn.dataset.d);
  });
});
