import React, {FC, useEffect, useState} from 'react';
import {ITodo} from "../types/types";
import axios from "axios";
import List from "./List";
import TodoItem from "./TodoItem";
import {useNavigate} from "react-router-dom";

const TodosPage: FC = () => {
    const history = useNavigate()
    const [todos, setTodos] = useState<ITodo[]>([])
    useEffect(() => {
        fetchTodos()
    }, [])

    async function fetchTodos() {
        try {
            const response = await axios.get<ITodo[]>("https://jsonplaceholder.typicode.com/todos?_limit=10")
            setTodos(response.data)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <List
            items={todos}
            renderItems={(todo: ITodo) => <TodoItem onClick={() => history("/todos/" + todo.id)}
                                                    todo={todo}
                                                    key={todo.id}/>}
        />
    );
};

export default TodosPage;