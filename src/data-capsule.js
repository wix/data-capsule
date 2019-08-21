'use strict';

const BaseStorage = require('./base-storage');

function validateNamespace(options) {
  if (!options.namespace) {
    throw new Error('namespace is required');
  } else if (typeof options.namespace !== 'string') {
    throw new Error('namespace should be a string');
  }
}

class DataCapsule extends BaseStorage {
  constructor({strategy, namespace, scope, expiration}) {
    super();
    this.storageStrategy = BaseStorage.verify(strategy);
    this._options = {namespace, scope};
    if (expiration !== undefined) {
      this._options.expiration = expiration;
    }
  }

  _buildValidateOptions(capsuleOptions, options) {
    options = Object.assign({}, capsuleOptions, options);
    options.scope = this.storageStrategy.extendScope(options.scope);
    validateNamespace(options);
    return options;
  }

  setItem(key, value, options) {
    options = this._buildValidateOptions(this._options, options);
    return this.storageStrategy.setItem(key, value, options);
  }

  getItem(key, options) {
    options = this._buildValidateOptions(this._options, options);
    return this.storageStrategy.getItem(key, options);
  }

  removeItem(key, options) {
    options = this._buildValidateOptions(this._options, options);
    return this.storageStrategy.removeItem(key, options);
  }

  getAllItems(options) {
    options = this._buildValidateOptions(this._options, options);
    return this.storageStrategy.getAllItems(options);
  }
}

module.exports = DataCapsule;
