'use strict';
var filters = require('./../../Utils/Filters');


function Datepicker (baseElement){
    var base = baseElement;
    var datepickerInput = base.$('[date-time]');
    var datepickerWrapper = base.$('[date-picker-wrapper]');

    /**
     * @description clicks the datepicker input - should open the datepicker and enable free text typing
     */
    function openDatepicker(){
        datepickerInput.click();
    }

    /**
     * @description types the inputted timestamp into the datepicker Input
     */
    function typeTimestamp(timestamp){
        if(!timestamp || timestamp === ''){
            return datepickerInput.clear();
        }
        else{
            return datepickerInput.sendKeys(timestamp);
        }
    }

    /**
     * @description enables you to choose a date within the last three months
     * All options are picked on the current month unless, nextMonth/previousMonth is true and than it applies to them
     *
     * @param dayNumber - the day number to pick. either format, 9 or 09 is accepted
     * @param hour - the hour to pick. either format, 9, 09 or 19 is accepted
     * @param minutes - the number of minutes to pick. either format, 9 or 09 is accepted. It should be divided by 5(as any of the options
     * or it will choose default of 00 minutes.
     * @param nextMonth - should we pick all options on the next month.
     * @param previousMonth - should we pick all options on the previous month.
     */
    function chooseTimestamp(dayNumber, hour, minutes, nextMonth, previousMonth){
        //opening the datepicker
        datepickerInput.click();

        //moving to previous month view
        if(previousMonth){
            datepickerWrapper.$('[ng-click="prev()"]').click();
        }

        //moving to next month view
        if(nextMonth){
            datepickerWrapper.$('[ng-click="next()"]').click();
        }

        //choosing the day
        dayNumber = ''+dayNumber;
        if(dayNumber.length === 1){
            dayNumber = '0'+dayNumber;
        }
        var dayElement = filters.filterByText(datepickerWrapper.$$('table tbody tr td span'), dayNumber);
        //when previous month last week has the date you chose
        dayElement.count().then(function(count){
            if(count > 1){
                if(dayNumber >= 22) {
                    dayElement = dayElement.get(1);
                }
                else{
                    dayElement = dayElement.get(0);
                }
            }
            dayElement.click();
        });

        //choosing the hour
        hour = ''+hour;
        if(hour.length === 1){
            hour = '0'+hour;
        }
        hour = hour+':00';
        var hourElement = filters.filterByText(datepickerWrapper.$$('table tbody tr td span'), hour);
        hourElement.click();

        //choosing the minutes
         minutes = ''+minutes;
        if(minutes.length === 1){
            minutes = '0'+minutes;
        }
        if(Number(minutes) % 5 === 0){
            minutes = hour.replace('00', minutes);

        }else{
            minutes = hour;
        }
        var minutesElement = filters.filterByText(datepickerWrapper.$$('table tbody tr td span'), minutes);
        return minutesElement.click();
    }

    /**
     * @description returns the current value of the datepicker input
     */
    function getDatepickerValue(){
        return datepickerInput.getAttribute('value');
    }

    /**
     * @description returns is the icon is empty or not
     */
    function isDatepickerIconFull(){
        return base.$('i').getAttribute('class').then(function (classes) {
            return classes.indexOf('fa-calendar-o') === -1;
        });
    }
    this.openDatepicker = openDatepicker;
    this.getDatepickerValue = getDatepickerValue;
    this.typeTimestamp = typeTimestamp;
    this.chooseTimestamp = chooseTimestamp;
    this.isDatepickerIconFull = isDatepickerIconFull;
}


module.exports = Datepicker;
