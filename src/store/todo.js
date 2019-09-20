const ADD_TODO = 'ADD_TODO';

export const addTodo = (text) => {
    return {
        type: ADD_TODO,
        text,
    };
}

export const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                { text: action.text }
            ];
        default:
            return state;
    }
};
