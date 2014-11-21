/*
 * Client side D3 handling.
 */

// Create the dc.js chart objects & link to div
var dataTable = dc.dataTable("#dc-table-graph");
// load data from a csv file
d3.json("http://localhost:3001/data/books.json", function (data) {
// format our data
var dtgFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");
data.forEach(function(d) {
    
        d.read = dtgFormat.parse(d.read.substr(0, 19));
        d.title = d.title;
        d.author = d.author;
        d.pages = +d.pages;
    });
// Run the data through crossfilter and load our 'facts'
var facts = crossfilter(data);
// Create dataTable dimension
var timeDimension = facts.dimension(function (d) {
return d.dtg;
});
// Setup the charts
// Table of book data
console.log(dataTable);
dataTable.width(960).height(800)
    .dimension(timeDimension)
    .group(function(d) { return "Books"})
    .size(10)
    .columns([
    function(d) { return d.author; },
    function(d) { return d.title; },
    function(d) { return d.genre; },
    function(d) { return d.pages; },
    function(d) { return d.read; },
    function(d) {
    return '<a href=\"' +d.link+ "\" target=\"_blank\">link</a>"}
    ])
    .sortBy(function(d){ return d.read; })
    .order(d3.ascending);
    
    // Render the Charts
    dc.renderAll();
    console.log(dataTable);
});