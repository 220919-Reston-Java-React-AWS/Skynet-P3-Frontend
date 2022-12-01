export{}
import { render, screen } from '@testing-library/react';
import Register from './Register';
import {BrowserRouter as Router} from 'react-router-dom';


test('renders react component', async () => {
  render(
    <Router>
      <Register />,
    </Router>,
  );
    const linkElement = screen.getByText(/already have an account/i);
    expect(linkElement).toBeInTheDocument();
});