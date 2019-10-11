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
import { getTagList, addTag } from '../../store/tag';
import FormTag from './FormTag';

class Tag extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        };
        this.submitBtn = React.createRef();
    }

    componentDidMount() {
        this.props.getTagList();
    }

    showCreateModal = () => {
        this.setState({ showModal: true });
    };

    hideModal = () => {
        this.setState({ showModal: false });
    };

    handleSubmit = (values) => {
        this.props.addTag(values).then(this.hideModal);
    };

    render() {
        const { tag } = this.props;
        const { showModal } = this.state;

        return (
            <div className="container">
                <Chip
                    style={{ marginRight: 20, float: 'left' }}
                    color="primary"
                    label={<><ion-icon style={{ fontSize: '17px' }} name="ios-add" /> 新建</>}
                    onClick={this.showCreateModal}
                />
                <div style={{ overflow: 'auto' }}>
                    {tag.items.map((val) => (
                        <Chip
                            className="tag"
                            key={val.id}
                            variant="outlined"
                            label={val.name}
                            avatar={<Avatar style={{ textTransform: 'uppercase' }}>{val.name[0]}</Avatar>}
                            onClick={() => console.log(val.name)}
                            title="点击编辑"
                        />
                    ))}
                </div>

                <Dialog
                    open={showModal}
                    onClose={this.hideModal}
                >
                    <DialogTitle>创建标签</DialogTitle>
                    <DialogContent>
                        <FormTag ref={this.submitBtn} onSubmit={this.handleSubmit} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.hideModal}>取消</Button>
                        <Button color="primary" onClick={() => this.submitBtn.current.click()}>保存</Button>
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
        addTag: (params) => dispatch(addTag(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
