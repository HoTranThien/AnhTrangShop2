import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { HeaderComponent } from './share/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './share/footer/footer.component';
import { ItemComponent } from './component/item/item.component';
import { ProductComponent } from './pages/product/product.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { QuantityButtonComponent } from './component/quantity-button/quantity-button.component';
import { AllProductsComponent } from './component/all-products/all-products.component';
import { SearchComponent } from './pages/search/search.component';
import { CartDetailComponent } from './pages/Cart-detail/Cart-detail.component';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { HttpClientModule } from '@angular/common/http';
import { GalleriaModule } from 'primeng/galleria';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ShareModule } from '../share/share.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { LoginComponent } from './pages/login/login.component';
import { PasswordModule } from 'primeng/password';
import { RegisterComponent } from './pages/register/register.component';
import { UserDetailComponent } from './pages/userDetail/userDetail.component';
import { AdminModule } from '../admin/admin.module';
import { UserOrderDetailComponent } from './pages/userOrderDetail/userOrderDetail.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    BadgeModule,
    ImageModule,
    DropdownModule,
    GalleriaModule,
    HttpClientModule,
    PaginatorModule,
    InputTextModule,
    MessagesModule,
    InputTextareaModule,
    FileUploadModule,
    ToastModule,
    ShareModule,
    RadioButtonModule,
    TagModule,
    ReactiveFormsModule,
    PasswordModule,
    AdminModule,
  ],
  declarations: [
    UserComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ItemComponent,
    ProductComponent,
    CollectionComponent,
    QuantityButtonComponent,
    AllProductsComponent,
    SearchComponent,
    CartDetailComponent,
    LoginComponent,
    RegisterComponent,
    UserDetailComponent,
    UserOrderDetailComponent,
  ]
})
export class UserModule { }
