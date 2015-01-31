/**
 * Created with JetBrains WebStorm.
 * User: Abdelkrim
 * Date: 2013/08/21
 * Time: 00:00
 * Copyright (c) 2013 ALT-F1, We believe in the projects we work on™
 */
/*
 * GET home page.
 */

var data = require('./data.js');
'use strict';

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {
            'pathToAssets': '/bootstrap-3.2.0',                        
        });
    }); 
    app.get('/about', function (req, res) {
        res.render('about', {
            'pathToAssets': '/bootstrap-3.2.0',                        
        });
    });
    app.get('/burndown', function (req, res) {
        res.render('burndown', {
            'pathToAssets': '/bootstrap-3.2.0',                        
        });
    });
    app.get('/authors', function (req, res) {
        res.render('authors', {
            'pathToAssets': '/bootstrap-3.2.0',                        
        });
    });
    app.get('/read', function (req, res) {
        res.render('read', {
            'pathToAssets': '/bootstrap-3.2.0',                        
        });
    });
    app.get('/contact', function (req, res) {
        res.render('contact', {
            'pathToAssets': '/bootstrap-3.2.0',                        
        });
    });
    app.get('/template/:selectedTemplate', function (req, res) {
        res.render('bootstrap3-templates/' + req.params.selectedTemplate, {
            'pathToAssets': '/bootstrap-3.2.0',
            'pathToSelectedTemplateWithinBootstrap' : '/bootstrap-3.2.0/docs/examples/' + req.params.selectedTemplate
        });
    });
    app.get('/data/:resource', function (req, res) {
        data.load(req,res,req.params.resource);
    });
    
};