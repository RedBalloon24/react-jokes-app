import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Joke extends Component {
    
    render() {
        return (
            <div className="Joke">
                <div className="Joke-buttons">
                    <FontAwesomeIcon icon="arrow-up" />
                    <span>{this.props.votes}</span>
                    <FontAwesomeIcon icon="arrow-down" />
                </div>
                <div className="Joke-text">{this.props.text}</div>
            </div>
        )
    }
}

export default Joke;