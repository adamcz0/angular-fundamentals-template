import { Component, Input, OnInit, Output } from '@angular/core';
import { mockedCoursesList } from '@app/mock';
import { CoursesStoreService } from './services/courses-store.service';
import { UserStoreService } from './user/services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'courses-app';
  @Input() isAdmin: boolean = false;

  constructor(private userStoreService: UserStoreService) {}

  ngOnInit(): void {
    this.isAdmin = this.userStoreService.isAdmin
  }
}