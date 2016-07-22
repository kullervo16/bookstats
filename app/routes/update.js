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
function handle(req, res, resource) {
    console.log("In update module : "+resource);
    switch(resource) {
        case 'read':
            console.log("Read "+Object.keys(req.body));
            dao.updateRead(req.body.bookId, req.body.date,req.body.rating,req.body.genre);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write("OK");
            res.end("\n");
            break;
        case 'addBook':
            console.log("Add "+Object.keys(req.body));
            dao.updateAdd(req.body.authorId, req.body.date,req.body.rating,req.body.genre,req.body.title,req.body.pages,req.body.language);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write("OK");
            res.end("\n");
            break;
        case 'addAuthor':
            console.log("Add "+Object.keys(req.body));
            dao.updateAddAuthor(req.body.firstName, req.body.name);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write("OK");
            res.end("\n");
            break;
        
    }
    
    
}


exports.handle = handle;