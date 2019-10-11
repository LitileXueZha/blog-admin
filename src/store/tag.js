import fetch from '../utils/request';

const GET_TAG_LIST = 'GET_TAG_LIST';
const ADD_TAG = 'ADD_TAG';
const initialState = {
    total: 0,
    items: [],
};

export function getTagList(params) {
    return (dispatch) => fetch('/tags', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer tao',
        },
        params,
    }).then((res) => dispatch({
        type: GET_TAG_LIST,
        payload: res,
    }));
}

export function addTag(data) {
    return (dispatch) => fetch('/tags', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer tao',
        },
        body: data,
    }).then((res) => dispatch({
        type: ADD_TAG,
        payload: res,
    }));
}

export function tag(state = initialState, action) {
    switch (action.type) {
        case GET_TAG_LIST:
            return { ...state, ...action.payload };
        case ADD_TAG:
            return {
                ...state,
                total: state.total + 1,
                items: [action.payload, ...state.items],
            };
        default:
            return state;
    }
}
