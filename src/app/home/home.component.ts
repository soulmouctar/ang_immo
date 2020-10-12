import { Component, OnDestroy, OnInit, ɵConsole } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  dateNow = new Date();

  properties = [];
  propertiesSubscription : Subscription

  constructor(
    private propertiesService: PropertiesService
  ) { }

  ngOnInit(): void {
    // %---Methode pour les promisse
    // this.propertiesService.getProperties().then(
    //   (data:any[])=>{
    //     console.log(data);
    //     this.properties = data;
    //   }
    // ).catch(
    //   (error) => {
    //     console.log(error);
    //   }
    // );


    //%---methode pour observable
    // this.propertiesService.getProperties().subscribe(
    //   (data:any)=>{
    //     this.properties = data;
    //   },
    //   (error) =>{
    //     console.error(error);
    //   },
    //   () => {
    //     console.log("Observable Complete");
    //   }
    // )

    // Dans le cas de subscription
    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      (data)=>{
        this.properties = data;
      }
    );
    this.propertiesService.emitProperties();
  }


  getSoldValue(index){
    if(this.properties[index].sold){
      return 'red'
    }else{
      return 'green'
    }
  }

  ngOnDestroy(){
    this.propertiesSubscription.unsubscribe()
  }

}
