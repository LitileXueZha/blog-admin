import fetch from '../utils/request';

const GET_ARTICLE_LIST = 'GET_ARTICLE_LIST';
const GET_ARTICLE = 'GET_ARTICLE';
const ADD_ARTICLE = 'ADD_ARTICLE';
const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
const MOVE_ARTICLE_TO_TRASH = 'MOVE_ARTICLE_TO_TRASH';
const GET_ARTICLES_IN_TRASH = 'GET_ARTICLES_IN_TRASH';
const RESTORE_ARTICLE_FROM_TRASH = 'RESTORE_ARTICLE_FROM_TRASH';
const DELETE_ARTICLE = 'DELETE_ARTICLE';
const initialState = {
    total: 0,
    items: [],
    current: {},
};

export function getArticleList(params) {
    return (dispatch) => fetch('/articles', {
        method: 'GET',
        params,
    }).then((res) => dispatch({
        type: GET_ARTICLE_LIST,
        payload: res,
    }));
}

export function getArticle(id) {
    return (dispatch) => fetch(`/articles/${id}`)
        .then((res) => dispatch({
            type: GET_ARTICLE,
            payload: res,
        }));
}

export function addArticle(data) {
    return (dispatch) => fetch('/articles', {
        method: 'POST',
        body: data,
    }).then((res) => dispatch({
        type: ADD_ARTICLE,
        payload: res,
    }));
}

export function updateArticle(id, data) {
    return (dispatch) => fetch(`/articles/${id}`, {
        method: 'PUT',
        body: data,
    }).then((res) => dispatch({
        type: UPDATE_ARTICLE,
        payload: res,
    }));
}

export function moveArticleToTrash(id) {
    return (dispatch) => fetch(`/articles/${id}`, {
        method: 'PUT',
        body: { status: 3 },
    }).then(() => dispatch({
        type: MOVE_ARTICLE_TO_TRASH,
        payload: id,
    }));
}

export function getArticlesInTrash(params) {
    return (dispatch) => fetch('/articles/trash', { params })
        .then((res) => dispatch({
            type: GET_ARTICLES_IN_TRASH,
            payload: res,
        }));
}

export function deleteArticle(id) {
    return (dispatch) => fetch(`/articles/${id}`, {
        method: 'DELETE',
    }).then(() => dispatch({
        type: DELETE_ARTICLE,
        payload: id,
    }));
}

export function restoreArticleFromTrash(id) {
    return (dispatch) => fetch(`/articles/${id}`, {
        method: 'PUT',
        body: { status: 2 },
    }).then(() => dispatch({
        type: RESTORE_ARTICLE_FROM_TRASH,
        payload: id,
    }));
}

// reducer
export function article(state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLE_LIST:
        case GET_ARTICLES_IN_TRASH:
            return { ...state, ...action.payload };
        case GET_ARTICLE:
            return { ...state, current: action.payload };
        case UPDATE_ARTICLE: {
            const current = action.payload;
            const items = state.items.map((item) => {
                if (item.id === current.id) {
                    return current;
                }

                return item;
            });

            return {
                ...state,
                current,
                items,
            };
        }
        case MOVE_ARTICLE_TO_TRASH:
        case RESTORE_ARTICLE_FROM_TRASH:
        case DELETE_ARTICLE: {
            const items = state.items.filter((item) => item.id !== action.payload);
            const total = state.total - 1;

            return { ...state, items, total };
        }
        default:
            return state;
    }
}
