const InitialState = {
    data: [],
    showModal: false,
    showSubmitModal: false,
    disabled: true,
    dataType: 'pv__data',
    selectedFile: null,
    address: '',
    isLoading: false,
    isFormat: true,
    value: 10,
    isIncrementing: false,
    dataFormat: 'pv__data'
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, data: [...action.payload] };

        case 'SET_DISABLED':
            return { ...state, disabled: action.payload };

        case 'SET_ADDRESS':
            return { ...state, address: action.payload };

        case 'SET_FILE':
            return { ...state, selectedFile: action.payload };

        case 'SET_FORMAT':
            return { ...state, isFormat: action.payload };

        case 'SET_VALUE':
            return { ...state, value: action.payload };

        case 'SET_INCREMENT':
            return { ...state, isIncrementing: action.payload };

        case 'SET_DATATYPE':
            return { ...state, dataType: action.payload };

        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };

        case 'SET_SHOWMODAL':
            return { ...state, showModal: action.payload };

        case 'SET_SUBMODAL':
            return { ...state, showSubmitModal: action.payload };
        
        case 'SET_INCVALUE':
            return {...state, value: state.value + 2};

        case 'SET_DATAFORMAT':
            return {...state, dataFormat: action.payload}

        default:
            return state;
    }
}

export { reducer, InitialState }