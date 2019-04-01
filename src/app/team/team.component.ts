import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: Observable<Team[]>

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.teams = this.teamService.getTeams();
    //this.teams.subscribe(val => console.log(val));
  }

  deleteTeam(teamName) {
    this.teamService.deleteTeam(teamName)
      .subscribe(
        data => {
          //console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

}
