import fetch from '../utils/request';

const GET_MSG_LIST = 'GET_MSG_LIST';
const LOAD_MORE_MSG = 'LOAD_MORE_MSG';
const UPDATE_MSG = 'UPDATE_MSG';
const READ_MSG = 'READ_MSG';
const DELETE_MSG = 'DELETE_MSG';
const initialState = {
    total: 0,
    totalUnread: 0,
    items: [],
    unreadItems: [],
    readItems: [],
    page: 1,
};

export function getMsgList(params) {
    return (dispatch) => fetch('/msg', { params }).then((res) => dispatch({
        type: GET_MSG_LIST,
        payload: res,
    }));
}

export function loadMoreMsg(params) {
    return (dispatch, getState) => {
        const { msg: { page } } = getState();

        return fetch('/msg', {
            params: {
                ...params,
                page: page + 1,
            },
        }).then((res) => dispatch({
            type: LOAD_MORE_MSG,
            payload: res,
        }));
    };
}

export function updateMsg(id, body) {
    return (dispatch) => fetch(`/msg/${id}`, {
        method: 'PUT',
        body,
    }).then((res) => dispatch({
        type: UPDATE_MSG,
        payload: res,
    }));
}

export function readMsg(id) {
    return (dispatch) => fetch(`/msg/${id}`, {
        method: 'PUT',
        body: { read: true },
    }).then((res) => dispatch({
        type: READ_MSG,
        payload: res,
    }));
}

export function deleteMsg(id) {
    return (dispatch) => fetch(`/msg/${id}`, {
        method: 'DELETE',
    }).then(() => dispatch({
        type: DELETE_MSG,
        payload: id,
    }));
}

/**
 * 把留言列表分开为未读、已读两个列表
 *
 * @param {Object} state 旧状态
 * @param {Array} items 后端返回新的留言列表
 * @param {String} action redux 中的动作
 * @return {Object} 新状态
 */
function splitMsg(state, items, action = 'GET_MSG_LIST') {
    let totalUnread = 0;
    let unreadItems = [];
    let readItems = [];
    let startIndex = 0;

    if (action === LOAD_MORE_MSG) {
        // 加载更多时
        totalUnread = state.totalUnread;
        unreadItems = [...state.unreadItems];
        readItems = [...state.readItems];
        startIndex = state.items.length;
    }

    // 分开已读、未读列表
    items.forEach((item, index) => {
        // 用于排序的字段。更快地找到两个列表中单个留言的位置
        item.__SORT__ = index + startIndex;
        if (item.read) {
            readItems.push(item);
        } else {
            // 未读
            totalUnread += 1;
            unreadItems.push(item);
        }
    });

    return { totalUnread, unreadItems, readItems };
}

export default function msg(state = initialState, action) {
    switch (action.type) {
        case GET_MSG_LIST: {
            const splitedMsg = splitMsg(state, action.payload.items, action.type);

            return {
                ...state,
                ...action.payload,
                ...splitedMsg,
                // 重置页数
                page: 1,
            };
        }
        case LOAD_MORE_MSG: {
            const splitedMsg = splitMsg(state, action.payload.items, action.type);

            return {
                ...state,
                ...action.payload,
                items: [...state.items, ...action.payload.items],
                ...splitedMsg,
                page: state.page + 1,
            };
        }
        case UPDATE_MSG: {
            const items = state.items.map((val) => {
                if (val.id === action.payload.id) {
                    return action.payload;
                }

                return val;
            });
            return { ...state, items };
        }
        case READ_MSG: {
            let itemsIndex;
            const readItems = [...state.readItems];
            const unreadItems = state.unreadItems.filter((val) => {
                if (val.id === action.payload.id) {
                    itemsIndex = val.__SORT__;
                    return false;
                }

                return true;
            });
            const index = readItems.findIndex((val) => itemsIndex < val.__SORT__);

            readItems.splice(index, 0, action.payload);

            return {
                ...state,
                totalUnread: state.totalUnread - 1,
                unreadItems,
                readItems,
            };
        }
        case DELETE_MSG: {
            const items = state.items.filter((val) => val.id !== action.payload);
            const readItems = state.readItems.filter((val) => val.id !== action.payload);
            return {
                ...state,
                total: state.total - 1,
                items,
                readItems,
            };
        }
        default:
            return state;
    }
}
