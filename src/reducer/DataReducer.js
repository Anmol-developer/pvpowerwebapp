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
    dataFormat:  ['Date', 'PV Power (kW)']
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

        case 'SET_DATATYPE':
            return { ...state, dataType: action.payload, dataFormat: (action.payload === 'pv__data' ? ['Date', 'PV Power (kW)'] : ['Date', 'PV Power (kW)', 'Solar Irradiation', 'Ambient Temperature', 'Wind Speed', 'Relative Humidity', 'Cloud Cover', 'Rainfall']) };

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