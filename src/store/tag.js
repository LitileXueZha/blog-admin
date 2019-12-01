import fetch from '../utils/request';

const GET_TAG_LIST = 'GET_TAG_LIST';
const ADD_TAG = 'ADD_TAG';
const UPDATE_TAG = 'UPDATE_TAG';
const initialState = {
    total: 0,
    items: [],
};

export function getTagList(params) {
    return (dispatch) => fetch('/tags', { params }).then((res) => dispatch({
        type: GET_TAG_LIST,
        payload: res,
    }));
}

export function addTag(body) {
    return (dispatch) => fetch('/tags', {
        method: 'POST',
        body,
    }).then((res) => dispatch({
        type: ADD_TAG,
        payload: res,
    }));
}

export function updateTag(id, body) {
    return (dispatch) => fetch(`/tags/${id}`, {
        method: 'PUT',
        body,
    }).then((res) => dispatch({
        type: UPDATE_TAG,
        payload: res,
    }));
}

export default function tag(state = initialState, action) {
    switch (action.type) {
        case GET_TAG_LIST:
            return { ...state, ...action.payload };
        case ADD_TAG:
            return {
                ...state,
                total: state.total + 1,
                items: [action.payload, ...state.items],
            };
        case UPDATE_TAG: {
            const items = state.items.map((val) => {
                if (val.id === action.payload.id) {
                    return action.payload;
                }

                return val;
            });

            return { ...state, items };
        }
        default:
            return state;
    }
}
