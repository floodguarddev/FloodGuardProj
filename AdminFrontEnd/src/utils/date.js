export function getPublishDate(mongoDateString){
    // Convert MongoDB date string to JavaScript Date object
    const jsDate = new Date(mongoDateString);

    // Get the elements where you want to display the date
    const dateElement = document.getElementById("published-date");

    // Format the date as desired (e.g., "Month Day, Year")
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = jsDate.toLocaleDateString('en-US', options);
    return formattedDate
}