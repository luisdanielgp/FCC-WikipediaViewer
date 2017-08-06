
// document ready function focuses on input when the page loads.

$(document).ready(function() {
  var searchBox = document.getElementById('searchInput');
  searchBox.focus();
});

//

var wikiSearch = {

  // searchWord method gets JSON, creates an array with every page number and creates ul element.

  searchWord: function(word) {
          var url = 'https://en.wikipedia.org/w/api.php?action=query&&format=json&gsrlimit=15&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&generator=search&origin=*&gsrsearch=' + word;
        $.getJSON(url, function(data) {
          var arr = Object.keys(data.query.pages);
          var query = data.query.pages;
          var searchItemsUl = document.querySelector('ul');
          searchItemsUl.innerHTML = "";

// for loop gets every page number, and stores page's title in var title.
// All necessary elements and properties are created and appended for displaying search results.

          for (var i = 0; i < arr.length; i++) {
            var pageNumber = parseInt(arr[i]);
             var title =  query[pageNumber].title;
            var searchItemsLi = document.createElement('li');
            var searchItemsLink = document.createElement('a');
            searchItemsLink.href = "https://en.wikipedia.org/?curid=" + pageNumber;
            searchItemsLink.target = "_blank";
            var searchItemsExtract = document.createElement('p');
            searchItemsExtract.innerHTML = query[pageNumber].extract;
            searchItemsExtract.id = 'extract';
            searchItemsLi.textContent = title;
            searchItemsLink.innerHTML = '<i id="arrow" class="fa fa-arrow-circle-right pull-right" aria-hidden="true"></i>'
            searchItemsLi.appendChild(searchItemsExtract);
            searchItemsExtract.appendChild(searchItemsLink);
            searchItemsUl.appendChild(searchItemsLi);
          }
        })
  }
};

var handlers = {
  // runs searchWord function with the #searchInput value everytime #searchButton is clicked.
  searchWord: function() {
    var searchWordInput = document.getElementById('searchInput');
    wikiSearch.searchWord(searchWordInput.value);
    searchWordInput.focus();
  },
  // opens new window with random wikipedia search everytime #randomSearchButton is clicked.
     randomArticle: function() {
       window.open("https://en.wikipedia.org/wiki/Special:Random");
     }
};

  // Listens for every key released from the keyboard in #searchInput.
document.getElementById('searchInput').addEventListener('keyup',search)
  // search function searches the #searchInput value everytime the enter key is released and erases #searchInput
  // value if esc key gets released.
function search(event) {
  if (event.which === 13) {
    var searchWordInput = document.getElementById('searchInput');
    var searchWordInputValue = searchWordInput.value;
      if (searchWordInputValue.length > 0) {
            wikiSearch.searchWord(searchWordInputValue);
            searchWordInput.focus();
      }
  }else if (event.which === 27) {
    document.getElementById('searchInput').value = "";
  }
}
