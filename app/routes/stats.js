/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var dao = require('../dao/statsDao.js');

/**
 * Mainpage
 * @param {The request} req
 * @param {The response} res
 */
function mainPage(req, res) {
    console.log("In stats module");
    
    dao.listRecentBooks(10, res, renderMainPage);
    
}

function renderMainPage(res, books) {    
    res.render('index', {
            'pathToAssets': '/bootstrap-3.2.0',            
            'books' : books
        });
}

exports.mainPage = mainPage;