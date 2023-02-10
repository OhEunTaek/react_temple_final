import { combineReducers } from 'redux';

//action = {type: '고유문자값', payload: 변경할 데이터}
const youtubeReducer = (state = { youtube: [] }, action) => {
    switch (action.type) {
        case 'SET_YOUTUBE':
            return { ...state, youtube: action.payload };
        default:
            return state;
    }
};

const reducers = combineReducers({ youtubeReducer });
export default reducers;