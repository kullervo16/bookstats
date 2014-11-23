/*
 * Client side D3 handling.
 */

// Create the dc.js chart objects & link to div
var dataTable = dc.dataTable("#dc-table-graph");
var pageChart = dc.barChart("#dc-page-chart");
var pagesPerYearChart = dc.rowChart("#dc-pages-chart");


// load data from a csv file
d3.json("/data/books.json", function (data) {
// Run the data through crossfilter and load our 'facts'
data.forEach(function(d) {
    
        d.read = d.read.substr(0, 10);
        d.title = d.title;
        d.author = d.author;
        d.pages = +d.pages;
        d.pageCat = +d.pages - d.pages % 100
    });
var facts = crossfilter(data);
// Create dataTable dimension
var timeDimension = facts.dimension(function (d) {
return d.read;
});

var pageValue = facts.dimension(function (d) {    
    return d.pageCat;
});
var pageValueGroupCount = pageValue.group()
.reduceCount(function(d) { return d.pageCat; });

var yearValue = facts.dimension(function (d) {
   return +d.read.substring(0,4);
});

var yearValueGroupSum = yearValue.group().reduceSum(function(d) {
    return +d.pages;
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
    .dimension(pageValue)
    .group(pageValueGroupCount)
    .transitionDuration(500)
    .centerBar(true)
    //.gap(5)
    //.filter([3, 5])
    .x(d3.scale.linear().domain([0, 2000]))    
    .elasticY(true)
    .xUnitCount(function() {return 5;})    
    ;
    
    // rowchart for pages per year
    pagesPerYearChart.width(300)
    .height(220)
    .margins({top: 5, left: 10, right: 10, bottom: 20})
    .dimension(yearValue)
    .group(yearValueGroupSum)
    .colors(d3.scale.category10())
//    .label(function (d){
//    return d.key.split(".")[1];
//    })
    .title(function(d){return d.value;})
    .elasticX(true)
    .xAxis().ticks(4);

    // Render the Charts
    dc.renderAll();    

});
