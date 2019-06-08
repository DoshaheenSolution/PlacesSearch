import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationfindComponent } from './locationfind/locationfind.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,    
   
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJjo71QcNqCXbOP2ISZxSDWrNG0nZl8Bs',
      libraries: ["places"]
    }),
    ReactiveFormsModule,
    AppModule,
    BrowserTransferStateModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
