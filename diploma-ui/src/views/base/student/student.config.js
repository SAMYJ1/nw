

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

const studentColumn = [
    {
        title: '姓名',
        dataIndex: 'studentName'
    },
    {
        title: '性别',
        dataIndex: 'sex'
    },
    {
        title: '等级',
        dataIndex: 'level'
    },
    {
        title: '课程',
        dataIndex: 'course'
    },
    {
        title: '备注',
        dataIndex: 'remark'
    },

];

export { studentColumn, buttons }