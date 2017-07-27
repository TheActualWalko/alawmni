System.register("hero", ["react"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var React;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            }],
        execute: function() {
            exports_1("default",function () { return (React.createElement("header", {className: "main-header"}, React.createElement("h1", null, React.createElement("span", null, "Alumni"), React.createElement("br", null), React.createElement("span", null, "Database")), React.createElement("h2", null, React.createElement("img", {src: "img/kcl-badge.png"})))); });
        }
    }
});
