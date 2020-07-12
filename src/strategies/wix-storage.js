/* global document */

import axios from 'axios';
import BaseStorage from '../base-storage';
import { NOT_FOUND, SERVER_ERROR } from '../utils/constants';

function getCookieValue(name) {
  if (typeof document === 'undefined') {
    return '';
  } else {
    return (document.cookie.match(`${name}=([^;]*)`) || ['']).pop();
  }
}

export function getUserId() {
  const wixClient = getCookieValue('wixClient').split('|');
  return wixClient[6] || getCookieValue('_wixCIDX');
}

export default class WixStorageStrategy extends BaseStorage {
  constructor({ signedInstance, baseUrl } = {}) {
    super();

    this.axiosInstance = axios.create({
      headers: headers({ signedInstance }),
    });

    this.baseUrl = baseUrl;
  }

  extendScope(scope) {
    scope = typeof scope === 'string' ? { siteId: scope } : scope;
    return Object.assign({ userId: getUserId() }, scope);
  }

  setItem(key, value, options) {
    const payload = {
      nameSpace: options.namespace,
      key,
      blob: value,
    };

    if (options.scope && options.scope.siteId) {
      payload.siteId = options.scope.siteId;
    }

    if (options.expiration) {
      payload.TTLInDays = Math.ceil(options.expiration / (60 * 60 * 24));
    }

    return this.axiosInstance
      .post(this._toFullUrl('/_api/wix-user-preferences-webapp/set'), payload)
      .then(() => undefined)
      .catch(() => {
        throw SERVER_ERROR;
      });
  }

  removeItem(key, options) {
    const payload = {
      nameSpace: options.namespace,
      key,
    };

    if (options.scope && options.scope.siteId) {
      payload.siteId = options.scope.siteId;
    }

    return this.axiosInstance
      .post(
        this._toFullUrl('/_api/wix-user-preferences-webapp/delete'),
        payload,
      )
      .then(() => undefined)
      .catch(() => {
        throw SERVER_ERROR;
      });
  }

  getItem(key, options) {
    const siteId = options.scope && options.scope.siteId;
    const path = siteId ? 'getVolatilePrefForSite' : 'getVolatilePrefForKey';
    const url = [
      '/_api/wix-user-preferences-webapp',
      path,
      options.namespace,
      siteId,
      key,
    ]
      .filter(x => x)
      .join('/');

    return this.axiosInstance
      .get(this._toFullUrl(url))
      .then(res => res.data[key])
      .catch(err => {
        throw err.response.status === 404 ? NOT_FOUND : SERVER_ERROR;
      });
  }

  getAllItems(options) {
    const siteId = options.scope && options.scope.siteId;
    const path = siteId ? 'getVolatilePrefsForSite' : 'getVolatilePrefs';
    const url = [
      '/_api/wix-user-preferences-webapp',
      path,
      options.namespace,
      siteId,
    ]
      .filter(x => x)
      .join('/');

    return this.axiosInstance
      .get(this._toFullUrl(url))
      .then(res => res.data)
      .catch(() => {
        throw SERVER_ERROR;
      });
  }

  _toFullUrl(url) {
    if (this.baseUrl) {
      return `${this.baseUrl}${url}`;
    }

    return url;
  }
}

function headers({ signedInstance }) {
  const headers = {}; // eslint-disable-line no-shadow

  if (signedInstance) {
    headers.authorization = signedInstance;
  }

  return headers;
}
