const initialState = {
  randomforest: [],
  knn: [],
  lgbm: [],
  svr: [],
  dataDate: null,
  startDate: null,
  CalcModel: ["randomforest"],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_RANDOMFOREST":
      return { ...state, randomforest: [...action.payload] };

    case "SET_KNN":
      return { ...state, knn: [...action.payload] };

    case "SET_LGBM":
      return { ...state, lgbm: [...action.payload] };

    case "SET_SVR":
      return { ...state, svr: [...action.payload] };

    case "SET_CALCMODEL":
      return { ...state, CalcModel: [...action.payload] };

    case "SET_STARTDATE":
      return { ...state, startDate: action.payload };

    case "SET_DATADATE":
      return { ...state, dataDate: action.payload };

    case "SET_EMPTY":
      return { ...state, randomforest: [], knn: [], lgbm: [], svr: [] };

    case 'SET_FILL':
        return {...state, randomforest:[...action.payload.randomforest], knn:[...action.payload.knn], lgbm: [...action.payload.lgbm], svr:[...action.payload.svr]}

    default:
      return state;
  }
};

export { reducer, initialState };
