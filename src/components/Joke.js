import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Joke extends Component {
    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <FontAwesomeIcon icon="thumbs-up" onClick={this.props.thumbsUp} />
                    <span>{this.props.votes}</span>
                    <FontAwesomeIcon icon="thumbs-down" onClick={this.props.thumbsDown} />
                </div>
                <div className="Joke-text">{this.props.text}</div>
            </div>
        )
    }
}

export default Joke;