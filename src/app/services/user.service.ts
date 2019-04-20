import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ip_address = 'http://192.168.1.113';
  private juryUrl = this.ip_address + ':8080/api/test/jury';
  private judgeUrl = this.ip_address + ':8080/api/test/judge';
  private adminUrl = this.ip_address + ':8080/api/test/admin';
 
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
