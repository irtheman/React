import {ifVal, convertToArray} from '../components/components-helpers';

describe('ifVal tests', () => {
  test('ifVal is true', () => {
    expect(ifVal(true)).toBeTruthy();
  });

  test('ifVal is null - ignored by React', () => {
    expect(ifVal(false)).toBeNull();
  });

  test('ifVal is "my value"', () => {
    expect(ifVal(true, 'my value')).toEqual('my value');
  });

  test('ifVal is "the false text"', () => {
    expect(ifVal(false, 'the true text', 'the false text')).toEqual('the false text');
  });

  test('ifVal depends on isGuest', () => {
    var isGuest = true;
    var handleGuest = () => "Hello Guest!";
    var handleUser = () => "Welcome Back!";
    expect(ifVal(isGuest, handleGuest(), handleUser())).toEqual("Hello Guest!");

    isGuest = false;
    expect(ifVal(isGuest, handleGuest(), handleUser())).toEqual("Welcome Back!");
  });

  test('convertToArray', () => {
    expect(convertToArray(null)).toEqual(expect.arrayContaining([]));
    expect(convertToArray(['test'])).toEqual(expect.arrayContaining(['test']));
    expect(convertToArray('test')).toEqual(expect.arrayContaining(['test']));
  });
});
