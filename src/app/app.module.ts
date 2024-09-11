import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { ShareModule } from './share/share.module';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [																	
    AppComponent,
    
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    ShareModule,
    UserModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
