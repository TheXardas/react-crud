
const MONTHS = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december',
];


export function forceTrailingZero(number) {
    if (!number) {
        return;
    }

    if (number.toString().length === 2) {
        return number;
    }

    return `0${number}`;
}

export function dateToString(date) {
    if (!date) {
        return '';
    }

    const year = date.getFullYear();
    const month = forceTrailingZero(date.getMonth());
    const day = forceTrailingZero(date.getDate());

    return `${year}-${month}-${day}`;
}

export function numbersToDate(day, month, year) {
    if (!day || !month || !year) {
        return null;
    }

    if (isValideDate(day, month, year)) {
        return new Date(`${year}-${month}-${day}`);
    }
    return null;
}

export function dateToNumbers(date) {
    if (!date) {
        return {
            day: null,
            month: null,
            year: null,
        };
    }

    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    };
}

export function isValideDate(dayInput, monthInput, yearInput) {
    const day = parseInt(dayInput, 10);
    const year = parseInt(yearInput, 10);
    const month = parseInt(monthInput, 10);

    if (isNaN(month) || isNaN(day) || isNaN(year)) {
        return false;
    }

    let valid = true;
    if ((month < 1) || (month > 12)) {
        valid = false;
    } else if ((day < 1) || (day > 31)) {
        valid = false;
    } else if (((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30)) {
        valid = false;
    } else if((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29)) {
        valid = false;
    } else if((month == 2) && ((year % 100) == 0) && (day > 29)) {
        valid = false;
    } else if((month == 2) && (day > 28)) {
        valid = false;
    }

    return valid;
}

export function getDaysInMonth(anyDateInMonth) {
    return new Date(
        anyDateInMonth.getYear(),
        anyDateInMonth.getMonth() + 1,
        0
    ).getDate();
}

export function getSelectableDays() {
    const days = [''];
    for (let i = 1; i <= 31; i++) {
        days.push(i);
    }
    return days;
}

export function getSelectableMonths() {
    const result = MONTHS.map((month, key) => ({
        id: key + 1,
        name: month,
    }));

    result.unshift({
        id: '',
        name: '',
    });

    return result;
}

export function getSelectableYears() {
    const years = [''];
    const maximumYear = new Date().getFullYear();
    for (let i = maximumYear; i > 1900; i--) {
        years.push(i);
    }
    return years;
}
