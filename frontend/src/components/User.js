import React from "react";
import {Table} from "react-bootstrap";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UsersList = ({users}) => {
    return (
        <Table className="container mt-5 col-4">
            <thead>
            <th>Пользователь</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Email</th>

            {users.map((user) => <UserItem user={user}/>)}
            </thead>
        </Table>
    )
}
export default UsersList;