const DiploiLocalStorageBase = require('./DiploiLocalStorageBase');

class DiploiMediaStorage extends DiploiLocalStorageBase {
  constructor() {
    super({
      storagePath: '/data/media',
      staticFileURLPrefix: 'content/media'
    });
  }
}

module.exports = DiploiMediaStorage;
