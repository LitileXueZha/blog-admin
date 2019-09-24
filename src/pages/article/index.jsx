import React from 'react';
import { Link } from 'react-router-dom';

import './index.less';

export default class Article extends React.Component {
    state = {};

    render() {
        return (
            <div className="container">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus perspiciatis natus saepe pariatur cumque laudantium consequatur, molestiae nobis maxime eligendi labore atque, nostrum minima. Distinctio nemo officiis consectetur illum eum.

                <Link to="/article/edit">写文章</Link>
            </div>
        );
    }
}
