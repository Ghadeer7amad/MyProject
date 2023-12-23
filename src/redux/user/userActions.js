import {
  SUCCESS_LOGIN,
  ADD_SALON,
  INC_NOTIFICATION,
  SET_IS_PROVIDER,
  EDIT_USER,
} from './userActionTypes';

export const setIsProvider = isProvider => {
  return {
    type: SET_IS_PROVIDER,
    payload: isProvider,
  };
};


export const storeCurrentUser = userData => {
  return {
    type: SUCCESS_LOGIN,
    payload: userData,
  };
};

export const editCurrentUser = userData => {
  return {
    type: EDIT_USER,
    payload: userData,
  };
};

export const storeUsedSalon = salonData => {
  return {
    type: ADD_SALON,
    payload: salonData,
  };
};

export const incNotifications = () => {
  return {
    type: INC_NOTIFICATION,
  };
};





