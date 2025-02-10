import { useState } from "react";
const TodoNew = (props) => {

    const { addNewTodo } = props;

    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput(""); // Reset giá trị của input
    }

    const [valueInput, setValueInput] = useState("Tien");

    const handleOnChange = (name) => {
        //console.log(name);

        setValueInput(name); // Thay đổi giá trị của state
    }
    return (
        <div className='todo-new'>
            <input type="text" onChange={(event) => handleOnChange(event.target.value)} value={valueInput} />
            <button onClick={handleClick}>Add</button>
            <p>My name is {valueInput}</p>
        </div>
    )
}
export default TodoNew;
