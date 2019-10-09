import React from 'react';
import { connect } from 'react-redux';
import { Paper, Chip, Avatar } from '@material-ui/core';

import './index.less';
import { getTagList } from '../../store/tag';

class Tag extends React.Component {
    componentDidMount() {
        this.props.getTagList();
    }

    render() {
        const { tag } = this.props;

        return (
            <div className="container">
                <Chip
                    style={{ marginRight: 20 }}
                    color="primary"
                    label={<><ion-icon name="ios-add" />&nbsp;新建</>}
                    clickable
                />
                {tag.items.map((val) => (
                    <Chip
                        className="tag"
                        key={val.id}
                        variant="outlined"
                        label={val.name}
                        avatar={<Avatar>{val.name[0]}</Avatar>}
                    />
                ))}
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        tag: store.tag,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getTagList: (params) => dispatch(getTagList(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
