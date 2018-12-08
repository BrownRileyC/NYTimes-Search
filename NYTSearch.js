console.log("I run before the click exists");
var beginDate;
var endDate;
var searchTerm;
var displayNumber;
// These are here so I can detect what fields the user has entered things into
var beginDateSelected = false;
var endDateSelected = false;
var querySelected = false;

displayNumber = $('#numberOfResults')

var grabStartYear = function() {
    beginDate = $('#SY').val();
    if (beginDate.length > 0){
        beginDateSelected = true;
    }
};
var grabEndYear = function() {
    endDate = $('#EY').val();
    if (endDate.length > 0){
        endDateSelected = true;
    }
};
var grabQuery = function() {
    searchTerm = $('#search').val();
    if (searchTerm.length > 0){
        querySelected = true;
    }
};
$(document).ready(function(){
    
$('body').on('click','.searchButton', function(){

    event.preventDefault();
    // Here I call the grab functions from above, so it'll set the variables to the values inside their inputs and change the selected variables to true if there's anything in the input elements
    grabStartYear();
    grabEndYear();
    grabQuery();
    
    var parameters = {
        apiKey: "api-key=17384b4445bf4868aca0ea3fc196b57a",
        q: "&q="+ searchTerm,
        begin: "&begin_date="+ beginDate,
        end: "&end_date="+ endDate
        };

        console.log(parameters.q);

    console.log("I did something on click");
// This builds the url based upon what fields are filled in

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"+parameters.apiKey;
    if (querySelected === true) {
        url += parameters.q
    };
    if (beginDateSelected === true) {
        url += parameters.begin
    };
    if (endDateSelected === true) {
        url += parameters.end
    };
    console.log(url)

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