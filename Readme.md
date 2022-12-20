# search Exclude 

Search Exclude is a browser extension which allows users to maintain a list of sites to permanently exclude from their search results on major browsers.

It is currently functional on Google and DuckDuckGo, and on Firefox. 

Search Exclude is not yet listed on the extension store but can be tested manually. 

# Rationale

Some sites that are less than useful appear frequently in browser extensions, and it is too tedious to manually include all the site exclusions. This should help permanently remove useless content from search results.

Additionally, I want to publish a relatively simple but useful browser extension to learn about browser extensions generally and the publishing process.
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

### Next Steps

- There is currently no way to disable the extensions. This feature will be coming ASAP. For now, navigate to `about:debugging` and remove the extension to stop excluding.
- The extension should not refresh the page if there are no categories selected either.
- The CSS needs major overhaul so it looks and feels right
    - better drop down buttons
    - better delete buttons
    - better add buttons
    - better text inputs
- An appropriate icon is needed
- Add support for Yahoo, Bing, Startpage.com, quant.com, searchencrypt.com, gibiru, searx.me, and maybe some others.