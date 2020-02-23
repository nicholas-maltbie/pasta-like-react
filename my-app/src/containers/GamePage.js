import React from 'react';

class GamePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { errorMessage: "", gameResponse: null};
    }

    render() {
        return (
            <div className="App">
              <header className="App-header">
                  Welcome {this.props.username} in lobby {this.props.room}
              </header>
            </div>
        );
    }
}

export default GamePage;