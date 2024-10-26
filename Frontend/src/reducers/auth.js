import { authConstants } from "../actions/constants";
const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        authenticate: true,
        user: action.payload.user,
        token: action.payload.token,
      };

    case authConstants.SIGNUP_SUCCESS: {
      console.log("SIGNUP SUCCESS");
      return {
        ...state,
        authenticate: true,
      };
    }
    default:
      return state;
    
    
  }
};
