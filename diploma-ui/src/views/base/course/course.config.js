
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
        label: '详细',
        action: 'detail',
        icon: 'edit'
    }
];

const courseColumns= [
    {
        title: '名称',
        dataIndex: 'courseName',
    },
    {
        title: '课程编号',
        dataIndex: 'courseCode',
    },
    {
        title: '类型',
        dataIndex: 'type'
    },
    {
        title: '备注',
        dataIndex: 'remark',
    }
];

export { buttons,courseColumns}
