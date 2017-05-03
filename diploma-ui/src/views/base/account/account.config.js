
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

];

const accountColumns = [
    {
        title: '账号',
        dataIndex: 'accountCode',
    },
    {
        title: '姓名',
        dataIndex: 'accountName',
    },
    {
        title: '角色',
        dataIndex: 'role',
    },
    {
        title: '备注',
        dataIndex: 'remark',
    },

];


export { buttons, accountColumns}