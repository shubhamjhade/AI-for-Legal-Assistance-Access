import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultDisplay from '../components/ResultDisplay';

describe('ResultDisplay Component', () => {
  it('renders loading state correctly', () => {
    render(<ResultDisplay isLoading={true} result={null} error={null} />);
    expect(screen.getByRole('status')).toBeDefined();
    expect(screen.getByText(/Analyzing legal text/i)).toBeDefined();
  });

  it('renders error state correctly', () => {
    render(<ResultDisplay isLoading={false} result={null} error="Network failed" />);
    expect(screen.getByRole('alert')).toBeDefined();
    expect(screen.getByText('Network failed')).toBeDefined();
  });

  it('renders markdown result correctly', () => {
    const markdown = '# Summary\n\n- Point 1\n- Point 2';
    render(<ResultDisplay isLoading={false} result={markdown} error={null} />);
    
    // Disclaimer should always be there when there's a result
    expect(screen.getByText(/The insights below are AI-generated/i)).toBeDefined();
    
    // The markdown content
    expect(screen.getByText('Summary')).toBeDefined();
    expect(screen.getByText('Point 1')).toBeDefined();
  });

  it('returns null when no data is provided', () => {
    const { container } = render(<ResultDisplay isLoading={false} result={null} error={null} />);
    expect(container.firstChild).toBeNull();
  });
});
