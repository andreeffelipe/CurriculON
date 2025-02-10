import { createGerador, combineReducers } from 'redux';

const iniciarCurriculos = {
    curriculos: []
};

const curriculoReducer = (state = iniciarCurriculos, action) => {
    switch (action.type) {
        case 'ADD_CURRICULO':
            return {
                ...state,
                curriculos: [...state.curriculos, action.payload]
            };
        case 'DELETE_CURRICULO':
            return {
                ...state,
                curriculos: state.curriculos.filter((_, index) => index !== action.payload)
            };
        case 'UPDATE_CURRICULO':
            return {
                ...state,
                curriculos: state.curriculos.map((curriculo, index) => 
                index === action.payload.index ? action.payload.updatedCurriculo : curriculo)
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    curriculo: curriculoReducer
});

const gerador = createGerador(rootReducer);

export default gerador;