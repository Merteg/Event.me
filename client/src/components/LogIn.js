import React, { Component } from 'react';
import {Row, Input, Button} from 'react-materialize'
import {server_url} from '../config.json'


export class LogIn extends Component {
  state = {
      email: '',
      password: '',
      msg: ''
    }

  componentDidMount() {
    fetch(server_url+'/log-in')
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log('Response: ', data)
        this.setState({msg: data.msg})
      })
  };

  onChangeHandler = (e) => {
    const { id } = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  }

  log_in = (e) => {
    let log_in_data = {
      email: this.state.email,
      password: this.state.password
    }
    fetch(server_url+'/log-in', {
      method: 'POST',
      body: JSON.stringify(log_in_data)
    })
      .then((response)=>{ return response.json(); })
      .then((data) => { 
        console.log('Response: ', data)
        this.setState({msg: data.msg})
        if (data.success){
          if (typeof(Storage) !== "undefined") {
            if(typeof(data.token !== "undefined")) sessionStorage.setItem("Authorization-token", data.token);
            else this.setState({msg: "Server give invalid response"})
          } else {
            this.setState({msg: this.state.msg + "\nYour sessionStorage is not active"})
          }
        }
      })
  }

  render() {
    return (
        <Row>
            <Input id="email" value={this.state.email} onChange={this.onChangeHandler} type="email" label="Email" s={2} />
            <Input id="password" value={this.state.password} onChange={this.onChangeHandler} type="password" label="password" s={2} />
            <Button waves='light' onClick={this.log_in} s={1}>Log In</Button>
            <p>{this.state.msg}</p>
        </Row>
    );
  }
}
