const menu = document.querySelector('nav');

function scrollDown() {
  menu.classList.toggle('scroll-down', scrollY > 0);  
}

window.addEventListener('scroll', scrollDown);

// window.addEventListener('scroll', function(){
//     var menu = document.querySelector('.header');
//     menu.classList.toggle('scroll-down', window.scrollY > 0);
//   })