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
  data.searchName = $searchInput.value;
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.searchResult = xhr.response.results;
    generateSearchedMoviesResults(data);
  });
  xhr.send();
  switchViews('search-results');
  data.view = 'search-results';
  $searchResultText.textContent = 'Search results for ' + $searchInput.value;
}

$form.addEventListener('submit', search);

function clickLogo() {
  switchViews('search-form');
  data.view = 'search-form';
  $form.reset();
  data.searchResult = [];
  data.searchName = '';
  $searchedList.textContent = '';
}

$logoButton.addEventListener('click', clickLogo);


function clickBackButton() {
  switchViews('search-form');
  $searchedList.textContent = '';
}

$backButton.addEventListener('click', clickBackButton);


function switchViews(viewName) {
  for (var i = 0; i < $viewNodeList.length; i++) {
    if ($viewNodeList[i].getAttribute('data-view') === viewName) {
      $viewNodeList[i].className = 'view';
    } else {
      $viewNodeList[i].className = 'view hidden';
    }
  }
}

function generateSearchedMoviesResults(data) {
  for (var i = 0; i < data.searchResult.length; i++) {
    if (data.searchResult[i].poster_path === null) {
      data.searchResult[i].poster_path = '/nGf1tzFVu3FLVsraCExsAEOnaUL.jpg'
    }
    var $root = document.createElement('li');

    var $searchResultCardDiv = document.createElement('div');
    $searchResultCardDiv.className = 'search-result-card border-bottom-white padding-top-bottom';
    $root.appendChild($searchResultCardDiv);

    var $textAlignCenterDiv = document.createElement('div');
    $textAlignCenterDiv.className = 'text-align-center';
    $searchResultCardDiv.appendChild($textAlignCenterDiv);

    var $posterImage = document.createElement('img');
    $posterImage.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + data.searchResult[i].poster_path);
    $posterImage.className = 'search-result-poster';
    $textAlignCenterDiv.appendChild($posterImage);

    var $searchResultInfoDiv = document.createElement('div');
    $searchResultInfoDiv.className = 'search-result-info';
    $searchResultCardDiv.appendChild($searchResultInfoDiv);

    var $searchResultName = document.createElement('h3');
    $searchResultName.className = 'search-result-name';
    $searchResultName.textContent = data.searchResult[i].title + ' ' + '(' + data.searchResult[i].release_date.slice(0, 4) + ')';
    $searchResultInfoDiv.appendChild($searchResultName);

    var $searchResultOverview = document.createElement('p');
    $searchResultOverview.className = 'search-result-overview';
    $searchResultOverview.textContent = data.searchResult[i].overview;
    $searchResultInfoDiv.appendChild($searchResultOverview);

    var $infoButton = document.createElement('button');
    $infoButton.className = 'info-button';
    $infoButton.textContent = 'INFO';
    $infoButton.setAttribute('movie-id', data.searchResult[i].id);
    $searchResultInfoDiv.appendChild($infoButton);

    $searchedList.append($root);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  switchViews(data.view);
  generateSearchedMoviesResults(data);
  $searchResultText.textContent = 'Search results for ' + data.searchName;
})

// function clickInfoButton(event) {
//   if (!event.target.matches('button')) {
//     return;
//   }
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://api.themoviedb.org/3/movie/' + event.target.getAttribute('movie-id') + '?api_key=9ed2615a579d77bb72ade801a8902712&append_to_response=credits,releases');
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     console.log(xhr.status);
//     console.log(xhr.response);
//     console.log(xhr.response.release_date);
//     console.log(xhr.response.release_date.slice(0, 4));
//     console.log(xhr.response.vote_average);
//     console.log(xhr.response.genres);
//     for (var j = 0; j < 7; j++) {
//       console.log(xhr.response.credits.cast[j].name + ' as ' + xhr.response.credits.cast[j].character);
//     }
//     for (var h = 0; h < xhr.response.credits.crew.length; h++) {
//       if (xhr.response.credits.crew[h].known_for_department === 'Directing') {
//         console.log('director(s):', xhr.response.credits.crew[h].name);
//       }
//     }
//     for (var i = 0; i < xhr.response.releases.countries.length; i++) {
//       var movieRatingForCountries = xhr.response.releases.countries[i].iso_3166_1;
//       if (movieRatingForCountries === 'US') {
//         movieRating = xhr.response.releases.countries[i].certification;
//       }
//     }
//     console.log('rating:', movieRating);
//     console.log('runtime:', xhr.response.runtime);
//     console.log('overview:', xhr.response.overview);
//     console.log(xhr.response.production_companies);
//   })
//   xhr.send();
// }

// $searchedList.addEventListener('click', clickInfoButton)

// function generateMovieInfo(data) {

// }
