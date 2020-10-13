import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { Observable, Subject } from 'rxjs';
// import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})

export class PropertiesService {

  properties = [
    {
      title : 'Ma super maison',
      category : 'Maison',
      sold : true
    },
    {
      title : 'Petit appartement ',
      category : 'Appartement',
      sold : false
    },
    {
      title : 'Villa dans la ville',
      category : 'Villa',
      sold : true
    }

  ];

  propertiesSubject = new Subject<any[]>();

  constructor() { }

  emitProperties(){
    this.propertiesSubject.next(this.properties);
  }

  createProperties(property){
    this.properties.push(property)
  }

  getProperties(){
    // LES PROMISSES
    // return new Promise(
    //   (resolve,reject)=>{
    //     if(this.properties && this.properties.length > 0){
    //       resolve(this.properties)
    //     }else{
    //       const error = new Error('properties does not exist or is empty');
    //       resolve(error)
    //     }
    //   }
    // );

    // LES OBSERVABLES
    return new Observable(
      (observer)=>{
      if(this.properties && this.properties.length > 0){
        observer.next(this.properties);
        observer.complete();
      }else{
        const error = new Error('properties does not exist or is empty');
        observer.error(error)
      }
    })
  }


}
