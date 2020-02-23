import React from 'react';

class JoinForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { errorMessage: "" };
    }

    handleSubmit(e) {
        const that = this;
        var responseStatus;
        const url = 'https://flask-dot-pasta-like.appspot.com/games/join';
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "USERNAME": this.name.value,
                "ROOM": this.room.value,
            },
        }).then(
            (response) => {
                responseStatus = response.status;
                return response.json();
            }
        ).then(
            (responseInfo) => {
                if (responseStatus !== 200) {
                    that.setState({errorMessage: responseInfo});
                }
                else {
                    console.log(responseInfo["username"])
                    console.log(responseInfo["room"])
                    that.setState({errorMessage: ""});
                    that.props.handler(responseInfo["username"], responseInfo["room"])
                }
            }
        )
        this.setState({errorMessage: "Attempting to connect to server..."})

        e.preventDefault();
    }

    componentDidCatch(error) {
        // Log or store the error
        console.error(error);
        this.setState({ errorOccurred: true });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <ul className="join-form-list">
                    <li className="join-row">
                        <label>Room: </label>
                        <input
                            type="text"
                            name="room_id"
                            maxLength="4"
                            ref={(room) => this.room = room}
                        />
                    </li>
                    <li className="join-row">
                        <label>Name: </label>
                        <input
                            type="text"
                            name="name"
                            maxLength="8"
                            ref={(name) => this.name = name}
                        />
                    </li>
                    <li className="join-row">
                        <input type="submit" value="join" />
                    </li>
                    <li className="join-row">
                        {this.state.errorMessage.length > 0 ? this.state.errorMessage : ""}
                    </li>
                </ul>
            </form>
        );
    }
}

export default JoinForm;
