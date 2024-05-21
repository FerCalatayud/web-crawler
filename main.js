import { argv } from 'node:process';
//import {crawlPage} from './crawl.js';
import {normalizeURL, getURLsFromHTML, crawlPage} from './crawl.js';

async function main () {
    if (argv.length === 3) {
        console.log(`Starting to crawl ${argv[2]}`)

        await crawlPage(argv[2]);

    } else {
        throw new Error('Sorry space traveler, this web crawler only accepts 1 argument')
    }

}

main()
