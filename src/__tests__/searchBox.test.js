import React from 'react';
import {render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../components/searchBox';
import fs from 'fs';
import path from 'path';

describe('SearchBox Testing', () => {
  const data = ['test', 'testing', 'error', 'react', 'reactjs', 'search', 'searching'];
  let style = null;
  let consoleOutput = [];
  const originalErr = console.error;
  const mockedErr = output => consoleOutput.push(output);
  afterEach(() => { console.error = originalErr; consoleOutput = [];});
  beforeEach(() => console.error = mockedErr);

  beforeAll(() => {
    const cssFile = fs.readFileSync(
      path.resolve(__dirname, '../sass/searchBox.scss'),
      'utf8'
    )

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssFile;
  });

  const filter = (query) => {
    consoleOutput = [];
    if (query) {
        const results = data.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        results.forEach(el => {
            console.error(el)
        })
    }

    return 'error';
  };

  test('SearchBox Search', () => {
    jest.useFakeTimers();
    const {getByTestId} = render(<SearchBox onSearch={q => filter(q)} />);
    const input = getByTestId('search-query');

    userEvent.type(input, "test");
    jest.runAllTimers();

    expect(consoleOutput).toEqual([
        'test',
        'testing'
    ]);
  });

  test('SearchBox Clear', () => {
    jest.useFakeTimers();
    const {getByTestId} = render(<SearchBox onSearch={q => filter(q)} />);
    const input = getByTestId('search-query');
    const img = getByTestId('search-image');

    userEvent.type(input, "test");
    jest.runAllTimers();

    expect(consoleOutput).toEqual([
        'test',
        'testing'
    ]);

    userEvent.click(img);
    
    expect(consoleOutput).toEqual([]);
  });


  test('SearchBox Throttle', async () => {
    jest.useFakeTimers();
    const {getByTestId} = render(<SearchBox onSearch={q => filter(q)} throttle={500} />);
    const input = getByTestId('search-query');

    userEvent.type(input, "test");

    expect(consoleOutput).toEqual([]);

    jest.runAllTimers();

    await waitFor(() => {
        expect(consoleOutput).toEqual([
            'test',
            'testing'
        ]);
    });
  });
  
  test('SearchBox Error', async () => {
    jest.useFakeTimers();
    const {container, getByTestId} = render(<SearchBox onSearch={q => filter(q)} />);
    container.append(style);
    const input = getByTestId('search-query');

    userEvent.type(input, "test");
    jest.runAllTimers();

    expect(consoleOutput).toEqual([
        'test',
        'testing'
    ]);
    await waitFor(() => {
        const err = getByTestId('search-error');
        expect(err).toHaveTextContent(/error/i);
    });
  });
});
