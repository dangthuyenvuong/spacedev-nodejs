import validator from 'validator'
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

export const required = (message = 'Trường này là trường bắt buộc') => (value) => {
    if (!value || !value?.toString()?.trim()) return message
}

export const pattern = (regexp, message = 'Trường này không đúng định dạng') => (value) => {
    if(!regexp.test(value)) return message
}

export const isEmail = (message = 'Vui lòng nhập đúng định dạng email') => (value) => {
    if(!validator.isEmail(value || '')) return message
}