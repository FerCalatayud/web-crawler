import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    try {
        const objtUrl = new URL(url)
    
        let normUrl = `${objtUrl.host}${objtUrl.pathname}`

        if (normUrl.slice(-1) === '/'){
            normUrl = normUrl.slice(0, -1);
        }

        return normUrl

    } catch(err){
        throw Error(`Can't Normalize provided URL: ${url}`)
    }

}

function getURLsFromHTML(htmlBody, baseURL){
    const htmlBodyObjt = new JSDOM(htmlBody)

    // This next line returns a live collection of tags that will change if the document changes
    //const aTags = htmlBodyObjt.window.document.getElementsByTagName("a")

    // This next line returns a static collection of tags
    const anchorElements = htmlBodyObjt.window.document.querySelectorAll("a")
    const absoluteURLs = []

    for (let tag of anchorElements){
        if (tag.hasAttribute('href')){

            let href = tag.href
    
            if (href.startsWith('/')) {
                href = new URL(href, baseURL).href
            } else {
                href = new URL(href).href

            }
    
            //absoluteURLs.push(href.toString())
            absoluteURLs.push(href)
        }

    }

    return absoluteURLs
}

async function fetchPage(currentURL){

    try{
        let response = await fetch(currentURL)

        if (!response.ok) {
            throw new Error("Network response was not OK");
        }

        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);
        if (!contentType || !contentType.includes('text/html')) {
            throw new Error("Expected HTML response")
        }

        // I'm not parsing a body to get data, but HTML file
        //const reponseObject = await response.json()
        const htmlBody = await response.text()

        return htmlBody
        
    } catch(err){
        console.log(err)
    }
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}){

    console.log(`We are in crawlPage!`)
    
    try{
        const objCurrentUrl = new URL(currentURL)
        const objBaseUrl = new URL(baseURL)

        if (objBaseUrl.hostname !== objCurrentUrl.hostname){
            console.log(`Base URL: ${objBaseUrl.hostname}`)
            console.log(`Current URL: ${objCurrentUrl.hostname}`)
            return pages
        }

        let normCurrentUrl = normalizeURL(currentURL)

        if (normCurrentUrl in pages) {
            pages[normCurrentUrl] = pages[normCurrentUrl] + 1
            console.log(`Existing page: ${normCurrentUrl}`)
            return pages
        } else {
            pages[normCurrentUrl] = 1
            console.log(`New page: ${normCurrentUrl}`)
        }

        let currentUrlHtmlBody = await fetchPage(currentURL)

        const absoluteURLs = getURLsFromHTML(currentUrlHtmlBody, baseURL)

        for (let url of absoluteURLs){
            pages = await crawlPage(baseURL, url, pages)
        }

        return pages

        
    } catch(err){
        console.log(err)
    }
}

export { normalizeURL,  getURLsFromHTML, fetchPage, crawlPage};
