import React, { Component } from 'react'
import Axios from 'axios'
import './JokeList.css'
import Joke from './Joke';

class JokeList extends Component {
    static defaultProps = {
        numJokes: 10
    }

    constructor(props){
        super(props);
        this.state = { jokes: [] };
    }

    async componentDidMount() {
        let jokes = [];
        while(jokes.length < this.props.numJokes) {
            let res = await Axios.get("https://icanhazdadjoke.com/", { 
            headers: { Accept: "application/json" }
            });
            jokes.push({ 
                text: res.data.joke,
                votes: 0
            });
        }
        this.setState({ jokes: jokes })
    }
    
    render() {
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title"><span>Cheezy</span> Jokes</h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="jokes" />
                    <button className="JokeList-button">New Jokes</button>
                </div>
                <div className="JokeList-jokes">
                    {this.state.jokes.map(j => (
                        <Joke votes={j.votes} text={j.text} />
                    ))}
                </div>
            </div>
        )
    }
}

export default JokeList;