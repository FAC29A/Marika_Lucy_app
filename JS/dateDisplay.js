function formatDateForDisplay(dateString) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dateObj = new Date(dateString);
    const dayName = days[dateObj.getUTCDay()];
    const monthName = months[dateObj.getUTCMonth()];
    const dayOfMonth = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    // Add 'th', 'st', 'nd', 'rd' to the day of the month
    let suffix = 'th';
    if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
        suffix = 'st';
    } else if (dayOfMonth === 2 || dayOfMonth === 22) {
        suffix = 'nd';
    } else if (dayOfMonth === 3 || dayOfMonth === 23) {
        suffix = 'rd';
    }

    return `${dayName} ${dayOfMonth}${suffix} ${monthName}, ${year}`;
}
