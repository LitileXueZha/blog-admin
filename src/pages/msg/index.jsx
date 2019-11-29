import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from '@material-ui/core';

import './index.less';

class Msg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container1">
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ion-icon name="ios-arrow-down" />}>第一个</ExpansionPanelSummary>
                    <ExpansionPanelDetails>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae veritatis voluptatibus provident repellendus quidem eligendi mollitia facere, voluptatem et perspiciatis ipsam, ad natus impedit voluptas sequi doloremque. Expedita, eaque laboriosam?</ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary>第一个</ExpansionPanelSummary>
                    <ExpansionPanelDetails>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi placeat velit voluptas, similique quia consequuntur esse deserunt sunt possimus molestiae et sequi porro eum dolores obcaecati repellendus, error reprehenderit iusto.</ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default Msg;
