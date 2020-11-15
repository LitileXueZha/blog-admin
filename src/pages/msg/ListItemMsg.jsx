import React from 'react';
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Badge,
    Avatar,
    Tooltip,
    Divider,
    Chip,
} from '@material-ui/core';
import moment from 'moment';

const colors = ['#ff6977', '#00bbaa', '#008b8b', '#009688', '#128378', '#4b4b4b', '#007066', '#008080'];

function getRandomColor() {
    const max = colors.length - 1;
    const randomIndex = Math.round(Math.random() * max);

    return colors[randomIndex];
}

export default function ListItemMsg(props) {
    const { name, avatar, content, read, create_at: createAt } = props.msg;
    let msgAvatar = null;

    if (avatar) {
        // 有头像
        msgAvatar = <Avatar src={avatar} alt="头像" variant="square" />;
    } else {
        // 无头像。采用首字母大写 & 随机颜色
        msgAvatar = (
            <Avatar className="msg-avatar" style={{ color: getRandomColor() }} variant="square">
                {name[0].toUpperCase()}
            </Avatar>
        );
    }

    if (!read) {
        return (
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Badge variant="dot" color="secondary">{msgAvatar}</Badge>
                </ListItemAvatar>
                <ListItemText secondary={content}>
                    {name}
                    <time className="msg-time">
                        {moment(createAt).format('YYYY-MM-DD HH:mm:ss')}
                    </time>
                </ListItemText>
                <ListItemSecondaryAction>
                    <Tooltip title="标记为已读" placement="top">
                        <IconButton edge="end" color="primary" onClick={props.onRead}>
                            <ion-icon name="mail-open" />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                {msgAvatar}
            </ListItemAvatar>
            <ListItemText secondary={content}>
                {name}
                <time className="msg-time">
                    {moment(createAt).format('YYYY-MM-DD HH:mm:ss')}
                </time>
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton edge="end" color="secondary" onClick={props.onDelete}>
                    <ion-icon name="trash" />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

// 自己的留言
export const myselfMsg = (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar src="https://dl.ningtaostudy.cn/photo.jpg" alt="头像" variant="square" />
        </ListItemAvatar>
        <ListItemText secondary="我希望有一个如你一般的人，如山间清爽的风，如古城温暖的光，只要最后是你就好。">
            微风轻拂晨曦之纱
            <Chip className="msg-label" color="primary" size="small" label="我的留言" />
        </ListItemText>
    </ListItem>
);
