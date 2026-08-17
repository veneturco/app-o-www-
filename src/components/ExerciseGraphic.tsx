import React from 'react';
import { Exercise } from '../types';
import { Stylized3DAvatarViewer } from './Stylized3DAvatarViewer';

interface ExerciseGraphicProps {
  exercise: Exercise;
}

export const ExerciseGraphic: React.FC<ExerciseGraphicProps> = ({ exercise }) => {
  return (
    <div className="w-full h-full">
      <Stylized3DAvatarViewer exercise={exercise} compact={false} />
    </div>
  );
};
