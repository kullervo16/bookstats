var burndownChart = dc.lineChart("#dc-burndown-chart");

// load data from a json url
d3.json("/data/currentYear.json", function (data) {
    // Run the data through crossfilter and load our 'facts'
    data.forEach(function(d) {

        if (d.read !== null) {
            d.read = d.read.substr(0, 10);
        }
        d.title = d.title;
        d.author = d.author;
        d.pages = + d.pages;
        d.pageCat = + d.pages - d.pages % 100
    });
    var facts = crossfilter(data);
    var timeDimension = facts.dimension(function (d) {
        return new Date(d.read);
    });
    var yearlyPagesToRead = 10000;
    var pagesToRead = yearlyPagesToRead;
    var burndownPageSum = timeDimension.group().reduce(
        function (p, v) {            
            pagesToRead -= v.pages;
            p.toGo = pagesToRead;  
            
            // calculate the number of days between the start of the year
            var currentDate = new Date(v.read);
            var startOfYear = new Date("2016-01-01"); // TODO : config
            var numDays = ((currentDate - startOfYear)/(1000*60*60*24));
            var theoreticalPages = Math.floor(yearlyPagesToRead - (yearlyPagesToRead / 366 * numDays)); // TODO : leap year            
            p.theory = theoreticalPages;
            p.diff = theoreticalPages - pagesToRead;
            return p;
        },
        function (p, v) {            
            return p;
        },
        function (p,v) {            
            return {toGo: pagesToRead, theory: 5000};
        }
    );
    var test = timeDimension.group().reduceSum(function(d) { return d.pages; })

    
    burndownChart
        .renderArea(true)
        .width(990)
        .height(400)
        .transitionDuration(1000)
        .margins({top: 30, right: 50, bottom: 25, left: 40})
        .dimension(timeDimension)
        //.mouseZoomable(true)
        //.rangeChart(volumeChart)
        .x(d3.time.scale().domain([new Date(2016, 0, 1), new Date(2016, 12, 31)])) // TODO : make dynamic
        //.round(d3.time.month.round)
        //.xUnits(d3.time.months)
        .elasticY(true)
        .renderHorizontalGridLines(true)
        .legend(dc.legend().x(800).y(10).itemHeight(13).gap(5))
        .brushOn(false)
        .group(burndownPageSum, "Pages read")               
        .valueAccessor(function (d) {                
            return d.value.toGo;
        })        
        .title(function (d) {  
            return d.data.key.toString().substring(0,15)+ ":\n Theoretical pages to go : " + d.data.value.theory + "\n Actual pages to go : " + d.data.value.toGo;
        })
        .stack(burndownPageSum, "Theoretical", function (d) {
            return d.value.diff;
        })
    ;
    
    //burndownChart.yAxisMin = function() {return -200;};
    //burndownChart.yAxisMax = function() {return +10000;};
    
    dc.renderAll();
});
