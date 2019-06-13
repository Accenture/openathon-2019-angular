<p align="center">
    <img src="../../boring-theory-1/resources/header.png">
</p>


# Task 01 - Reactive Forms

## Introduction

For this task, we will be implementing Reactive Forms and validation in our application. 

<a target="_blank" href="https://angular.io/guide/reactive-forms#reactive-forms">Reactive Forms</a> help us to manage form inputs whose values can be changed over time. Reactive forms use the reactive style of programming for supporting forms. In addition, they are built around observables streams to keep track of the form data and we can manage it using the RxJs operators. 



## Implement the add-edit-event form as a Reactive Form 

Let's focus to implement the reactive forms in the add-edit-event form. 

1 - Import the *Reactive Form Module* into the app.module.ts (If need it)

2 - As we have already created the addEditForm (as a FormGroup type) in the add-edit-event.component.ts, we can make some changes now in the add-edit-event.component.html. First, we need to tell the form to not validate the fields with the *novalidate* attribute. Also we can remove the *#fform="ngForm"* attribute. In addition, for each input we have the attribute *formControlName* which is linked with the form property defined in the controller. Remove the *required* attribute for the inputs (if any) in add-edit-event.component.html, as we are going to manage this in a different way.

3 - Going back to our add-edit-event.component.ts controller. Do you remember that we have the *createForm()* method?. In this method, we were creating the form and adding default values to the properties (regarding if we were editing an event or adding a new one). At this point, we are going to add the form validations. Follow this <a target="_blank" href="https://angular.io/guide/reactive-forms#simple-form-validation">simple form validation example </a> and implement the following requirements for the *add-edit-event form* .

    Requirements: 
    * Title must be required.
    * Location must be required; with a minimum of 2 characters and a maximum of 25 characters.
    * Date must be required.
    * Description must be required; with a minimum of 10 characters and a maximum of 400 characters.


4 - After implementing the validation Requirements in the controller, edit the add-edit-event.component.html to show the errors to the user if needed. As before, follow the <a target="_blank" href="https://angular.io/guide/reactive-forms#simple-form-validation">simple form validation example </a> to complete this task. 

For displaying the errors in the HTML use the <a target="_blank" href="https://material.angular.io/components/form-field/overview#error-messages">mat-error</a> component from Angular Material.

In order to access to the form property you can use the following: 
*form_name.get('property_name').hasError('error_type')* for instance: 
```javascript 
addEditForm.get('phone_number').hasError('required') &&  addEditForm.get('phone_number').touched
```


Make sure the form is not submitted with errors. To achieve this you can use the disabled attribute in your button and the *form invalid* property



## Managing Validations Messages

At this stage, you should be able to see the errors if any but you will have noticed how quick our HTML code is getting messy with all these error messages. For a simple form this should be fine, but for complex ones that could be an issue. Lucky for us there are other ways to manage this from our controller.

In our controller what we need to do is to manage the errors from the form and what message (if any) we want to show. 

Use the following example to implement this in add-edit-event form. 

In this example, we have the *Add Contact* form that has three fields: name, surname, and phone with some requirements. In its controller we manage the possible form errors as it follows;

```javascript
// Add-Contact.controller.ts
...
// Add Contact form 
this.addContact = this.fb.group({
        name: [this.event.title, Validators.required],
        surname: [this.event.location, Validators.required],
        phone: [this.event.description, Validators.required]
    });

// Create an object, with the form properties with requirements and their error messages.

validationMessages = {
    name: { 
        required : 'The field is required'
        },
    surname: {
        required : 'The field is required'
    },
    phone : {
        required : 'The field is required'
    }
}

// Create an object with the required form properties and set them to be an empty string. We will assign the value to be equal to the error messages if any.
formErrors = {
    name: '',
    surname: '', 
    phone : ''
}

```

We want to be aware of any change in the *addContact* form. For that reason, after we have created the form we will *subscribe* to its *valueChanges* event that returns an observable. Then whenever a change is made we will pass the data into a new method that will process the data in order to check if there are errors. 

```javascript
...
createForm(){

this.addContact = this.fb.group({
        name: [this.event.title, Validators.required],
        surname: [this.event.location, Validators.required],
        phone: [this.event.description, Validators.required]
    });

this.addContact.valueChanges.subscribe(data => this.onValueChanged(data));

}
...

```


*onValueChanged* method is going to check if there is an error in the form properties regarding their values. If there is, then it will assign the error message that we have defined in the *validationMessages* object into the correspondent formErrors property.

```javascript
onValueChanged(data?: any) {
    if (!this.addContact) { return; }
    const form = this.addContact;
    for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = ''; // clears previous error messages if any
        const control = form.get(field);
        if (control && control.dirty && !control.valid) { //we are using the dirty property here but you could use any other. 
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key];
            }
        }
        }

    }
    }
}

```

Now the last step is to simplify the HTML code to display that errors. But this time using only one line of code for each field to display all the possible errors. 

```html
    <mat-form-field>
    <input matInput placeholder="Surname" type="text" formControlName="surname" />
    <mat-error *ngIf="formErrors.surname">{{formErrors.surname}} </mat-error>
    </mat-form-field>
```


## Beyond The Scope
By yourself implement the requirements validation for the login form as you consider. 

<p align="center">
    <img src="../../boring-theory-1/resources/header.png">
</p>
