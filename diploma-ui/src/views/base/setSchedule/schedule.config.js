
const buttons = [
    {
        label: '查询',
        action: 'add',
        icon: 'search',
    },
    {
        label: '重置',
        action: 'reset',
        icon: 'reload'
    },
    {
        label: '新增',
        action: 'add',
        icon: 'plus',
    },
    {
        label: '删除',
        action: 'delete',
        icon: 'delete'
    },


];

const teacherColumn= [
    {
        title: 'teacherName',
        dataIndex: 'teacherName',
    },
    {
        title: 'teacherCode',
        dataIndex: 'teacherCode',
    },
    {
        title: 'course',
        dataIndex: 'course',
    },
    {
        title: 'remark',
        dataIndex: 'remark',
    }
];


export { buttons, teacherColumn }