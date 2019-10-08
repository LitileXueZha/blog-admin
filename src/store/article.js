import fetch from '../utils/request';

const GET_ARTICLE_LIST = 'GET_ARTICLE_LIST';
const initialState = {
    total: 0,
    items: [],
    current: {},
};

export function getArticleList(params) {
    return (dispatch) => fetch('/articles', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer tao',
        },
        params,
    }).then((res) => dispatch({
        type: GET_ARTICLE_LIST,
        payload: res,
    }));
}

export function article(state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLE_LIST:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
