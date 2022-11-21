import { render, screen, cleanup } from '@testing-library/react';
import InfoPage from '../InfoPage/InfoPage';
import '@testing-library/jest-dom/extend-expect';

afterEach(() => {
    cleanup();
})

// info page test
test('should render info page component', () => {
    render(<InfoPage />);
    const InfoPageComponent = screen.getByTestId('infopage-test');
    expect(InfoPageComponent).toBeInTheDocument();
    expect(InfoPageComponent).toHaveTextContent('Info');
});

