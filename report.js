function printReport(pages){
    console.log("Printing report of url crawl");
    const keyValueArray = Object.entries(pages);
    keyValueArray.sort((a, b) => b[1] - a[1]);
    pages = Object.fromEntries(keyValueArray)
    const keys = Object.keys(pages);
    for( let i = 0; i < keys.length; i++){
        if(pages[keys[i]] > 1){
            console.log("Found " + pages[keys[i]] + " internal links to " + keys[i]);
        }
        else if(pages[keys[i]] = 1){
            console.log("Found " + pages[keys[i]] + " internal link to " + keys[i]);
        }
    }
}

module.exports = {
    printReport
}