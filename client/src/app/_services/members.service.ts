import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/Member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private _http = inject(HttpClient);
  baseUrl = environment.apiUrl;

  getMembers() {
    return this._http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(username: string) {
    return this._http.get<Member>(this.baseUrl + 'users/' + username);
  }
}
