import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinerComponent } from './spiner/spiner.component';
import { NosignPipe } from './pipes/Nosign.pipe';


@NgModule({
  imports: [
    CommonModule,
    ProgressSpinnerModule
  ],
  declarations: [
    MessageComponent,
    SpinerComponent,
    NosignPipe,
  ],
  exports:[
    MessageComponent,
    SpinerComponent,
    NosignPipe,
  ]
})
export class ShareModule { }
