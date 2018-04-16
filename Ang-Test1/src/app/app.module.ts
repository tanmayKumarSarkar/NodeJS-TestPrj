import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MyDataService } from './my-data.service';
import { ProductComponent } from './product/product.component';
import { MembersComponent } from './members/members.component';
import { SortPipe } from './app.pipe';


@NgModule({
  declarations: [
    SortPipe,
    AppComponent,
    ProductComponent,
    MembersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path : 'member',
        component : MembersComponent
      },
      {
        path : 'product',
        component : ProductComponent
      }
  ])
  ],
  providers: [MyDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
