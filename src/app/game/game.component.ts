import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Game;
  currentState: string;
  timerInterval;
  constructor(private gameService: GameService, private router: Router) { }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  ngOnInit() {
    this.reloadData();
    this.timerInterval = setInterval(() => {
      this.gameService.getCurrentGame().subscribe(
        data => {
          //console.log(data);
          this.game = data;
          console.log(this.currentState);
          if(Number(this.game.state) != Number(this.currentState)) {
            window.location.reload();
          }else {
            this.currentState = this.game.state;
          }
        },
        error => console.log(error)
      );
    }, 1000)
  }

  reloadData() {
    this.gameService.getCurrentGame().subscribe(
      data => {
        //console.log(data);
        this.game = data;
        this.currentState = data.state;
      },
      error => console.log(error)
    );
  }

  onChange(stateValue) {
    this.game.state = stateValue;
    this.gameService.updateState(this.game)
      .subscribe(
        data => {
          //window.location.reload();
        },
        error => console.log(error)
      );
  }
}
