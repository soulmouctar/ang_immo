import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PropertiesService } from 'src/app/services/properties.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {

  propertiesForm: FormGroup;
  propertiesSubscription: Subscription;
  properties:any[] = [];

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
       price: ['', Validators.required]
    });
  }

  onSubmitPropertiesForm(){
    const newProperty = this.propertiesForm.value
    this.propertiesService.createProperties(newProperty)
    console.log(this.propertiesService.properties)
  }

  resetForm(){
    this.propertiesForm.reset();
  }

}
