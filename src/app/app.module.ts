import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { FooterNavComponent } from './footer-nav/footer-nav.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// for http conection
import { HttpClientModule  } from '@angular/common/http';

// my components
import { ToolbarNavComponent } from './toolbar-nav/toolbar-nav.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { ContentsComponent } from './contents/contents.component';
import { VisualAnalysisComponent } from './contents/visual-analysis/visual-analysis.component';
import { StartComponent } from './contents/start/start.component';
import { StatisticalAnalysisComponent } from './contents/statistical-analysis/statistical-analysis.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    FooterNavComponent,
    ToolbarNavComponent,
    SidebarNavComponent,
    ContentsComponent,
    VisualAnalysisComponent,
    StartComponent,
    StatisticalAnalysisComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
