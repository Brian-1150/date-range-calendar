import dayjs from 'dayjs';

const monthNames = [" ", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
] // zero index is blank



// get todays date
// let today = dayjs();

// determine month
// let currentMonthAsNum = new Date().getMonth()

// determine number of days in current month

// determine first day of the month
// determine day of the week for first day of current month

// determine how many days in previous month


export const getCurrentMonth = () => {
    let currentMonthAsNum = new Date().getMonth()
    switch (currentMonthAsNum) {
        case 0: return 'January'
        case 1: return 'February'
        case 2: return 'March'
        case 3: return 'April'
        case 4: return 'May'
        case 5: return 'June'
        case 6: return 'July'
        case 7: return 'August'
        case 8: return 'September'
        case 9: return 'October'
        case 10: return 'November'
        case 11: return 'December'
        default: return 'oops'
    }
    return null;
}

export const getNextMonth = (num: number) => { //expecting 9 for September
    return monthNames[num]

}

export const getMonthAsNum = (dateString: string) => {
    let year = parseInt(dateString.substring(dateString.indexOf(" ") + 1));
    let increment = year - dayjs().year();
    if (dateString.includes('Jan'))
        return 1 + increment;
    if (dateString.includes('Feb'))
        return 2 + increment;
    if (dateString.includes('Mar'))
        return 3 + increment;
    if (dateString.includes('Apr'))
        return 4 + increment;
    if (dateString.includes('May'))
        return 5 + increment;
    if (dateString.includes('Jun'))
        return 6 + increment;
    if (dateString.includes('Jul'))
        return 7 + increment;
    if (dateString.includes('Aug'))
        return 8 + increment;
    if (dateString.includes('Sep'))
        return 9 + increment;
    if (dateString.includes('Oct'))
        return 10 + increment;
    if (dateString.includes('Nov'))
        return 11 + increment;
    if (dateString.includes('Dec'))
        return 12 + increment;
    return 0;
}


// export const getCurrentMonth2 = () => {
//     return monthNames[new Date().getMonth()]
// }

// export const getCurrentMonth3 =() => {
//    return new Date().toLocaleString("default", { month: "long" })
// }

// export const getCurrentMonth4 = () => {
//     return dayjs().format('MMMM')
// }

// export const getCurrentMonth5 = () => {
//     return dateFns.format(new Date(), 'LLLL')
// }

export const getNumberOfDaysInMonth = (month: number, year: string) => {
    return dayjs(`${year}-${month}-01`).daysInMonth()

}

export const getNumberOfRows = (currentMonthAsNum: number, numberOfDaysInMonth: number, dayOfTheWeek: number) => {
    currentMonthAsNum = 0;
    switch (numberOfDaysInMonth + currentMonthAsNum - (21 + (7 - dayOfTheWeek))) {
        case 0: return 4;
        case 8: case 9: return 6;
        default: return 5;
    }
}

export const getDaysInPrevMonth = () => {

}

export const getDaysInNextMonth = () => {

}

export const getOneMonthArray = (dayOfWeek: number, numberOfDaysInMonth: number) => {
    let dates = new Array<number | string>(35)
    // assign first day to array index equal to day of week of first day
    dates[dayOfWeek] = 1;
    // fill in indexes from 1 through numberOfDaysInCurrentMonth
    let nextDay = 2;
    for (let i = dayOfWeek + 1; i < dayOfWeek + numberOfDaysInMonth; i++, nextDay++) {
        dates[i] = nextDay;
    }
    // assign or leave empty indexes between 0 and first day
    // assign value or leave empty indexes between last day of month and end of that row
    for (let i = 0; i < dates.length; i++) {
        if (dates[i] == undefined) {
            dates[i] = '';
        }
    }
    return dates;
}


export const getBlackoutDays = () => {
    let currentDayOfMonth: number = parseInt(dayjs().format('D')) - 1

    let days = new Array()
    for (let i = currentDayOfMonth; i > 0; i--) {
        days.push(i)
    }
    return days;
}