export  const valid_password = /^(?![0-9]+$)(?![A-Za-z]+$)[0-9A-Za-z]{6,20}$/

//验证邮箱的正则
const reg_email = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
const reg_phone =  /^1[3456789]\d{9}$/;
export function validata_email(value) {
     return reg_email.test(value)
}

export function validata_passwordFn(value) {
     return valid_password.test(value)
}

//验证手机号

export function checkPhone(value) {
     return reg_phone.test(value)
}