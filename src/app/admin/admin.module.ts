import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SidemenuComponent } from './share/sidemenu/sidemenu.component';
import { AppRoutingModule } from '../app-routing.module';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SingleTableComponent } from './share/single-table/single-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { ShareModule } from '../share/share.module';
import { ColorTableComponent } from './share/color-table/color-table.component';
import { CollectionTableComponent } from './share/collection-table/collection-table.component';
import { ItemTableComponent } from './share/item-table/item-table.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DeliveryTableComponent } from './share/delivery-table/delivery-table.component';
import { CategoryComponent } from './share/category/category.component';
import { FieldsComponent } from './pages/fields/fields.component';
import { AdProductComponent } from './pages/ad-product/ad-product.component';
import { AdOrderComponent } from './pages/ad-order/ad-order.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    MessagesModule,
    RippleModule,
    ShareModule,
    TableModule,
    TagModule,
    KeyFilterModule,
    InputNumberModule,
    MultiSelectModule,
    InputTextModule,
    CheckboxModule,
    CascadeSelectModule,
    DropdownModule,
    FileUploadModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    PaginatorModule
  ],
  declarations: [
    AdminComponent,
    SidemenuComponent,
    FieldsComponent,
    AdProductComponent,
    AdOrderComponent,
    SingleTableComponent,
    ColorTableComponent,
    CollectionTableComponent,
    ItemTableComponent,
    ProductDetailComponent,
    DeliveryTableComponent,
    CategoryComponent,
    NewProductComponent,
    OrderDetailComponent,
  ],
  exports:[OrderDetailComponent]
})
export class AdminModule { }
