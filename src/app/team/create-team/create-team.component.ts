import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  team: Team = new Team();
  submitted = false;

  constructor(private teamService: TeamService) { }

  ngOnInit() {
  }

  newTeam(): void {
    this.submitted = false;
    this.team = new Team();
  }

  save() {
    this.teamService.createTeam(this.team)
      .subscribe(
        data => {
          console.log(data);
          this.submitted = true;
        },
        error => console.log(error)
      );
      this.team = new Team();
  }

  onSubmit() {
    var path = this.team.image;
    var filename = path.replace(/^.*\\/, "");
    this.team.image = filename;
    this.save();
  }

}
