import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/Member';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private _http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  members = signal<Member[]>([]);

  getMembers() {
    return this._http.get<Member[]>(this.baseUrl + 'users').subscribe({
      next: members => this.members.set(members)
    });
  }

  getMember(username: string) {

    // Check if the member is already in the signal, if so return it
    const member = this.members().find(m => m.username === username);
    if (member !== undefined) return of(member);

    // Otherwise, make an HTTP request to get the member
    return this._http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this._http.put(this.baseUrl + 'users', member).pipe(
      tap(() => {
        this.members.update(members => members.map(m => m.username === member.username
          ? member : m))
      })
    );
  }
}
