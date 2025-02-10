const ToDoData = (props) => {
    //console.log(props);
    const { todoList, deleteTodo } = props;

    const handleClick = (id) => {
        //console.log(id);
        deleteTodo(id);
    }

    return (
        <div className='todo-data'>
            {todoList.map((item, index) => {
                // console.log('Day la item', item);
                // console.log('Day la index', index);
                return (
                    <div className={`todo-item`} key={item.id}>
                        <div>{item.name}</div>
                        <button onClick={() => handleClick(item.id)} >Delete</button>
                    </div>
                )
            })}
        </div>
    )
}
export default ToDoData; // Export ToDoData