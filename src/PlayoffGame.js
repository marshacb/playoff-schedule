import React, { Component } from 'react'
import './PlayoffGame.css'

class PlayoffGame extends Component {
    render() {
        const teamsPlaying = `${this.props.awayTeam.team.name} @ ${this.props.homeTeam.team.name}`;
        return (
          <div>
            <div className="row">
              <div className="col s12 m12">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <div className="PlayoffGame">
                      <div className="PlayoffGame-game-status">
                        <div className="PlayoffGame-standings">
                          <div>
                            {this.props.status.shortDescription}
                          </div>
                          <div>{this.props.status.result}</div>
                        </div>
                        <div className="PlayoffGame-teams">
                          {teamsPlaying}
                        </div>
                      </div>
                      <div className="PlayoffGame-game-details">
                        <div className="PlayoffGame-time">
                          {this.props.gameTime}
                        </div>
                        <div>
                          {this.props.broadcasts.length &&
                            this.props.broadcasts[0].name}
                        </div>
                      </div>
                      <div className="PlayoffGame-pitchers">
                        <h5 className="PlayoffGame-pitcher">
                          {this.props.awayTeam.team.abbreviation}{" "}
                          pitcher:
                          <span className="PlayoffGame-pitcher-name">
                            {
                              this.props.awayTeam.probablePitcher
                                .firstLastName
                            }
                          </span>
                        </h5>
                        <h5 className="PlayoffGame-pitcher">
                          {this.props.homeTeam.team.abbreviation}{" "}
                          pitcher:
                          <span className="PlayoffGame-pitcher-name">
                            {
                              this.props.homeTeam.probablePitcher
                                .firstLastName
                            }
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}


export default PlayoffGame;