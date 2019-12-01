import React from 'react';
import './card.css';

export interface CardProps {
    title: string;
    value: string;
}

export const Card: React.FC<CardProps> = (props: CardProps) => {
    return (
        <div className='card'>
            <div className='card__title'>
                { props.title }
            </div>
            <div className='card__value'>
                { props.value }
            </div>
        </div>
    );
}