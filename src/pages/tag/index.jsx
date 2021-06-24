import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

import { MdAdd } from '../../assets/icons';
import './index.less';
import { getTagList, addTag, updateTag } from '../../store/tag';
import FormTag from './FormTag';

class Tag extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currTag: {},
            showModal: false,
        };
        this.submitBtn = React.createRef();
    }

    componentDidMount() {
        this.props.getTagList();
    }

    showCreateModal = (tag = {}) => {
        this.setState({
            showModal: true,
            currTag: tag,
        });
    };

    hideModal = () => {
        this.setState({ showModal: false });
    };

    handleSubmit = async (values) => {
        const { id } = this.state.currTag;

        if (id) {
            // 更新数据
            await this.props.updateTag(id, values);
        } else {
            // 添加
            await this.props.addTag(values);
        }

        this.hideModal();
    };

    render() {
        const { tag } = this.props;
        const { showModal, currTag } = this.state;

        return (
            <div className="container">
                <Chip
                    style={{ marginRight: 20, float: 'left' }}
                    color="primary"
                    label={<><MdAdd style={{ fontSize: '18px' }}  /> 新建</>}
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
                            onClick={() => this.showCreateModal(val)}
                            disabled={val.status === 2}
                            title="点击编辑"
                        />
                    ))}
                </div>

                <Dialog
                    open={showModal}
                    onClose={this.hideModal}
                >
                    <DialogTitle>{currTag.id ? '编辑标签' : '创建标签'}</DialogTitle>
                    <DialogContent>
                        <FormTag ref={this.submitBtn} defaultValue={currTag} onSubmit={this.handleSubmit} />
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
    return bindActionCreators({
        getTagList,
        addTag,
        updateTag,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
