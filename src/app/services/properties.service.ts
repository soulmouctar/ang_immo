import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
      surface : 50,
      rooms : 2,
      sold : true
    },
    {
      title : 'Petit appartement ',
      category : 'Appartement',
      surface : 30,
      rooms : 7,
      sold : false
    },
    {
      title : 'Villa dans la ville',
      category : 'Villa',
      surface : 100,
      rooms : 4,
      sold : true
    },
    {
      title : 'Une chambre et une douche',
      category : 'Entrer couché',
      surface : 100,
      rooms : 1,
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

  deleteProperty(index:any){
    this.properties.splice(index,1);
    this.emitProperties();
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


  updateProperty(property, index){
    this.properties[index]=property;
    this.emitProperties();
  }


}
