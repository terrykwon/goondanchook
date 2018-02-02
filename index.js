// var moment = require('moment');
moment().format();

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function changeDeltaText(delta) {
    let resStr;

    if (delta <= 0) {
        resStr = "아쉽지만 군복무가 단축되지 않았습니다.";
    } else {
        resStr = "축하합니다! 군복무가 " + delta + "일 단축되었습니다.";
    }

    $('.results--delta').text(resStr);
}

function changeEndDateText(endDate) {
    let dateStr = "전역일은 " + endDate.year() + "년 "
        + (endDate.month() + 1) + "월 "
        + endDate.date() + "일 "
        + "입니다.";

    $('.results--date').text(dateStr);
}


$(document).ready(function() {

    $("#submit").click(function() {
        $('.results').show();

        let joinDateString = $('#join_date').val();

        let joinDate = moment(joinDateString, 'YYMMDD');

        let referenceDate = moment("161004", 'YYMMDD'); // Date when policy goes in effect

        let reducedDays = Math.floor(
            moment.duration(joinDate.diff(referenceDate)).asDays() / 14 + 1);

        let prevEndDate;

        let serviceType = $('.select_service_type').val();

        prevEndDate = moment(joinDate);
        if (serviceType === 'airforce') {
            prevEndDate.year(prevEndDate.years() + 2);
        } else if (serviceType === 'navy') {
            prevEndDate = moment(joinDate);
            prevEndDate.month(prevEndDate.months() + 23);
        } else {
            prevEndDate.month(prevEndDate.months() + 21);
        }

        changeDeltaText(reducedDays);
        changeEndDateText(prevEndDate.subtract(reducedDays, 'd'));
    });

});