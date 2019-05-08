import React from 'react';
import PropTypes from 'prop-types';

import '../../less/layouts/Loader.less';

const Loader = ({data}) => (
    <React.Fragment>
        <div id="loader">
            <svg height={data.size} width={data.size}>
                <use xlinkHref="#spinner_2" xmlnsXlink="http://www.w3.org/1999/xlink"></use>
            </svg>
        </div>

    </React.Fragment>
);
Loader.propTypes = {
    data: PropTypes.shape({
        size: PropTypes.number
    })
}

export default Loader;