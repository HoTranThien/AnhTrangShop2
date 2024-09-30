import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { GalleriaModule, GalleriaResponsiveOptions } from 'primeng/galleria';
import {isPlatformBrowser} from "@angular/common";
import { HttpMethodService } from '../../../service/HttpMethod.service';
import { SpinerComponent } from '../../../share/spiner/spiner.component';
import { MessageComponent } from '../../../share/message/message.component';
import {lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit ,OnDestroy{

  constructor(private myservice:HttpMethodService,) { }
  @ViewChild('message') mymessage!:MessageComponent;
  loading = true;
  images:any[]|undefined;
  index:number=1;
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 1
    },
    {
        breakpoint: '768px',
        numVisible: 1
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

  interval:any;
  collections:any[] = [];

  async getCollection() {
    this.loading = true;
    let data: any = await lastValueFrom(this.myservice.getData(this.myservice.getlink('collection/getall')));
    data = data.data;

    this.collections = await Promise.all(data.map(async (d: any) => {
      let response:any = await lastValueFrom(this.myservice.getDataWithPageRequest(
        this.myservice.getlink("collection/getonewithproducts/" + d.id),0,5));
      let result:any[] = [];
      result = response.data.products;
      return {
        ...d,
        products: result
      };
    }));
    this.loading = false;
  }

  ngOnInit():void {
    this.images = ["../../../../assets/panel 1.jpg",
      "../../../../assets/panel 2.jpg",
      "../../../../assets/panel 3.jpg"
      
    ];
    this.getCollection();

    this.interval = setInterval(()=>{
      if(this.index == 2) this.index =0;
      else this.index++;
    },2000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
