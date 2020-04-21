import { Component, OnDestroy, OnInit } from '@angular/core';

import { DirectiveBase } from '../../../../../../../shared/models/directive-base';

@Component({
  selector: 'mswp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends DirectiveBase implements OnInit, OnDestroy {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
