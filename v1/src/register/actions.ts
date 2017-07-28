export const UPDATE_FIRM_NAME = 'alawmni/register/UPDATE_FIRM_NAME';
export const updateFirmName = (text: string)=>{
  return {
    type: UPDATE_FIRM_NAME,
    text
  };
}

export const SELECT_FIRM = 'alawmni/register/SELECT_FIRM';
export const selectFirm = (firm: any)=>{
  return (dispatch, getState)=>{
    dispatch({
      type: SELECT_FIRM,
      firm
    });
  };
}

export const UPDATE_NAME = 'alawmni/register/UPDATE_NAME';
export const updateName = (text: string)=>{
  return {
    type: UPDATE_NAME,
    text
  };
}

export const UPDATE_EMAIL = 'alawmni/register/UPDATE_EMAIL';
export const updateEmail = (text: string)=>{
  return {
    type: UPDATE_EMAIL,
    text
  };
}

export const MOVE_HIGHLIGHT_INDEX = 'alawmni/register/MOVE_HIGHLIGHT_INDEX';
export const moveHighlightIndex = (amount: number)=>{
  return {
    type: MOVE_HIGHLIGHT_INDEX,
    amount
  };
}