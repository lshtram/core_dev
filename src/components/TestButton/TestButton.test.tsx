import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TestButton } from './TestButton';

describe('TestButton', () => {
it('renders correctly', () => {
render(
<TestButton label="Test" />);
expect(screen.getByText('Test')).toBeDefined();
});
});