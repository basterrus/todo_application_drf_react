import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import UsersList from "./components/User";
import Footer from "./components/Footer";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ToDoList from "./components/Todo";
import {ProjectDetail, ProjectList} from "./components/Project";
import {Menu} from "./components/Menu";


const URL = 'http://127.0.0.1:8000/api/v1/'
const fullUrl = (url) => `${URL}${url}`

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuItems: [
                {name: 'Users', href: '/'},
                {name: 'Projects', href: '/projects'},
                {name: "ToDos", href: '/todos'},
            ],

            'users': [],
            'projects': [],
            'project': [],
            'todos': [],

        };

    }

    componentDidMount() {
        axios.get(fullUrl('users/')).then(response => {
            this.setState({users: response.data})
        }).catch(error => console.log(error))

        axios.get(fullUrl('projects/')).then(response => {
            this.setState({projects: response.data})
        }).catch(error => console.log(error))

        axios.get(fullUrl('todos/')).then(response => {
                this.setState({todos: response.data})
            }).catch(error => console.log(error))
    }

    getProjectId(id) {
        axios.get(fullUrl(`projects/${id}`)).then(response => {
            console.log(response.data)
            this.setState({project: response.data})
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <BrowserRouter>
                <header>
                    <Menu menuItems={this.state.menuItems}/>
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

                            <Route path="/project/:id" children={<ProjectDetail getProjectId={(id) => this.getProjectId(id)}
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