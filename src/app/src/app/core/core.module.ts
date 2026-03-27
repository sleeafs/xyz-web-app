import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './services/user.service';
import { DataService } from './services/data.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    DataService
  ]
})
export class CoreModule {
  // Guard against reimporting CoreModule
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}

// QUESTION FOR CANDIDATE: What is the purpose of the constructor guard?
// QUESTION: Why should CoreModule only be imported once?
