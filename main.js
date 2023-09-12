async function main(){
    const { crawlPage } = require('./crawl.js');
    const { printReport } = require( './report.js');
    if(process.argv.length < 3){
        console.log("Pass in the base url of the website you wish to crawl");
        return;
    }
    else if(process.argv.length > 3){
        console.log("Pass only one base url into the program");
        return;
    }
    let baseURL = process.argv[2]
    console.log("Crawling base URL: " + baseURL);
    const pages = {}
    let crawlInfo = await crawlPage(baseURL, baseURL, pages);
    printReport(crawlInfo);
}

main()