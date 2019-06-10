import React, { Component } from 'react';
import moment from 'moment';
import PlayoffGame from "./PlayoffGame";

class PlayoffGames extends Component {
    
    renderPlayoffGames = () => {
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
                    awayTeamImage={game.awayTeamImage}
                    homeTeamImage={game.homeTeamImage}
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