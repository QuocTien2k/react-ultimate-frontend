import './todo.css'
import TodoNew from './TodoNew'
import TodoData from './TodoData'
import reactLogo from '../../assets/react.svg'
import { useState } from 'react'


const TodoApp = () => {

    const [todoList, setTodoList] = useState([]);

    const addNewTodo = (name) => {
        const newTodo = {
            id: randomFromInterval(1, 1000), // Tạo một id ngẫu nhiên
            name: name
        }
        setTodoList([...todoList, newTodo]); // Thêm phần tử mới vào mảng
    };

    const deleteTodo = (id) => {
        // Lọc ra các phần tử có id khác với id cần xóa
        const newTodo = todoList.filter((item) => item.id !== id);
        setTodoList(newTodo); // Cập nhật lại mảng todoList
    }

    const randomFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min); // Trả về một số ngẫu nhiên trong khoảng từ min đến max
    }

    return (
        <div className="todo-container">
            <div className="todo-title">Todo List</div>
            <TodoNew addNewTodo={addNewTodo} />
            {todoList.length > 0 ?
                <TodoData todoList={todoList} deleteTodo={deleteTodo} />
                :
                <div className="todo-image">
                    <img src={reactLogo} className="logo" />
                </div>
            }
        </div>
    )
}

export default TodoApp;