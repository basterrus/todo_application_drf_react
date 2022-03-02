import React from 'react'
import {Link, useParams} from "react-router-dom";


const ProjectListItem = ({item}) => {
    let link_to = `/project/${item.id}`
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.projectName}</td>
            <td>{item.repositoryLink}</td>
            <td><Link to={link_to}>detail</Link></td>
        </tr>
    )
}

const ProjectList = ({items}) => {
    return (
        <table className="table">

            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Repository</th>
                <th>detail</th>
            </tr>
            {items.map((item) => <ProjectListItem item={item} />)}
        </table>
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
    let { id } = useParams();
    getProjectId(id)
    let users = item.users ? item.users : []
    console.log(id)
    return (
        <div>
            <h1>{item.projectName}</h1>
            Repository: <a href={item.repositoryLink}>{item.repositoryLink}</a>
            <p></p>
            Users:
            <ol>
            {users.map((user) => <ProjectUserItem item={user} />)}
            </ol>
        </div>
    )
}

export {ProjectDetail, ProjectList}