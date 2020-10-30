import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PropertiesService } from 'src/app/services/properties.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {

  propertiesForm: FormGroup;
  propertiesSubscription: Subscription;
  properties:any[] = [];

  indexToRemove;
  indexToUpdate;
  editMode = false;

  constructor(
    private formBuiler: FormBuilder,
    private propertiesService: PropertiesService
    ) { }

  ngOnInit(): void {
    this.initPropertiesForm();
    this.propertiesService.propertiesSubject.subscribe(
      (data)=> {
        this.properties = data;
      }
    );
    this.propertiesService.emitProperties();
  }

  initPropertiesForm(){
    this.propertiesForm = this.formBuiler.group({
       title: ['', Validators.required],
       category: ['', Validators.required],
       surface: ['', Validators.required],
       rooms: ['', Validators.required],
       description: '',
       price: ['', Validators.required],
       sold:''
    });
  }

  onSubmitPropertiesForm(){
    const newProperty = this.propertiesForm.value;
    if(this.editMode){
      this.propertiesService.updateProperty(newProperty, this.indexToUpdate);
    }else{
      this.propertiesService.createProperties(newProperty);
    }

  }

  resetForm(){
    this.editMode=false;
    this.propertiesForm.reset();
  }

  onDeteleProperty(index:any){
      if(confirm("Êtes-vous sûr de vouloir supprimer cet élément?")){
      this.propertiesService.deleteProperty(index);
    }
  }

  onEditProperty(property:any){
    this.editMode=true;

    this.propertiesForm.get('title').setValue(property.title);
    this.propertiesForm.get('category').setValue(property.category);
    this.propertiesForm.get('surface').setValue(property.surface);
    this.propertiesForm.get('rooms').setValue(property.rooms);
    this.propertiesForm.get('description').setValue(property.description);
    this.propertiesForm.get('price').setValue(property.price);
    this.propertiesForm.get('sold').setValue(property.sold);

    const index = this.properties.findIndex(
      (propertyElem)=>{
        if(propertyElem==property){
          return true;
        }
      }
    );
    this.indexToUpdate=index;
  }


}
