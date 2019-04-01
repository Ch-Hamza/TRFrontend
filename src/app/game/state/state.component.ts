import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { GameComponent } from '../game.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  @Input() game;
  timer: number;

  constructor(private gameComponent: GameComponent, private router: Router) { }

  ngOnInit() {
    this.dynamicState();
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
          this.threeToFour(); 
          break; 
        } 
        default: {
          break; 
        }
    }
  }

  timerConfig(timeVal, stateVal) {
    let time = timeVal;
    let intervalId = setInterval(() => {
      this.timer = time;
      time = time - 1;
      //console.log(time)
      if(time === 0) {
        clearInterval(intervalId);
        //console.log(this.game);
        this.gameComponent.onChange(stateVal);
      }
    }, 1000)
    
  }

  threeToFour() {
    let time = 90;
    let intervalId = setInterval(() => {
      this.timer = time;
      time = time - 1;
      //console.log(time)
      if(time === 0) {
        clearInterval(intervalId);
        console.log(this.game);
        //this.gameComponent.onChange(4);
        this.timer = null;
      }
    }, 1000)
  }
}
