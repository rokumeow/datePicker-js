(function () {
    var datePicker = window.datePicker;
    var monthData;
    var $wrapper;
    datePicker.buildUi = function (year, month) {
        monthData = datePicker.getMonthData(year, month);
        var html = '<div class="ui-datePicker-header">' +
            '<a href="#" class="ui-datePicker-btn ui-datePicker-prev-btn">&lt;</a>' +
            '<a href="#" class="ui-datePicker-btn ui-datePicker-next-btn">&gt;</a>' +
            '<span class="ui-datePicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>' +
            '</div >' +
            '<div class="ui-datePicker-body">' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>一</th>' +
            '<th>二</th>' +
            '<th>三</th>' +
            '<th>四</th>' +
            '<th>五</th>' +
            '<th>六</th>' +
            '<th>日</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

        for (var i = 0; i < monthData.days.length; i++) {
            var date = monthData.days[i];
            if (i % 7 === 0) {
                html += '<tr>'
            }//一周第一天
            html += '<td data-date="' + date.date + '">' + date.showDate + '</td>';
            if (i % 7 === 6) {
                html += '</tr>'
            }//一周最后一天
        }
        html += '</tbody>' +
            '</table>' +
            '</div>';
        return html;
    };

    datePicker.render = function (direction) {
        var year, month;
        if (monthData) {
            year = monthData.year;
            month = monthData.month;
        }
        if (direction === 'prev') month--;
        if (direction === 'next') month++;

        var html = datePicker.buildUi(year, month);
        $wrapper = document.querySelector('.ui-datePicker-wrapper');
        if (!$wrapper) {
            $wrapper = document.createElement('div');
            document.body.appendChild($wrapper);
            $wrapper.className = 'ui-datePicker-wrapper';
        }
        $wrapper.innerHTML = html;
    };

    datePicker.init = function (input) {
        datePicker.render();
        //console.log("test");
        //点击输入框后才会出现日历窗口
        var $input = document.querySelector(input);
        var isOpen = false;

        $input.addEventListener('click', function () {
            if (isOpen) {
                $wrapper.classList.remove('ui-datePicker-wrapper-show');
                isOpen = false;
            } else {
                $wrapper.classList.add('ui-datePicker-wrapper-show');
                var left = $input.offsetLeft
                //input框距离左边的位置
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                //input框的高度
                $wrapper.style.top = top + height + 2 + 'px';
                //为日历部分设定按照input输入框的样式动态计算
                $wrapper.style.left = left + 'px';
                isOpen = true;
            }
        }, false);

        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;
            // console.log('$target', $target.classlist)
            //直接点击的元素
            if (!$target.classList.contains('ui-datePicker-btn')) return

            //上一个月
            if ($target.classList.contains('ui-datePicker-prev-btn')) {
                datePicker.render('prev');
            } else if ($target.classList.contains('ui-datePicker-next-btn')) {
                datePicker.render('next');
            }
        }, false);

        $wrapper.addEventListener('click', function (e) {
            //点击后获取日期并关闭日历
            var $target = e.target;
            if ($target.tagName.toLowerCase() !== 'td') return;

            var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);

            $input.value = format(date);

            $wrapper.classList.remove('ui-datePicker-wrapper-show');
            isOpen = false;

        }, false)
    };

    function format(date) {
        //调整日期格式为2020-02-11类型
        ret = '';

        var padding = function (num) {
            if (num <= 9) {
                return '0' + num;
            }
            return num;
        }

        ret += date.getFullYear() + '-';

        ret += padding(date.getMonth() + 1) + '-';

        ret += padding(date.getDate());

        return ret;
    }
})();