System.register("results", ["react-redux", "react"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var react_redux_1, React;
    var results, mapStateToProps;
    return {
        setters:[
            function (react_redux_1_1) {
                react_redux_1 = react_redux_1_1;
            },
            function (React_1) {
                React = React_1;
            }],
        execute: function() {
            results = function (_a) {
                var students = _a.students, firm = _a.firm, isWaitingForStudents = _a.isWaitingForStudents, hasAutocompletes = _a.hasAutocompletes, highlightIndex = _a.highlightIndex;
                return (React.createElement("ul", {className: "results"}, isWaitingForStudents && React.createElement("li", {className: "loading"}, "loading..."), students.map(function (s, i) {
                    return (React.createElement("li", {key: i, className: "student " + ((!hasAutocompletes && highlightIndex === i) && "active")}, React.createElement("a", {href: "mailto:" + s.email}, React.createElement("h3", null, React.createElement("strong", null, s.name), " knows about ", React.createElement("em", null, firm)), React.createElement("h4", null, React.createElement("img", {src: "img/email.png"}), s.email))));
                })));
            };
            mapStateToProps = function (state) {
                return {
                    highlightIndex: state.highlightIndex,
                    hasAutocompletes: state.text !== state.firm,
                    isWaitingForStudents: state.isWaitingForStudents,
                    students: state.students,
                    firm: state.firm
                };
            };
            exports_1("default",react_redux_1.connect(mapStateToProps)(results));
        }
    }
});
