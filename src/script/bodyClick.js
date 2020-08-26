 //Toggle mode
 const toggle = document.querySelector('.js-change-theme');
 const body = document.querySelector('body');
 //const profile = document.getElementById('profile');

 toggle.addEventListener('click', () => {
     if (body.classList.contains('text-gray-700')) {
         toggle.innerHTML = "☀️";
         body.classList.remove('text-gray-700');
         body.classList.add('text-gray-300');
         body.classList.remove('bg-gray-100');
         body.classList.add('bg-gray-900');
     } else {
         toggle.innerHTML = " ";
         body.classList.remove('text-gray-300');
         body.classList.add('text-gray-700');
         body.classList.remove('bg-gray-900');
         body.classList.add('bg-gray-100');

     }
 })
