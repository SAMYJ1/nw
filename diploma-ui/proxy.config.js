module.exports = {
	'POST /app/*' : 'http://127.0.0.1:8080',
	'GET /app/*' : 'http://127.0.0.1:8080',

	'/getMenu': (req,res)=>{
		res.json({
			"data": [
				{
					"id": 1, "name": "教师信息", "url": '/base/teacher', "icon": 'edit'
				},
				{
					"id": 2, "name": "学员信息", "url": '/base/student', "icon": 'user'
				},
                {
					"id": 3, "name": "账号信息", "url": '/base/account', "icon": 'setting'
				},
                {
					"id": 4, "name": "课程信息", "url": '/base/course', "icon": 'setting'
				},

			]
		})
	},

    '/api/getTeacherList': (req,res) => {
		res.json({
			"data": [
				{
					"id": 1, "teacherName": "tom", "teacherCode": "001", "age":22,"sex": 1, "tel":123456, "course": ['c1','c2'], "teacherType": 0, "remark": "123"
				},
				{
					"id": 2, "teacherName": "lucy", "teacherCode": "002","age":23,"sex": 0,  "tel":123456, "course": ['c1','c3'], "teacherType": 1, "remark": "1234"
				}

			]
		})
	},
	'/api/getTeacherCourse': (req, res) => {
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
                        "time": '9.30-10.30',
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
                        "time": 'abc',
                    },
                ],
				"courseList": ['c1','c2','c3']
			}

		})
	},

	'/api/getStuAndCourse': function (req,res) {
		res.json({
			"data": {
				"courseList": ['c1','c2','c3','c4'],
				"studentList": ['s1','s2','s3','s4','s5']
			}
		})
    },

	'/api/getStudentList' : function (req,res) {
		res.json({
			"data": [
				{
					"id": 1, "studentName": 'tom', "studentCode": 1001, "school": 'hhit',"parentTel":88888888, "age": 18, "sex": 0, "tel": 1234, "course": ['c1','c2'], "level": '1', "remark": 'abc'
				},
				{
					"id": 2, "studentName": 'lucy', "studentCode": 1002, "school": 'hhit',"parentTel":88888888, "age": 18, "sex": 1, "tel": 1234, "course": ['c2','c3'], "level": '2', "remark": 'abc'
				},
				{
					"id": 3, "studentName": 'alice', "studentCode": 1003, "school": 'hhit',"parentTel":88888888, "age": 18, "sex": 0, "tel": 1234, "course": ['c1','c2'], "level": '3', "remark": 'abc'
				},

			]

		})
    },

    //账号
    '/api/getAccountList': (req,res)=>{
		res.json({
			"data": [
				{ "id": 1, "accountCode": '001', "accountName": 'tom', "role": '0', "remark": 'abcde' },
				{ "id": 2, "accountCode": '002', "accountName": 'lucy', "role": '1', "remark": 'abcde1' },
				{ "id": 3, "accountCode": '003', "accountName": 'alice', "role": '2', "remark": 'abcde2' },
			]
		})
	},

    //课程
    '/api/getCourseList': (req,res)=>{
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
	}

};


