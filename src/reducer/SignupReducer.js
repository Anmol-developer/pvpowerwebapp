const initialState = {
  username: "",
  password: "",
  email: "",
  confirmPassword: "",
  agreement: false,
  passwordEqual: "",
  showVerifyModal: false,
  verifyCode: "",
  showAgreement: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VERCODE":
      return { ...state, verifyCode: action.payload };

    case "SET_PASSEQUAL":
      return { ...state, passwordEqual: action.payload };

    case "SET_SHOWVERMODAL":
      return { ...state, showVerifyModal: action.payload };

    case "SET_AGREEMENT":
      return { ...state, agreement: action.payload };

    case "SET_CPASS":
      return { ...state, confirmPassword: action.payload };

    case "SET_USERNAME":
      return { ...state, username: action.payload };

    case "SET_PASS":
      return { ...state, password: action.payload };

    case "SET_EMAIL":
      return { ...state, email: action.payload };

    case "SET_SHOWAGREE":
      return {...state, showAgreement:action.payload};

    default:
      return state;
  }
};

export { initialState, reducer };
