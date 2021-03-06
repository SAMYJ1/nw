import { notification } from 'antd';

export function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value.promise && typeof value.promise.then === 'function';
  }
}

export function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export function delCookie(name)//删除cookie
{
	let exp = new Date();
	exp.setTime(exp.getTime() - 1);
	let cval=getCookie(name);
	if(cval!==null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
} 


export function parseCascaderFormValue(formValues){
    let cascaderValues = {};
    for (let key of formValues) {
      if(Array.isArray(formValues[key])){
        let codes = key.split('|');
        formValues[key].map(function(value,index){
          cascaderValues[codes[index]] = value;
        });
      }
    }
    return {...formValues, ...cascaderValues};
}

export function showErrorMsg(msg){
  notification.error({
    message: 'Error',
    description: msg,
  });
}