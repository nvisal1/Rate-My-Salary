import React from 'react';
import posed from 'react-pose';

interface SlidingPanelProps {
    moveRight: boolean;
}

const Animation = posed.div({
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

export const SlidingPanel: React.FC<SlidingPanelProps> = (props: SlidingPanelProps) => {
    return (
        <Animation 
            pose={ props.moveRight ? 'square_right' : 'square_left' }
        ></Animation>
    );
}