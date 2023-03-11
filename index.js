document.addEventListener('DOMContentLoaded', function() {
    const scrollBtn = document.querySelector('#scroll-btn');
  
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    });
  });
document.addEventListener('DOMContentLoaded', function() {
    const scrollBtn1 = document.querySelector('#scroll-btn1');
  
    scrollBtn1.addEventListener('click', () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    });
  });
  
