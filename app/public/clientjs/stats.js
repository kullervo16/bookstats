/*
 * Client side D3 handling.
 */

// Create the dc.js chart objects & link to div
var dataTable = dc.dataTable("#dc-table-graph");
var pageChart = dc.barChart("#dc-page-chart");
var pagesPerYearChart = dc.rowChart("#dc-pages-chart");
var booksPerYearChart = dc.rowChart("#dc-books-chart");
var genreChart = dc.pieChart("#dc-genre-chart");
var languageChart = dc.pieChart("#dc-language-chart");
var ratingChart = dc.pieChart("#dc-rating-chart");


// load data from a csv file
d3.json("/data/books.json", function (data) {
// Run the data through crossfilter and load our 'facts'
data.forEach(function(d) {
    
        if(d.read !== null) {
            d.read = d.read.substr(0, 10);
        }
        d.title = d.title;
        d.author = d.author;
        d.pages = +d.pages;
        d.pageCat = +d.pages - d.pages % 100
    });
var facts = crossfilter(data);
// Create dataTable dimensions
var timeDimension = facts.dimension(function (d) {
return d.read;
});

var pageDimension = facts.dimension(function (d) {    
    return d.pageCat;
});

var genreDimension = facts.dimension(function (d) {
    return d.genre;
});
var yearDimension = facts.dimension(function (d) {
    if(d.read === null) {
        return null;
    }
   return +d.read.substring(0,4);
});
var languageDimension = facts.dimension(function (d) {    
    return d.language;
});
var ratingDimension = facts.dimension(function (d) {    
    return d.rating;
});


// create group functions
var pageValueGroupCount = pageDimension.group()
.reduceCount(function(d) { return d.pageCat; });


var yearValueGroupPageSum = yearDimension.group().reduceSum(function(d) {
    return +d.pages;
});
var yearValueGroupBookSum = yearDimension.group().reduceSum(function(d) {
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
// Table of book data
dataTable.width(960).height(800)
    .dimension(timeDimension)
    .group(function(d) { return "Books"})
    .size(10)
    .columns([
    function(d) { return d.author; },
    function(d) { return d.title; },
    function(d) { return d.genre; },
    function(d) { return d.pages; },
    function(d) { return d.read },
    function(d) { return d.rating },
    function(d) { return d.language },
    function(d) {
    return '<a href=\"' +d.link+ "\" target=\"_blank\">link</a>"}
    ])
    //.sortBy(function(d){ console.log("SORT "+d.read);return d.read; })
    //.sortBy(function(d){ return d.pages; })
    //.order(d3.descending);   // doesn't seem to work... so sort via DB
    ;


    
    //barchart for pages per book
    pageChart.width(480)
    .height(150)
    .margins({top: 10, right: 10, bottom: 20, left: 40})
    .dimension(pageDimension)
    .group(pageValueGroupCount)
    .transitionDuration(500)
    .centerBar(true)
    //.gap(5)
    //.filter([3, 5])
    .x(d3.scale.linear().domain([0, 2000]))    
    .elasticY(true)
    .xUnitCount(function() {return 5;})    
    ;
    
    // rowchart for books per year
    booksPerYearChart.width(300)
    .height(420)
    .margins({top: 5, left: 10, right: 10, bottom: 20})
    .dimension(yearDimension)
    .group(yearValueGroupBookSum)
    .colors(d3.scale.category20())
    .title(function(d){return d.value;})
    .elasticX(true)
    .xAxis().ticks(4);
    
    // rowchart for pages per year
    pagesPerYearChart.width(300)
    .height(420)
    .margins({top: 5, left: 10, right: 10, bottom: 20})
    .dimension(yearDimension)
    .group(yearValueGroupPageSum)
    .colors(d3.scale.category20())
    .title(function(d){return d.value;})
    .elasticX(true)
    .xAxis().ticks(4);
    
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

    // Render the Charts
    dc.renderAll();    

});
