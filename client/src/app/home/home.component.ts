import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient); // Inject HttpClient for making HTTP requests instead of ctor injection
  users: any;
  registerMode = false;

  ngOnInit(): void {
    this.getUsers();
    console.log('users retrieved')
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }
  
  cancelRegisterMode(event: boolean) {
    this.registerMode = false;
  }

  getUsers() {
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
