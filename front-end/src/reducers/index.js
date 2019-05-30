import { updateTree } from './tree'

const reducer = (state, action) => {
    return {
        tree: updateTree(state, action)
    }
};

export default reducer;