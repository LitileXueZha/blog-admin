import React from 'react';
import { connect } from 'react-redux';
import {
    Chip,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Zoom,
    Slide,
} from '@material-ui/core';

import './index.less';
import { getTagList } from '../../store/tag';
import FormTag from './FormTag';

class Tag extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: true,
        };
    }

    componentDidMount() {
        this.props.getTagList();
    }

    showCreateModal = () => {
        this.setState({ showModal: true });
    };

    render() {
        const { tag } = this.props;
        const { showModal } = this.state;

        return (
            <div className="container">
                <Chip
                    style={{ marginRight: 20 }}
                    color="primary"
                    label={<><ion-icon style={{ fontSize: '17px' }} name="ios-add" /> 新建</>}
                    onClick={this.showCreateModal}
                    clickable
                />
                {tag.items.map((val) => (
                    <Chip
                        className="tag"
                        key={val.id}
                        variant="outlined"
                        label={val.name}
                        avatar={<Avatar>{val.name[0]}</Avatar>}
                        onClick={() => console.log(val.name)}
                        title="点击编辑"
                    />
                ))}

                <Dialog
                    open={showModal}
                    onClose={() => this.setState({ showModal: false })}
                >
                    <DialogTitle>创建标签</DialogTitle>
                    <DialogContent>
                        <FormTag onSubmit={console.log} />
                    </DialogContent>
                    <DialogActions>
                        <Button>取消</Button>
                        <Button color="primary">保存</Button>
                    </DialogActions>
                </Dialog>
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
