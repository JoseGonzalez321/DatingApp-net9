import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient); // Inject HttpClient for making HTTP requests instead of ctor injection
  title = 'DatingApp';
  users: any;

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users')
      .subscribe({
        next: response => this.users = response,
        error: (error) => {
          console.error('Error fetching users:', error);
        },
        complete: () => {
          console.log('User fetch complete');
        }
      });
  }
}
