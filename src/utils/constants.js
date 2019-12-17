// 接口前缀
export const API = 'https://php/v1';

// 文章分类
export const ARTICLE_TYPE = {
    life: '生活',
    note: '笔记',
};
// 文章状态
export const ARTICLE_STATUS = ['草稿', '上线', '下线', '垃圾箱'];

// 评论类型
export const TYPE_COMMENT = {
    ARTICLE: 0, // 文章
    MSG: 1, // 留言
};

// 评论用户标签
export const LABEL_COMMENT = {
    COMMON: 0, // 普通用户评论
    ADMIN: 1, // 管理员回复
};

/**
 * 存放 token 的本地存储 key
 */
export const TOKEN_NAME = 'API_TOKEN';
