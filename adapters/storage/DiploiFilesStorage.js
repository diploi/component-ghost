const DiploiLocalStorageBase = require('./DiploiLocalStorageBase');

class DiploiFilesStorage extends DiploiLocalStorageBase {
  constructor() {
    super({
      storagePath: '/data/files',
      staticFileURLPrefix: 'content/files'
    });
  }
}

module.exports = DiploiFilesStorage;
