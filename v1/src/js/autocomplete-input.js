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
System.register("autocomplete-input", ["react", "get-autocompletes"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var React, get_autocompletes_1;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (get_autocompletes_1_1) {
                get_autocompletes_1 = get_autocompletes_1_1;
            }],
        execute: function() {
            exports_2("default",function (_a) {
                var data = _a.data, label = _a.label, text = _a.text, selected = _a.selected, highlightIndex = _a.highlightIndex, onChange = _a.onChange, onSelect = _a.onSelect;
                var autocompletes;
                if (text === selected || text === "") {
                    autocompletes = [];
                }
                else {
                    autocompletes = get_autocompletes_1["default"](data, text);
                }
                return (React.createElement("div", {className: "autocomplete-input"}, React.createElement("label", {htmlFor: "labelled-input"}, label), React.createElement("input", {type: "text", id: "labelled-input", placeholder: "Type here", value: text, autoComplete: "off", onChange: function (e) {
                    var input = e.nativeEvent.target;
                    onChange(input.value);
                }}), React.createElement("ul", null, autocompletes.map(function (a, i) {
                    return React.createElement("li", {className: highlightIndex === i && "active" || "", key: i, onClick: function () { return onSelect(a); }}, a);
                }))));
            });
        }
    }
});
