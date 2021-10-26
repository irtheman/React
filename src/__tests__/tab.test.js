import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tab from '../components/tab';

describe('Tab Testing', () => {
    let consoleOutput = [];
    const originalErr = console.error;
    const mockedErr = output => consoleOutput.push(output);
    afterEach(() => { console.error = originalErr; consoleOutput = [];});
    beforeEach(() => console.error = mockedErr);

    test('Tab is always null', () => {
        const {container} = render(<Tab />);

        expect(container.root === undefined).toBeTruthy();
    });

    test('Tab has name', () => {
        const {container} = render(<Tab name='theTab' />);

        expect(container.root === undefined).toBeTruthy();
        expect(consoleOutput).toEqual([
            'Tab element must contain some content'
        ]);
        expect(consoleOutput).not.toEqual([
            'Tab element must have name'
        ]);
    });

    test('Tab has content', () => {
        const {container} = render(<Tab><h1>Hello!</h1></Tab>);

        expect(container.root === undefined).toBeTruthy();
        expect(consoleOutput).toEqual([
            'Tab element must have name'
        ]);
        expect(consoleOutput).not.toEqual([
            'Tab element must contain some content'
        ]);
    });

    test('Tab has name and content', () => {
        const {container} = render(<Tab name='theTab'><h1>Hello!</h1></Tab>);
        
        expect(container.root === undefined).toBeTruthy();
        expect(consoleOutput).toEqual([]);
    });
  });
