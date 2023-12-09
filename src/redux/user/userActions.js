import {
  SUCCESS_LOGIN,
  ADD_SALON,
  INC_NOTIFICATION,
  SET_IS_PROVIDER,
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


