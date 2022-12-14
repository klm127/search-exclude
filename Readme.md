# Search Exclude

Search Exclude is a browser extension which allows users to maintain a list of sites to permanently exclude from their search results on major browsers.

It is currently functional on Google and DuckDuckGo, and on Firefox. 

Search Exclude is not yet listed on the extension store but can be tested manually. 

![screenshot of the extension](https://github.com/klm127/search-exclude/raw/master/ReadmeScreenshot.png)

# Rationale

Some sites that are less than useful appear frequently in search results and it is tedious to manually include all the site exclusions. By saving toggle-able lists of sites to excludes, search efficiency can be improved.

Personally, I want to publish a relatively simple but useful browser extension to learn about browser extensions generally and the publishing process.
### Installing

- Download the latest release, a .zip file.
- Extract the .zip file
- Load a new temporary add-on by navigating to `about:debugging` in Mozilla Firefox.
- Select the `manifest.json` file in the extracted folder to add it to Firefxo

### Using

- Click the Search Exclude icon button on the browser navigation bar to drow down the popup
- Click "new category" to add a new category to exclude
- Click the drop down button to show the inside of that category
- Click "new row" to add a new site to exclude
- Type the URL of the site
- Check/uncheck all sites or categories you want to exclude/include
- Perform a search in duckduckgo or Google
- After the search executes, the page will refresh once to exclude all the sites you have selected

### Developing, Testing

- clone the git repository
- run `tsc --watch` and `webpack --watch` in terminal processes
- run `npm test-page` to run the UI testing suite to test components with random data

### Next Steps

- Add a button to toggle the extension overall.
    - This feature will be coming ASAP. For now, navigate to `about:debugging` and remove the extension to stop excluding.
- The extension should not refresh the page if there are no categories currently selected.
- The CSS needs major overhaul so it looks and feels right
    - ~~better drop down buttons~~
    - ~~better delete buttons~~
    - ~~better add buttons~~
    - better text inputs
- An appropriate icon is needed
- Add support for Yahoo, Bing, Startpage.com, quant.com, searchencrypt.com, gibiru, searx.me, and maybe some others.
