import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TabGroup from '../components/tabGroup';
import Tab from '../components/tab';

describe('TabGroup Testing', () => {
    let consoleOutput = [];
    const originalErr = console.error;
    const originalWarn = console.warn;
    const mockedErr = output => consoleOutput.push(output);
    afterEach(() => { console.error = originalErr; console.warn = originalWarn; consoleOutput = [];});
    beforeEach(() => { console.error = mockedErr; console.warn = mockedErr; });

    test('Empty TabGroup', () => {
        const {container} = render(<TabGroup />);

        expect(container.textContent).toEqual('No Tabs Found.');
    });

    test('Not a Tab', () => {
        render(<TabGroup><div name="test">Test</div></TabGroup>);
        expect(consoleOutput[1]).toEqual('TabGroup must only contain the Tab element');
    });

    
    test('Empty Tab', () => {
        render(<TabGroup><Tab name="Test" /></TabGroup>);

        expect(screen.getByText("Empty Tab")).toBeInTheDocument();

        const button = screen.getByRole('button', { name: /test/i});
        expect(button.textContent).toEqual('Test');
        expect(button).toHaveAttribute("active", "true");
        expect(button).toHaveAttribute("name", "Test");
        expect(button).toHaveClass('tab-active');

        expect(consoleOutput[1]).toEqual('Tab Test is empty');
    });

    test('One Tab', () => {
        render(<TabGroup><Tab name="Test"><h1>Hello!</h1></Tab></TabGroup>);

        expect(screen.getByText("Hello!")).toBeInTheDocument();

        const button = screen.getByRole('button', { name: /test/i});
        expect(button.textContent).toEqual('Test');
        expect(button).toHaveAttribute("active", "true");
        expect(button).toHaveAttribute("name", "Test");
        expect(button).toHaveClass('tab-active');

        expect(consoleOutput).toEqual([]);
    });

    test('Multiple Tabs', () => {
        render(<TabGroup>
                <Tab name="Test"><h1>Hello!</h1></Tab>
                <Tab name="Click"><h1>I'm clicked!</h1></Tab>
               </TabGroup>);

        expect(screen.getByText("Hello!")).toBeInTheDocument();

        var test = screen.getByRole('button', { name: /test/i});
        expect(test.textContent).toEqual('Test');
        expect(test.textContent).not.toEqual("Click");
        expect(test).toHaveAttribute("active", "true");
        expect(test).toHaveAttribute("name", "Test");
        expect(test).toHaveClass('tab-active');

        var click = screen.getByRole('button', { name: /click/i});
        expect(click.textContent).toEqual('Click');
        expect(click.textContent).not.toEqual("Test");
        expect(click).toHaveAttribute("active", "false");
        expect(click).toHaveAttribute("name", "Click");
        expect(click).not.toHaveClass('tab-active');

        expect(consoleOutput).toEqual([]);
    });


    test('Multiple Tabs With Click', () => {
        render(<TabGroup>
                <Tab name="Test"><h1>Hello!</h1></Tab>
                <Tab name="Click"><h1>I'm clicked!</h1></Tab>
               </TabGroup>);

        expect(screen.getByText("Hello!")).toBeInTheDocument();
        try {
            expect(screen.getByText("I'm clicked!")).not.toBeInTheDocument();
        }
        catch (e) {
            expect(e.message).toMatch(/i'm clicked!/i);
        }

        // First tab
        var test = screen.getByRole('button', { name: /test/i});
        expect(test.textContent).toEqual('Test');
        expect(test.textContent).not.toEqual("Click");
        expect(test).toHaveAttribute("active", "true");
        expect(test).toHaveAttribute("name", "Test");
        expect(test).toHaveClass('tab-active');

        var click = screen.getByRole('button', { name: /click/i});
        expect(click.textContent).toEqual('Click');
        expect(click.textContent).not.toEqual("Test");
        expect(click).toHaveAttribute("active", "false");
        expect(click).toHaveAttribute("name", "Click");
        expect(click).not.toHaveClass('tab-active');

        userEvent.click(click);
        
        try {
            expect(screen.getByText("Hello!")).not.toBeInTheDocument();
        }
        catch (e) {
            expect(e.message).toMatch(/hello!/i);
       }
        expect(screen.getByText("I'm clicked!")).toBeInTheDocument();

        // Second tab
        var click = screen.getByRole('button', { name: /click/i});
        expect(click.textContent).toEqual('Click');
        expect(click.textContent).not.toEqual("Test");
        expect(click).toHaveAttribute("active", "true");
        expect(click).toHaveAttribute("name", "Click");
        expect(click).toHaveClass('tab-active');

        var test = screen.getByRole('button', { name: /test/i});
        expect(test.textContent).toEqual('Test');
        expect(test.textContent).not.toEqual("Click");
        expect(test).toHaveAttribute("active", "false");
        expect(test).toHaveAttribute("name", "Test");
        expect(test).not.toHaveClass('tab-active');

        expect(consoleOutput).toEqual([]);
    });
});
