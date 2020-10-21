window.onload = () => {
  document.querySelectorAll('.next').forEach(e => {
    e.onclick = () => {
      const activeForm = document.querySelector('.form-section.active');
      activeForm.classList.add('fade-out-left');
      activeForm.classList.remove('active');
      activeForm.nextElementSibling.classList.add('active');
      setTimeout(() => {
        activeForm.classList.remove('fade-out-left');
      }, 1000);
    };
  });

  document.querySelectorAll('.prev').forEach(e => {
    e.onclick = () => {
      const activeForm = document.querySelector('.form-section.active');
      activeForm.classList.add('fade-out-right');
      activeForm.classList.remove('active');
      activeForm.previousElementSibling.classList.add('active');
      setTimeout(() => {
        activeForm.classList.remove('fade-out-right');
      }, 1000);
    };
  });
}