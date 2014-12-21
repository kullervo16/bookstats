/*
 * Client side D3 handling.
 */

// Create the dc.js chart objects & link to div
//var dataTable = dc.dataTable("#dc-table-graph");

            
var pagesPerAuthorChart = dc.rowChart("#dc-pages-chart");
var booksPerAuthorChart = dc.rowChart("#dc-books-chart");
var genreChart = dc.pieChart("#dc-genre-chart");
var languageChart = dc.pieChart("#dc-language-chart");
var ratingChart = dc.pieChart("#dc-rating-chart");


// load data from a json url
d3.json("/data/allBooks.json", function (data) {
// Run the data through crossfilter and load our 'facts'
data.forEach(function(d) {
    
        if(d.read !== null) {
            d.read = d.read.substr(0, 10);
        } else {
            d.read = '1990-01-01';
        }
        d.title = d.title;
        d.author = d.author;
        d.pages = +d.pages;
        d.pageCat = +d.pages - d.pages % 100
    });
var facts = crossfilter(data);
// Create dataTable dimensions
var authorDimension = facts.dimension(function (d) {
return d.author;
});


var genreDimension = facts.dimension(function (d) {
    return d.genre;
});

var languageDimension = facts.dimension(function (d) {    
    return d.language;
});
var ratingDimension = facts.dimension(function (d) {    
    return d.rating;
});


// create refresh function for the dynatable
var dynatable = $('#dc-table-graph').dynatable({
    features: {
        pushState: false
    },
    dataset: {
        records: authorDimension.top(Infinity),
        perPageDefault: 10,
        perPageOptions: [10, 20, 50]
    }
}).data('dynatable');
function RefreshTable() {
    dc.events.trigger(function () {
        dynatable.settings.dataset.originalRecords = authorDimension.top(Infinity);
        dynatable.process();
    });
};

// create group functions
var authorValueGroupPageSum = authorDimension.group().reduceSum(function(d) {
    return +d.pages;
})
var authorValueGroupBookSum = authorDimension.group().reduceSum(function(d) {
    return 1;
});

var genreGroupBookSum = genreDimension.group().reduceSum(function (d) {
    return 1;
});
var languageGroupBookSum = languageDimension.group().reduceSum(function (d) {
    return 1;
});
var ratingGroupBookSum = ratingDimension.group().reduceSum(function (d) {
    return 1;
});


// Setup the charts

    // tell the charts we don't want an "others" section (unable to read the values since too small in that case)
    booksPerAuthorChart.othersGrouper(
      function(data) {
        return false;
      }
   );
   pagesPerAuthorChart.othersGrouper(
      function(data) {
        return false;
      }
   );
    
    // rowchart for books per year
    booksPerAuthorChart.width(300)
    .height(420)
    .margins({top: 5, left: 10, right: 10, bottom: 20})
    .dimension(authorDimension)
    .group(authorValueGroupBookSum)
    .colors(d3.scale.category20())
    .title(function(d){return d.value;})    
    .elasticX(true)
    .ordering( function(d) { return -1.0 * +d.value; }) // appears to work
    .cap(10)
    .xAxis().ticks(4);
    booksPerAuthorChart.onClick = function() {}; // prevent filtering (interferes with the page/year filter
    
    // rowchart for pages per year
    pagesPerAuthorChart.width(300)
    .height(420)    
    .margins({top: 5, left: 10, right: 10, bottom: 20})
    .dimension(authorDimension)
    .group(authorValueGroupPageSum)
    .colors(d3.scale.category20())
    .title(function(d){return d.value;})
    .elasticX(true)
    .ordering( function(d) { return -1.0 * +d.value; }) // appears to work
    .cap(10)        
    .xAxis().ticks(4)    
    ;
    
    
    // pie chart per genre
    genreChart.width(180)
        .height(180)
        .radius(80)
        .innerRadius(30)
        .dimension(genreDimension)
        .group(genreGroupBookSum);

    // pie chart per language
    languageChart.width(180)
        .height(180)
        .radius(80)
        .innerRadius(30)
        .dimension(languageDimension)
        .group(languageGroupBookSum);

    // pie chart per rating
    ratingChart.width(180)
        .height(180)
        .radius(80)
        .innerRadius(30)
        .dimension(ratingDimension)
        .group(ratingGroupBookSum);

    // link in the dynatable
    for (var i = 0; i < dc.chartRegistry.list().length; i++) {
        var chartI = dc.chartRegistry.list()[i];
        chartI.on("filtered", RefreshTable);
    }
    
    RefreshTable();

    // Render the Charts
    dc.renderAll();    

});
