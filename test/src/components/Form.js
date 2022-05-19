/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import formImg from '../images/form-img.jpg';
import { useNavigate } from "react-router-dom";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

const Form = () => {
    const navigate = useNavigate();

    const initialState = {
      name: 'Asher',
      email: 'ash@test.com',
      password: 'asdfghjk',
      confirmPassword: 'asdfghjk',
      number: '222-333-6789',
      checked: false,
      errors: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        number: '',
        checked: ''
      }
    };
  

const [formData, setFormData] = useState(initialState);

 const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const {password} = formData;
    let errors = formData.errors;

    switch (name) {
      case 'name': 
        errors.name = 
          value.length < 5
            ? 'Full Name must be at least 5 characters long!'
            : '';
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be at least 8 characters long!'
            : '';
        break;
      case 'confirmPassword': 
        errors.confirmPassword = 
            password !== value
              ? 'Passwords do not match!'
              : '';
        break;
      case 'number': 
        errors.number = 
          value.match(/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-. ]?([0-9]{4})$/)
            ? ''
            : 'Invalid phone number!';
        break;
      default:
        break;
    }

       setFormData({...formData, [name]: value});
  }

  const handleCheck = () => {
     let errors = formData.errors;

    if(checked === true) {
         errors.checked = 'You need to accept terms and conditions';
    } else {
        errors.checked = ''
    }

    setFormData((prevState) => {
        return {
            ...prevState,
            checked: !prevState.checked
        }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = formData.errors;
    
    if(validateForm(errors)) {
    navigate('/chart', {replace: true});
    console.info('form sent');
     setFormData({checked: false, email: '', password:'', confirmPassword:'', name:'', number:''});
    
  } else {
     alert("No field should be empty");
  }
    
   setFormData({errors});
   console.log(formData);
  };

 const {
      name,
      email,
      password,
      confirmPassword,
      number,
      checked,
      errors,
    } = formData;
    
    return (
     <section className="login">
        <div className="login-container">
            <div className="login-img">
                <img src={formImg} alt="Form" />
                 <div className="login-img-text">
                    <h3 className="heading-tertiary">Choose a data range</h3>
                    <p className="text-paragraph-14">Lorem ipsum dolor sit amet, consectetur adispicing elit. Mauris imperdiet bibendum</p>
                </div>
            </div>
            <div className="login-content">
                <div className="form-heading">
                    <h3 className="heading-secondary">Create an account</h3>
                </div>
                <form className="form"  onSubmit={handleSubmit} noValidate>
                     <div className="form-control">
                        <label htmlFor="email">Your email address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="input-control"
                            noValidate
                        />
                        {errors.email.length > 0 && 
                        <span className='error'>{errors.email}</span>
                        }
                    </div>
                    <div className="form-control">
                        <label htmlFor="pwd">Your password</label>
                        <input 
                            type="password" 
                            id="pwd" 
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="input-control" 
                            noValidate
                        />
                         {errors.password.length > 0 && 
                            <span className='error'>{errors.password}</span>
                        }
                    </div>
                    <div className="form-control">
                        <label htmlFor="cpwd">Confirm your password</label>
                        <input 
                            type="password" 
                            id="cpwd" 
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            className="input-control" 
                            noValidate
                        />
                        {errors.confirmPassword.length > 0 && 
                        <span className='error'>{errors.confirmPassword}</span>
                        }
                    </div>
                    <div className="form-control">
                        <label htmlFor="name">Your full name</label>
                        <input 
                            type="text" 
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className="input-control"
                            noValidate
                         />
                        {errors.name.length > 0 && 
                        <span className='error'>{errors.name}</span>
                        }
                    </div>
                    <div className="form-control">
                        <label htmlFor="number">Your phone number</label>
                        <input 
                            type="tel" 
                            id="number"
                            name="number" 
                            value={number}
                            onChange={handleChange}
                            placeholder="xxx-xxx-xxxx"
                            className="input-control"
                            noValidate
                        />
                         {errors.number.length > 0 && 
                        <span className='error'>{errors.number}</span>
                        }
                    </div>
                    <div className="form-checkbox">
                        <input 
                            type="checkbox" 
                            name="checkbox" 
                            checked = {checked}
                            onChange={handleCheck}
                            className="checkbox"
                            required = "required"
                        />
                        <label htmlFor="checkbox" style={{fontWeight: checked === true ? "bolder" : ""}}>I read and agree terms and conditions ?</label>
                    </div>
                     {errors.checked.length > 0 && 
                        <span className='error'>{errors.checked}</span>
                    }
                    <div className="form-checkbox" style={{display: "none"}}>
                        <input 
                            type="checkbox" 
                            checked = {checked}  
                            onChange={handleCheck} 
                            id="checkbox"
                        />
                            
                        <label htmlFor="javascript" style={{fontWeight: checked === true ? "bolder" : ""}}>Javascript</label>
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={!email || !password || !confirmPassword || !number || !name || checked === false}>Create account</button>
                </form>
            </div>
        </div>
    </section>
    )
  };

export default Form;