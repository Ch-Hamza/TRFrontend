import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  game: Game = new Game();
  teams: Team[];
  selectedTeams: Team[] = [];
  selectedTeam1: Team;
  selectedTeam2: Team;
  submitted = false;

  constructor(private gameService: GameService, private teamService: TeamService, private router: Router) { }

  ngOnInit() {
    this.teamService.getTeams()
      .subscribe(
        data => {
          this.teams = data;
          //console.log(this.teams);
        },
        error => console.log(error)
      );

    
  }

  save() {
    this.gameService.createTeam(this.game)
      .subscribe(
        data => {
          console.log(data);
          this.submitted = true;
        },
        error => console.log(error)
      );
      this.game = new Game();
  }

  addTeam(attr) {
    this.teams.forEach((value) => {
      //console.log(value['name']);
      if(value['name'] === attr) {
        this.selectedTeams.push(value);
      }
    })
  }

  onSubmit() {
    this.game.state = '0';
    this.addTeam(this.selectedTeam1);
    this.addTeam(this.selectedTeam2);
    this.game.teams = this.selectedTeams;
    this.save();
    //console.log(this.game);
    this.router.navigate(['/game']);
  }
}
