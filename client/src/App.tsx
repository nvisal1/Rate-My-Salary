import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import posed from 'react-pose';

const SERVER = axios.create({
  baseURL: 'http://localhost:5000',
});

const GOOD_SALARY_MESSAGE = 'Awesome job! You\'re making more money than we predicted.'
const EQUAL_SALARY_MESSAGE = 'You\'re right on track! Your salary matches our prediction.';
const BAD_SALARY_MESSAGE = 'You should ask for a raise. We predicted that you should be making more money.';

const Square_Toggle = posed.div({
  square_left: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#512E67',
    height: '100%',
    width: '30%',
    zIndex: 99,
    transition: { 
      duration: 450,
      ease: 'linear'
    },
  },
  square_right: {
    position: 'absolute',
    right: 0,
    top: 0,
    left: '30%',
    backgroundColor: '#512E67',
    height: '100%',
    width: '70%',
    zIndex: 99,
    transition: {
      duration: 450,
      ease: 'linear'
    },
  }
});

class App extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      experience: null,
      salary: null,
      predicted_salary: 0.00,
      form: true,
      form_alt: false,
      result_alt: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  getPrediction = async(event: any) => {
    event.preventDefault();
    const response = await SERVER.get(`/predict?experience=${this.state.experience}`);
    this.setState({ predicted_salary: response.data.predicted_salary, form: false, form_alt: true });
    setTimeout(() => {
      this.setState({ result_alt: false });
    }, 500);
  }

  submitFinish = () => {
    this.setState({ form: true });
  }

  getSalaryRating = () => {
    if (this.state.salary > this.state.predicted_salary.toFixed(2)) {
      return GOOD_SALARY_MESSAGE;
    } else if (this.state.salary === this.state.predicted_salary.toFixed(2)) {
      return EQUAL_SALARY_MESSAGE;
    } else {
      return BAD_SALARY_MESSAGE;
    }
  }

  render() {
    return (
      <div>
        <Square_Toggle pose={ this.state.form ? 'square_right' : 'square_left' }></Square_Toggle>
        <div className='Salary-Prediction__form-card'>
          <div className='Salary-Prediction__form-card__title'>
            Rate My Salary
          </div>
          <form className='Salary-Prediction__form-card__form' onSubmit={ this.getPrediction }>
            <div className='form-card__form__input-wrapper'>
              <input 
                className='form__input-wrapper__input'
                type='number'
                placeholder='Years of experience'
                value={ this.state.experience }
                onChange={ this.handleInputChange } 
                name='experience'
              />
            </div>
            <div className='form-card__form__input-wrapper'>
              <input
                className='form__input-wrapper__input'
                type='number'
                placeholder='Current annual salary'  
                value={this.state.salary}
                onChange={this.handleInputChange} 
                name='salary'
              />
            </div>
            <div className='form-card__form__submit-wrapper'>
              <input className='form__submit-wrapper__submit' type='submit' value='Rate' />
            </div>
          </form>
        </div>
        <div className='Salary-Prediction__result-card'>
          <div className='Salary-Prediction__result-card__title'>
            Results
          </div>
          <div className='Salary-Prediction__result-card__results'>
            <div className='result-card__results__result'>
              <div className='results__result__title'>
                Years Of Experience
              </div>
              <div className='results__result__value'>
                { this.state.experience }
              </div>
            </div>
            <div className='result-card__results__result'>
              <div className='results__result__title'>
                Current Annual Salary
              </div>
              <div className='results__result__value'>
                ${ this.state.salary }
              </div>
            </div>
            <div className='result-card__results__result'>
              <div className='results__result__title'>
                Predicted Annual Salary
              </div>
              <div className='results__result__value'>
                ${ this.state.predicted_salary.toFixed(2) }
              </div>
            </div>
          </div>
          <div className='Salary-Prediction__result-card__title'>
            { this.getSalaryRating() }
          </div>
          <div className='Salary-Prediction__result-card__title'> 
            <button className='Salary-Prediction__result-card__button' onClick={this.submitFinish}>
              Finish
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
