import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import UsersList from "./components/User";
import Footer from "./components/Footer";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ToDoList from "./components/Todo";
import {ProjectDetail, ProjectList} from "./components/Project";
import AuthForm from "./components/Auth";
import NavMenu from "./components/Menu";


const URL = 'http://127.0.0.1:8000/api/'
const fullUrl = (url) => `${URL}${url}`


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: [
                {name: 'Users', href: '/'},
                {name: 'Projects', href: '/projects'},
                {name: "ToDos", href: '/todos'}
            ],

            'users': [],
            'projects': [],
            'todos': [],
            'project': [],
            auth: {username: '', is_login: false}
        };
    }

    login(username, password) {
        axios.post(fullUrl('token/'), {username: username, password: password}).then(response => {
            console.log(response)
            const result = response.data
            const access = result.access
            const refresh = result.refresh
            localStorage.setItem('login', username)
            localStorage.setItem('access', access)
            localStorage.setItem('refresh', refresh)
            this.setState({'auth': {username: username, is_login: true}})
            this.getData()
        }).catch(error => {
            if (error.response.status === 401) {
                alert('Неверный логин или пароль')
            } else {
                console.log(error)
            }
        })
    }

    logout() {
        localStorage.setItem('login', '')
        localStorage.setItem('access', '')
        localStorage.setItem('refresh', '')
        this.setState({'auth': {username: '', is_login: false}})
    }

    getData() {

        let headers = {
            'Content-Type': 'application/json'
        }

        if (this.state.auth.is_login) {
            const token = localStorage.getItem('access')
            headers['Authorization'] = 'Bearer  ' + token
        }

        axios.get(fullUrl('users/'), {headers}).then(response => {
            console.log(response.data)
            this.setState({users: response.data})
        }).catch(error => console.log(error))

        axios.get(fullUrl('projects/'), {headers}).then(response => {
            console.log(response.data)
            this.setState({projects: response.data})
        }).catch(error => console.log(error))

        axios.get(fullUrl('todos/'), {headers}).then(response => {
            console.log(response.data)
            this.setState({todos: response.data})
        }).catch(error => console.log(error))
    }

    componentDidMount() {
        const username = localStorage.getItem('login')
        if ((username !== '') && (username != null)) {
            this.setState({'auth': {username: username, is_login: true}}, () => this.getData())
        }
    }

    getProject(id) {

        let headers = {
            'Content-Type': 'application/json'
        }
        console.log(this.state.auth)
        if (this.state.auth.is_login) {
            const token = localStorage.getItem('access')
            headers['Authorization'] = 'Bearer  ' + token
        }

        axios.get(fullUrl(`/api/projects/${id}`), {headers})
            .then(response => {
                this.setState({project: response.data})
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <BrowserRouter>
                <header>
                    <NavMenu menuItems={this.state.menuItems} auth={this.state.auth} logout={() => this.logout()}/>
                </header>
                <main role="main">
                    <div className="container">
                        <Switch>
                            <Route exact path='/'>
                                <UsersList users={this.state.users}/>
                            </Route>

                            <Route exact path='/projects'>
                                <ProjectList items={this.state.projects}/>
                            </Route>

                            <Route exact path='/todos'>
                                <ToDoList items={this.state.todos}/>
                            </Route>
                            <Route exact path='/login'>
                                <AuthForm login={(username, password) => this.login(username, password)}/>
                            </Route>

                            <Route path="/project/:id"
                                   children={<ProjectDetail getProjectId={(id) => this.getProjectId(id)}
                                                            item={this.state.project}/>}/>
                        </Switch>
                    </div>
                </main>
                <Footer/>
            </BrowserRouter>


        )
    }

}

export default App;