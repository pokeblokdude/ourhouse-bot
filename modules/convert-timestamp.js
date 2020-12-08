// Convert raw time in milliseconds into "hh:mm:ss" or "mm:ss" depending on if the total time is less than 1 hour
module.exports = {
    convertTime: function(millis) {
        let seconds = Math.floor((millis / 1000) % 60),
            minutes = Math.floor((millis / (1000 * 60)) % 60),
            hours = Math.floor((millis / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        let str = hours + ":" + minutes + ":" + seconds;
        if(hours === 0) str = str.substring(3);

        return str;
    }
}