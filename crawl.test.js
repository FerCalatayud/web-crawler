
import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";


test ('Normalized url: blog.boot.dev/path', () => {

    expect(normalizeURL('https://blog.boot.dev/path/')).toEqual('blog.boot.dev/path')
})
test ('Normalized url: blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toEqual('blog.boot.dev/path')
})
test ('Normalized url: blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toEqual('blog.boot.dev/path')
})
test ('Normalized url: blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path')).toEqual('blog.boot.dev/path')
})
test ('Normalized url: blog.boot.dev/path', () => {

    expect(() => {
        normalizeURL('blog.boot.dev/path/')
    }).toThrow()

})
test ('Normalized url: blog.boot.dev/path', () => {
    expect(() => {
        normalizeURL('t')
    }).toThrow()
})

// ----------------------
// ----------------------

test ('All URLs are converted to Absolute', () => {
    const rootURL = 'https://boot.dev'
    const excpected = ['https://boot.dev/', 'https://boot.dev/js_course']
    const absURL = getURLsFromHTML('<html><body><a href="https://boot.dev">Learn Backend Development</a><a href="/js_course">Learn js Language</a></body></html>', 
    rootURL)
    
    expect(absURL).toEqual(excpected);

    /*for (let url of absURL) {
        //expect(url.startsWith(rootURL)).toBe(true);
        let stringURL = `${url.protocol}//${url.hostname}${url.port ? ':' + url.port : ''}`
        expect(stringURL).toEqual(rootURL);
    }*/

})

test ('All <a> tags found', () => {
    const rootURL = 'https://boot.dev'
    const absURL = getURLsFromHTML('<html><body><a href="https://boot.dev">Learn Backend Development</a><a href="/js_course">Learn js Language</a></body></html>', 
    rootURL)

    expect(absURL.length).toEqual(2)
})
