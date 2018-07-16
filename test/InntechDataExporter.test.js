import { DataExporter } from '../src';

describe('DataExporter', () => {
  const dataStore1 = { data: [1, 2, 3] };
  const dataStore2 = { username: 'David' };
  const dataStore3 = { isLogged: true };
  const dataStore4 = { moreData: [5, 6, 7] };
  const dataStore5 = {
    login: {
      user: {
        name: 'inntech',
        age: 27,
      },
    },
  };
  const storeMock = {
    ...dataStore1,
    ...dataStore2,
    ...dataStore3,
    ...dataStore4,
    ...dataStore5,
  };

  test('should call initialize', () => {
    const spy = jest.spyOn(DataExporter, 'initialize');
    expect(spy).not.toHaveBeenCalled();
    DataExporter.initialize('MyNewAppShare', storeMock);
    expect(spy).toHaveBeenCalled();
  });

  describe('testting methods', () => {
    beforeAll(() => {
      DataExporter.initialize('MyAppShare');
    });

    test('should be defined', () => {
      expect(window.MyAppShare).toBeDefined();
    });

    test('getAll: should return the current store', () => {
      expect(window.MyAppShare.getAll()).toEqual({});
    });

    test('addStore: should add data to store', () => {
      window.MyAppShare.addStore(dataStore1);
      expect(window.MyAppShare.getAll()).toEqual(dataStore1);
    });

    test('addStore: could be chain', () => {
      window.MyAppShare.addStore(dataStore2)
        .addStore(dataStore3)
        .addStore(dataStore4)
        .addStore(dataStore5);
      expect(window.MyAppShare.getAll()).toEqual(storeMock);
    });

    test('addStore: shouldnt add data to store if argument isnt an object as map', () => {
      window.MyAppShare.addStore('hola');
      const data = window.MyAppShare.getAll().hola;
      expect(data).toBeUndefined();
    });

    test('getFromStore: should return data from store if pass string', () => {
      expect(window.MyAppShare.getFromStore('data')).toEqual(storeMock.data);
    });

    test('getFromStore: should return data from store if pass an array of string', () => {
      const age = window.MyAppShare.getFromStore(['login', 'user', 'age']);
      expect(age).toBe(27);
    });

    test('getFromStore: should return undefined if pass random string', () => {
      const n = window.MyAppShare.getFromStore('bb');
      expect(n).toBeUndefined();
    });

    test('setFromStore: should update data if pass string', () => {
      window.MyAppShare.setFromStore('isLogged', false);
      const isLogged = window.MyAppShare.getFromStore('isLogged');
      expect(isLogged).toBeFalsy();
    });

    test('setFromStore: should update data if pass an array of string', () => {
      window.MyAppShare.setFromStore(['login', 'user', 'name'], 'bme');
      const name = window.MyAppShare.getFromStore(['login', 'user', 'name']);
      expect(name).toEqual('bme');
    });
  });
});
