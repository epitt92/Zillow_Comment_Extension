import ChatFrame from './components/ChatFrame';
import LoadingPage from './components/LoadingPage';
// import { Provider } from 'react-redux';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { apiCaller } from '../Popup/utils/fetcher';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { createRoot } from 'react-dom/client';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: 'Nunito',
  },
});

const Main = ({ url }) => {
  const [storage, setStorage] = useState({});
  const [fetching, setFetching] = useState(false);
  const [isUrl, setIsUrl] = useState(false);

  useEffect(() => {
    setFetching(true);
    setIsUrl(
      url.includes('www.zillow.com/homedetails') ||
        url.includes('www.zillow.com/b/')
    );

    async function fetchData() {
      chrome.storage.local.get(null, async (obj) => {
        console.log(obj);
        setStorage({ ...obj });
        setFetching(false);
      });
    }
    fetchData();
  }, [url]);

  return (
    <>
      {fetching ? (
        <LoadingPage />
      ) : (
        <>
          {storage.authFlag ? (
            <>
              {isUrl ? (
                <ChatFrame />
              ) : (
                <Typography align="center" variant="h3" mt="10%">
                  Please go to listing page.
                </Typography>
              )}
            </>
          ) : (
            <Typography align="center" variant="h3" mt="10%">
              Please login to continue
            </Typography>
          )}
        </>
      )}
    </>
  );
};

const app = document.createElement('div');
const bodyEle = document.createElement('div');
bodyEle.innerHTML = document.body.innerHTML;
bodyEle.id = 'zillow-site';
app.id = 'my-extension-root';
// chrome.tabs.onCreated.addListener( (tabInfo) => {
//   console.log("Tab iss created", tabInfo)
// })
if (
  window.location.href.includes('http://www.zillow.com') ||
  window.location.href.includes('https://www.zillow.com')
) {
  document.body.innerHTML = '';
  document.body.appendChild(bodyEle);
  document.body.appendChild(app);
  const root = createRoot(app); // createRoot(container!) if you use TypeScript
  root.render(
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Main url={window.location.href} />
    </ThemeProvider>
  );
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // listen for messages sent from background.js
  if (request.message === 'urlupdated') {
    if (
      request.url.includes('http://www.zillow.com') ||
      request.url.includes('https://www.zillow.com')
    ) {
      document.body.appendChild(app);
      const root = createRoot(app); // createRoot(container!) if you use TypeScript
      root.render(
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Main url={request.url} />
        </ThemeProvider>
      );
    }
  }
  sendResponse();
});

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');
/*
class Main extends React.Component {

  render() {
    return (
    <>
      <div><h1>TEST</h1></div>
    </>
    )
  }
}

printLine("Using the 'printLine' function from the Print Module");

const appDiv = document.createElement('div');
appDiv.id = 'app-div';
// const appShadowRoot = appDiv.attachShadow({mode: 'open'});
console.log("sttt")
if(window.location.href.includes('http://zillowsdf.com') || window.location.href.includes('https://zillowsdf.com')) {
  console.log("Zillow.com")
  // Inject game modal to twitter page
  appDiv.style.position="fixed";
  appDiv.style.bottom='0px';
  appDiv.style.right="0px";
  appDiv.style.width="200px";
  appDiv.style.zIndex = "1000005";
  document.body.appendChild(appDiv);
  // addStyleDom(appShadowRoot, 'static/css/tailwind.css', true);
  // addStyleDom(appShadowRoot, 'static/css/content.styles.css', true);
  // addCSS(chrome.runtime.getURL('static/css/content.css'));
  ReactDOM.render(<GameModal />, appDiv);
  gameModal.style.display= "none";

  // Inject payment modal to twitter page
  document.body.appendChild(appDiv);
  ReactDOM.render(<Main />, appDiv);
  // app.style.display = "none";
}
*/

function addStyleDom(ele, href, flag) {
  const linkElem = document.createElement('link');
  linkElem.setAttribute('rel', 'stylesheet');
  if (flag) {
    linkElem.setAttribute('href', chrome.runtime.getURL(href));
  } else {
    linkElem.setAttribute('href', href);
  }
  if (!!ele) {
    console.log('BBT');
    ele.appendChild(linkElem);
  }
}
