# Redirects 

Redirects are handled based on custom API response:

```json
{
    "redirectUrl": "/newUrl",
    "statusCode": 301
}
```

## Issue with native redirects
There is no way to handle redirects in the universal way.


## Client side 
On the client side browsers follow redirect for XHR or fetch automatically - from the frontend perspective we are not aware about the redirect. We can receive only `200 OK` status code, but we don't know what was the full trace of the request. 

### What is the issue ? 
We have the same url path after we get `200 OK` with the new content from the redirected page:

### Example scenario:
1. You are already on the page
2. Click "About us" link with `about-us` url
3. App call API `headless/about-us` to get the page
4. API returns 
   ```http
   statusCode: 307
   location: /headless/about-us/contact
   ```
5. Browser follows the `/headless/about-us/contact` and return new content
6. In the Browser URL bar we can see old url `/headless/about-us` - becase we are not aware of the redirect

So in that case we would have to detect redirect and setup new url path for the new page - `about-us/contact`.

## Server Side
On the SSR context we would have to return the new page URL without API path in the url.

### Example scenario:
1. Enter the page `http://mysite.com/about-us`
2. APP call the API in the node context `headless/about-us`
4. API returns 
   ```http
   statusCode: 307
   location: /headless/about-us/contact
   ```
5. APP in the node context see `statusCode` and `location`
6. APP in the node context make redirect to `location` header
7. Browser get the new page with `/headless/about-us/contact` - but this is the API endpoint, not frontend page 
   
So in that case we would have to detect new url in step 4 and strip `headless` API path from the URL - or API should return new URL without `headless` part - but this is more complex because for the client side we should get `headless` in the url to call API correct.


### TYPO3 Headless way
The API response for the page that should be redirected should returns follow response:

```json
{
    "redirectUrl": "/newUrl",
    "statusCode": 301
}
```

So in that case we can handle it in universal way on the response level.
On the SSR `nuxt` provides `redirect` method to make redirect in node context. 
On the client side we can use just `location.href` to replace current url. 

```js
if (process.server) {
    return context.redirect(response.data.statusCode || 301, response.data.redirectUrl)
} else if (process.client && typeof window !== 'undefined') {
    window.location.href = response.data.redirectUrl
    return context.next(false)
}
```

## Diagram
![redirects](./redirects.svg)