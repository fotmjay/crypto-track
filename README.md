# Crypto Tracker

Crypto Tracker is a web application designed to track user-chosen crypto prices and transactions. It is meant as a replacement to other wallets/trackers that store data about the user habits, holdings or transactions. Everything in Crypto Tracker is stored in the user's browser (restitution from file to be added).

Crypto Tracker is made essentially as a 1-page-app using React, TypeScript and Material-UI.

Please ensure you have the following dependencies/modules installed:

```
"@emotion/react": "^11.11.1",
"@emotion/styled": "^11.11.0",
"@fontsource/roboto": "^5.0.8",
"@mui/icons-material": "^5.14.9",
"@mui/material": "^5.14.10",
"react": "^18.2.0",
"react-dom": "^18.2.0"

// Dev dependencies
"@types/react": "^18.2.15",
"@types/react-dom": "^18.2.7",
"@typescript-eslint/eslint-plugin": "^6.0.0",
"@typescript-eslint/parser": "^6.0.0",
"@vitejs/plugin-react": "^4.0.3",
"eslint": "^8.45.0",
"eslint-plugin-react-hooks": "^4.6.0",
"eslint-plugin-react-refresh": "^0.4.3",
"typescript": "^5.0.2",
"vite": "^4.4.5"
```

Clone the repositories:

```
git clone https://github.com/fotmjay/crypto-track/
```

Install the required modules for both:

```
npm install
```

You may then use as a in-development app with:

```
npm run dev
```

Visit http://localhost:5173 in your web browser (or whichever port Vite gives you in your terminal).

## App Features

**Full token list search bar**

The search bar uses latest data from CoinGecko to allow you to pick the exact cryptocurrency you want to track.

**Add to track list**

Easily add the chosen cryptocurrency to your tracked list.

**Data update**

Data about market cap, price and 24h % change provided by CoinGecko is updated automatically on page refresh or on button use.

**Buy/Sell tracker**

Click buy or sell on the app to enter the amount transacted. While lacking a bit of precision due to not fetching the price directly from the transaction itself, it allows for quick and efficient approximation of average prices (and doesn't require the user to manually enter prices).

**Export and import data**

Easily export your current list of tokens and transactions to import it back in another browser through a copied string.

## Planned Enhancements

**Buy/Sell tracker**
Done.

**Total wallet calculator**
Done.

**Allow to choose specific data**
Allow the user to decide what metrics they are interested in, and show those on the data table.

**Add list import from file**

Add the possibility to back up the data in a saved file and restore data from that file.

## Difficulties encountered

**API Limitations**

Due to using the CoinGecko free plan API, there are limits in place on the amount of requests made. Fetching the data efficiently to allow for good user experience but without going over the limits needed some thought.

**Learning multiple new technologies**

I had never used TypeScript nor MaterialUI before this project. Having to balance learning both at the same time made it more difficult due to lacking knowledge on one or the other would often lead to "both" not working and fixing one would sometimes break the other.

## What I Learned

During the development of Crypto Tracker, I acquired valuable knowledge and experience in various areas:

**TypeScript**

First time using TypeScript so adaptation was of the essence. Had to read a lot of documentation to get through the initial hump.

**MaterialUI**

First time using MUI. Lots of documentation was read here too, aswell as multiple guides and examples.

**Mobile-first UI approach**

I went mobile-first for this project (as opposed to Rental Manager) and it helped layout tremendously.
