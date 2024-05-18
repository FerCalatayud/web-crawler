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



export { normalizeURL,  getURLsFromHTML};
