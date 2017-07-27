System.register("get-autocompletes", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
            exports_1("default",function (data, text) { return data.filter(function (f) { return text != "" && f.toLowerCase().indexOf(text.toLowerCase()) >= 0; }); });
        }
    }
});
