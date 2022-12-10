import { render, screen, cleanup } from '@testing-library/react';
import InfoPage from '../InfoPage/InfoPage';
import '@testing-library/jest-dom/extend-expect';
import AddPin from '../AddPin/AddPin';

afterEach(() => {
    cleanup();
})

