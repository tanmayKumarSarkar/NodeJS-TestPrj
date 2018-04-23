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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueColorDirective } from './blue-color.directive';
import { HomeComponent } from './home/home.component';
import { UpdateProductComponent } from './update-product/update-product.component';


@NgModule({
  declarations: [
    SortPipe,
    AppComponent,
    ProductComponent,
    MembersComponent,
    BlueColorDirective,
    HomeComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path : '',
        component : HomeComponent
      },
      {
        path : 'member',
        component : MembersComponent
      },
      {
        path : 'product',
        component : ProductComponent
      },
      {
        path : 'updateProduct/:id',
        component : UpdateProductComponent
      }
  ])
  ],
  providers: [MyDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
