import React, { Component } from 'react'
import classes from './Registration.module.css'


class registration extends Component {
    constructor(props){
      super(props);
  
      this.state = {
        fields: {},
        errors: {},
        disable:false
      }
    }
  
    handleValidation(){
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
  
      //Name
      if(!fields["name"]){
        formIsValid = false;
        errors["name"] = "Cannot be empty";
      }
  
     else if(typeof fields["name"] !== "undefined"){
        if(!fields["name"].match(/^[a-zA-Z ]+$/)){
          formIsValid = false;
          errors["name"] = "Only letters";
        }      	
      }
  
      //Email
      if(!fields["email"]){
        formIsValid = false;
        errors["email"] = "Cannot be empty";
      }
  
     else if(typeof fields["email"] !== "undefined"){
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');
  
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "Email is not valid";
        }
      }
  
  
  
      this.setState({errors: errors});
      return formIsValid;
    }
  
    formSubmit(e){
      if(this.handleValidation()){
        this.setState({disable:false});
        localStorage.setItem('name',JSON.stringify(this.state.fields));
      }else{
        this.setState({disable:true});
        e.preventDefault();
      }
  
    }
  
    handleChange(field, e){    		
      let fields = this.state.fields;
      fields[field] = e.target.value;    
      this.setState({fields});
    }
  
    render(){
      return (

        <div className={classes.wrapper}>       	
          <form name="form" className={classes.registrationForm} onSubmit= {this.formSubmit.bind(this)}>
           <div>
           <h1>Registration Form</h1>
           </div>
             
            <input className={classes.inptName} ref="name" type="text"  placeholder="Name" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
            <p className={classes.nameErrors}>{this.state.errors["name"]}</p>
            <br/>
            
            
            <input className={classes.inptEmail} refs="email" type="text"  placeholder="Email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
            <p className={classes.emailErrors}>{this.state.errors["email"]}</p>
            <br/>
 
             
            <input className={classes.inptPhome} refs="phone" type="number"  placeholder="Phone" onChange={this.handleChange.bind(this, "phone")} value={this.state.fields["phone"]}/>
            <br/>
            
            
            <input className={classes.inptDob} refs="dob" type="date"  placeholder="DOB" onChange={this.handleChange.bind(this, "dob")} value={this.state.fields["dob"]}/>
             <br/>
             
            
            <textarea refs="bio" cols="10" rows="5"
              className={classes.comments} placeholder="BIO" 
              onChange={this.handleChange.bind(this, "bio")}>{this.state.fields["bio"]}
            </textarea>

            <div className={classes.inptGender} onChange={this.handleChange.bind(this, "gender")}>
               <input type="radio" value="MALE" name="gender"/> Male
                <input type="radio" value="FEMALE" name="gender"/> Female
            </div>

            <div className={classes.btn1}>
               <button disabled={this.state.disable} className={classes.btn} id="submit" value="Submit">SUBMIT</button>
            </div>
          </form>
        </div>
      )
    }
  }
  
 export default registration
  