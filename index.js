// var moment = require('moment');
moment().format();

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

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


$(document).ready(function() {

    $("#submit").click(function() {
        let joinDateString = $('#join_date').val();
        let joinDate = moment(joinDateString, 'YYMMDD');
        if (!joinDate.isValid()) {
            alert('날짜를 올바르게 입력하여 주세요 (예. 170101)');
            return;
        }

        $('.results').show();

        let referenceDate = moment("161004", 'YYMMDD'); // Date when policy goes in effect

        let reducedDays = Math.floor(
            moment.duration(joinDate.diff(referenceDate)).asDays() / 14 + 1);

        let prevEndDate;

        let serviceType = $('.select_service_type').val();

        prevEndDate = moment(joinDate);
        if (serviceType === 'airforce') {
            prevEndDate.year(prevEndDate.year() + 2);
        } else if (serviceType === 'navy') {
            prevEndDate = moment(joinDate);
            prevEndDate.month(prevEndDate.month() + 23);
        } else {
            prevEndDate.month(prevEndDate.month() + 21);
        }

        changeDeltaText(reducedDays);

        if (delta > 0) {
            changeEndDateText(prevEndDate.subtract(reducedDays, 'd'));
        } else {
            changeEndDateText(prevEndDate);
        }

    });

});