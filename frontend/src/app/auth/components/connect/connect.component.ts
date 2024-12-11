import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CLIENT_ID } from '../../../constants/variables';
import { AuthFacade } from '../../facade/auth.facade';
import {
  LCL_ACCESS_TOKEN_NAME,
  LCL_USER_NAME,
} from '../../../constants/common';
import { User } from '../../../models/auth.models';

@Component({
  selector: 'app-connect',
  standalone: false,

  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss',
})
export class ConnectComponent implements OnInit {
  // readonly panelOpenState = signal();
  token$!: string | null;
  user$!: User | null;
  constructor(private router: ActivatedRoute, private authFacade: AuthFacade) {}

  ngOnInit(): void {
    const token = localStorage.getItem(LCL_ACCESS_TOKEN_NAME);
    if (token) {
      const user = localStorage.getItem(LCL_USER_NAME);
      this.authFacade.setUserToken({
        token: token,
        user: user ? JSON.parse(user) : null,
      });
    } else {
      const code = this.router.snapshot.queryParamMap.get('code');
      if (code) {
        this.authFacade.getAccessToken({ code });
      }
    }

    this.authFacade.token$.subscribe((token) => {
      this.token$ = token;
    });

    this.authFacade.user$.subscribe((user) => {
      this.user$ = user;
    });
  }

  handleConnect() {
    const scope = 'read:org repo';
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${scope}`;
  }

  handleRemove() {
    if (this.user$?.id) this.authFacade.removeUser(this.user$.id);
  }
}
