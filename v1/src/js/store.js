System.register("redux-thunk", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
            exports_1("default",reduxThunk);
        }
    }
});
System.register("actions", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var UPDATE_TEXT, updateText, SELECT_FIRM, selectFirm, RECEIVE_STUDENTS, receiveStudents, MOVE_HIGHLIGHT_INDEX, moveHighlightIndex;
    return {
        setters:[],
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
System.register("firms", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("get-autocompletes", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters:[],
        execute: function() {
            exports_4("default",function (data, text) { return data.filter(function (f) { return text != "" && f.toLowerCase().indexOf(text.toLowerCase()) >= 0; }); });
        }
    }
});
System.register("store", ["redux-thunk", "redux", "actions", "firms", "get-autocompletes"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var redux_thunk_1, redux_1, actions_1, firms, get_autocompletes_1;
    var reducer, store;
    return {
        setters:[
            function (redux_thunk_1_1) {
                redux_thunk_1 = redux_thunk_1_1;
            },
            function (redux_1_1) {
                redux_1 = redux_1_1;
            },
            function (actions_1_1) {
                actions_1 = actions_1_1;
            },
            function (firms_1) {
                firms = firms_1;
            },
            function (get_autocompletes_1_1) {
                get_autocompletes_1 = get_autocompletes_1_1;
            }],
        execute: function() {
            reducer = function (state, action) {
                if (state === void 0) { state = {
                    text: "",
                    firm: "",
                    highlightIndex: 0,
                    isWaitingForStudents: false,
                    students: []
                }; }
                switch (action.type) {
                    case actions_1.MOVE_HIGHLIGHT_INDEX:
                        return {
                            text: state.text,
                            firm: state.firm,
                            students: state.students,
                            isWaitingForStudents: false,
                            highlightIndex: Math.max(state.highlightIndex + action.amount, 0)
                        };
                    case actions_1.UPDATE_TEXT:
                        return {
                            text: action.text,
                            firm: state.firm,
                            students: [],
                            isWaitingForStudents: false,
                            highlightIndex: 0
                        };
                    case actions_1.SELECT_FIRM:
                        return {
                            text: action.firm,
                            firm: action.firm,
                            students: [],
                            highlightIndex: 0,
                            isWaitingForStudents: true
                        };
                    case actions_1.RECEIVE_STUDENTS:
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
                    store.dispatch(actions_1.moveHighlightIndex(1));
                    event.preventDefault();
                    event.stopPropagation();
                }
                else if (event.key === "ArrowUp") {
                    store.dispatch(actions_1.moveHighlightIndex(-1));
                    event.preventDefault();
                    event.stopPropagation();
                }
                else if (event.key === "Enter") {
                    var state = store.getState();
                    if (state.text !== state.firm) {
                        var action = actions_1.selectFirm(get_autocompletes_1["default"](firms, state.text)[state.highlightIndex]);
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
            exports_5("default",store);
        }
    }
});
