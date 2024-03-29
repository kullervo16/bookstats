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

        var user = process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME;
        var pwd  = process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD;
        var ip   = process.env.OPENSHIFT_POSTGRESQL_DB_HOST;
        var port = process.env.OPENSHIFT_POSTGRESQL_DB_PORT;
        var conString = "pg://"+user+":"+pwd+"@"+ip+":"+port+"/bookstats";

        client = new pg.Client(conString);
        client.connect();

        console.log('Connected to DB');
        connected = true;
    }
}

/**
 * Get the read books ordered by their data of completion
 */
function listRecentBooks(res, callBack) {
    connect();
    
    var query = client.query("select b.title, b.genre, b.pages, b.read, b.link, a.name ||', '||a.firstName as author, b.language, b.rating from book b, author a where b.author = a.id and b.read is not null order by b.read desc");
    
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {                         
        callBack(res, result.rows);
    });
    
}

/**
 * Get the read books ordered by their data of completion
 */
function listAllBooks(res, callBack) {
    connect();
    
    var query = client.query("select b.title, b.genre, b.pages, b.read, b.link, a.name ||', '||a.firstName as author, b.language, b.rating from book b, author a where b.author = a.id order by b.read desc");
    
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {                         
        callBack(res, result.rows);
    });
    
}

/**
 * Get the books read this year.
 * @param {type} res
 * @param {type} callBack
 * @returns {undefined}
 */
function listBooksForCurrentYear(res, callBack) {
    connect();
    
    var query = client.query("select b.title, b.genre, b.pages, b.read, b.link, a.name as author, b.language, b.rating from book b, author a where b.author = a.id and read > date_trunc('year',now()) order by b.read asc");
    
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

function listUnreadBooks(res, callBack) {
    connect();
    
    var query = client.query("select b.id,b.title from book b where b.to_read = true order by b.title");
    
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {                         
        callBack(res, result.rows);
    });
    
}

function listGenres(res, callBack) {
    connect();
    
    var query = client.query("select * from genre");
    
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {                         
        callBack(res, result.rows);
    });
    
}

function listAuthors(res, callBack) {
    connect();
    
    var query = client.query("select * from author order by name");
    
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {                         
        callBack(res, result.rows);
    });
    
}

function updateRead(id, date, rating, genre) {
    console.log("ID = "+id);
    console.log("Date = "+date);
    console.log("Rating = "+rating);
    console.log("Genre = "+genre);
    
    connect();
    
    var query = client.query("update book set genre = '"+genre+"',rating='"+rating+"',read='"+date+"', to_read = false where id = "+id);
}

function updateAdd(id, date, rating, genre, title, pages, language) {
    console.log("authorId = "+id);
    console.log("Date = "+date);
    console.log("Rating = "+rating);
    console.log("Genre = "+genre);
    console.log("Title = "+title);
    console.log("Pages = "+pages);
    console.log("Language = "+language);
    
    connect();
    
    var query = client.query("insert into book select max(id)+1,'"+title+"','"+genre+"',"+pages+",'"+date+"',null,"+id+",'"+language+"','"+rating+"',false from book");
}

function updateAddAuthor(firstName, name, callBack) {
    console.log("firstName = "+firstName);
    console.log("name = "+name);    
    
    connect();
    
    client.query("insert into author select max(id)+1,'"+name+"','"+firstName+"' from author");
    var query = client.query("select max(id) as maxId from author");
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        callBack(result.rows);
    });
}

exports.listRecentBooks = listRecentBooks;
exports.listAllBooks = listAllBooks;
exports.storeBook = storeBook;
exports.listBooksForCurrentYear = listBooksForCurrentYear;
exports.listUnreadBooks = listUnreadBooks;
exports.listGenres = listGenres;
exports.updateRead = updateRead;
exports.listAuthors= listAuthors;
exports.updateAdd  = updateAdd;
exports.updateAddAuthor = updateAddAuthor;
