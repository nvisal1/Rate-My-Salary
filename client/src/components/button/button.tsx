import React from 'react';
import './button.css';

interface ButtonProps {
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <button className='button' onClick={ props.onClick }>
            { props.text }
        </button>
    );
}