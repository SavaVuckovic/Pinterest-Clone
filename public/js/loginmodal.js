var modal = document.querySelector('.login-modal');
var login = document.querySelector('#login');
var close = document.querySelector('.modal-close');


login.addEventListener('click', openModal);
close.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Function to open modal
function openModal(){
  modal.style.display = 'block';
}

// Function to close modal
function closeModal(){
  modal.style.display = 'none';
}

// Function to close modal if outside click
function outsideClick(e){
  if(e.target == modal){
    modal.style.display = 'none';
  }
}
