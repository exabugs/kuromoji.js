"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var readline = require('readline');

/**
 * MeCab seed dictionary reader
 */

var DictionaryReader = function () {
    /**
     * @constructor
     * @param {string} filename
     */

    function DictionaryReader(filename) {
        _classCallCheck(this, DictionaryReader);

        this.filename = filename;
    }

    /**
     * Read dictionary file
     * @param {function(line: string)} callback Line-by-line callback function
     * @returns {Promise} Promise which is resolved when reading completed
     */


    _createClass(DictionaryReader, [{
        key: 'read',
        value: function read(callback) {
            var _this = this;

            return new Promise(function (resolve) {
                var rl = readline.createInterface({
                    input: fs.createReadStream(__dirname + '/dict/' + _this.filename)
                });
                rl.on('line', function (line) {
                    callback(line);
                });
                rl.on('close', function () {
                    resolve();
                });
            });
        }
    }]);

    return DictionaryReader;
}();

exports.default = DictionaryReader;