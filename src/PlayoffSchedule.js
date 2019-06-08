import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import uuid from 'uuid/v4';
import './PlayoffSchedule.css';
import PlayoffGames from './PlayoffGames';

const MBL_API = "http://statsapi.mlb.com/api/v1/schedule/postseason/series?sportId=1&season=2018&hydrate=team,broadcasts(all),seriesStatus(useOverride=true),decisions,person,probablePitcher,linescore(matchup)";

class PlayoffSchedule extends Component {
    constructor(props){
        super(props);

        this.state = {
            playoffGames: [],
            seriesDates: [],
            seriesGames: []
        }
    }

    componentDidMount = async () => {
        const response = await axios.get(MBL_API);
        this.setState(st => ({
            seriesGames: this.getSeriesgames(response.data.series), 
        }))
        this.getGameDates();
    }

    getSeriesgames = (playoffSeries) => {
        const seriesGames = [];
        for(let series of playoffSeries) {
             const games = series.games;
             seriesGames.push(...games);
        }
        return seriesGames;
    }

    handleClick = () => {
        this.sortGamesByDate();
    }

    sortGamesByDate = () => {
        const sortedGames = [...this.state.seriesGames];
        sortedGames.sort((a, b) =>
            new Date(b.gameDate) - new Date(a.gameDate)
        );

        this.setState({seriesGames: sortedGames}, this.getGameDates);
    }

    getGameDates = () => {
        const seriesDates = new Set();
        for(let game of this.state.seriesGames) { 
            seriesDates.add(
              moment(game.gameDate).format("dddd MMMM Do YYYY")
            );
        }

        const playoffGames = [...seriesDates].map(date => ({
          gameDate: date,
          games: [],
          id: uuid()
        }));

        for(let game of this.state.seriesGames) {
           for(let playoffGame of playoffGames){
               const date = moment(game.gameDate).format(
                 "dddd MMMM Do YYYY"
               );
               if(date === playoffGame.gameDate) {
                   playoffGame.games.push(game);
               }
           }
        }

        this.setState(st => (
            {playoffGames: playoffGames, seriesDates: [...seriesDates]}
        ));
    }


    renderGames() {
       return (
         <div>
           {this.state.seriesDates.map(seriesDate => (
           <div className="PlayoffSchedule-date-block" key={seriesDate}>
             <h2 className="PlayoffSchedule-date">{seriesDate}</h2>
             {this.renderGamesByDate(seriesDate)}
           </div>
           ))}
         </div>
       );
    
    }

    renderGamesByDate(date) {
        return (
            <div>
                {this.state.playoffGames.map(gameDay => (
                      (date === gameDay.gameDate) && <PlayoffGames key={gameDay.id} games={gameDay.games} />
                    )
                )}
            </div>
        )
    }


    render() {
        return (
          <div>
            <div className="PlayoffSchedule-header">
                <img 
                className="PlayoffSchedule-mlb-logo"
                src="https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2018/03/major_league_baseball_logo-300x182.png" 
                alt="mlb logo"/>
                <h1>MLB 2018 Playoff Schedule</h1>
            </div>
            <button
              className="waves-effect light-blue darken-4 btn PlayoffSchedule-sort-btn"
              onClick={this.handleClick}
            >
              By Date
            </button>
            <div className="PlayoffSchedule">{this.renderGames()}</div>
          </div>
        );
    }
}

export default PlayoffSchedule;