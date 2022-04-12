import React from "react";
import axios from "axios";
import './bootstrap/css/bootstrap.min.css';
import UsersList from "./components/User";
import Footer from "./components/Footer";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ToDoList from "./components/Todo";
import {ProjectDetail, ProjectList} from "./components/Project";
import AuthForm from "./components/Auth";
import NavMenu from "./components/Menu";
import ProjectCreateForm from "./components/ProjectCreate";
import TodoCreate from "./components/TodoCreate";
import Search from "./components/Search";
import SearchProjects from "./components/Search";


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
            // console.log(response)
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
            // console.log(response.data)
            this.setState({users: response.data})
        }).catch(error => console.log(error))

        axios.get(fullUrl('projects/'), {headers}).then(response => {
            // console.log(response.data)
            this.setState({projects: response.data})
        }).catch(error => console.log(error))

        axios.get(fullUrl('todos/'), {headers}).then(response => {
            // console.log(response.data)
            this.setState({todos: response.data})
        }).catch(error => console.log(error))
    }


    deleteProject(id) {
        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.getData()
            })
            .catch(error => {
                console.log(error)
                this.setState({projects: []})
            })
    }

    createProject(project_name, users, repository_link) {

        const headers = this.getHeaders()
        const projectData = {projectName: project_name, users: [users], repositoryLink: repository_link}
        axios.post('http://127.0.0.1:8000/api/projects/', projectData, {headers}).then(
            response => {
                this.getData()
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    deleteToDos(id) {
        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
            .then(response => {
                this.getData()
            })
            .catch(error => {
                console.log(error)
                this.setState({todos: []})
            })
    }

    createTodo(project, content_creator, description) {
        const headers = this.getHeaders()
        const projectData = {project: project, content_creator: content_creator, description: description}
        axios.post('http://127.0.0.1:8000/api/todos/', projectData, {headers}).then(
            response => {
                this.getData()
            }
        ).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })

    }

    componentDidMount() {
        const username = localStorage.getItem('login')
        if ((username !== '') && (username != null)) {
            this.setState({'auth': {username: username, is_login: true}}, () => this.getData())
        }
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        // console.log(this.state.auth)
        if (this.state.auth.is_login) {
            const token = localStorage.getItem('access')
            headers['Authorization'] = 'Bearer  ' + token
        }

        return headers
    }

    getProject(id) {

        const headers = this.getHeaders()
        axios.get(fullUrl(`/api/projects/${id}`), {headers})
            .then(response => {
                this.setState({project: response.data})
            }).catch(error => console.log(error))
    }

    projectsFilter(filter) {
        const headers = this.getHeaders();
        axios.get(fullUrl('projects/' + '?name=' + filter), {headers})
            .then(response => {
                this.setState({projects: response.data});
                console.log('filtering ===>', this.state.projects);
            })
            .catch(error => {
                console.log(error)
                this.setState({projects: []})
            })
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
                                <ProjectList items={this.state.projects}
                                             deleteProject={(id) => this.deleteProject(id)}
                                             projectsFilter={(filter) => this.projectsFilter(filter)}/>
                            </Route>

                            <Route exact path='/projects/create/'>
                                <ProjectCreateForm project_name={this.state.project_name}
                                                   createProject={(project_name, user, repository_link) => this.createProject(project_name, user, repository_link)}/>
                            </Route>

                            <Route exact path='/projects/search/'>
                               <SearchProjects >w</SearchProjects>
                            </Route>


                            <Route exact path='/todos'>
                                <ToDoList items={this.state.todos}
                                          deleteToDos={(id) => this.deleteToDos(id)}/>
                            </Route>
                            <Route exact path='/todos/create/'>
                                <TodoCreate project={this.state.project}
                                            createTodo={(project, content_creator, description) => this.createTodo(project, content_creator, description)}/>
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