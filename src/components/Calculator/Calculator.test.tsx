import { render, fireEvent, cleanup } from '@testing-library/react';
import { expect, test, describe, afterEach } from 'vitest';
import { Calculator } from '.';

describe('Calculator', () => {
  afterEach(() => {
    cleanup();
  });

  test('should display correct input when number buttons are clicked', () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('3'));
    expect(getByText('123')).toBeInTheDocument();
  });

  test('should prevent multiple consecutive operator inputs', async () => {
    const { getByText, findByTestId } = render(<Calculator />);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('+'));
    const result = await findByTestId('calc-result');
    expect(result).toHaveTextContent('1+');
  });

  test('should display correct input when operator buttons are clicked', async () => {
    const { getByText, findByTestId } = render(<Calculator />);
    fireEvent.click(getByText('/'));
    fireEvent.click(getByText('*'));
    fireEvent.click(getByText('-'));
    const result = await findByTestId('calc-result');
    expect(result).toHaveTextContent('-');
  });

  test('should clear input when C button is clicked', async () => {
    const { getByText, findByTestId } = render(<Calculator />);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('C'));
    const result = await findByTestId('calc-result');
    expect(result).toHaveTextContent('');
  });

  test('should evaluate expression correctly when equal button is clicked', async () => {
    const { getByText, findByTestId } = render(<Calculator />);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('='));
    const result = await findByTestId('calc-result');
    expect(result).toHaveTextContent('3');
  });

  test('should not allow input to start with / or *', async () => {
    const { getByText, findByTestId } = render(<Calculator />);
    fireEvent.click(getByText('/'));
    const resultAfterSplit = await findByTestId('calc-result');
    expect(resultAfterSplit).toHaveTextContent('');
    fireEvent.click(getByText('*'));
    const resultAfterMultiply = await findByTestId('calc-result');
    expect(resultAfterMultiply).toHaveTextContent('');
  });

  test('should have result empty when equal is clicked with empty input', async () => {
    const { getByText, findByTestId } = render(<Calculator />);
    fireEvent.click(getByText('='));
    const result = await findByTestId('calc-result');
    expect(result).toHaveTextContent('');
  });

  test('should display correct result for large numbers and long expressions', async () => {
    const { getByText, findByTestId } = render(<Calculator />);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('4'));
    fireEvent.click(getByText('5'));
    fireEvent.click(getByText('6'));
    fireEvent.click(getByText('*'));
    fireEvent.click(getByText('7'));
    fireEvent.click(getByText('8'));
    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('/'));
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('0'));
    fireEvent.click(getByText('0'));
    const result = await findByTestId('calc-result');
    expect(result).toHaveTextContent('123+456*789/100');
  });

  test('should clear input field after displaying Infinity', async () => {
    const { getByText, findByTestId } = render(<Calculator />);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('/'));
    fireEvent.click(getByText('0'));
    fireEvent.click(getByText('='));
    const result = await findByTestId('calc-result');
    expect(result).toHaveTextContent('Infinity');
    fireEvent.click(getByText('C'));
    const clearedResult = await findByTestId('calc-result');
    expect(clearedResult).toHaveTextContent('');
  });

  test('should update input field after evaluation', async () => {
    const { getByText, findByTestId } = render(<Calculator />);
    fireEvent.click(getByText('1'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('2'));
    fireEvent.click(getByText('='));
    const result = await findByTestId('calc-result');
    expect(result).toHaveTextContent('3');
  });
});
