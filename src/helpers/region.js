import store from 'store';

const RegionHandler = {
    persian: {
        name: 'persian',
        slug: 'ir'
    },
    global: {
        name: 'global',
        slug: 'us'
    },
    init: () => {
        if (!store.get('region')) {
            store.set('region', 'ir');
        }
    },
    set: (region) => store.set('region', region),
    get: () => {
        if (!store.get('region')) {
            RegionHandler.init();
            return 'ir';
        }
        return store.get('region');
    }
};

export default RegionHandler;