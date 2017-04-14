import { notification } from 'antd';

let LOGIN_OUT = "USER.ON_LOGOUT";

export default function promiseMiddleware( objMethods ) {

    return (next) => (action) => {

        const { promise, types, ...rest } = action;

        if (!promise) {
            return next(action);
        }

        let [REQUEST, SUCCESS, ERROR] = types;
        next({ ...rest, type: REQUEST });
        return promise.then(
            function(result){
                if(!result||!result.data){
                    let error = {message:'No data returns.'};
                    return next({ ...rest, error, type: ERROR })
                }
                if(result.errorMsg){

                    let errorMsg = result.errorMsg;

                    notification.error({
                        message: 'Error',
                        description: errorMsg,
                    });

                    let error = {message:errorMsg};

                    let isLoginOut = false;

                    let loginOutReg = /登录已失效/g;

                    isLoginOut = loginOutReg.test(errorMsg);

                    ERROR = isLoginOut ? LOGIN_OUT : ERROR;

                    return next({ ...rest, result, error, type: ERROR })
                }else if(result.warningMsg){
                    notification.warning({
                        message: 'Warning',
                        description: result.warningMsg,
                    });
                    return next({ ...rest, result, type: SUCCESS })
                }else if(result.feedbackMsg){
                    notification.success({
                        message: 'Success',
                        description: result.feedbackMsg,
                    });
                    return next({ ...rest, result, type: SUCCESS })
                }
                return next({ ...rest, result, type: SUCCESS })
            },
            //(result) => next({ ...rest, result, type: SUCCESS }),
            (error) => next({ ...rest, error, type: ERROR })
        );
    };
}

