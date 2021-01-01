/*
 * Client side D3 handling.
 */

// Create the dc.js chart objects & link to div
//var dataTable = dc.dataTable("#dc-table-graph");

            
var pageChart = dc.barChart("#dc-page-chart");
var pagesPerYearChart = dc.rowChart("#dc-pages-chart");
var booksPerYearChart = dc.rowChart("#dc-books-chart");
var genreChart = dc.pieChart("#dc-genre-chart");
var languageChart = dc.pieChart("#dc-language-chart");
var ratingChart = dc.pieChart("#dc-rating-chart");

d3.scale.category437 = function() {
    return d3.scale.ordinal().range(d3_category437);
};

var d3_category437 = [
    0xd3fe14, 0xfec7f8, 0x0b7b3e, 0x0bf0e9, 0xc203c8, 0xfd9b39, 0x888593,
    0x906407, 0x98ba7f, 0xfe6794, 0x10b0ff, 0xac7bff, 0xfee7c0, 0x964c63,
    0x1da49c, 0x0ad811, 0xbbd9fd, 0xfe6cfe, 0x297192, 0xd1a09c, 0x78579e,
    0x81ffad, 0x739400, 0xca6949, 0xd9bf01, 0x646a58, 0xd5097e, 0xbb73a9,
    0xccf6e9, 0x9cb4b6, 0xb6a7d4, 0x9e8c62, 0x6e83c8, 0x01af64, 0xa71afd,
    0xcfe589, 0xd4ccd1, 0xfd4109, 0xbf8f0e, 0x2f786e, 0x4ed1a5, 0xd8bb7d,
    0xa54509, 0x6a9276, 0xa4777a, 0xfc12c9, 0x606f15, 0x3cc4d9, 0xf31c4e,
    0x73616f, 0xf097c6, 0xfc8772, 0x92a6fe, 0x875b44, 0x699ab3, 0x94bc19,
    0x7d5bf0, 0xd24dfe, 0xc85b74, 0x68ff57, 0xb62347, 0x994b91, 0x646b8c,
    0x977ab4, 0xd694fd, 0xc4d5b5, 0xfdc4bd, 0x1cae05, 0x7bd972, 0xe9700a,
    0xd08f5d, 0x8bb9e1, 0xfde945, 0xa29d98, 0x1682fb, 0x9ad9e0, 0xd6cafe,
    0x8d8328, 0xb091a7, 0x647579, 0x1f8d11, 0xe7eafd, 0xb9660b, 0xa4a644,
    0xfec24c, 0xb1168c, 0x188cc1, 0x7ab297, 0x4468ae, 0xc949a6, 0xd48295,
    0xeb6dc2, 0xd5b0cb, 0xff9ffb, 0xfdb082, 0xaf4d44, 0xa759c4, 0xa9e03a,
    0x0d906b, 0x9ee3bd, 0x5b8846, 0x0d8995, 0xf25c58, 0x70ae4f, 0x847f74,
    0x9094bb, 0xffe2f1, 0xa67149, 0x936c8e, 0xd04907, 0xc3b8a6, 0xcef8c4,
    0x7a9293, 0xfda2ab, 0x2ef6c5, 0x807242, 0xcb94cc, 0xb6bdd0, 0xb5c75d,
    0xfde189, 0xb7ff80, 0xfa2d8e, 0x839a5f, 0x28c2b5, 0xe5e9e1, 0xbc79d8,
    0x7ed8fe, 0x9f20c3, 0x4f7a5b, 0xf511fd, 0x09c959, 0xbcd0ce, 0x8685fd,
    0x98fcff, 0xafbff9, 0x6d69b4, 0x5f99fd, 0xaaa87e, 0xb59dfb, 0x5d809d,
    0xd9a742, 0xac5c86, 0x9468d5, 0xa4a2b2, 0xb1376e, 0xd43f3d, 0x05a9d1,
    0xc38375, 0x24b58e, 0x6eabaf, 0x66bf7f, 0x92cbbb, 0xddb1ee, 0x1be895,
    0xc7ecf9, 0xa6baa6, 0x8045cd, 0x5f70f1, 0xa9d796, 0xce62cb, 0x0e954d,
    0xa97d2f, 0xfcb8d3, 0x9bfee3, 0x4e8d84, 0xfc6d3f, 0x7b9fd4, 0x8c6165,
    0x72805e, 0xd53762, 0xf00a1b, 0xde5c97, 0x8ea28b, 0xfccd95, 0xba9c57,
    0xb79a82, 0x7c5a82, 0x7d7ca4, 0x958ad6, 0xcd8126, 0xbdb0b7, 0x10e0f8,
    0xdccc69, 0xd6de0f, 0x616d3d, 0x985a25, 0x30c7fd, 0x0aeb65, 0xe3cdb4,
    0xbd1bee, 0xad665d, 0xd77070, 0x8ea5b8, 0x5b5ad0, 0x76655e, 0x598100,
    0x86757e, 0x5ea068, 0xa590b8, 0xc1a707, 0x85c0cd, 0xe2cde9, 0xdcd79c,
    0xd8a882, 0xb256f9, 0xb13323, 0x519b3b, 0xdd80de, 0xf1884b, 0x74b2fe,
    0xa0acd2, 0xd199b0, 0xf68392, 0x8ccaa0, 0x64d6cb, 0xe0f86a, 0x42707a,
    0x75671b, 0x796e87, 0x6d8075, 0x9b8a8d, 0xf04c71, 0x61bd29, 0xbcc18f,
    0xfecd0f, 0x1e7ac9, 0x927261, 0xdc27cf, 0x979605, 0xec9c88,
    0x8c48a3,0x676769, 0x546e64, 0x8f63a2, 0xb35b2d, 0x7b8ca2, 0xb87188,
    0x4a9bda, 0xeb7dab, 0xf6a602, 0xcab3fe, 0xddb8bb, 0x107959, 0x885973,
    0x5e858e, 0xb15bad, 0xe107a7, 0x2f9dad, 0x4b9e83, 0xb992dc, 0x6bb0cb,
    0xbdb363, 0xccd6e4, 0xa3ee94, 0x9ef718, 0xfbe1d9, 0xa428a5, 0x93514c,
    0x487434, 0xe8f1b6, 0xd00938, 0xfb50e1, 0xfa85e1, 0x7cd40a, 0xf1ade1,
    0xb1485d, 0x7f76d6, 0xd186b3, 0x90c25e, 0xb8c813, 0xa8c9de, 0x7d30fe,
    0x815f2d, 0x737f3b, 0xc84486, 0x946cfe, 0xe55432, 0xa88674, 0xc17a47,
    0xb98b91, 0xfc4bb3, 0xda7f5f, 0xdf920b, 0xb7bbba, 0x99e6d9, 0xa36170,
    0xc742d8, 0x947f9d, 0xa37d93, 0x889072, 0x9b924c, 0x23b4bc, 0xe6a25f,
    0x86df9c, 0xa7da6c, 0x3fee03, 0xeec9d8, 0xaafdcb, 0x7b9139, 0x92979c,
    0x72788a, 0x994cff, 0xc85956, 0x7baa1a, 0xde72fe, 0xc7bad8, 0x85ebfe,
    0x6e6089, 0x9b4d31, 0x297a1d, 0x9052c0, 0x5c75a5, 0x698eba, 0xd46222,
    0x6da095, 0xb483bb, 0x04d183, 0x9bcdfe, 0x2ffe8c, 0x9d4279, 0xc909aa,
    0x826cae, 0x77787c, 0xa96fb7, 0x858f87, 0xfd3b40, 0x7fab7b, 0x9e9edd,
    0xbba3be, 0xf8b96c, 0x7be553, 0xc0e1ce, 0x516e88, 0xbe0e5f, 0x757c09,
    0x4b8d5f, 0x38b448, 0xdf8780, 0xebb3a0, 0xced759, 0xf0ed7c, 0xe0eef1,
    0x0969d2, 0x756446, 0x488ea8, 0x888450, 0x61979c, 0xa37ad6, 0xb48a54,
    0x8193e5, 0xdd6d89, 0x8aa29d, 0xc679fe, 0xa4ac12, 0x75bbb3, 0x6ae2c1,
    0xc4fda7, 0x606877, 0xb2409d, 0x5874c7, 0xbf492c, 0x4b88cd, 0xe14ec0,
    0xb39da2, 0xfb8300, 0xd1b845, 0xc2d083, 0xc3caef, 0x967500, 0xc56399,
    0xed5a05, 0xaadff6, 0x6685f4, 0x1da16f, 0xf28bff, 0xc9c9bf, 0xc7e2a9,
    0x5bfce4, 0xe0e0bf, 0xe8e2e8, 0xddf2d8, 0x9108f8, 0x932dd2, 0xc03500,
    0xaa3fbc, 0x547c79, 0x9f6045, 0x04897b, 0x966f32, 0xd83212, 0x039f27,
    0xdf4280, 0xef206e, 0x0095f7, 0xa5890d, 0x9a8f7f, 0xbc839e, 0x88a23b,
    0xe55aed, 0x51af9e,
    0x5eaf82, 0x9e91fa, 0xf76c79, 0x99a869, 0xd2957d, 0xa2aca6, 0xe3959e,
    0xadaefc, 0x5bd14e, 0xdf9ceb, 0xfe8fb1, 0x87ca80, 0xfc986d, 0x2ad3d9,
    0xe8a8bb, 0xa7c79c, 0xa5c7cc, 0x7befb7, 0xb7e2e0, 0x85f57b, 0xf5d95b,
    0xdbdbff, 0xfddcff, 0x6e56bb, 0x226fa8, 0x5b659c, 0x58a10f, 0xe46c52,
    0x62abe2, 0xc4aa77, 0xb60e74, 0x087983, 0xa95703, 0x2a6efb, 0x427d92
].map(d3_rgbString);


