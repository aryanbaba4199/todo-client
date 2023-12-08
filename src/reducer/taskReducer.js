function taskReducer(tasks, action) {
    console.log("taskreducer");
    switch (action.type) {
        case "ADD_TASK": {
            return [
                ...tasks,
                {
                    title: action.title,
                    description: action.description,
                    completed: false
                }
            ];
        }
        case "SET_TASK": {
            return action.payload;
        }
        case "REMOVE_TASK": {
            return tasks.filter((task, index) => index !== action.id);
        }
        case "MARK_DONE": {
            return tasks.map((task, index) => {
                if (index === action.id) {
                    return {
                        ...task,
                        completed: !task.completed
                    };
                }
                return task;
            });
        }
        case "EDIT_TASK": {
            return tasks.map((task, index) => {
                if (index === action.id) {
                    return {
                        ...task,
                        title: action.title,
                        completed: action.completed
                    };
                }
                return task;
            });
        }
        default: {
            throw Error("Unknown Action" + action.type);
        }
    }
}

export default taskReducer;
