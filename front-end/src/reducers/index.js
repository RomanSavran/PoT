export const treeTube = (elem) => {
    let result = {};

    try {
        let name = Reflect.get(elem, '@id') || '';

        result = {
            name: name ? name.split(':')[1] : '',
            children: []
        };

    }catch (err) {
        console.log('parse tree response error: ', err);
    }

    return result;
};

