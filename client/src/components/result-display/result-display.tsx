import React from 'react';
import './result-display.css';
import { Card, CardProps } from '../card/card';
import { Button } from '../button/button';
import { Text } from '../text/text';
import { constants } from '../../constants';

interface ResultDisplayProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    title: string;
    cardInformation: CardProps[];
    predictedSalary: number;
    actualSalary: number;
}

const getSalaryRating = (params: { actualSalary: number, predictedSalary: number }): string => {
    const { actualSalary, predictedSalary } = params;
    if (actualSalary > predictedSalary) {
      return constants.GOOD_SALARY_MESSAGE;
    } else if (actualSalary=== predictedSalary) {
      return constants.EQUAL_SALARY_MESSAGE;
    } else {
      return constants.BAD_SALARY_MESSAGE;
    }
}

const renderCards = (cardInformation: CardProps[]) => {
    return cardInformation.map((cardProps: CardProps) => {
        return (
            <Card
                title={ cardProps.title }
                value={ cardProps.value }
            ></Card>
        );
    });
}

export const ResultDisplay: React.FC<ResultDisplayProps> = (props: ResultDisplayProps) => {
    const { cardInformation, onClick, actualSalary, predictedSalary } = props;
    return (
        <div className='results-display'>
            <Text text='Results'></Text>
            <div className='results-display__card-grid'>
                { renderCards(cardInformation) }
            </div>
            <Text text={ getSalaryRating({ actualSalary, predictedSalary }) }></Text>
            <div className='results-display__button-wrapper'> 
                <Button text='Finish' onClick={ onClick }></Button>
            </div>
        </div>
    );
}