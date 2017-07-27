let reduxThunk = function(_ref) {
  var dispatch = _ref.dispatch;
  var getState = _ref.getState;
  return function (next) {
    return function (action) {
      return typeof action === "function" ? action(dispatch, getState) : next(action);
    };
  };
};
export default reduxThunk
