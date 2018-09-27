import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignatureComponent } from './signature/signature.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ShowSignatureComponent } from './show-signature/show-signature.component';

@NgModule({
  declarations: [
    AppComponent,
    SignatureComponent,
    ShowSignatureComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
