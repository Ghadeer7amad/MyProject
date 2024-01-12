import {
  SUCCESS_LOGIN,
  ADD_SALON,
  INC_NOTIFICATION,
  SET_IS_PROVIDER,
  EDIT_USER,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,// New action 
  ADD_TO_CART
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
  }};

  export const addToFavorites = product => {
    return {
      type: ADD_TO_FAVORITES,
      payload: product,
    };
  };

  export const removeFromFavorites = (productId) => {
    console.log('Removing product with ID:', productId);
  
    return {
      type: REMOVE_FROM_FAVORITES,
      payload: productId,
    };
  };

  export const addToCart = (product) => {
    return {
      type: ADD_TO_CART,
      payload: product,
    };
  };

