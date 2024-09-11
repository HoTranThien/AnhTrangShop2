import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { GalleriaModule, GalleriaResponsiveOptions } from 'primeng/galleria';
import {isPlatformBrowser} from "@angular/common";
import { MyServiceService } from '../../../service/my-service.service';
import { SpinerComponent } from '../../../share/spiner/spiner.component';
import { MessageComponent } from '../../../share/message/message.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit ,OnDestroy{

  constructor(private myservice:MyServiceService,) { }
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
  collections:any;
  ngOnInit():void {
    this.images = ["../../../../assets/panel 1.jpg",
      "../../../../assets/panel 2.jpg",
      "../../../../assets/panel 3.jpg"
      
    ];
    this.loading =true;
    this.myservice.getData(this.myservice.getlink('api/collection/fulldetail')).subscribe(data=>{
      this.collections=data;
      this.loading = false;
    })
    this.interval = setInterval(()=>{
      if(this.index == 2) this.index =0;
      else this.index++;
    },2000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
