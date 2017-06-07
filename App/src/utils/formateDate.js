export function formatDate(time) {
    // alert(time)
    let tmpDate = new Date(time);
    // alert(tmpDate)

    let year = tmpDate.getFullYear();
    let mathon = tmpDate.getMonth() + 1;
    let day = tmpDate.getDate();
    let hours = tmpDate.getHours();
    let minutes = tmpDate.getMinutes();
    return year + '.' + mathon + '.' + day + ' ' + hours + ':' + minutes;
}