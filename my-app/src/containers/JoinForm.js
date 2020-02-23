import React from 'react';

class JoinForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const url = 'https://flask-dot-pasta-like.appspot.com/games/join';
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "USERNAME": this.name.value,
                "ROOM": this.room.value,
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            return responseJson.movies;
        })
        .catch((error) => {
          console.error(error);
        });

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
