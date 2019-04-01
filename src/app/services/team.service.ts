import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = 'http://localhost:8080/api/teams/';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getTeam(name: string): Observable<any> {
    return this.http.get(this.baseUrl+name);
  }
 
  createTeam(team: Team): Observable<any> {
    return this.http.post(this.baseUrl, team);
  }

  deleteTeam(team: string): Observable<any> {
    return this.http.delete(this.baseUrl+team);
  }
}
