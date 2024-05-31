import { argv } from 'node:process';
//import {crawlPage} from './crawl.js';
import {normalizeURL, getURLsFromHTML, fetchPage, crawlPage} from './crawl.js';

async function main () {
    if (argv.length === 3) {
        console.log(`Starting to crawl ${argv[2]}`)

        const pageCounter = await crawlPage(argv[2]);

        console.log(`End of the crawiling, this is the page counter: ${JSON.stringify(pageCounter)}`)

        for (let page in pageCounter){
            console.log(`${page}: ${pageCounter[page]}`)
        }

    } else {
        throw new Error('Sorry space traveler, this web crawler only accepts 1 argument')
    }

}

main()
