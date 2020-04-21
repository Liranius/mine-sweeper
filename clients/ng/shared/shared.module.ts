import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';
import { PIPES } from './pipes';

const MODULES = [CommonModule];

@NgModule({
  imports: [...MODULES],
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES]
})
export class SharedModule {}
