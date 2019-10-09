import fetch from '../utils/request';

const GET_TAG_LIST = 'GET_TAG_LIST';
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

export function tag(state = initialState, action) {
    switch (action.type) {
        case GET_TAG_LIST:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
