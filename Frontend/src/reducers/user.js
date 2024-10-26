import { authConstants } from "../actions/constants";
import { userConstants } from "../actions/constants";
const initState = {
  error: null,
  message: "",
  loading: false,
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_USER_ADDRESS_REQUEST:
      return  {
        ...state,
        loading: true,
      };
    case userConstants.GET_USER_ADDRESS_SUCCESS:
      return  {
        ...state,
        add: action.payload.address,
        loading: false,
      };
    case userConstants.GET_USER_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case userConstants.ADD_USER_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
      case userConstants.ADD_USER_ADDRESS_SUCCESS:
      return {
        ...state,
        address: action.payload.address,
        loading: false,
      };
    case userConstants.ADD_USER_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      case authConstants.LOGIN_SUCCESS:
      console.log(action.payload);
      return{
        ...state,
        loading: false,
        message: action.payload,
      };
      case userConstants.GET_USER_ORDER_REQUEST:
        return{
          ...state,
          orderFetching: true,
        };
      case userConstants.GET_USER_ORDER_SUCCESS:
        return{
          ...state,
          orders: action.payload.orders,
          orderFetching: false,
        };
      case userConstants.GET_USER_ORDER_FAILURE:
        return {
          ...state,
          error: action.payload.error,
          orderFetching: false,
      };
   
      
      default:
        return state;
  }

};

export default userReducer; 