
var dao = require('./dao/statsDao.js');

console.log("Start import");

fs = require('fs');

var walk    = require('walk');
var files   = [];

// Walker options
var walker  = walk.walk('./import', { followLinks: false });

walker.on('file', function(root, stat, next) {
    console.log(root+" "+stat.name);
    // Add this file to the list of files    
    if(stat.name.indexOf("\~") < 0) {
        files.push(root + '/' + stat.name);   
    }
    next();
});

walker.on('end', function() {
    console.log(files);
    files.forEach(function (file) {
        console.log(file);
        handleFile(file);
    });
});

//handleFile("import/data13.lt");

//dao.storeBook("boe","Franzen,Jonathan","2012-01-01",150);
//dao.storeBook("baa","Franzen,Jonathan","2014-01-01",50);


function handleFile(file) {
    fs.readFile(file, 'utf8', function (err,data) {
          if (err) {
            return console.log("ERR:"+err);
          }
          var lines = data.split("\n");
          var lineNo = 0;
          var skipNextLine = false;
          var waitingForLanguage = false;
          var parts;
          lines.forEach(function (line) {       
              if(!skipNextLine) { 
                if(waitingForLanguage) {
                    var language = line;
                    if(line.indexOf("collectionsedit") > -1) {
                        language = 'unknown';
                        skipNextLine = true;
                    }
                    //console.log(parts[0]+"|"+parts[1]+"|"+parts[2]+"|"+parts[3]+"|"+parts[4]+"|"+language);
                    dao.storeBook(parts[0],parts[1],parts[2],parts[3],parts[4],language);
                    waitingForLanguage = false;
                }else if(line.indexOf("collectionsedit") > -1) {
                  skipNextLine = true;
                } else {
                    parts = line.split("\t");
                    waitingForLanguage = true;
                    
                }
              } else {          
                  skipNextLine = false;     
              }       

              lineNo++;
          })
        });
}