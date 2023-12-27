import {
  SUCCESS_LOGIN,
  ADD_SALON,
  INC_NOTIFICATION,
  TOGGLE_LIKE,
  EDIT_USER,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES
} from './userActionTypes';

const initialState = {
  isLoggedIn: false,
  userData: {
    numofNotifications: 0,
    isLiked: false, // حالة اللايك
  },
  usedSalonData: '',
   favorites: [],
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

      case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
      
      case REMOVE_FROM_FAVORITES:
        return {
          ...state,
          favorites: state.favorites.filter(product => product._id !== action.payload),
        };

    default:
      return state;
  }
};

export default userReducer;



