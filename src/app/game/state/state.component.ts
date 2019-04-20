import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { GameComponent } from '../game.component';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../auth/token-storage.service';
import { FormJunior } from './FormJunior';
import { GameService } from 'src/app/services/game.service';
import { ScoreDetails } from 'src/app/models/scoredetails';
import { gameUserNameCombo } from 'src/app/models/gameUserNameCombo';
import { FormSumo } from './FormSumo';
import { FormLtcr } from './FormLtcr';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  @Input() game;
  @Input() timer;
  authority: any;
  formJunior: any = {};
  formJunior1: any = {};
  formLtcr: any = {};
  formLtcr1: any = {};
  formSumo: any = {};
  private formJuniorInfo: FormJunior;
  private formJuniorInfo1: FormJunior;
  private formLtcrInfo: FormLtcr;
  private formLtcrInfo1: FormLtcr;
  private formSumoInfo: FormSumo;
  submitted = false;
  submittedSumo = false;
  submittedLtcr = false;

  constructor(private gameComponent: GameComponent,
    private router: Router, 
    private token: TokenStorageService,
    private gameService: GameService) { }

  ngOnInit() {
    this.authority = this.token.getAuthorities()[0];
  }

  reload() {
    this.gameService.getCurrentGame().subscribe(
      data => {
        this.game = data;
      },
      error => console.log(error)
    );
  }

  onSubmit() {
    this.formJuniorInfo = new FormJunior( 
      this.formJunior.passage, this.formJunior.ballon, this.formJunior.passagep, 
      this.formJunior.ballondeg1, this.formJunior.bordure1, 
      this.formJunior.ballondeg2, this.formJunior.recette, this.formJunior.casea, 
      this.formJunior.bordure2, this.formJunior.obstacle, this.formJunior.ballondeg3,
      this.formJunior.ralenti
    );

    this.formJuniorInfo1 = new FormJunior( 
      this.formJunior1.passage, this.formJunior1.ballon, this.formJunior1.passagep, 
      this.formJunior1.ballondeg1, this.formJunior1.bordure1, 
      this.formJunior1.ballondeg2, this.formJunior1.recette, this.formJunior1.casea, 
      this.formJunior1.bordure2, this.formJunior1.obstacle, this.formJunior1.ballondeg3,
      this.formJunior1.ralenti
    );

    this.formJuniorInfo.calculate(this.game.teams[0], this.game.teams[1]);
    
    this.formJuniorInfo1.calculate(this.game.teams[1], this.game.teams[0]);

    if(this.formJuniorInfo.casea) {
      if(Number(this.game.teams[0].score.score) >= 0) {
        this.game.teams[0].score.score = Number(this.game.teams[0].score.score)*2;
      }
    }

    if(this.formJuniorInfo1.casea) {
        if(Number(this.game.teams[1].score.score) >= 0) {
          this.game.teams[1].score.score = Number(this.game.teams[1].score.score)*2;
        }
    }

    console.log(this.game);

    this.gameService.updateScore(this.game)
      .subscribe(
        data => {
          this.submitted = true;
        },
        error => console.log(error)
    );
  }

  onSubmitLtcr() {

    this.formLtcrInfo = new FormLtcr( 
      this.formLtcr.panSol, this.formLtcr.ballonDeg, this.formLtcr.elemDep, 
      this.formLtcr.eoliennesAss, this.formLtcr.graineB, 
      this.formLtcr.graineM, this.formLtcr.tubeG, this.formLtcr.graineNP, 
      this.formLtcr.graineE, this.formLtcr.arbreDep
    );

    this.formLtcrInfo1 = new FormLtcr( 
      this.formLtcr1.panSol, this.formLtcr1.ballonDeg, this.formLtcr1.elemDep, 
      this.formLtcr1.eoliennesAss, this.formLtcr1.graineB, 
      this.formLtcr1.graineM, this.formLtcr1.tubeG, this.formLtcr1.graineNP, 
      this.formLtcr1.graineE, this.formLtcr1.arbreDep
    );

    this.formLtcrInfo.calculate(this.game.teams[0]);
    
    this.formLtcrInfo1.calculate(this.game.teams[1]);

    console.log(this.game);

    this.gameService.updateScore(this.game)
      .subscribe(
        data => {
          this.submittedLtcr = true;
        },
        error => console.log(error)
    );
  }

  onSubmitSumo() {
    this.formSumoInfo = new FormSumo(this.formSumo.winner, this.formSumo.loser);
    if(this.formSumoInfo.winner == this.game.teams[0].name) {
      this.formSumoInfo.loser = this.game.teams[1].name;
      this.game.teams[0].score.score = 1;
      this.game.teams[1].score.score = 0;
    }
    else {
      this.formSumoInfo.loser = this.game.teams[0].name;
      this.game.teams[1].score.score = 1;
      this.game.teams[0].score.score = 0;
    }

    console.log(this.game);
    this.gameService.updateScore(this.game)
      .subscribe(
        data => {
          this.submittedSumo = true;
        },
        error => console.log(error)
    );
  }

}
