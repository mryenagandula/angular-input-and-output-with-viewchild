import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/apis/users.service';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public usersData:any;
  public selectedUserId="-1";

  @ViewChild(UserDetailsComponent, {static: false}) public userDetailsComponent: UserDetailsComponent;

  constructor(private api: UsersService) { }

  public ngOnInit(): void {
    this.loadUsers();
  }

  public async loadUsers(){
    const res = await this.api.loadUsers().toPromise().then((res:any) => res.users);
    this.usersData = res;
  }

  public selectedUser(user){
    this.selectedUserId = user?._id
    this.userDetailsComponent.loadUsersById(user?._id);
  }
}
