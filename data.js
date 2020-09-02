// 为了模块编写的时候不污染外部环境，所以在最外层加上（）
// 将其包裹在一个匿名函数中
(function () {
    var datePicker = {};
    datePicker.getMonthData = function (year, month) {
        var ret = [];
        if (!year || !month) {
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }
        var firstDay = new Date(year, month - 1, 1);
        var firstDayWeekDay = firstDay.getDay();
        if (firstDayWeekDay === 0) firstDayWeekDay = 7;
        //上一个月的最后一天

        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;
        //月份会越界，所以月份与年份需要重新定义

        var lastDayOfLastMonth = new Date(year, month - 1, 0);
        var lastDayOfLastMonth = lastDayOfLastMonth.getDate()

        // 在日历的第一行需要显示多少个上一个月的日期
        var preMonthDayCount = firstDayWeekDay - 1;

        var lastDay = new Date(year, month, 0)
        var lastDate = lastDay.getDate();
        //一个月可能是4、5、6周
        for (var i = 0; i < 7 * 6; i++) {
            var date = i + 1 - preMonthDayCount;
            var showDate = date;
            var thisMonth = month;
            //上一个月
            if (date <= 0) {
                thisMonth = month - 1;
                showDate = lastDayOfLastMonth + date
            } else if (date > lastDate) {
                //下一个月
                thisMonth = month + 1;
                showDate = date - lastDate;
            }
            if (thisMonth === 0) thisMonth = 12;
            if (thisMonth === 13) thisMonth = 1;

            // 将结果按对象的形式放入数组中
            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate
            })
        }
        return {
            year: year,
            month: month,
            days: ret
        }
    };
    window.datePicker = datePicker;
})()