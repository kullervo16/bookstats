/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var dao = require('../dao/bookDao.js');

/**
 * Mainpage
 * @param {The request} req
 * @param {The response} res
 */
function load(req, res, resource) {
    console.log("In data module : "+resource);
    switch(resource) {
        case 'books.json':
            dao.listRecentBooks(res, renderData);
            break;
        case 'currentYear.json':
            dao.listBooksForCurrentYear(res, renderData);
            break;
    }
    
    
}

function renderData(res, books) {    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(books));
    res.end("\n");
}

exports.load = load;