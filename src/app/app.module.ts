import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './features/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // App routing
    CoreModule,        // Singleton services
    SharedModule,      // Shared utilities
    DashboardModule    // Dashboard feature
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
