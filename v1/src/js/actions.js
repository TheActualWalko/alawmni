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
