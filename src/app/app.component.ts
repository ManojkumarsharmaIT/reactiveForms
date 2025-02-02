import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CustomDirectiveDirective } from './shared/custom-directive.directive';

@Component({
  selector: 'app-root',
  standalone: true, // Ensures it's a standalone component,
  imports: [CommonModule, ReactiveFormsModule,CustomDirectiveDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'reactiveForms';
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
  hobbiesArray:string[]=['Reading','Gaming','Weightlifting'];
  signUpForm= new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    age:new FormControl('',[Validators.required,Validators.min(10),Validators.max(40)]),
    email:new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
    pass:new FormControl('',[Validators.required,Validators.pattern(this.passwordPattern)]),
    gender:new FormControl('',[Validators.required]),
    country:new FormControl('',[Validators.required]),
    hobbies:new FormArray([],[Validators.required]),
    accept:new FormControl(false,[Validators.requiredTrue])
  });
  onchange(e:any){
        const checkedValue=e.target.value;
        const checked=e.target.checked;
        console.log(checkedValue,checked);

        const checkedArray=this.signUpForm.get('hobbies') as FormArray;
        if(checked){
           checkedArray.push(new FormControl(checkedValue));
        }else{
           let i:number=0;
           checkedArray.controls.forEach(item=>{
            if(item.value == checkedValue){
              checkedArray.removeAt(i);
            }
            i++;
           });
        }
  }
  handleSubmit(){
    console.log(this.signUpForm.value);
  }

  get f(){
    return this.signUpForm.controls;
  }
}
