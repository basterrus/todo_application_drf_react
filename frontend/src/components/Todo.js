import React from 'react'
import {Link} from "react-router-dom";


const ToDoListItem = ({item, deleteToDos}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.description}</td>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
            <td>{item.project}</td>
            <td>{item.contentCreator}</td>
            <td>
                <button className="btn btn-danger text-dark"
                        type='button'
                        onClick={() => deleteToDos(item.id)}
                >Удалить
                </button>
            </td>
        </tr>
    )
}

const ToDoList = ({items, deleteToDos}) => {
    return (
        <div>
            <Link className="btn btn-primary mt-2 mb-2" to={'/todos/create'}>Создать</Link>
            <table className="table">
                <tr>
                    <th>#</th>
                    <th>Описание</th>
                    <th>Создана</th>
                    <th>Обновлена</th>
                    <th>Проект</th>
                    <th>Создатель</th>
                    <th></th>
                    <th></th>
                </tr>

                {items.map((item) => <ToDoListItem item={item} deleteToDos={deleteToDos}/>)}
            </table>
        </div>
    )
}

export default ToDoList