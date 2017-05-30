module.exports = {
	// 'POST /app/*' : 'http://127.0.0.1:8080',
	// 'GET /app/*' : 'http://127.0.0.1:8080',

    'POST /api*' : 'http://192.168.97.135:8080',
	'GET /api*' : 'http://192.168.97.135:8080',

	/*'/api/System/getMenuList': (req,res)=>{
		res.json({
			"data": [
				{
					"id": 1, "name": "教师信息", "url": '/base/teacher', "icon": 'edit'
				},
				{
					"id": 2, "name": "学员信息", "url": '/base/student', "icon": 'user'
				},
                {
					"id": 3, "name": "公告管理", "url": '/base/notice', "icon": 'setting'
				},
                {
					"id": 4, "name": "课程信息", "url": '/base/course', "icon": 'setting'
				},
                {
                    "id": 5, "name": "个人课表", "url": '/base/schedule', "icon": 'setting'
                },
                {
                    "id": 6, "name": "交流", "url": '/base/exchange', "icon": 'user'
                },
                {
                    "id": 7, "name": "课程分类信息", "url": '/base/courseInfo', "icon": 'user'
                },

			]
		})
	},*/

    // '/api/User/findTeachers': (req,res) => {
	// 	res.json({
	// 		"data": [
	// 			{
	// 				"id": 1, "account": "tom", "age":22,"sex": 1, "tel":123456,  "teacherType": 0, "remark": "123"
	// 			},
	// 			{
	// 				"id": 2, "account": "lucy","age":23,"sex": 0,  "tel":123456, "teacherType": 1, "remark": "1234"
	// 			}
    //
	// 		]
	// 	})
	// },
	/*'/api/Schedule/getPersonalSchedule': (req, res) => {
		res.json({
			"data": {
				"schedule":[
                    {
                        "id": 0,
                        "monday": { 'course':'c1','students':['a','b'], 'address':'z'},
                        "tuesday": { 'course':'c1','students':['a','b'], 'address':'z'},
                        "wednesday": { 'course':'c1','students':['a','b'], 'address':'z'},
                        "thursday": { 'course':'c1','students':['a','b'], 'address':'z'},
                        "friday": { 'course':'c1','students':['a','b'], 'address':'z'},
                        "saturday": { 'course':'c1','students':['a','b'], 'address':'z'},
                        "sunday": { 'course':'c1','students':['a','b'], 'address':'z'},
                        "time": '9:30-10:30',
                    },
                    {
                        "id": 1,
                        "monday": { 'course':'c2','students':['a','bc'], 'address':'z'},
                        "tuesday": { 'course':'c2','students':['a','bc'], 'address':'z'},
                        "wednesday": { 'course':'c2','students':['a','bc'], 'address':'z'},
                        "thursday": { 'course':'c2','students':['a','bc'], 'address':'z'},
                        "friday": { 'course':'c2','students':['a','bc'], 'address':'z'},
                        "saturday": { 'course':'c2','students':['a','bc'], 'address':'z'},
                        "sunday": { 'course':'c2','students':['a','bc'], 'address':'z'},
                        "time": '8:30-9:30',
                    },
                ],
				"courseList": ['c1','c2','c3']
			}

		})
	},*/

	/*'/api/User/getStuAndCourse': function (req,res) {
		res.json({
			"data": {
				"courseList": ['c1','c2','c3','c4'],
				"studentList": ['s1','s2','s3','s4','s5']
			}
		})
    },*/

    /*'/api/User/findStudents' : function (req,res) {
		res.json({
			"data": [
				{
					"id": 1, "account": 'tom', "school": 'hhit',"parentTel":88888888, "age": 18, "sex": 0, "tel": 1234, "course": ['c1','c2'], "level": '1', "remark": 'abc'
				},
				{
					"id": 2, "account": 'lucy', "school": 'hhit',"parentTel":88888888, "age": 18, "sex": 1, "tel": 1234, "course": ['c2','c3'], "level": '2', "remark": 'abc'
				},
				{
					"id": 3, "account": 'alice', "school": 'hhit',"parentTel":88888888, "age": 18, "sex": 0, "tel": 1234, "course": ['c1','c2'], "level": '3', "remark": 'abc'
				},

			]

		})
    },*/

    //账号
    /*'/api/getNoticeList': (req,res)=>{
		res.json({
			"data": [
				{ "id": 1, "noticeTitle": 'abc', "notice": 'hello'},
				{ "id": 2, "noticeTitle": 'abcd', "notice": 'hello'},
				{ "id": 3, "noticeTitle": 'abce', "notice" : 'hello'},
			]
		})
	},*/

    //课程列表
    /*'/api/CourseColumn/findAll': (req,res)=>{
		res.json({
			"data": [
				{
					"id": 1, "courseCode": '001', "courseName": '钢琴', "courseType": 0, "remark": 'abc',
					"teacher": ['tom'],
				},
				{
					"id": 2, "courseCode": '002', "courseName": '吉他', "courseType": 1, "remark": 'abc',
					"teacher": ['tom','lucy']

				},

			]
		})
	},*/

    /*'/api/Charge/findById': (req, res) =>{
	    res.json({
            "data": {
                "list": [
                    {
                        "id": 1,
                        "courseType": '两年课程规划',
                        "customizedCourses":{
                            "col1":'1.学会50首曲目 2.掌握正确坐姿' , "col2": '45分钟/课时'
                        },

                    },
                    {
                        "id": 2,
                        "courseType": '一年课程规划',
                        "customizedCourses":{
                            "col1":'1.学会50首曲目 2.掌握正确坐姿' , "col2": '45分钟/课时'
                        },
                    },
                ],
                "title": { "col1": "收获成果", "col2": "1对1"}
            },

        })
    },*/

	//个人课表
   /* '/api/Schedule/getPersonalSchedule': (req, res)=>{
		res.json({
			"data": {
				"schedule": [
                    /!*{
                        "id": 1,
                        "monday": { 'id': 1,'course':'c1','students':['s1','s3'], 'teacher': null, 'address':'z'},
                        "tuesday": null,
                        "wednesday": null,
                        "thursday": null,
                        "friday": null,
                        "saturday": null,
                        "sunday": {  'id': 2,'course':'c2','students':['s2'], 'teacher': null, 'address':'z'},
                        "time": '9:30-10:30',
                    },*!/
                    /!*{
                        "id": 2,
                        "monday": null,
                        "tuesday": { 'course':'c1','students':null, 'teacher': 'tom','address':'z'},
                        "wednesday": null,
                        "thursday": null,
                        "friday": null,
                        "saturday": null,
                        "sunday": { 'course':'c1','students':null, 'teacher': 'lucy', 'address':'z'},
                        "time": '9:00-10:00',
                    }*!/
                ],
                "courseList": ['c1','c2','c3'],
				"confirm": false,

			}

		})
	},*/

   /* '/api/getCommentList': (req,res) =>{
		res.json({
			"data":[
                {
                    "_id": "56131e0b7efe639f3fafda0e",
                    "aid": "560a438f10f611091d0933c6",
                    "content": "fhgfh",
                    "userId": {
                        "_id": "56131df47efe639f3fafda0d",
                        "userName": "黑子",
                    },
                    "__v": 0,
                    "updated": "2015-10-06T01:04:11.816Z",
                    "created": "2015-10-06T01:04:11.816Z",
                    "status": 1,
                    "replys": [{
                        "created": "2016-09-05T06:32:47.990Z",
                        "userInfo": {
                            "userName": "俊峰1",
                            "id": "57c64921c5d959ab07294be4"
                        },
                        "content": "@黑子 这是什么东西",
                        "_id": "57cd118f80bfe5ca142f4077"
                    },{
                        "created": "2016-09-05T06:32:47.990Z",
                        "userInfo": {
                            "userName": "俊峰1",
                            "id": "57c64921c5d959ab07294be4"
                        },
                        "content": "@黑子 这是什么东西",
                        "_id": "57cd118f80bfe5ca142f4072"
					}
                    ]
                },
				{
                    "_id": "56131e0b7efe639f3fafda0f",
                    "aid": "560a438f10f611091d0933cf",
                    "content": "fhgfh",
                    "userId": {
                        "_id": "56131df47efe639f3fafda0d",
                        "userName": "黑子",
                    },
                    "__v": 0,
                    "updated": "2015-10-06T01:04:11.816Z",
                    "created": "2015-10-06T01:04:11.816Z",
                    "status": 1,
                    "replys": [{
                        "created": "2016-09-05T06:32:47.990Z",
                        "userInfo": {
                            "userName": "俊峰1",
                            "id": "57c64921c5d959ab07294be4"
                        },
                        "content": "@黑子 这是什么东西",
                        "_id": "57cd118f80bfe5ca142f4077"
                    },{
                        "created": "2016-09-05T06:32:47.990Z",
                        "userInfo": {
                            "userName": "俊峰1",
                            "id": "57c64921c5d959ab07294be4"
                        },
                        "content": "@黑子 这是什么东西",
                        "_id": "57cd118f80bfe5ca142f4072"
					}
                    ]
                },

			]
		})
	},*/

    '/api/getCourseInfoList': (req, res)=>{
	    res.json({
            "data": [
                {
                    "courseName": '钢琴',
                    "list": [
                        {
                            "id": 1, "courseType": '两年课程规划', "col1":'1.学会50首曲目 2.掌握正确坐姿' , "col2": '45分钟/课时'
                        },
                        {
                            "id": 2, "courseType": '一年课程规划', "col1": '1.学会50首曲目 2.掌握正确坐姿', "col2": '45分钟/课时'
                        },
                    ],
                    "title": [{"dataIndex":"col1","title": '收获成果'},{"dataIndex":"col2","title": '1对1'}]
                },
                {
                    "courseName": '吉他',
                    "list": [
                        {
                            "id": 1, "courseType": '两年课程规划', "col1":'1.学会50首曲目 2.掌握正确坐姿' , "col2": '45分钟/课时'
                        },
                        {
                            "id": 2, "courseType": '三年课程规划', "col1": '1.学会50首曲目 2.掌握正确坐姿', "col2": '45分钟/课时'
                        },
                    ],
                    "title": [{"dataIndex":"col1","title": '收获成果'},{"dataIndex":"col2","title": '1对1'}]
                },

            ]
        })
    }
};


