"use strict";
var jaCodeMap = require('jaCodeMap');

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SequentialDictionariesReader = function () {
    /**
     * @constructor
     * @param {DictionaryReader[]} readers Dictionary readers in order
     */

    function SequentialDictionariesReader(readers) {
        _classCallCheck(this, SequentialDictionariesReader);

        this.readers = readers;
    }

    /**
     * Read dictionaries sequentially
     * @param {function(line: string)} callback Line-by-line callback function
     * @returns {Promise} Last promise
     */


    _createClass(SequentialDictionariesReader, [{
        key: "read",
        value: function read(callback) {
            var promises = this.readers.map(function (reader) {
                return reader.read(function (line) {

                    // 正規化
                    line = jaCodeMap.auto(line).toLowerCase();

                    callback(line);
                });
            });
            for (var i = 0; i < promises.length - 2; i++) {
                promises[i].then(promises[i + 1]);
            }
            return promises[promises.length - 1];
        }
    }]);

    return SequentialDictionariesReader;
}();

exports.default = SequentialDictionariesReader;