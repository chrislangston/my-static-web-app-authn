import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../model/user-info';

@Component({
  selector: 'app-nav',
  template: `
  <nav class="menu auth">
  <p class="menu-label">Auth</p>
  <div class="menu-list auth">
    <ng-container *ngIf="!userInfo; else logout">
      <ng-container *ngFor="let provider of providers">
        <a href="/.auth/login/{{provider}}?post_login_redirect_uri={{redirect}}">{{provider}}</a>
      </ng-container>
    </ng-container>
    <ng-template #logout>
      <a href="/.auth/logout?post_logout_redirect_uri={{redirect}}">Logout</a>
    </ng-template>
  </div>
</nav>
<div class="user" *ngIf="userInfo">
      <p>Welcome</p>
      <p>{{ userInfo?.userDetails }}</p>
      <p>{{ userInfo?.identityProvider }}</p>
    </div>
  `,
})
export class NavComponent implements OnInit {
  userInfo: UserInfo;
  redirect = window.location.pathname;  
  providers = ['twitter', 'github', 'aad'];  

  async ngOnInit(){
    this.userInfo = await this.getUserInfo();
  }

  async getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }

}