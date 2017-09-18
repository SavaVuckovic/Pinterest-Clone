var loginBtn = document.querySelector('#login-btn');
var registerBtn = document.querySelector('#register-btn');
var loginModal = document.querySelector('.login-modal');
var registerModal = document.querySelector('.register-modal');
var closeLoginBtn = document.querySelector('.modal-close-login');
var closeRegisterBtn = document.querySelector('.modal-close-register');

// open login modal
loginBtn.addEventListener('click', function() {
  registerModal.style.display = 'none';
  loginModal.style.display = 'block';
});

// open register modal
registerBtn.addEventListener('click', function() {
  loginModal.style.display = 'none';
  registerModal.style.display = 'block';
});

// close login modal
closeLoginBtn.addEventListener('click', function() {
  loginModal.style.display = 'none';
});

// close register modal
closeRegisterBtn.addEventListener('click', function() {
  registerModal.style.display = 'none';
});
