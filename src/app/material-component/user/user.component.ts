import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../../shared/global-constants';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  

onAddProduct = new EventEmitter();
onEditProduct = new EventEmitter();

userForm!:FormGroup;
dialogAction:any="Add";
action:any="Add";
responseMessage:any;
categorys:any=[];

constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
private fb: FormBuilder,
private userService: UserService,
private categoryService: CategoryService,
private dialogRef: MatDialogRef<UserComponent>,
private snackbarService: SnackbarService,
private ngxService : NgxUiLoaderService){

}

  ngOnInit(): void {

    this.userForm= this.fb.group({
      firstName: [null, [Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      lastName:[null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null, [Validators.required, Validators.email]],
      street:[null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      city:[null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      state:[null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      country: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      phone: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      role:[null, Validators.required, Validators.pattern(GlobalConstants.nameRegex)]


    })
   
    if(this.dialogData.action==="Edit"){
      this.dialogAction="Edit";
      this.action="Update";
      this.userForm.patchValue(this.dialogData.data)
    }

    this.getUsers();
  }
getUsers(){
  this.categoryService.getUsers().subscribe((response:any)=>{
    this.categorys= response;
  },(error:any)=>{
    if(error.error?.message){
      this.responseMessage= error.error?.message;
    }
    else{
      this.responseMessage=GlobalConstants.genericError;
    }
    this.snackbarService.openSnackbar(this.responseMessage, GlobalConstants.error);
  })

}

handleSubmit(){
  if(this.dialogAction==="Edit"){
    this.edit();
  }
  else{
    this.delete();
  }
}

edit(){

  var formData= this.userForm.value;
  var data={
    id: this.dialogData.data.id,
    firstName: formData.firstName,
    lastName: formData.lastName,
    street:formData.street,
    city:formData.city,
    state: formData.state,
    country: formData.country, 
    categoryId: formData.categoryId,
    price : formData.price,
    description: formData.description
  }
  this.userService.update(data).subscribe((response:any)=>{
    this.dialogRef.close();
    this.onAddProduct.emit();
    this.responseMessage = response?.message;
    this.snackbarService.openSnackbar(this.responseMessage,"success");

  },(error)=>{
    this.dialogRef.close();
    if(error.error?.mesage){
      this.responseMessage= error.error?.message;
    }
    else{
      this.responseMessage= GlobalConstants.genericError;
    }
    this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error);
  })

}

delete(){
  
}
}



