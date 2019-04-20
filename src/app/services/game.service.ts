import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { gameUserNameCombo } from '../models/gameUserNameCombo';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private ip_address = 'http://192.168.1.113';
  private baseUrl = this.ip_address + ':8080/api/games/';

  constructor(private http: HttpClient) { }

  getCurrentGame(): Observable<any> {
    return this.http.get(this.baseUrl+'current');
  }

  updateState(game: Game): Observable<any> {
    return this.http.put(this.baseUrl+"state", game);
  }

  updateScore(game: Game): Observable<any> {
    return this.http.put(this.baseUrl, game);
  }

  createTeam(game: Game): Observable<any> {
    return this.http.post(this.baseUrl, game);
  }
}
