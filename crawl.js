function normalizeURL(url) {
    let normalizedURL = ""
    if (url.includes("https")){
        normalizedURL = url.slice(8)
        if (normalizedURL.endsWith("/")){
            normalizedURL = normalizedURL.slice(0, normalizedURL.length - 1)
        }
    }
    else{
        normalizedURL = url.slice(7)
        if (normalizedURL.endsWith("/")){
            normalizedURL = normalizedURL.slice(0, normalizedURL.length - 1)
        }
    }
    return normalizedURL
}

function getURLsFromHTML(htmlBody, baseURL){
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;
    const dom = new JSDOM(htmlBody);
    let linkArray = dom.window.document.querySelectorAll("a");
    let absoluteLinks = [linkArray.length]
    for (let i = 0; i < linkArray.length; i++){
        absoluteLinks[i] = baseURL + linkArray[i].href
    }
    return(absoluteLinks);
}

async function crawlPage(baseURL, currentURL, pages){
    if(!currentURL.includes(baseURL + "http")){
        let normalizedURL = normalizeURL(currentURL);
        if(pages.hasOwnProperty(normalizedURL)){
            if(currentURL != baseURL + "/"){ 
                pages[normalizedURL] = pages[normalizedURL] + 1;
            }
            else {
                pages[normalizedURL] = 0;
            }
            return pages;
        }
        else{
            if(currentURL != baseURL){ 
                pages[normalizedURL] = 1;
            }
            else {
                pages[normalizedURL] = 0;
            }
            try {
                const response = await fetch(currentURL);
                const status = response.status;
                if(status != 200){
                    console.log("Error fetching from " + currentURL + ". Error code: " + status);
                    return;
                }
                let contentType = response.headers.get("Content-Type");
                if(!contentType.includes("text/html")){
                    console.log("Content fetched from " + currentURL + " not in HTML");
                    return;
                }
                const text = await response.text()
                let links = getURLsFromHTML(text, baseURL);
                for (let i = 0; i < links.length; i++){
                    await crawlPage(baseURL, links[i], pages);
                }
                return pages;
            } catch(error){
                console.error("Error fetching or parsing HTML: " + error);
                return pages;
            }
        }
    }
}

module.exports = {
    crawlPage
}