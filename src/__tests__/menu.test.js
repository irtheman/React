import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fs from 'fs';
import path from 'path';
import Menu from '../components/menu';

describe('Menu Testing', () => {
  let style = null;
  let fn = jest.fn();

  beforeAll(() => {
    const cssFile = fs.readFileSync(
      path.resolve(__dirname, '../sass/menu.scss'),
      'utf8'
    )

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssFile;
  });

  test('Menu Not Visible', () => {
    const {container, getByTestId} = render(<Menu>
        <button key="a" onClick={() => fn()}>
            Item 1
        </button>
    </Menu>);
    container.append(style);

    const button = getByTestId('menu-button');
    expect(button).not.toBeVisible();
  });

  test('Menu Visible', () => {
    const {container, getByTestId, getByRole} = render(<Menu>
        <button key="a" onClick={() => fn()}>
            Item 1
        </button>
    </Menu>);
    container.append(style);

    const img = getByRole('img');
    const button = getByTestId('menu-button');

    expect(button).not.toBeVisible();
    userEvent.click(img);
    expect(button).toBeVisible();
  });

  test('Menu Item Test', () => {
    const {container, getByTestId, getByRole} = render(<Menu>
        <button key="a" onClick={() => fn()}>
            Item 1
        </button>
    </Menu>);
    container.append(style);

    const img = getByRole('img');
    userEvent.click(img);

    const button = getByTestId('menu-button');
    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
