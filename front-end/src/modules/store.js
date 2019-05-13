class Store {
    constructor () {
        this.treeRestApi = new Map();
        this.initialTreeData = [
            {
                name: 'contexts',
                label: 'PoT',
                root: true,
                path: '/',
                children: []
            }
        ];
    }
}

export const globalStore = new Store();