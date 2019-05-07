import * as API from '../services/api/api'
import * as Reducers from '../reducers'

const URL = new Map([
    ['equipments', 'Equipment/GetEquipment']
]);

const getReducer = id => Reflect.has(Reducers, id) ? Reducers[id] : Reducers.default;

export const fetch = async (rs) => {
    //rs - request settings
    const {id} = rs,
        reducer = getReducer(id);

    Reflect.set( rs, 'url', URL.get(id) );
    
    const res = await API.REQ( rs );

    if( res && res.data ) {
        res.data.forEach((doc, idx) => {
            const docR = reducer(doc);
        });
    }

    return res;
};