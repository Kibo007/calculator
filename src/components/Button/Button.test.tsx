import { render, fireEvent, cleanup } from '@testing-library/react';
import { expect, test, describe, vitest, afterEach } from 'vitest';
import { Button } from '.';

const onClickMock = vitest.fn();

describe('Button', () => {
  afterEach(() => {
    vitest.resetAllMocks();
    cleanup();
  });

  test('should render with default styles', () => {
    const { getByRole } = render(<Button onClick={() => {}}>Click me</Button>);
    const button = getByRole('button');
    expect(button).toHaveClass(
      'bg-gray-700 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
    );
  });

  test('should render with additional className', () => {
    const { getByRole } = render(
      <Button onClick={() => {}} className="custom-class">
        Click me
      </Button>,
    );
    const button = getByRole('button');
    expect(button).toHaveClass(
      'bg-gray-700 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 custom-class',
    );
  });

  test('should display children text correctly', () => {
    const { getByRole } = render(
      <Button onClick={() => {}}>Test Button</Button>,
    );
    const button = getByRole('button');
    expect(button).toHaveTextContent('Test Button');
  });

  test('should trigger onClick function when clicked', () => {
    const { getByRole } = render(
      <Button onClick={onClickMock}>Click me</Button>,
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('should have correct aria-label attribute when rendered', () => {
    const { getByRole } = render(<Button onClick={() => {}}>Click me</Button>);
    const button = getByRole('button');
    expect(button).toHaveAttribute(
      'aria-label',
      'Calculator button for Click me',
    );
  });

  test('should have correct role attribute when rendered', () => {
    const { getByRole } = render(<Button onClick={() => {}}>Click me</Button>);
    const button = getByRole('button');
    expect(button).toHaveAttribute('role', 'button');
  });

  test('should handle rapid clicks without issues', () => {
    const { getByRole } = render(
      <Button onClick={onClickMock}>Click me</Button>,
    );
    const button = getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(5);
  });
});
