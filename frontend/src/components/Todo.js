import React from 'react'


const ToDoListItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.description}</td>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
            <td>{item.project}</td>
            <td>{item.contentCreator}</td>
        </tr>
    )
}

const ToDoList = ({items}) => {
    return (
        <table className="table">
            <tr>
                <th>#</th>
                <th>Описание</th>
                <th>Создана</th>
                <th>Обновлена</th>
                <th>Проект</th>
                <th>Создатель</th>
            </tr>

            {items.map((item) => <ToDoListItem item={item}/>)}

        </table>
    )
}

export default ToDoList