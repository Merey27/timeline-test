import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoComponent} from './info.component';
import {InfoPageRoutingModule} from "./info-page-routing.module";
import {TooltipComponent} from "../../components/tooltip/tooltip.component";
import {SharedModule} from "../../components/shared.module";


@NgModule({
  declarations: [
    InfoComponent,
  ],
  imports: [
    CommonModule,
    InfoPageRoutingModule,
    SharedModule
  ]
})
export class InfoPageModule {
}
