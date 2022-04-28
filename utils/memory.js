var MemoryStorage = require('memorystorage');
var storage = new MemoryStorage('note_app');

//function to return all keys
exports.getAllKeys=(storage)=>{
    var keys = [];
    for (var i = 0; i < storage.length; i++) {
        var key = storage.key(i);
        keys.push(key);
    }
    return keys;
};

//function to return values of all keys
exports.getAllValues=(storage)=>{
    var values = [];
    for (var i = 0; i < storage.length; i++) {
        var key = storage.key(i);
        var value = storage.getItem(key);
        values.push(value);
    }
    return values;
};



exports.storage=storage;