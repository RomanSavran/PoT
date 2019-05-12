class Store {
    constructor () {
        this.treeRestApi = new Map();
        this.initialTreeData = [
            {
                name: 'contexts',
                root: true,
                path: '/',
                children: []
            }
        ];
    }
}

export const globalStore = new Store();