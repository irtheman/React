import React from 'react';
import {render, waitForElementToBeRemoved} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fs from 'fs';
import path from 'path';
import Toast from '../components/toast';
import altIcon from '../assets/alt.png';

describe('Toast Testing', () => {
  let toastProperties = [];
  let style = null;

  beforeAll(() => {
    const cssFile = fs.readFileSync(
      path.resolve(__dirname, '../sass/toast.scss'),
      'utf8'
    )

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssFile;
  });

  beforeEach(() => {
    toastProperties = [{
        id: 1,
        title: 'Test',
        description: 'This is a toast',
        backgroundColor: '#f0ad4e',
        icon: altIcon
    }]
  });

  test('Toast Not Visible', () => {
    const {container} = render(<Toast 
                                                  toastList={[]} 
                                                  position={'bottom-left'} 
                                                  autoDelete={true} 
                                                  autoDeleteTime={500}
                                                 />
                                              );
    container.append(style);

    const toast = container.firstChild;
    expect(toast.firstChild).toBeNull();
  });

  test('Toast is Visible', () => {
    const {container} = render(<Toast 
                                                toastList={toastProperties} 
                                                position={'bottom-left'} 
                                                autoDelete={true} 
                                                autoDeleteTime={500}
                                                />
                                            );
    container.append(style);
    const toast = container.firstChild;

    expect(toast.firstChild).not.toBeNull();
  });

  test('Toast Close Test', () => {
    const {container, getByRole} = render(<Toast 
                                              toastList={toastProperties} 
                                              position={'bottom-left'} 
                                           />
                                         );
    container.append(style);
    const toast = container.firstChild;
    const close = getByRole('button');

    expect(toast.firstChild).not.toBeNull();

    userEvent.click(close);
    expect(toast.firstChild).toBeNull();
  });

  test('Toast AutoDelete Test', async () => {
    const {container} = render(<Toast 
                                  toastList={toastProperties} 
                                  position={'bottom-left'} 
                                  autoDelete={true} 
                                  autoDeleteTime={500}
                                />
                              );
    container.append(style);
    const toast = container.firstChild;

    expect(toast.firstChild).not.toBeNull();
    await waitForElementToBeRemoved(toast.firstChild);
    expect(toast.firstChild).toBeNull();
  });
});
