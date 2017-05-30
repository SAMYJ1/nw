
const buttons = [
    // {
    //     label: '查询',
    //     action: 'search',
    //     icon: 'search',
    // },
    // {
    //     label: '重置',
    //     action: 'reset',
    //     icon: 'reload'
    // },
    {
        label: '添加新公告',
        action: 'add',
        icon: 'plus',
    },
    {
        label: '删除',
        action: 'delete',
        icon: 'delete'
    },

];

const accountColumns = [
    {
        title: '公告',
        dataIndex: 'title',
    },
    {
        title: '发布时间',
        dataIndex: 'pubDate'
    }


];


export { buttons, accountColumns}