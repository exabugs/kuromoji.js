"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DictionaryReader = require('./DictionaryReader');

var _DictionaryReader2 = _interopRequireDefault(_DictionaryReader);

var _SequentialDictionariesReader = require('./SequentialDictionariesReader');

var _SequentialDictionariesReader2 = _interopRequireDefault(_SequentialDictionariesReader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');


/**
 * IPADic
 */

var IPADic = function () {
    /**
     * @constructor
     */

    function IPADic() {
        _classCallCheck(this, IPADic);

        this.costMatrixDefinition = new _DictionaryReader2.default('matrix.def');
        this.characterDefinition = new _DictionaryReader2.default('char.def');
        this.unknownWordDefinition = new _DictionaryReader2.default('unk.def');

        var readers = fs.readdirSync(__dirname + '/dict/').filter(function (filename) {
            return (/\.csv$/.test(filename)
            );
        }).map(function (filename) {
            return new _DictionaryReader2.default(filename);
        });
        this.tokenInfoDictionaries = new _SequentialDictionariesReader2.default(readers);
    }

    /**
     * Read cost matrix definition (matrix.def)
     * @param {function(line: string)} callback Line-by-line callback function
     * @returns {Promise} Promise which is resolved when reading completed
     */


    _createClass(IPADic, [{
        key: 'readMatrixDef',
        value: function readMatrixDef(callback) {
            return this.costMatrixDefinition.read(callback);
        }

        /**
         * Read character definition (char.def)
         * @param {function(line: string)} callback Line-by-line callback function
         * @returns {Promise} Promise which is resolved when reading completed
         */

    }, {
        key: 'readCharDef',
        value: function readCharDef(callback) {
            return this.characterDefinition.read(callback);
        }

        /**
         * Read unknown word definition (unk.def)
         * @param {function(line: string)} callback Line-by-line callback function
         * @returns {Promise} Promise which is resolved when reading completed
         */

    }, {
        key: 'readUnkDef',
        value: function readUnkDef(callback) {
            return this.unknownWordDefinition.read(callback);
        }

        /**
         * Read token info dictionaries (*.csv) sequentially by filename
         * @param {function(line: string)} callback Line-by-line callback function
         * @returns {Promise} Promise which is resolved when reading completed
         */

    }, {
        key: 'readTokenInfo',
        value: function readTokenInfo(callback) {
            return this.tokenInfoDictionaries.read(callback);
        }
    }]);

    return IPADic;
}();

exports.default = IPADic;