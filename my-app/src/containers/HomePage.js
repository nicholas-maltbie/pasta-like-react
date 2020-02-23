import React from 'react';
import logo from '../logo.svg';
import JoinForm from './JoinForm';
import GamePage from './GamePage';

class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.handler = this.handler.bind(this)
        this.state = {
            "USERNAME": null,
            "ROOM": null
        }
        
        // this.state = {
        //     "USERNAME": "name",
        //     "ROOM": "room"
        // }
    }

    handler(userId, roomId) {
        this.setState({
            "USERNAME": userId,
            "ROOM": roomId
        })
    }
    
    render() {
        if (this.state["USERNAME"] == null && this.state["ROOM"] == null) {
            return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <JoinForm handler = {this.handler}></JoinForm>
                    </header>
                </div>
            );
        }
        else {
            return (
                <GamePage username={this.state["USERNAME"]} room={this.state["ROOM"]} handler={this.handler}></GamePage>
            )
        }
    }
}

export default HomePage;