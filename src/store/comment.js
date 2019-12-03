import fetch from '../utils/request';

const GET_COMMENT_LIST = 'GET_COMMENT_LIST';
const initialState = {
    total: 0,
    items: [],
};

export function getCommentList(params) {
    return (dispatch) => fetch('/comments', {
        params,
    }).then((res) => dispatch({
        type: GET_COMMENT_LIST,
        payload: res,
    }));
}

export default function comment(state = initialState, action) {
    switch (action.type) {
        case GET_COMMENT_LIST:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
