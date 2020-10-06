const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

var d = new Date();

var utc = d.getTime() + (d.getTimezoneOffset() * 60000);


var nd = new Date(utc + (3600000*5.5));

console.log(nd.toLocaleString())

document.getElementById("ref-year").value = nd.getFullYear();
document.getElementById("ref-month").value = nd.getMonth()+1;
document.getElementById("ref-day").value = nd.getDate();
document.getElementById("ref-hours").value = nd.getHours();
document.getElementById("ref-minutes").value = nd.getMinutes();
document.getElementById("ref-seconds").value = nd.getSeconds();

const form = document.querySelector(".diff-form");
const result = document.querySelector(".result");
const popContainer = document.querySelector(".pop-container");

form.addEventListener('submit', function(e) {
    // prevents default behaviour of form submission
    e.preventDefault();

    // Get the date values for current date
    const refYear = parseInt(document.getElementById("ref-year").value === "" ? nd.getFullYear() : document.getElementById("ref-year").value);
    const refMonth = parseInt(document.getElementById('ref-month').value === "" ? nd.getMonth()+1 : document.getElementById("ref-month").value);
    const refDay = parseInt(document.getElementById('ref-day').value === "" ? nd.getDate() : document.getElementById("ref-day").value);
    const refHour = parseInt(document.getElementById('ref-hours').value === "" ? nd.getHours() : document.getElementById("ref-hours").value);
    const refMinute = parseInt(document.getElementById('ref-minutes').value === "" ? nd.getMinutes() : document.getElementById("ref-minutes").value);
    const refSecond = parseInt(document.getElementById('ref-seconds').value === "" ? nd.getSeconds() : document.getElementById("ref-seconds").value);
    // Values to be added in the time
    const days = parseInt(document.getElementById("days").value === "" ? 0 : document.getElementById("days").value);
    const hours = parseInt(document.getElementById("hours").value === "" ? 0 : document.getElementById("hours").value);
    const minutes = parseInt(document.getElementById("minutes").value === "" ? 0 : document.getElementById("minutes").value);

    console.log(refYear, refMonth, refDay, refHour, refMinute, refSecond);
    
    let curDate = new Date(refYear, refMonth-1, refDay, refHour, refMinute, refSecond);
    let curTime = curDate.getTime();
    console.log(curTime);
    let milisec = (days*24*60*60*1000) + (hours*60*60*1000) + (minutes*60*1000);

    // Calculate future time and date
    let futureTime = curTime + milisec;
    console.log(futureTime)
    let futureDate = new Date(futureTime);

    console.log(futureDate);

    let resultStr = getDisplayDate(curDate, futureDate);
    result.innerHTML = resultStr;

    popContainer.classList.add('show-result');

    // Returns the tempalate string fo result date-time
    function getDisplayDate(curDate, datum) {
        return `<i class="far fa-times-circle close" onclick="hidePopContainer()"></i>
        <p>${format(days)} days ${format(hours)} hours ${format(minutes)} mins from ${curDate.getFullYear()}, ${months[curDate.getMonth()]} ${format(curDate.getDate())}, ${format(curDate.getHours())}:${format(curDate.getMinutes())} will be <br>
        <span class="future-date">${datum.getFullYear()}, ${months[datum.getMonth()]} ${format(datum.getDate())}, ${format(datum.getHours())}:${format(datum.getMinutes())}</span>
    </p>`;
    }
});

const close = document.querySelector(".close");

const hidePopContainer=()=>{
    popContainer.classList.remove('show-result');
};

function format(value) {
    if (value < 10)
        return `0${value}`;
    return value;
}
