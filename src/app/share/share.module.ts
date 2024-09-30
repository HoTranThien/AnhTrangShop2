import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinerComponent } from './spiner/spiner.component';
import { NosignPipe } from './pipes/Nosign.pipe';
import { FisrtCharNamePipe } from './pipes/FisrtCharName.pipe';
import { AccessDeniedComponent } from './access-denied/access-denied.component';


@NgModule({
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  declarations: [
    MessageComponent,
    SpinerComponent,
    NosignPipe,
    FisrtCharNamePipe,
    AccessDeniedComponent,
  ],
  exports:[
    MessageComponent,
    SpinerComponent,
    NosignPipe,
    FisrtCharNamePipe,
    AccessDeniedComponent,
  ]
})
export class ShareModule { }
