// Convert raw time in milliseconds into "hh:mm:ss" or "mm:ss" depending on if the total time is less than 1 hour
module.exports = {
    convertTime: function(millis) {
        if(Math.sign(millis) === -1) {
            return "0:00"
        }

        let seconds = Math.floor((millis / 1000) % 60),
            minutes = Math.floor((millis / (1000 * 60)) % 60),
            hours = Math.floor((millis / (1000 * 60 * 60)) % 24);

        let hourst = (hours < 10) ? "0" + hours : hours;
        let minutest = (minutes < 10) ? "0" + minutes : minutes;
        let secondst = (seconds < 10) ? "0" + seconds : seconds;

        let str = hourst + ":" + minutest + ":" + secondst;
        if(hours === 0) {
            if(minutes < 10) {
                str = str.substring(4);
            }
            else {
                str = str.substring(3);
            }
        }
        return str;
    }
}