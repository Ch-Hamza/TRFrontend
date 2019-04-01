import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private juryUrl = 'http://localhost:8080/api/test/jury';
  private judgeUrl = 'http://localhost:8080/api/test/judge';
  private adminUrl = 'http://localhost:8080/api/test/admin';
 
  constructor(private http: HttpClient) { }
 
  getJuryBoard(): Observable<string> {
    return this.http.get(this.juryUrl, { responseType: 'text' });
  }
 
  getJudgeBoard(): Observable<string> {
    return this.http.get(this.judgeUrl, { responseType: 'text' });
  }
 
  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
}
