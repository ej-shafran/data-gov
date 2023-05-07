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

If you're lazy (like me! :smile_cat:), you can put all of the links you want to go through into `bin/links.txt`, and then `main` will read them line-by-line and scrape each link for you:

`links.txt`:

```
https://data.gov.il/<SOME DATASET>
https://data.gov.il/<ANOTHER DATASET>
```

Etc, then just run:

```bash
./main
```

## Exporting the Data

The data is saved to `bin/output.csv`. To import it into Google Sheets, do the following:

1) Go into your sheet within the spreadsheet, and delete the empty rows you're going to be replacing (the ones with your URLs).
2) Click on `File -> Import` and go to the `Upload` tab.
3) Upload `bin/output.csv`
4) For `Import location`, pick `Append to current sheet`
5) For `Seperator type`, pick `Comma`
6) Click on `Import Data`
7) TADA!

