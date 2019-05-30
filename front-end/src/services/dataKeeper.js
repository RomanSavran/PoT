class DataKeeperService {
    constructor () {
        this.treeRestApi = new Map();
        this.initialTreeData = [
            {
                name: 'contexts',
                label: 'PoT',
                root: true,
                path: '/',
                _collapsed: false,
                children: []
            }
        ];
    }
}

export const dataKeeperService = new DataKeeperService();