import React from 'react';

class JoinForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        var xhr = new XMLHttpRequest()

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            console.log(xhr.responseText)
        })
        // open the request with the verb and the url
        xhr.open('POST', 'https://flask-dot-pasta-like.appspot.com/games/join')

        xhr.setRequestHeader("USERNAME", this.name.value)
        xhr.setRequestHeader("ROOM", this.room.value)   
        // send the request
        xhr.send()

        e.preventDefault();
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
                </ul>
            </form>
        );
    }
}

export default JoinForm;