function d3_rgbString (value) {
    return d3.rgb(value >> 16, value >> 8 & 0xff, value & 0xff);
}


// load data from a json url
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


// create refresh function for the dynatable
var dynatable = $('#dc-table-graph').dynatable({
    features: {
        pushState: false
    },
    dataset: {
        records: timeDimension.top(Infinity),
        perPageDefault: 10,
        perPageOptions: [10, 20, 50]
    }
}).data('dynatable');
function RefreshTable() {
    dc.events.trigger(function () {
        dynatable.settings.dataset.originalRecords = timeDimension.top(Infinity);
        dynatable.process();
    });
};

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

    
    //barchart for pages per book
    pageChart.width(480)
    .height(150)
    .margins({top: 10, right: 10, bottom: 20, left: 40})
    .dimension(pageDimension)
    .group(pageValueGroupCount)
    .transitionDuration(500)    
    .centerBar(true)
    .gap(2)      
    //.filter([3, 5])
    .x(d3.scale.linear().domain([0, 2000]))        
    .elasticY(true)              
    //.xUnits(function () {console.log("XUNITS"); return dc.units.integers;});
    ;
    
    pageChart.xUnitCount = function() {return +20;};
    
    // rowchart for books per year
    booksPerYearChart.width(300)
    .height(420)
    .margins({top: 5, left: 10, right: 10, bottom: 20})
    .dimension(yearDimension)
    .group(yearValueGroupBookSum)
    .colors(d3.scale.category437())
    .title(function(d){return d.value;})    
    .elasticX(true)
    .xAxis().ticks(4);
    booksPerYearChart.onClick = function() {}; // prevent filtering (interferes with the page/year filter
    
    // rowchart for pages per year
    pagesPerYearChart.width(300)
    .height(420)
    .margins({top: 5, left: 10, right: 10, bottom: 20})
    .dimension(yearDimension)
    .group(yearValueGroupPageSum)
    .colors(d3.scale.category437())
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

    // link in the dynatable
    for (var i = 0; i < dc.chartRegistry.list().length; i++) {
        var chartI = dc.chartRegistry.list()[i];
        chartI.on("filtered", RefreshTable);
    }
    
    RefreshTable();

    // Render the Charts
    dc.renderAll();    

});
