const InitialState = {
    position: [ 28.7041, 77.1025]
}

const reducer = (state,action)=>{
    switch (action.type) {
        case "SET_POSITION":
            console.log(action.payload)
            return { ...state, position: [...action.payload] };
    
        default:
            return state;
    }    
}

export {reducer,InitialState}