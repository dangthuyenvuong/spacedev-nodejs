import validator from "validator"
// rule = {
//     username: [

//     ]
// }

export const validate = (rules, forms) => {
    const errorObj = {}
    for (let name in rules) {
        for (let rule of rules[name]) {
            const error = rule(forms[name], forms)
            if (error) {
                errorObj[name] = error
                break;
            }
        }

    }

    return errorObj
}

export const required = (message) => (value) => {
    if (!value?.trim()) return message || 'Trường này là trường bắt buộc'
}

export const pattern = (regexp, message) => (value) => {
    if(!regexp.test(value)) return message || 'Trường này không đúng định dạng'
}

export const isEmail = (message) => (value) => {
    if(!validator.isEmail(value)) return message || 'Trường này yêu cầu là một email'
}