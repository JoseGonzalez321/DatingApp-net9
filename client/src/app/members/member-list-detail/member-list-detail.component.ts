import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/Member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-list-detail',
  standalone: true,
  imports: [TabsModule, GalleryModule],
  templateUrl: './member-list-detail.component.html',
  styleUrl: './member-list-detail.component.css'
})
export class MemberListDetailComponent implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  member?: Member;
  images: GalleryItem[] = [];

  ngOnInit(): void {
    console.log('MemberListDetailComponent initialized');
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.memberService.getMember(username).subscribe({
        next: member => { 
          this.member = member;
          member.photos.map(photo => {
            this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
          });

        },
        error: error => console.error('Error loading member:', error)
      });
    } else {
      console.error('Username not found in route parameters');
    }
  }
}