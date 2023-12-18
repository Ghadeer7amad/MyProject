import {
  SUCCESS_LOGIN,
  ADD_SALON,
  INC_NOTIFICATION,  
} from './userActionTypes';

const initialState = {
  isLoggedIn: false,
  userData: {numofNotifications: 0 },
  usedSalonData: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {


    case SUCCESS_LOGIN:
      return {...state, isLoggedIn: true, userData: action.payload};

    case ADD_SALON:
      return {...state, usedSalonData: action.payload};

    case INC_NOTIFICATION:
      return {
        ...state,
        userData: {
          ...state.userData,
          numofNotifications: state.userData.numofNotifications + 1,
        },
      };
      
    default:
      return state;
  }
};

export default userReducer;
