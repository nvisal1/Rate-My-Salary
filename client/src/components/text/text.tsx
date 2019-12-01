import React from 'react';
import './text.css';

interface TextProps {
    text: string;
}

export const Text: React.FC<TextProps> = (props: TextProps) => {
    return (
        <div className='text'>
            { props.text }
        </div>
    );
}