import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {

  propertiesForm: FormGroup;

  constructor(
    private formBuiler: FormBuilder,
    private propertiesService: PropertiesService
    ) { }

  ngOnInit(): void {
    this.initPropertiesForm()
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

    //console.log(this.propertiesForm.value)
  }


}
