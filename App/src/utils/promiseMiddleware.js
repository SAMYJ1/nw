
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
                if(!result ){
                    let error = {message:'No data returns.'};
                    return next({ ...rest, error, type: ERROR })
                }
                if(result.status === 'error'){

                    let errorMsg = result.message;

                    let error = {message:errorMsg};

                    let isLoginOut = false;

                    let loginOutReg = /登录已失效/g;

                    isLoginOut = loginOutReg.test(errorMsg);

                    ERROR = isLoginOut ? LOGIN_OUT : ERROR;

                    return next({ ...rest, result, error, type: ERROR })
                }else if(result.status === 'warning'){
                    return next({ ...rest, result, type: SUCCESS })
                }else if(result.status === 'success' && result.data === null){

                    return next({ ...rest, result, type: SUCCESS })
                }
                return next({ ...rest, result, type: SUCCESS })
            },
            //(result) => next({ ...rest, result, type: SUCCESS }),
            (error) => next({ ...rest, error, type: ERROR })
        );
    };
}

