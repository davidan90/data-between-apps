// @flow
type DataStore = { [string]: any };
type Exporter = {
  initialize(appId: string, store?: DataStore): void,
};

const getData = (search: string | Array<string>, store: DataStore): any => {
  if (search) {
    if (typeof search === 'string') {
      return store[search];
    }

    if (Array.isArray(search) && search.length) {
      return search.length === 1
        ? getData(search[0], store)
        : getData(search.slice(1), store[search[0]]);
    }
  }
};

const setData = (search: string | Array<string>, value: any, store: DataStore): any => {
  const s = store;
  if (search) {
    if (typeof search === 'string') {
      s[search] = value;
    }

    if (Array.isArray(search) && search.length) {
      if (search.length === 1) {
        setData(search[0], value, store);
      } else {
        setData(search.slice(1), value, store[search[0]]);
      }
    }
    return s;
  }
};

function createDataExporter(store: DataStore): Object {
  return function (): Object {
    this.store = store;

    this.getAll = () => {
      return this.store;
    };

    this.addStore = (newStore: DataStore): any => {
      if (typeof newStore === 'object' && !Array.isArray(newStore)) {
        this.store = Object.assign(this.store, newStore);
      }
      return this;
    };

    this.getFromStore = (search: string | Array<string>): any => {
      return getData(search, store);
    };

    this.setFromStore = (search: string | Array<string>, value: any) => {
      this.store = setData(search, value, store);
    };

    return Object.freeze({
      getAll: this.getAll,
      addStore: this.addStore,
      getFromStore: this.getFromStore,
      setFromStore: this.setFromStore,
    });
  }.call({});
}

export const DataExporter: Exporter = {
  initialize(appId: string, store: DataStore = {}): void {
    if (!window[appId]) {
      window[appId] = createDataExporter(store);
    }
  },
};
