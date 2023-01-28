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
    if (!regexp.test(value)) return message
}

export const isEmail = (message = 'Vui lòng nhập đúng định dạng email') => (value) => {
    if (!validator.isEmail(value || '')) return message
}

export const password = (message = 'Mật khẩu phải chưa ít nhất ký tự số, viết hoa, viết thường, ký tự đặc biệt') => (value) => {
    if (!validator.isStrongPassword(value, { minUppercase: 1, minLowercase: 1, minLength: 6, minNumbers: 1, minSymbols: 1 })) {
        return message
    }

}

export const minMax = (min, max, message) => (value) => {
    if (value) {
        if (min && max) {
            if (value.length < min || value.max > max) {
                return message || `Độ dài giá trị bắt buộc từ ${min}-${max} ký tự`
            }
        }

        if (min && value.length < min) {
            return message || `Vui lòng nhập giá trị lớn hơn ${min} ký tự`
        }

        if (max && value.length > max) {
            return message || `Vui lòng nhập giá trị nhỏ hơn ${max} ký tự`
        }

    }
}