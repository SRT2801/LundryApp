import { NgModule } from '@angular/core';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
  ],
})
export class Tab1PageModule {}
