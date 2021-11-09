var $form = document.querySelector('form');
var $searchInput = document.querySelector('.search-input');
var $logoButton = document.querySelector('.logo-button');
var $backButton = document.querySelector('.back-button');
var $viewNodeList = document.querySelectorAll('.view');


function search() {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=9ed2615a579d77bb72ade801a8902712&query=' + $searchInput.value);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
  });
  xhr.send();
}

$form.addEventListener('submit', search);

function goHome() {
  for (var i = 0; i < $viewNodeList.length; i++) {
    if ($viewNodeList[i].getAttribute('data-view') !== 'search-form') {
      $viewNodeList[i].className = 'view hidden';
    } else {
      $viewNodeList[i].className = 'view'
    }
  }
}

$logoButton.addEventListener('click', goHome);


function backButton() {
  for (var i = 0; i < $viewNodeList.length; i++) {
    if ($viewNodeList[i].getAttribute('data-view') !== data.view) {
      $viewNodeList[i].className = 'view hidden';
    } else {
      $viewNodeList[i].className = 'view';
    }
  }
}

$backButton.addEventListener('click', backButton);
