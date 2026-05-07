const DiploiLocalStorageBase = require('./DiploiLocalStorageBase');

class DiploiImagesStorage extends DiploiLocalStorageBase {
  constructor() {
    super({
      storagePath: '/data/images',
      staticFileURLPrefix: 'content/images'
    });
  }
}

module.exports = DiploiImagesStorage;
