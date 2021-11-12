/* exported data */
var data = {
  view: 'search-form',
  searchName: '',
  searchResult: [],
  clickedMovie: {},
  watchlist: []
}

var previousDataJSON = localStorage.getItem('movie-finder-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('movie-finder-local-storage', dataJSON);
})
