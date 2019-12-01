import React from 'react';
import './input-form.css';
import { Text } from '../text/text';
import { InputProps, Input } from '../input/input';
import { Button } from '../button/button';

interface InputFormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    title: string;
    inputInformation: InputProps[];
}

const renderInputs = (inputInformation: InputProps[]) => {
    return inputInformation.map((inputProps: InputProps) => {
        return (
            <div className='input-form__form__input-wrapper'>
                <Input
                    type={ inputProps.type }
                    placeholder={ inputProps.placeholder }
                    value={ inputProps.value }
                    onChange={ inputProps.onChange }
                    name={ inputProps.name }
                ></Input>
            </div>
        );
    });
}

export const InputForm: React.FC<InputFormProps> = (props: InputFormProps) => {
    return (
        <div className='input-form'>
            <Text text={ props.title }></Text>
            <form className='input-form__form' onSubmit={ props.onSubmit }>
                { renderInputs(props.inputInformation) }
                <div className='input-form__form__submit-wrapper'>
                    <Button text='Rate'></Button>
                </div>
            </form>
        </div>
    );
}