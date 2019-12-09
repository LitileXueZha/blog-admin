import fetch from '../utils/request';

const GET_COMMENT_LIST = 'GET_COMMENT_LIST';
const DELETE_COMMENT = 'DELETE_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const initialState = {
    total: 0,
    items: [],
};

export function getCommentList(params) {
    return (dispatch) => fetch('/comments/all', {
        params,
    }).then((res) => dispatch({
        type: GET_COMMENT_LIST,
        payload: res,
    }));
}

export function deleteComment(id) {
    return (dispatch) => fetch(`/comments/${id}`, {
        method: 'DELETE',
    }).then(() => dispatch({
        type: DELETE_COMMENT,
        payload: id,
    }));
}

export function addComment(body) {
    return (dispatch) => fetch('/comments', {
        method: 'POST',
        body,
    }).then((res) => dispatch({
        type: ADD_COMMENT,
        payload: res,
    }));
}

export default function comment(state = initialState, action) {
    switch (action.type) {
        case GET_COMMENT_LIST:
            return { ...state, ...action.payload };
        case DELETE_COMMENT: {
            const items = state.items.filter((val) => val.id !== action.payload);
            const total = state.total - 1;

            return {
                ...state,
                total,
                items,
            };
        }
        case ADD_COMMENT:
            return {
                ...state,
                total: state.total + 1,
                items: [action.payload, ...state.items],
            };
        default:
            return state;
    }
}
