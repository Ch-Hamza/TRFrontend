import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Game;
  timer: Number=0;
  currentState: string;
  timerInterval;
  intervalId;
  authority: any;

  constructor(private gameService: GameService, 
    private router: Router, 
    private token: TokenStorageService) { }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
    clearInterval(this.intervalId);
  }

  ngOnInit() {
    this.reloadData();
    
    this.authority = this.token.getAuthorities()[0];
    this.timerInterval = setInterval(() => {
      this.gameService.getCurrentGame().subscribe(
        data => {
          //console.log(data);
          this.game = data;
          //console.log(this.currentState);
          if(Number(this.game.state) != Number(this.currentState)) {
            //window.location.reload();
            this.reloadData();
            this.dynamicState();
            //this.stateComponent.reload();
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
        this.dynamicState();
      },
      error => console.log(error)
    );
  }

  onChange(stateValue) {
    this.game.state = stateValue;
    this.gameService.updateState(this.game)
      .subscribe(
        data => { 
        },
        error => console.log(error)
    );
  }

  dynamicState() {
    //console.log(this.game);
    switch(this.game.state) { 
        case '1': {
          this.timerConfig(60, 2);
          break; 
        } 
        case '2': {
          this.timerConfig(5, 3);
          break; 
        }
        case '3': {
          this.threeToFour(120); 
          break; 
        } 
        default: {
          break; 
        }
    }
  }

  timerConfig(timeVal, stateVal) {
    let time = timeVal;
    this.timer = timeVal;
    this.intervalId = setInterval(() => {
      time = time - 1;
      //console.log(time)
      if(time === 0) {
        clearInterval(this.intervalId);
        //this.onChange(stateVal);
      }
    }, 1000)
    
  }

  threeToFour(timeVal) {
    let time = timeVal;
    this.timer = time;
    this.intervalId = setInterval(() => {
      time = time - 1;
      //console.log(time)
      if(time === 0) {
        clearInterval(this.intervalId);
        //console.log(this.game);
        //this.onChange(4);
        this.timer = null;
      }
    }, 1000)
  }
}
