'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="ba709fa9213cb97e512ad5020614b7e073c522a3"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
