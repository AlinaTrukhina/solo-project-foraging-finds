import { render, screen, cleanup } from '@testing-library/react';
import InfoPage from '../InfoPage/InfoPage';
import '@testing-library/jest-dom/extend-expect';
import AddPin from '../AddPin/AddPin';
import App from '../App/App';


afterEach(() => {
    cleanup();
})

// info page test
test('should render info page component', () => {
    render(<InfoPage />);
    const InfoPageComponent = screen.getByTestId('infopage-test');
    expect(InfoPageComponent).toBeInTheDocument();
    //expect(InfoPageComponent).toHaveTextContent('Info');
});

// Add Pin test
test('should render Add Pin component', () => {
    render(<AddPin />);
    const AddPinComponent = screen.getByTestId('add-pin-test');
    expect(AddPinComponent).toBeInTheDocument();
})
