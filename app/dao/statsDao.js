/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * 
 */
function connect() {
    var pg = require("pg");

    var conString = "pg://bookstats:bookstats@localhost:5432/bookstats";

    var client = new pg.Client(conString);
    client.connect();

    console.log('Connected to DB');
    return client;
}

/**
 * 
 */
function listRecentBooks(max, res, callBack) {
    client = connect();
    
    var query = client.query("select b.title, b.genre, b.pages, b.read, b.link, a.name as author from book b, author a where b.author = a.id order by b.read desc");
    
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {                
        client.end();        
        callBack(res, result.rows);
    });
    
}

exports.listRecentBooks = listRecentBooks;