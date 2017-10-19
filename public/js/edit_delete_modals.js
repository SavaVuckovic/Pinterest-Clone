var editPin = document.querySelector('#edit-pin-btn');
var editPinModal = document.querySelector('#edit-pin-modal');
var closeEditBtn = document.querySelector('#close-edit-pin');

// var editForm = document.querySelector('#edit-form');

// open new pin modal
editPin.addEventListener('click', function() {
  editPinModal.style.display = 'none';
  editPinModal.style.display = 'block';
});

// close new pin modal
closeEditBtn.addEventListener('click', function() {
  editPinModal.style.display = 'none';
});

// edit form submit
/*
editForm.addEventListener('submit', handleEditSubmit);

function handleEditSubmit(e) {
  e.preventDefault();

  var putRequest = new XMLHttpRequest();
  putRequest.open('PUT', '/pin/edit/')
}
*/
