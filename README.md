# data.gov.il scraping

This is a helper tool for documenting the data on the `data.gov.il` site.

## Installation

To install, clone the repository, then download the dependencies.

```bash
git clone https://github.com/ej-shafran/data-gov
cd ./data-gov/bin
npm install
```

Then, while in the `bin` directory, you can run the script by calling `main`:

```bash
./main <SOME data.gov URL>
```

Which will scrape that URL and prompt you to confirm the data and fill in the gaps.

If you're lazy (like me! :smile_cat:), you can put all of the links you want to go through into `bin/links.txt`, and then `main` will read them line-by-line and scrape each link for you.


