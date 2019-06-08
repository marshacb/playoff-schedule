import React, { Component } from 'react';
import moment from 'moment';
import PlayoffGame from "./PlayoffGame";

class PlayoffGames extends Component {
    constructor(props) {
        super(props);

        this.renderPlayoffGames = this.renderPlayoffGames.bind(this)
    }

    renderPlayoffGames() {
        return (
            <div>
                {this.props.games.map(game => (
                    <PlayoffGame 
                    key={game.calendarEventID} 
                    gameDate={moment(game.gameDate).format("MMMM Do YYYY")} 
                    gameTime={moment(game.gameDate).format('LT')}
                    awayTeam={game.teams.away} 
                    homeTeam={game.teams.home} 
                    status={game.seriesStatus} 
                    broadcasts={game.broadcasts} 
                    />
                ))}
            </div>
        )
    }

    render() {
        return (
            <div>{this.renderPlayoffGames()}</div>
        )
    }
}

export default PlayoffGames;