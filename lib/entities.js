"use strict";
function Entity(values) {
    if (!(this instanceof Entity)) {
        return new Entity(values);
    }
    if (values) {
        this.set(values, true);
    }
}
Entity.prototype = {
    __values: {},
    set: function set(key, val, force) {
        if (typeof key !== "string") {
            for (var k in key) {
                if (key.hasOwnProperty(k)) {
                    this.set(k, key[k], val);
                }
            }
        } else {
            this[key] = val;
            if (force) {
                this.__values[key] = val;
            }
        }
    },
    orig: function orig() {
        return this.__values;
    },
    diff: function diff() {
        var diff = {}, orig = this.orig();
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                if (!orig.hasOwnProperty(key)) {
                    diff[key] = this[key];
                } else if (this[key] !== orig[key]) {
                    diff[key] = this[key];
                }
            }
        }
        return diff;
    },
    reset: function reset() {
        var orig = this.orig();
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                delete this[key];
            }
        }
        for (var val in orig) {
            if (orig.hasOwnProperty(val)) {
                this[val] = orig[val];
            }
        }
    }
};
module.exports = {
    entity: Entity,
    entities: {},
    load: function load(name, path) {
        this.entities[name] = require(path)(Entity);
    }
};