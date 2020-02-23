import React from 'react';
import ReactInterval from 'react-interval';

class GamePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.askForQuestion = this.askForQuestion.bind(this);
        this.state = { waiting: true, activeQuestion: "", options: []};
        // this.state = { waiting: false, activeQuestion: "question-1", options: ['1', '2']};
    }

    askForQuestion() {
        var responseStatus;
        const url = "https://flask-dot-pasta-like.appspot.com/rooms/" + this.props.room + "/active"
        const that = this;
        fetch(url, {
            method: 'GET',
            credentials: 'include',
        }).then(
            (response) => {
                responseStatus = response.status;
                return response.json();
            }
        ).then(
            (responseInfo) => {
                if (responseStatus !== 200) {
                }
                else if (responseInfo !== "" && responseInfo !== that.state.activeQuestion) {
                    that.setState({activeQuestion: responseInfo});

                    const optionsURL = "https://flask-dot-pasta-like.appspot.com/questions/" + that.props.room + "/" + that.state.activeQuestion
                    // console.log(optionsURL)
                    fetch(optionsURL, {
                        method: 'GET',
                        credentials: 'include',
                    }).then(
                        (response) => {
                            responseStatus = response.status;
                            return response.json();
                        }
                    ).then(
                        (responseInfo) => {
                            // console.log(responseInfo)
                            that.setState({
                                waiting: false,
                                options: responseInfo
                            })
                        }
                    ).catch( (e) => {
                        that.setState({waiting: true})}
                    )

                }
            }
        )
    }

    handleSubmit(e, option) {
        
        e.preventDefault();
        const url = "https://flask-dot-pasta-like.appspot.com/responses/" + this.state.activeQuestion
        const that = this;
        const name = this.props.username;
        const room = this.props.room;
        var responseStatus;
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(option),
            headers: {
                "Content-Type": "application/json",
                "USERNAME": name,
                "ROOM": room,
            },
        }).then(
            (response) => {
                responseStatus = response.status;
                return response.json();
            }
        ).then(
            (responseJson) => {
                // console.log(responseJson);
                // console.log(option);
                if (responseStatus === 200)
                    that.setState({waiting: true})
            }
        ).catch((e) => {
            that.setState({waiting: true})
        })
    }

    render() {
        if (this.state.waiting) {
            return (
                <div className="App">
                    <header className="App-header">
                        <ReactInterval timeout={1000} enabled={true}
                            callback={this.askForQuestion} />
                        Welcome {this.props.username} in lobby {this.props.room}
                    </header>
                </div>
            );
        }
        else {
            return (
                <div className="App">
                    <header className="App-header">
                        Player: {this.props.username}, lobby: {this.props.room}
                        <ul className="option-list">
                            <li>
                                <form onSubmit={(e) => this.handleSubmit(e, this.state.options[0])}>
                                    <input type="submit" value={this.state.options[0]} className="option-button"/>
                                </form>
                            </li>
                            <li>
                                <form onSubmit={(e) => this.handleSubmit(e, this.state.options[1])}>
                                    <input type="submit" value={this.state.options[1]} className="option-button"/>
                                </form>
                            </li>
                        </ul>
                    </header>
                </div>
            )
        }
    }
}

export default GamePage;