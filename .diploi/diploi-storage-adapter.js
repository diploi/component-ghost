// # Local File System Storage module
// The (default) module for storing media, using the local file system
const config = require('../../../shared/config');
const LocalStorageBase = require('./LocalStorageBase');

class DiploiStorage extends LocalStorageBase {
  constructor() {
    super({
      storagePath: '/data',
      siteUrl: config.getSiteUrl(),
      staticFileURLPrefix: '',
    });
  }
}

module.exports = DiploiStorage;
