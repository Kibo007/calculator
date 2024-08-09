'use client';
import { useState } from 'react';
import { Button } from '../Button';
import Image from 'next/image';
import cn from 'classnames';

export const Calculator = () => {
  const [input, setInput] = useState<string>('');

  const handleButtonClick = (value: string) => {
    const operators = ['/', '*', '-', '+'];
    const lastChar = input.slice(-1);

    if (
      (operators.includes(lastChar) && lastChar === value) ||
      (input.length === 0 && ['/', '*'].includes(value))
    ) {
      return;
    }

    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleEqual = () => {
    if (input === '') {
      return;
    }
    setInput(eval(input).toString());
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg pt-10 w-80">
      <div
        className="bg-gray-900 text-white text-right p-4 rounded-lg w-full mb-4 h-14"
        data-testid="calc-result"
      >
        {input}
      </div>

      <div className="grid grid-cols-4 gap-2 w-full">
        {[
          ['7', '8', '9', '/'],
          ['4', '5', '6', '*'],
          ['1', '2', '3', '-'],
        ].map((values) =>
          values.map((value) => (
            <Button key={value} onClick={() => handleButtonClick(value)}>
              {value}
            </Button>
          )),
        )}

        {['0', '.', '=', '+'].map((value) => (
          <Button
            className={cn({ 'col-span-2': value === '=' })}
            key={value}
            onClick={() =>
              value === '=' ? handleEqual() : handleButtonClick(value)
            }
          >
            {value}
          </Button>
        ))}

        <Button
          className="bg-red-600 text-white col-span-2"
          onClick={handleClear}
        >
          C
        </Button>
      </div>
    </div>
  );
};
