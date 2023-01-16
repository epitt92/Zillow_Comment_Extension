import { printLine } from './modules/print';
import AddCommentComponent from './components/AddCommentComponent';
import ListCommentComponent from './components/ListCommentComponent';
// import { Provider } from 'react-redux';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// import store from '../Popup/redux/store';
import { apiCaller } from "../Popup/utils/fetcher";

const Main = () => {
  const [comments, setComments] = useState([]);
  useEffect(async () => {
    const {
      data: { comments }
    } = await apiCaller.get("/comments");
    setComments(comments);
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
      <div className={'my-extension'}>
          <h1>Comments</h1>
          <ListCommentComponent comments={comments} />
          <AddCommentComponent setComments={setComments} />
      </div>
    </>
  )
}
const app = document.createElement('div');
app.id = "my-extension-root";
// chrome.tabs.onCreated.addListener( (tabInfo) => {
//   console.log("Tab iss created", tabInfo)
// })
if(window.location.href.includes('http://www.zillow.com') || window.location.href.includes('https://www.zillow.com')) {
  document.body.appendChild(app);
  ReactDOM.render(
      <Main />, app);
}

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
  if(flag) {
    linkElem.setAttribute('href', chrome.runtime.getURL(href));
  } else {
    linkElem.setAttribute('href', href);
  }
  if(!!ele) {
    console.log("BBT")
    ele.appendChild(linkElem);
  }
}