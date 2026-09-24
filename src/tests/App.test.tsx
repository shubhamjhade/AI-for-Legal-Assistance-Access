import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('App Integration', () => {
  it('renders the navbar and home page title', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Check for Navbar brand
    expect(screen.getByText('LegalEase AI')).toBeDefined();
    
    // Check for Home page heading
    expect(screen.getByText(/Demystifying/i)).toBeDefined();
  });

  it('renders the disclaimer in the footer', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Disclaimer/i)).toBeDefined();
  });
});
