import React, { Component } from 'react';
import './App.css';
import { constants } from './constants';
import { getSalaryPrediction } from './service';
import { Button } from './components/button/button';
import { InputProps } from './components/input/input';
import { Card, CardProps } from './components/card/card'; 
import { Text } from './components/text/text';
import { SlidingPanel } from './components/sliding-panel/sliding_panel';
import { InputForm } from './components/input-form/input-form';
import { ResultDisplay } from './components/result-display/result-display';

class App extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      experience: null,
      salary: null,
      predicted_salary: 0.00,
      form: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getInputProps = (): InputProps[] => {
    return [
      {
        type: 'number',
        placeholder: 'Years of experience',
        value: this.state.experience,
        onChange: this.handleInputChange,
        name: 'experience',
      },
      {
        type: 'number',
        placeholder: 'Current annual salary',
        value: this.state.salary,
        onChange: this.handleInputChange,
        name: 'salary',
      }
    ];
  }

  getCardProps = (): CardProps[] => {
    return [
      {
        title: 'Years Of Experience',
        value: this.state.experience,
      },
      {
        title: 'Current Annual Salary',
        value: this.state.salary,
      },
      {
        title: 'Predicted Annual Salary',
        value: this.state.predicted_salary.toFixed(2),
      }
    ];
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
    const response = await getSalaryPrediction({ experience: this.state.experience });
    this.setState({ predicted_salary: response.data.predicted_salary, form: false });
  }

  submitFinish = () => {
    this.setState({ form: true });
  }

  render() {
    return (
      <div className='Rate-My-Salary'>
        <SlidingPanel moveRight={ this.state.form }></SlidingPanel>
        <div className='Rate-My-Salary__form-card'>
          <InputForm
            onSubmit={ this.getPrediction }
            title='Rate My Salary'
            inputInformation={ this.getInputProps() }
          ></InputForm>
        </div>
        <div className='Rate-My-Salary__result-card'>
          <ResultDisplay
            title='Results'
            onClick={ this.submitFinish }
            cardInformation={ this.getCardProps() }
            actualSalary={ this.state.salary }
            predictedSalary={ this.state.predicted_salary }
          ></ResultDisplay>
        </div>
      </div>
    );
  }
}

export default App;
