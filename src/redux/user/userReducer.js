import {
  SUCCESS_LOGIN,
  ADD_SALON,
  INC_NOTIFICATION,
  TOGGLE_LIKE,
  EDIT_USER,
} from './userActionTypes';

const initialState = {
  isLoggedIn: false,
  userData: {
    numofNotifications: 0,
    isLiked: false, // حالة اللايك
  },
  usedSalonData: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_LOGIN:
      return { ...state, isLoggedIn: true, userData: action.payload };

    case ADD_SALON:
      return { ...state, usedSalonData: action.payload };

    case INC_NOTIFICATION:
      return {
        ...state,
        userData: {
          ...state.userData,
          numofNotifications: state.userData.numofNotifications + 1,
        },
      };

      case EDIT_USER:
        return{
          ...state,
          userData: {
            ...state.userData,
            ...action.payload,
          }

        };

    case TOGGLE_LIKE:
      return {
        ...state,
        userData: {
          ...state.userData,
          isLiked: !state.userData.isLiked, // يعكس حالة اللايك عند الضغط على الزر
        },
      };

    default:
      return state;
  }
};

export default userReducer;



