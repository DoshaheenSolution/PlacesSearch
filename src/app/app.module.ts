import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationfindComponent } from './locationfind/locationfind.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { NgtUniversalModule } from '@ng-toolkit/universal';

@NgModule({
  declarations: [
    AppComponent,
    LocationfindComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,    
   
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBJjo71QcNqCXbOP2ISZxSDWrNG0nZl8Bs',
      libraries: ["places"]
    }),
    ReactiveFormsModule,
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgtUniversalModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
