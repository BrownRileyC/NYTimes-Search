console.log("I run before the click exists");
var beginDate;
    var endDate;
    var searchTerm;
    var displayNumber;

    displayNumber = $('#numberOfResults')

    
$(document).ready(function(){
    
$('body').on('click','.searchButton', function(){

    event.preventDefault();
    beginDate = $('#SY').val().toString();;
    
    endDate = $('#EY').val();
    searchTerm = $('#search').val().toString();
    
    var parameters = {
        apiKey: "api-key=17384b4445bf4868aca0ea3fc196b57a",
        q: "&q="+ searchTerm,
        begin: "&begin_date="+ beginDate,
        end: "&end_date="+ endDate
        };

        console.log(parameters.q);

    console.log("I did something on click");
    if (parameters.end === "&end_date="){
        if (parameters.begin === "&begin_date="){
            var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"+parameters.apiKey+parameters.q;
        } else {
            var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"+parameters.apiKey+parameters.q+parameters.begin;
        }
    } else if (parameters.begin === "&begin_date=") {
        if (parameters.end === "&end_date=") {
            var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"+parameters.apiKey+parameters.q;
        } else {
            var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"+parameters.apiKey+parameters.q+parameters.end;
        } 
    }  else if (parameters.q === "&q=") {
        alert("try adding a search term");
    } else {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"+parameters.apiKey+parameters.q+parameters.end+parameters.begin;
    }

$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
  console.log(url);
  var object = result.response
  for (var i = 0; i<object.docs.length;i++){
      console.log("I worked" + i)
      $('.title'+i).text(object.docs[i].headline.main);
  }
}).fail(function(err) {
  throw err;
});

});
});


console.log("I exist after the click");