
export function isValidPhone(phone) {
    if (phone.match(/[^\d\-\s]/)) {
        return false;
    }

    const phoneStr = phone.replace(/\D/g, '');
    if (phoneStr.length !== 10) {
        return false;
    }

    const operatorCode = parseInt(phoneStr.substr(0, 3), 10);
    if (!operatorCode || operatorCode < 900) {
        return false;
    }
    return true;
}

export function cleanPhone(phone) {
    if (isValidPhone(phone)) {
        return phone.replace(/\D/g, '');
    }

    return;
}