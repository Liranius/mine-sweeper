import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  imports: [SharedModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('[Core Module] CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
