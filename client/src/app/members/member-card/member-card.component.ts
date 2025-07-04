import { Component, input } from '@angular/core';
import { Member } from '../../_models/Member';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  member = input.required<Member>();

  constructor() {
    console.log('MemberCardComponent initialized with member:', this.member);
  }

}
