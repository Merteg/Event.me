import moment from 'moment';
import { server_url } from './config.json';


export const log_event = new CustomEvent('user-log');

/**
 * request() make an AJAX request to server and return promise with result
 * Parameters:
 * - path {string} - route to which the request is made (e.g. '/event')
 * - method {string} - request method, GET by default
 * - data {json} - json with data to be sent
 */
export async function request(path="", method="GET", data=null) {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    if(sessionStorage['Authorization-token']){
        myHeaders.append('Authorization', 'Token ' + sessionStorage['Authorization-token']);
    };

    const response = await fetch(server_url + path, {
      method: method,
      headers: myHeaders,
      mode: 'cors',
      body: data,
    });
    if ((response.status < 200 || response.status >= 300) && response.status !== 400) {
      window.Materialize.toast(`Something goes wrong (Error #${response.status})`, 5000);
    }
    const result = await response.json();
    return result;
}

export const emailValidation = email => /.+@{1}.+/.test(email);

export const isLogged = () => (typeof(sessionStorage['Authorization-token']) !== 'undefined');

/*
 * Check is object empty, return (True/False)
 */
export const isEmpty = obj => {
  for (const key in obj) {
    return false;
  }
  return true;
}

/*
 * Convert UTC datetime string to local datetime (moment.js object)
 */
export const momentUTCToLocal = utcString => moment(moment.utc(utcString).local());
