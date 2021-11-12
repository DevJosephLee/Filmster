var $form = document.querySelector('form');
var $searchInput = document.querySelector('.search-input');
var $logoButton = document.querySelector('.logo-button');
var $backButton = document.querySelectorAll('.back-button');
var $viewNodeList = document.querySelectorAll('.view');
var $searchedList = document.querySelector('.searched-list');
var $searchResultText = document.querySelector('.search-results-text');
var $infoPageTitle = document.querySelector('.info-page-title');
var $infoPageYear = document.querySelector('.year');
var $infoPageRating = document.querySelector('.rating');
var $infoPageRuntime = document.querySelector('.runtime');
var $infoPageOverview = document.querySelector('.overview');
var $infoPagePoster = document.querySelector('.info-page-poster');
var $infoPageStarRating = document.querySelector('.star-rating');
var $infoPageGenres = document.querySelector('.genres');
var $infoPageReleaseDate = document.querySelector('.release-date');
var $infoPageDirector = document.querySelector('.director');
var $infoPageDistributor = document.querySelector('.distributor');
var $castList = document.querySelector('.cast-list');

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
  $castList.textContent = '';
}

$logoButton.addEventListener('click', clickLogo);

function clickBackButton(event) {
  if (event.target.className !== 'back-button') {
    return;
  }
  for (var i = 0; i < $backButton.length; i++) {
    if (event.target.getAttribute('data-view') === 'search-form') {
      switchViews('search-form')
      data.view = 'search-form';
      $searchedList.textContent = '';
    } else if (data.view === 'movie-info') {
      switchViews('search-results');
      data.view = 'search-results';
    }
  }
  $castList.textContent = '';
}

document.addEventListener('click', clickBackButton);

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
  generateInfoPage(data);
  $searchResultText.textContent = 'Search results for ' + data.searchName;
})

function clickInfoButton(event) {
  if (!event.target.matches('button')) {
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/movie/' + event.target.getAttribute('movie-id') + '?api_key=9ed2615a579d77bb72ade801a8902712&append_to_response=credits,releases');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.clickedMovie = xhr.response;
    generateInfoPage(data);
  })
  xhr.send();
  switchViews('movie-info');
  data.view = 'movie-info';
}

$searchedList.addEventListener('click', clickInfoButton);

function generateInfoPage(data) {
  var genre = '';
  var distributor = '';
  var director = '';
  $infoPagePoster.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + data.clickedMovie.poster_path);
  $infoPageTitle.textContent = data.clickedMovie.title;
  $infoPageYear.textContent = data.clickedMovie.release_date.slice(0, 4);
  for (var i = 0; i < data.clickedMovie.releases.countries.length; i++) {
    var movieRatingForCountries = data.clickedMovie.releases.countries[i].iso_3166_1;
    if (movieRatingForCountries === 'US') {
      $infoPageRating.textContent = data.clickedMovie.releases.countries[i].certification;
    }
  }
  $infoPageRuntime.textContent = data.clickedMovie.runtime;
  $infoPageStarRating.textContent = data.clickedMovie.vote_average;
  for (var k = 0; k < data.clickedMovie.genres.length; k++) {
    genre += data.clickedMovie.genres[k].name + ' ';
    $infoPageGenres.textContent = genre;
  }
  $infoPageOverview.textContent = data.clickedMovie.overview;
  for (var h = 0; h < data.clickedMovie.credits.crew.length; h++) {
    if (data.clickedMovie.credits.crew[h].known_for_department === 'Directing') {
      $infoPageDirector.textContent = data.clickedMovie.credits.crew[h].name;
    }
  }
  $infoPageReleaseDate.textContent = data.clickedMovie.release_date;
  for (var j = 0; j < data.clickedMovie.production_companies.length; j++) {
    distributor += data.clickedMovie.production_companies[j].name + ', ';
    $infoPageDistributor.textContent = distributor;
  }
  if (data.searchResult.length > 0) {
    generateCastCards(data);
  }
}

function generateCastCards(data) {

  for (var j = 0; j < 6; j++) {
  var $root = document.createElement('div');
  $root.className = 'mobile-row mobile-justify-space-between';

  var $rowDiv = document.createElement('div');
  $rowDiv.className = 'row align-center';
  $root.appendChild($rowDiv);

  var $castCardDiv = document.createElement('div');
  $castCardDiv.className = 'cast-card';
  $rowDiv.appendChild($castCardDiv);

  var $poster = document.createElement('img');
  $poster.className = 'profile-pic margin-right-5px';
  $poster.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + data.clickedMovie.credits.cast[j].profile_path);
  $castCardDiv.appendChild($poster);

  var $castDetailDiv = document.createElement('div');
  $castDetailDiv.className = 'margin-top-bottom-3 line-height';
  $castCardDiv.appendChild($castDetailDiv);

  var $realNameP = document.createElement('p');
  $realNameP.className = 'real-name';
  $realNameP.textContent = data.clickedMovie.credits.cast[j].name;
  $castDetailDiv.appendChild($realNameP);

  var $characterNameP = document.createElement('p');
  $characterNameP.className = 'character-name';
  $characterNameP.textContent = 'as ' + data.clickedMovie.credits.cast[j].character;
  $castDetailDiv.appendChild($characterNameP);

  $castList.append($root);

  }
}
