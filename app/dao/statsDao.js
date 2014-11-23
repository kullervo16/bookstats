/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var bookId = 0;
var authorId = 468;
var client;
var connected = false;

/**
 * 
 */
function connect() {
    
    if(!connected) {
        var pg = require("pg");

        var conString = "pg://bookstats:bookstats@localhost:5432/bookstats";

        client = new pg.Client(conString);
        client.connect();

        console.log('Connected to DB');
        connected = true;
    }
}

/**
 * 
 */
function listRecentBooks(max, res, callBack) {
    connect();
    
    var query = client.query("select b.title, b.genre, b.pages, b.read, b.link, a.name as author, b.language, b.rating from book b, author a where b.author = a.id and b.read is not null order by b.read desc");
    
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {                         
        callBack(res, result.rows);
    });
    
}

function storeBook(title, author, read, pages, rating, language) {
    if(author === undefined) {
        return;
    }
    console.log("Store t="+title+"|a="+author+"|re="+read+"|p="+pages+"|ra="+rating+"|l="+language);
    connect();
    var authorFound = false;
    var name = author.split(",")[0].trim().replace("'","");
    var firstName = author.split(",")[1];
    if(firstName !== undefined ) {
        firstName = firstName.trim();
    }
    if(pages === undefined || pages === '') {
        pages = '0';
    }    
    
    var query = client.query("select id from author where name = '"+name+"' and firstName = '"+firstName+"'");
    
    query.on("row", function (row, result) {
        result.addRow(row);
        authorFound = true;
    });
    query.on("end", function (result) {          
        if(authorFound) {            
            addBookForExistingAuthor(title.replace("'","").replace(",",""), result.rows[0].id, read, pages, rating, language);         
        } else {  
            var authorquery = client.query("insert into author values("+authorId+",'"+name+"','"+firstName+"')");
            authorquery.on("end", function (result) {
                addBookForExistingAuthor(title.replace("'","").replace(",",""), authorId, read, pages, rating, language);     
            });
            authorId++;
        }
        
    });
}

function addBookForExistingAuthor(title, authorId, read, pages, rating, language) {
    console.log("!!!Add book "+bookId+" t="+title+" a="+authorId+" r="+read+" p="+pages);
    var date = "'"+read+"'";
    if(read === undefined || read === ' ') {
        date = "null";
    }    
    var query = "insert into book values ("+bookId+",'"+title+"','unknown',"+pages+","+date+",null,"+authorId+",'"+language+"','"+rating+"')";    
    client.query(query);
    bookId = bookId+1;    
}

exports.listRecentBooks = listRecentBooks;
exports.storeBook = storeBook;