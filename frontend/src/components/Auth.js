import React from "react";


class AuthForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: ''
        }
    }

    moveChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    moveSubmit(event) {
        this.props.login(this.state.login, this.state.password)
        event.preventDefault()
    }

    render() {
        return (

            <form className="col-4" onSubmit={(event) => this.moveSubmit(event)}>
                <br/>
                <label htmlFor="login">Логин</label>
                <input type="text" className="form-control" name="login" value={this.state.login}
                       onChange={(event) => this.moveChange(event)}/>
                <br/>
                <label htmlFor="password">Пароль</label>
                <input type="password" className="form-control" name="password" value={this.state.password}
                       onChange={(event) => this.moveChange(event)}/>
                <br/>
                <input type="submit" className="btn btn-primary" value="Войти"/>
            </form>
        );
    }
}

export default AuthForm