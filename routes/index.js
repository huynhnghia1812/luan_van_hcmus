var express = require('express');
var path = require('path');
var router = express.Router();
var zipFolder = require('zip-folder');
var fs = require('fs');

var Blockly = require('node-blockly');
var locale = require('node-blockly/lib/i18n/de');
Blockly.setLocale(locale)

router.get('/', function(req, res, next) {
  res.render('index', {title:"demo"});
});

router.get('/download/:file(*)', (req, res, next) => {
  var file = req.params.file;
  console.log(req.params.file);
  var fileLocation = path.join('public/uploads', file);
  console.log(fileLocation);
  zipFolder('public/uploads/folder', fileLocation, function (err) {
    if (err) {
      throw error;
    } else {
      res.download(fileLocation, file, function (err) {
        if (err) {
          console.log('downloading fail');
          throw error;
        } else {
          console.log('downloading successful');
          fs.unlink(fileLocation, function (error) {
            if (error) {
              throw error;
            } else {
              console.log('Deleted ./uploads/template.zip');
            }
          });
        }
      });
    }
  });
});

module.exports = router;