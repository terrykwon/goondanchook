// var moment = require('moment');
moment().format();

function changeDeltaText(delta) {
    let resStr;

    if (delta <= 0) {
        resStr = "아쉽지만 군복무가 단축되지 않았습니다.";
    } else {
        resStr = "축하합니다! 군복무가 <span class='accented'>" + delta + "일</span> 단축되었습니다.";
    }

    $('.results--delta').empty().append(resStr);
}

function changeEndDateText(endDate) {
    let dateStr = "전역일은 <span class='accented'>" + endDate.year() + "년 "
        + (endDate.month() + 1) + "월 "
        + endDate.date() + "일</span> "
        + "입니다.";

    $('.results--date').empty().append(dateStr);
}

function calculate() {
    let joinDateString = $('#join_date').val();
    let joinDate = moment(joinDateString, 'YYMMDD');
    if (!joinDate.isValid()) {
        alert('날짜를 올바르게 입력하여 주세요 (예. 170101)');
        return;
    }

    $('.results').hide().fadeIn(1200).show();

    let referenceDate; // Date when policy first applied
    let prevEndDate;

    let serviceType = $('.select_service_type').val();

    prevEndDate = moment(joinDate);
    if (serviceType === 'airforce') {
        prevEndDate.year(prevEndDate.year() + 2);
        referenceDate = moment("161003", 'YYMMDD');

    } else if (serviceType === 'navy') {
        prevEndDate.month(prevEndDate.month() + 23);
        referenceDate = moment("161103", 'YYMMDD');

    } else if (serviceType === 'social_service') {
        prevEndDate.year(prevEndDate.year() + 2);
        referenceDate = moment("161003", 'YYMMDD');

    } else {
        prevEndDate.month(prevEndDate.month() + 21);
        referenceDate = moment("170103", 'YYMMDD');
    }

    let reducedDays = Math.floor(
        moment.duration(joinDate.diff(referenceDate)).asDays() / 14 + 1);

    // Cap at 90 days
    if (reducedDays.valueOf() > 90) {
        reducedDays = 90;
    }

    prevEndDate.subtract(1, 'd');

    changeDeltaText(reducedDays);

    if (reducedDays > 0) {
        changeEndDateText(prevEndDate.subtract(reducedDays, 'd'));
    } else {
        changeEndDateText(prevEndDate);
    }

    return false;
}