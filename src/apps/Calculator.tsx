import React, { useState } from 'react';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (n: string) => {
    setDisplay(prev => prev === '0' ? n : prev + n);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      // Simple eval for demo purposes
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const buttons = [
    ['C', 'CE', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <div className="flex flex-col h-full bg-black/20 p-4">
      <div className="flex flex-col items-end justify-end h-24 mb-4 px-2">
        <span className="text-xs text-white/40 mb-1">{equation}</span>
        <span className="text-4xl font-light text-white">{display}</span>
      </div>
      <div className="grid grid-cols-4 gap-1 flex-1">
        {buttons.flat().map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === 'C' || btn === 'CE') clear();
              else if (btn === '=') calculate();
              else if (['+', '-', '*', '/', '%'].includes(btn)) handleOperator(btn);
              else handleNumber(btn);
            }}
            className={`
              flex items-center justify-center rounded-md text-sm font-medium transition-colors
              ${btn === '=' ? 'bg-blue-600 hover:bg-blue-500 col-span-2' : 
                ['+', '-', '*', '/', '%', 'C', 'CE'].includes(btn) ? 'bg-white/5 hover:bg-white/10' : 
                'bg-white/10 hover:bg-white/20'}
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};
