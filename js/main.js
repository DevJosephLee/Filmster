var $form = document.querySelector('form');
var $searchInput = document.querySelector('.search-input');
var $logoButton = document.querySelector('.logo-button');
var $backButton = document.querySelector('.back-button');
var $viewNodeList = document.querySelectorAll('.view');
var $searchedList = document.querySelector('.searched-list');
var $searchResultText = document.querySelector('.search-results-text');

function search() {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/search/movie?api_key=9ed2615a579d77bb72ade801a8902712&query=' + $searchInput.value);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.results.length; i++) {
      var title = xhr.response.results[i].title;
      var releaseYear = xhr.response.results[i].release_date.slice(0, 4);
      var posterPath = 'https://image.tmdb.org/t/p/w500' + xhr.response.results[i].poster_path;
      if (xhr.response.results[i].poster_path === null) {
        posterPath = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNZo8HJXlzsEbcnfi6ciTTC9I1SF8Pb0wY6A&usqp=CAU';
      }
      var overview = xhr.response.results[i].overview;
      function generateSearchedMoviesResults() {
        var $root = document.createElement('li');

        var $searchResultCardDiv = document.createElement('div');
        $searchResultCardDiv.className = 'search-result-card border-bottom-white padding-top-bottom';
        $root.appendChild($searchResultCardDiv);

        var $textAlignCenterDiv = document.createElement('div');
        $textAlignCenterDiv.className = 'text-align-center';
        $searchResultCardDiv.appendChild($textAlignCenterDiv);

        var $posterImage = document.createElement('img');
        $posterImage.setAttribute('src', posterPath);
        $posterImage.className = 'search-result-poster';
        $textAlignCenterDiv.appendChild($posterImage);

        var $searchResultInfoDiv = document.createElement('div');
        $searchResultInfoDiv.className = 'search-result-info';
        $searchResultCardDiv.appendChild($searchResultInfoDiv);

        var $searchResultName = document.createElement('h3');
        $searchResultName.className = 'search-result-name';
        $searchResultName.textContent = title + ' ' + '(' + releaseYear + ')';
        $searchResultInfoDiv.appendChild($searchResultName);

        var $searchResultOverview = document.createElement('p');
        $searchResultOverview.className = 'search-result-overview';
        $searchResultOverview.textContent = overview;
        $searchResultInfoDiv.appendChild($searchResultOverview);

        var $infoButton = document.createElement('button');
        $infoButton.className = 'info-button';
        $infoButton.textContent = 'INFO';
        $searchResultInfoDiv.appendChild($infoButton);

        return $root;
      }
      $searchedList.append(generateSearchedMoviesResults());
    }
  });
  xhr.send();
  switchViews();
  data.view = 'search-form';
  $searchResultText.textContent = 'Search results for ' + $searchInput.value;
}

$form.addEventListener('submit', search);

function clickLogo() {
  for (var i = 0; i < $viewNodeList.length; i++) {
    if ($viewNodeList[i].getAttribute('data-view') !== 'search-form') {
      $viewNodeList[i].className = 'view hidden';
    } else {
      $viewNodeList[i].className = 'view'
    }
  }
  data.view = 'search-form';
  $form.reset();
}

$logoButton.addEventListener('click', clickLogo);


function clickBackButton() {
  for (var i = 0; i < $viewNodeList.length; i++) {
    if ($viewNodeList[i].getAttribute('data-view') !== data.view) {
      $viewNodeList[i].className = 'view hidden';
    } else {
      $viewNodeList[i].className = 'view';
    }
  }
}

$backButton.addEventListener('click', clickBackButton);

function switchViews() {
  for (var i = 0; i < $viewNodeList.length; i++) {
    if (event.target.getAttribute('data-view') !== $viewNodeList[i].getAttribute('data-view')) {
      $viewNodeList[i].className = 'view hidden';
    } else {
      $viewNodeList[i].className = 'view';
    }
  }
}
