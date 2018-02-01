/**
 * Creates a new wrapper object for a piece of lua code.
 * @param {number|string} id Unique code identifier;
 * @param {string} code The lua code.
 * @param {string} [desc] The code description.
 * @constructor
 */
function DroneCode(id, code, desc) {
    this.id = id;
    this.code = code;
    this.desc = desc;
    this.updated = new Date();
}

/**
 * Constructor
 * @type {DroneCode}
 */
DroneCode.prototype.constructor = DroneCode;

/**
 * Getter for the code.
 * @returns {string}
 */
DroneCode.prototype.getCode = function () {
    return this.code;
};

/**
 * Setter for the code.
 * @param {string} code
 */
DroneCode.prototype.setCode = function (code) {
    this.updated = new Date();
    this.code = code;
};

module.exports = DroneCode;