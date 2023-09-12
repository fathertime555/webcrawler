const { test, expect } = require('@jest/globals')

const { normalizeURL } = require('./crawl.js')

test('normalizes string', () => {
    expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test('normalizes string', () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
});

test('normalizes string', () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test('normalizes string', () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
});