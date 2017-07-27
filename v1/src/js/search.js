System.register("actions", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UPDATE_TEXT, updateText, SELECT_FIRM, selectFirm, RECEIVE_STUDENTS, receiveStudents, MOVE_HIGHLIGHT_INDEX, moveHighlightIndex;
    return {
        setters:[],
        execute: function() {
            exports_1("UPDATE_TEXT", UPDATE_TEXT = "UPDATE_TEXT");
            exports_1("updateText", updateText = function (text) {
                return {
                    type: UPDATE_TEXT,
                    text: text
                };
            });
            exports_1("SELECT_FIRM", SELECT_FIRM = "SELECT_FIRM");
            exports_1("selectFirm", selectFirm = function (firm) {
                return function (dispatch, getState) {
                    dispatch({
                        type: SELECT_FIRM,
                        firm: firm
                    });
                    setTimeout(function () {
                        dispatch(receiveStudents([
                            { name: "Sam", email: "sam.ws.watkinson@gmail.com" },
                            { name: "Tom", email: "sam.ws.watkinson@gmail.com" },
                            { name: "Jeb", email: "sam.ws.watkinson@gmail.com" },
                            { name: "Tim", email: "sam.ws.watkinson@gmail.com" },
                            { name: "Rob", email: "sam.ws.watkinson@gmail.com" },
                            { name: "Bob", email: "sam.ws.watkinson@gmail.com" },
                            { name: "Dug", email: "sam.ws.watkinson@gmail.com" }
                        ]));
                    }, 1000);
                };
            });
            exports_1("RECEIVE_STUDENTS", RECEIVE_STUDENTS = "RECEIVE_STUDENTS");
            exports_1("receiveStudents", receiveStudents = function (students) {
                return {
                    type: RECEIVE_STUDENTS,
                    students: students
                };
            });
            exports_1("MOVE_HIGHLIGHT_INDEX", MOVE_HIGHLIGHT_INDEX = "MOVE_HIGHLIGHT_INDEX");
            exports_1("moveHighlightIndex", moveHighlightIndex = function (amount) {
                return {
                    type: MOVE_HIGHLIGHT_INDEX,
                    amount: amount
                };
            });
        }
    }
});
System.register("firms", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("get-autocompletes", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters:[],
        execute: function() {
            exports_3("default",function (data, text) { return data.filter(function (f) { return text != "" && f.toLowerCase().indexOf(text.toLowerCase()) >= 0; }); });
        }
    }
});
System.register("autocomplete-input", ["react", "get-autocompletes"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
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
            exports_4("default",function (_a) {
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
System.register("search", ["react-redux", "actions", "firms", "react", "autocomplete-input"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var react_redux_1, actions_1, firms, React, autocomplete_input_1;
    var search, mapStateToProps, mapDispatchToProps;
    return {
        setters:[
            function (react_redux_1_1) {
                react_redux_1 = react_redux_1_1;
            },
            function (actions_1_1) {
                actions_1 = actions_1_1;
            },
            function (firms_1) {
                firms = firms_1;
            },
            function (React_2) {
                React = React_2;
            },
            function (autocomplete_input_1_1) {
                autocomplete_input_1 = autocomplete_input_1_1;
            }],
        execute: function() {
            ;
            search = function (props) {
                var text = props.text, selected = props.selected, hasText = props.hasText, autocompletes = props.autocompletes, updateText = props.updateText, selectFirm = props.selectFirm, highlightIndex = props.highlightIndex;
                return (React.createElement("form", {className: "search"}, React.createElement(autocomplete_input_1["default"], {label: "Enter Name of Firm:", text: text, data: firms, selected: selected, onChange: function (t) { return updateText(t); }, onSelect: function (f) { return selectFirm(f); }, highlightIndex: highlightIndex})));
            };
            mapStateToProps = function (state) {
                return {
                    text: state.text,
                    selected: state.firm,
                    autocompletes: state.autocompletes,
                    isWaitingForStudents: state.isWaitingForStudents,
                    highlightIndex: state.highlightIndex,
                    hasText: state.text !== "" && state.text !== undefined
                };
            };
            mapDispatchToProps = function (dispatch) {
                return {
                    selectFirm: function (newFirm) {
                        dispatch(actions_1.selectFirm(newFirm));
                    },
                    updateText: function (newText) {
                        dispatch(actions_1.updateText(newText));
                    }
                };
            };
            exports_5("default",react_redux_1.connect(mapStateToProps, mapDispatchToProps)(search));
        }
    }
});
