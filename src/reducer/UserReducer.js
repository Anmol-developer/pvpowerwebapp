const initialState = {
  provider: null,
  profile: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PROVIDER":
      return { ...state, provider: action.payload };

    case "SET_PROFILE":
      return { ...state, profile: action.payload };

    default:
      return state;
  }
};

export { reducer, initialState };
