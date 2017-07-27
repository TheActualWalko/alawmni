var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            exports_1("default",function () { return (React.createElement("header", {className: "main-header"}, 
                React.createElement("h1", null, 
                    React.createElement("span", null, "Alumni"), 
                    React.createElement("br", null), 
                    React.createElement("span", null, "Database")), 
                React.createElement("h2", null, 
                    React.createElement("a", {href: "http://kcllawsociety.com"}, 
                        React.createElement("img", {src: "img/kcl-badge.png"})
                    )
                ))); });
        }
    }
});
System.register("actions", ["jquery"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var $;
    var UPDATE_TEXT, updateText, SELECT_FIRM, selectFirm, RECEIVE_STUDENTS, receiveStudents, MOVE_HIGHLIGHT_INDEX, moveHighlightIndex;
    return {
        setters:[
            function ($_1) {
                $ = $_1;
            }],
        execute: function() {
            exports_2("UPDATE_TEXT", UPDATE_TEXT = "UPDATE_TEXT");
            exports_2("updateText", updateText = function (text) {
                return {
                    type: UPDATE_TEXT,
                    text: text
                };
            });
            exports_2("SELECT_FIRM", SELECT_FIRM = "SELECT_FIRM");
            exports_2("selectFirm", selectFirm = function (firm) {
                return function (dispatch, getState) {
                    dispatch({
                        type: SELECT_FIRM,
                        firm: firm
                    });
                    $.get("/get-students.php", { firm: firm.id }, function (result) {
                        var students = JSON.parse(result);
                        console.log(students);
                        dispatch(receiveStudents(students));
                    });
                };
            });
            exports_2("RECEIVE_STUDENTS", RECEIVE_STUDENTS = "RECEIVE_STUDENTS");
            exports_2("receiveStudents", receiveStudents = function (students) {
                return {
                    type: RECEIVE_STUDENTS,
                    students: students
                };
            });
            exports_2("MOVE_HIGHLIGHT_INDEX", MOVE_HIGHLIGHT_INDEX = "MOVE_HIGHLIGHT_INDEX");
            exports_2("moveHighlightIndex", moveHighlightIndex = function (amount) {
                return {
                    type: MOVE_HIGHLIGHT_INDEX,
                    amount: amount
                };
            });
        }
    }
});
System.register("get-autocompletes", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters:[],
        execute: function() {
            exports_3("default",function (data, text) { return data.filter(function (f) { return text != "" && f.name.toLowerCase().indexOf(text.toLowerCase()) >= 0; }); });
        }
    }
});
System.register("autocomplete-input", ["react", "get-autocompletes"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var React, get_autocompletes_1;
    return {
        setters:[
            function (React_2) {
                React = React_2;
            },
            function (get_autocompletes_1_1) {
                get_autocompletes_1 = get_autocompletes_1_1;
            }],
        execute: function() {
            exports_4("default",function (_a) {
                var data = _a.data, label = _a.label, text = _a.text, selected = _a.selected, highlightIndex = _a.highlightIndex, onChange = _a.onChange, onSelect = _a.onSelect;
                var autocompletes;
                if (text === "" || selected === undefined || text === selected.name) {
                    autocompletes = [];
                }
                else {
                    autocompletes = get_autocompletes_1["default"](data, text);
                }
                return (React.createElement("div", {className: "autocomplete-input"}, 
                    React.createElement("label", {htmlFor: "labelled-input"}, label), 
                    React.createElement("input", {type: "text", id: "labelled-input", placeholder: "Type here", value: text, autoComplete: "off", onChange: function (e) {
                        var input = e.nativeEvent.target;
                        onChange(input.value);
                    }}), 
                    autocompletes.length > 0 && React.createElement("ul", null, autocompletes.map(function (a, i) {
                        return React.createElement("li", {className: highlightIndex === i && "active" || "", key: i, onClick: function () { return onSelect(a); }}, a.name);
                    }))));
            });
        }
    }
});
System.register("search", ["react-redux", "actions", "react", "autocomplete-input"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var react_redux_1, actions_1, React, autocomplete_input_1;
    var search, mapStateToProps, mapDispatchToProps;
    return {
        setters:[
            function (react_redux_1_1) {
                react_redux_1 = react_redux_1_1;
            },
            function (actions_1_1) {
                actions_1 = actions_1_1;
            },
            function (React_3) {
                React = React_3;
            },
            function (autocomplete_input_1_1) {
                autocomplete_input_1 = autocomplete_input_1_1;
            }],
        execute: function() {
            ;
            search = function (props) {
                var text = props.text, selected = props.selected, hasText = props.hasText, autocompletes = props.autocompletes, updateText = props.updateText, selectFirm = props.selectFirm, highlightIndex = props.highlightIndex;
                return (React.createElement("form", {className: "search"}, 
                    React.createElement(autocomplete_input_1["default"], {label: "Enter Name of Firm:", text: text, data: firms, selected: selected, onChange: function (t) { return updateText(t); }, onSelect: function (f) { return selectFirm(f); }, highlightIndex: highlightIndex})
                ));
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
System.register("results", ["react-redux", "react"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var react_redux_2, React;
    var results, mapStateToProps;
    return {
        setters:[
            function (react_redux_2_1) {
                react_redux_2 = react_redux_2_1;
            },
            function (React_4) {
                React = React_4;
            }],
        execute: function() {
            results = function (_a) {
                var students = _a.students, firm = _a.firm, isWaitingForStudents = _a.isWaitingForStudents, hasAutocompletes = _a.hasAutocompletes, highlightIndex = _a.highlightIndex;
                return (React.createElement("ul", {className: "results"}, 
                    isWaitingForStudents && React.createElement("li", {className: "loading"}, "loading..."), 
                    students.map(function (s, i) {
                        return (React.createElement("li", {key: i, className: "student " + ((!hasAutocompletes && highlightIndex === i) && "active")}, 
                            React.createElement("a", {href: "mailto:" + s.email}, 
                                React.createElement("h3", null, 
                                    React.createElement("strong", null, s.name), 
                                    " knows about ", 
                                    React.createElement("em", null, firm.name)), 
                                React.createElement("h4", null, 
                                    React.createElement("img", {src: "img/email.png"}), 
                                    s.email))
                        ));
                    }), 
                    React.createElement("li", {className: "main-footer"}, 
                        React.createElement("p", null, 
                            "If you would like to be a part of this database please ", 
                            React.createElement("a", {href: "http://bit.ly/kclls-adp"}, "click here to sign up.")), 
                        React.createElement("p", null, 
                            "Email ", 
                            React.createElement("a", {href: "mailto:kcllsgeneral@gmail.com", target: "_blank"}, "kcllsgeneral@gmail.com"), 
                            " for any questions."))));
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
            exports_6("default",react_redux_2.connect(mapStateToProps)(results));
        }
    }
});
System.register("redux-thunk", [], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var reduxThunk;
    return {
        setters:[],
        execute: function() {
            reduxThunk = function (_ref) {
                var dispatch = _ref.dispatch;
                var getState = _ref.getState;
                return function (next) {
                    return function (action) {
                        return typeof action === "function" ? action(dispatch, getState) : next(action);
                    };
                };
            };
            exports_7("default",reduxThunk);
        }
    }
});
System.register("store", ["redux-thunk", "redux", "actions", "get-autocompletes"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var redux_thunk_1, redux_1, actions_2, get_autocompletes_2;
    var reducer, store;
    return {
        setters:[
            function (redux_thunk_1_1) {
                redux_thunk_1 = redux_thunk_1_1;
            },
            function (redux_1_1) {
                redux_1 = redux_1_1;
            },
            function (actions_2_1) {
                actions_2 = actions_2_1;
            },
            function (get_autocompletes_2_1) {
                get_autocompletes_2 = get_autocompletes_2_1;
            }],
        execute: function() {
            reducer = function (state, action) {
                if (state === void 0) { state = {
                    text: "",
                    firm: "",
                    highlightIndex: -1,
                    isWaitingForStudents: false,
                    students: []
                }; }
                switch (action.type) {
                    case actions_2.MOVE_HIGHLIGHT_INDEX:
                        return {
                            text: state.text,
                            firm: state.firm,
                            students: state.students,
                            isWaitingForStudents: false,
                            highlightIndex: Math.max(state.highlightIndex + action.amount, -1)
                        };
                    case actions_2.UPDATE_TEXT:
                        return {
                            text: action.text,
                            firm: state.firm,
                            students: [],
                            isWaitingForStudents: false,
                            highlightIndex: -1
                        };
                    case actions_2.SELECT_FIRM:
                        return {
                            text: action.firm.name,
                            firm: action.firm,
                            students: [],
                            highlightIndex: -1,
                            isWaitingForStudents: true
                        };
                    case actions_2.RECEIVE_STUDENTS:
                        return {
                            text: state.text,
                            firm: state.firm,
                            students: action.students,
                            isWaitingForStudents: false,
                            highlightIndex: state.highlightIndex
                        };
                    default:
                        return state;
                }
            };
            store = redux_1.applyMiddleware(redux_thunk_1["default"])(redux_1.createStore)(reducer);
            window.addEventListener("keydown", function (event) {
                if (event.key === "ArrowDown") {
                    store.dispatch(actions_2.moveHighlightIndex(1));
                    event.preventDefault();
                    event.stopPropagation();
                }
                else if (event.key === "ArrowUp") {
                    store.dispatch(actions_2.moveHighlightIndex(-1));
                    event.preventDefault();
                    event.stopPropagation();
                }
                else if (event.key === "Enter") {
                    var state = store.getState();
                    if (state.firm === undefined || state.text !== state.firm.name) {
                        var action = actions_2.selectFirm(get_autocompletes_2["default"](firms, state.text)[state.highlightIndex]);
                        store.dispatch(action);
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    else {
                        window.location.href = "mailto:" + state.students[state.highlightIndex].email;
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
            });
            exports_8("default",store);
        }
    }
});
System.register("root", ["react-redux", "react", "hero", "search", "results", "store"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var react_redux_3, React, hero_1, search_1, results_1, store_1;
    var App;
    return {
        setters:[
            function (react_redux_3_1) {
                react_redux_3 = react_redux_3_1;
            },
            function (React_5) {
                React = React_5;
            },
            function (hero_1_1) {
                hero_1 = hero_1_1;
            },
            function (search_1_1) {
                search_1 = search_1_1;
            },
            function (results_1_1) {
                results_1 = results_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            }],
        execute: function() {
            App = (function (_super) {
                __extends(App, _super);
                function App() {
                    _super.apply(this, arguments);
                }
                App.prototype.render = function () {
                    return (React.createElement(react_redux_3.Provider, {store: store_1["default"]}, 
                        React.createElement("main", null, 
                            React.createElement(hero_1["default"], null), 
                            React.createElement(search_1["default"], null), 
                            React.createElement(results_1["default"], null))
                    ));
                };
                return App;
            }(React.Component));
            exports_9("default", App);
        }
    }
});
System.register("main", ["react", "react-dom", "root"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var React, ReactDOM, root_1;
    return {
        setters:[
            function (React_6) {
                React = React_6;
            },
            function (ReactDOM_1) {
                ReactDOM = ReactDOM_1;
            },
            function (root_1_1) {
                root_1 = root_1_1;
            }],
        execute: function() {
            ReactDOM.render(React.createElement(root_1["default"]), document.getElementById("react-container"));
        }
    }
});
