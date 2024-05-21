import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    try {
        const objtUrl = new URL(url)
    
        let normUrl = `${objtUrl.host}${objtUrl.pathname}`

        if (normUrl.endsWith('/')){
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

async function crawlPage(currentURL){
    try{
        const response = await fetch(currentURL, {
            method: 'GET', // Request method
            headers: {
              //'Content-Type': 'application/json', // Headers
            }
          })

        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
    
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            throw new Error("Expected HTML response")
        }

        // I'm not parsing a body to get data, but HTML file
        //const reponseObject = await response.json()
        const htmlBody = await response.text()

        console.log(htmlBody)
        
    } catch(err){
        console.log(err)
    }
}

export { normalizeURL,  getURLsFromHTML, crawlPage};
