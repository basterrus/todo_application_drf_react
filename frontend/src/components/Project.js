import React from 'react'
import {Link, useParams} from "react-router-dom";


const ProjectListItem = ({item, deleteProject}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.projectName}</td>
            <td>{item.repositoryLink}</td>
            <td><Link to={'/project/${item.id}'}>Подробнее</Link></td>

            <td>
                <button className="btn btn-danger text-dark"
                        type='button'
                        onClick={() => deleteProject(item.id)}>Удалить
                </button>
            </td>
        </tr>
    )
}

const ProjectList = ({items, deleteProject, filteredProject}) => {
    return (

        <div>
            <Link className="btn btn-primary mt-2 mb-2"
                  to={'/projects/create'}>Создать</Link>  
            <Link className="btn btn-primary mt-2 mb-2"
                  to={'/projects/search'}>Поиск</Link>
            <table className="table">
                <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Ссылка на репозиторий</th>
                    <th>Подробнее</th>
                    <th></th>
                    <th></th>
                </tr>
                {items.map((item) => <ProjectListItem item={item}
                                                      deleteProject={deleteProject}/>)}
            </table>
        </div>
    )
}

const ProjectUserItem = ({item}) => {
    return (
        <li>
            {item.username} ({item.email})
        </li>
    )
}

const ProjectDetail = ({getProjectId, item}) => {
    let {id} = useParams();
    getProjectId(id)
    let users = item.users ? item.users : []
    console.log(id)
    return (
        <div>
            <h1>{item.projectName}</h1>
            Ссылка на репозиторий: <a href={item.repositoryLink}>{item.repositoryLink}</a>
            <p></p>
            Пользователь:
            <ol>
                {users.map((user) => <ProjectUserItem item={user}/>)}
            </ol>
        </div>
    )
}

export {ProjectDetail, ProjectList}