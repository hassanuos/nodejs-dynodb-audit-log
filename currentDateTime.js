// Function to pad single digits with leading zeros
function padWithZero(num) {
    return num < 10 ? '0' + num : num;
}

function getCurrentDateTime(){
    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = padWithZero(currentDateTime.getMonth() + 1);
    const day = padWithZero(currentDateTime.getDate());
    const hours = padWithZero(currentDateTime.getHours());
    const minutes = padWithZero(currentDateTime.getMinutes());
    const seconds = padWithZero(currentDateTime.getSeconds());
    
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}



module.exports = getCurrentDateTime;