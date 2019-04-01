import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:8080/api/games/';

  constructor(private http: HttpClient) { }

  getCurrentGame(): Observable<any> {
    return this.http.get(this.baseUrl+'current');
  }

  updateState(game: Game): Observable<any> {
    return this.http.put(this.baseUrl, game);
  }

  createTeam(game: Game): Observable<any> {
    return this.http.post(this.baseUrl, game);
  }
}
