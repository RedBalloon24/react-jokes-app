import React, { Component } from 'react';
import Axios from 'axios';
import './JokeList.css';
import Joke from './Joke';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class JokeList extends Component {
	static defaultProps = {
		numJokes: 10
	};

	constructor(props) {
		super(props);
		this.state = {
            jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
            loading: false
		};
		this.seenJokes = new Set(this.state.jokes.map(j => j.text))
		this.handleclick = this.handleclick.bind(this);
	}

	componentDidMount() {
		if (this.state.jokes.length === 0) this.getJokes();
	}

	async getJokes() {
		try {
			let jokes = [];
			while (jokes.length < this.props.numJokes) {
				let res = await Axios.get('https://icanhazdadjoke.com/', {
					headers: { Accept: 'application/json' }
				});
				let newJoke = res.data.joke;
				if(!this.seenJokes.has(newJoke)) {
					jokes.push({
						id: uuidv4(),
						text: res.data.joke,
						votes: 0
					});
				} else {
					console.log("FOUND A DUPLICATE");
					console.log(newJoke)
				}
			}
			this.setState(
				(st) => ({
					loading: false,
					jokes: [ ...st.jokes, ...jokes ]
				}),
				() => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
			);
		} catch(e) {
			alert(e);
			this.setState({ loading: false })
		}
	}

	handleVote(id, vote) {
		this.setState(
			(st) => ({
				jokes: st.jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + vote } : j))
			}),
			() => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
		);
	}

	handleclick() {
        this.setState({ loading: true}, this.getJokes)
	}

	render() {
        if(this.state.loading) {
            return (
                <div className="JokeList-spinner">
                    <FontAwesomeIcon icon="laugh" size="6x" spin />
                    <h1 className="JokeList-title">Loading...</h1>
                </div>
            )
		}
		let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
		return (
			<div className="JokeList">
				<div className="JokeList-sidebar">
					<h1 className="JokeList-title">
						<span>Cheezy</span> Jokes
					</h1>
					<img
						src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
						alt="jokes"
					/>
					<button className="JokeList-button" onClick={this.handleclick}>
						More Jokes
					</button>
					<h4 className="JokeList-length">Amount: {this.state.jokes.length}</h4>
				</div>
				<div className="JokeList-jokes">
					{jokes.map((j) => (
						<Joke
							key={j.id}
							votes={j.votes}
							text={j.text}
							thumbsUp={() => this.handleVote(j.id, 1)}
							thumbsDown={() => this.handleVote(j.id, -1)}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default JokeList;
