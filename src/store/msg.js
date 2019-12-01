import fetch from '../utils/request';

const GET_MSG_LIST = 'GET_MSG_LIST';
const UPDATE_MSG = 'UPDATE_MSG';
const READ_MSG = 'READ_MSG';
const initialState = {
    total: 0,
    totalUnread: 0,
    items: [],
    unreadItems: [],
    readItems: [],
};

export function getMsgList(params) {
    return (dispatch) => fetch('/msg', { params }).then((res) => dispatch({
        type: GET_MSG_LIST,
        payload: res,
    }));
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

export default function msg(state = initialState, action) {
    switch (action.type) {
        case GET_MSG_LIST: {
            let totalUnread = 0;
            const unreadItems = [];
            const readItems = [];

            // 分开已读、未读列表
            action.payload.items.forEach((item, index) => {
                // 用于排序的字段。更快地找到两个列表中单个留言的位置
                item.__SORT__ = index;
                if (item.read) {
                    readItems.push(item);
                } else {
                    // 未读
                    totalUnread += 1;
                    unreadItems.push(item);
                }
            });

            return {
                ...state,
                ...action.payload,
                totalUnread,
                unreadItems,
                readItems,
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
        default:
            return state;
    }
}
