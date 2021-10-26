import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fs from 'fs';
import path from 'path';
import PopupInfo from '../components/popupInfo';

describe('Popup Info Testing', () => {
  let style = null;

  beforeAll(() => {
    const cssFile = fs.readFileSync(
      path.resolve(__dirname, '../sass/popupinfo.scss'),
      'utf8'
    )

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssFile;
  });

  test('Popup Info intended', () => {
      const {container, getByTestId} = render(<PopupInfo>Message</PopupInfo>);
      container.append(style);

      const image = getByTestId('img');
      const info = getByTestId('info')

      expect(image).toHaveAttribute("src", "default.png");
      expect(image).toHaveAttribute("alt", "default.png");
      expect(info).toHaveTextContent("Message");
      expect(info).not.toBeVisible();
  });

  test('Popup Info image', () => {
    const {container, getByTestId} = render(<PopupInfo img='../assets/alt.png'>Message</PopupInfo>);
    container.append(style);

    const image = getByTestId('img');
    const info = getByTestId('info')
      
    expect(image).toHaveAttribute("src", "../assets/alt.png");
    expect(image).toHaveAttribute("alt", "alt.png");
    expect(info).toHaveTextContent("Message");
  });

  test('Popup hover', () => {
    const {container, getByTestId} = render(<PopupInfo img='../assets/alt.png'>Message</PopupInfo>);
    container.append(style);

    const icon = getByTestId('icon');
    userEvent.hover(icon);

    const info = getByTestId('info')
    expect(info).toHaveTextContent("Message");
    expect(info).not.toBeVisible();
  });
});
