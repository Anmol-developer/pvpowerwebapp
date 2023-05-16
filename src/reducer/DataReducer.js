const InitialState = {
    data: []
}

const reducer = (state, action)=>{
    switch (action.type) {
        case 'SET_DATA':
            return {...state, data: [...action.payload]}
    
        default:
            return state;
    }
}

export {reducer,InitialState}