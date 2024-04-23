import React, { Component } from 'react';

import { randomUpTo, generateColors } from './utility/color';

import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: generateColors(6),
      secretIndex: randomUpTo(6),
      gameState: 'start',
      difficulty: 6,
    }

    this.newGame = this.newGame.bind(this);
    this.changeDifficulty = this.changeDifficulty.bind(this);
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  newGame() {
    const difficulty = this.state.difficulty;
    this.setState({
      colors: generateColors(difficulty),
      secretIndex: randomUpTo(difficulty),
      gameState: 'start',
    });
  }

  changeDifficulty(difficulty) {
    this.setState({difficulty});
  }

  handleSquareClick(i) {
    if (this.state.gameState === 'won') return;

    const colors = this.state.colors.slice();
    let gameState;
    if (i === this.state.secretIndex) {
      colors.fill(colors[i]);
      gameState = 'won';
    } else {
      colors[i] = 'none';
      gameState = 'wrong';
    }
    this.setState({colors, gameState});
  }

  componentDidUpdate(lastProps, lastState) {
    if (lastState.difficulty !== this.state.difficulty)
      this.newGame();
  }

  render() {
    const { secretIndex, gameState, difficulty, colors } = this.state;

    const secretColor = colors[secretIndex];
    const headerBackground = gameState === 'won' ? secretColor : 'steelblue';
    const newGameText = gameState === 'won' ? 'New game?' : 'New colors';

    let message = '';
    if (gameState === 'won') message = 'Correct!';
    if (gameState === 'wrong') message = 'Wrong!';

    const squares = colors.map((c, i) => {
      return <div className="square" style={{background: c}} onClick={this.handleSquareClick.bind(null, i)} key={i}></div>
    });

    return (
      <div>
        <h1 className="header" style={{ background: headerBackground }}>
          color game
       
          <span>{secretColor}</span>
        </h1>
       
        <div className="squares">
          {squares}
        </div>
        <div className="actions">
          <button onClick={this.newGame}>
            {newGameText}
          </button>
          <span className="message">
            {message}
          </span>
          <button className={difficulty === 3 ? 'active' : ''} onClick={this.changeDifficulty.bind(null, 3)}>
            Easy
          </button>
          <button className={difficulty === 6 ? 'active' : ''} onClick={this.changeDifficulty.bind(null, 6)}>
            Hard
          </button>
        </div>
      </div>
    );
  }
}

export default App;
