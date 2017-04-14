module.exports = {
	'POST /app/*' : 'http://127.0.0.1:8080',
	'GET /app/*' : 'http://127.0.0.1:8080',

	'/getMenu': (req,res)=>{
		res.json({
			"data": [
				{
					"id": 1, "name": "处方单", "url": '/base/setSchedule', "icon": 'edit'
				},
				{
					"id": 2, "name": "账户列表", "url": '/base/account', "icon": 'setting'
				},
			]
		})
	},

    '/api/getTeacherList': (req,res) => {
		res.json({
			"data": [
				{
					"id": 1, "teacherName": "tom", "teacherCode": "001", "course": ['c1','c2'], "remark": "123"
				},
				{
					"id": 2, "teacherName": "lucy", "teacherCode": "002", "course": ['c1','c3'], "remark": "1234"
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

	'/api/getStudentList': function (req,res) {
		res.json({
			"data": {
				"courseList": ['c1','c2','c3','c4'],
				"studentList": ['s1','s2','s3','s4','s5']
			}
		})
    }

};