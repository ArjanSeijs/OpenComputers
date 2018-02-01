const DroneCode = require("./DroneCode");

/**
 * Creates a new codeSet.
 * @constructor
 */
function CodeSet() {
    this.codes = {};
    this.codes.default = new DroneCode("default", 'print("Hello World")');
}

/**
 * Constructor
 * @type {CodeSet}
 */
CodeSet.prototype.constructor = CodeSet;

/**
 * Add a New Code.
 * @param {DroneCode|string} code The LuaCode or the DroneCode wrapper.
 * @param {number|string} [id] The code id
 * @param {string} [desc] The code description.
 * @return {boolean} Success
 */
CodeSet.prototype.addDroneCode = function (code, id, desc) {
    if (code instanceof DroneCode) {
        if (this.codes[code.id]) {
            return false;
        }
        this.codes[code.id] = code;
    } else {
        if (this.codes[id]) {
            return false;
        }
        this.codes[id] = new DroneCode(id, code, desc);
    }
    return true;
};

/**
 * Get code or the default code.
 * @param {number|string} [id]
 */
CodeSet.prototype.getDroneCode = function (id) {
    if (id && this.codes[id]) {
        return this.codes[id];
    }
    return this.codes.default;
};

module.exports = CodeSet;