import React from 'react';
import './input.css';

export interface InputProps {
    type: 'number' | 'text';
    placeholder: string;
    value: string | number,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

export const Input: React.FC<InputProps> = (props: InputProps) => {
    return (
        <input
            className='input'
            type={ props.type }
            placeholder={ props.placeholder }  
            value={ props.value }
            onChange={ props.onChange } 
            name={ props.name }
        />
    );
}