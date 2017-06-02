
const buttons = [
    {
        label: '查询',
        action: 'search',
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
    {
        label: '课表',
        action: 'lookSchedule',
        icon: 'setting'
    },
    {
        label: '重置密码',
        action: 'resetPwd',
        icon: 'setting',
    }


];

const teacherColumn= [
    {
        title: '姓名',
        dataIndex: 'account',
    },
    {
        title: '性别',
        dataIndex: 'sex',
    },
    {
        title: '联系方式',
        dataIndex: 'tel'
    },
    {
        title: '类型',
        dataIndex: 'teacherType',
    },
    {
        title: '备注',
        dataIndex: 'remark',
    }
];


export { buttons, teacherColumn }