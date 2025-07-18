// # Local File System Media Storage module
// The (default) module for storing media, modified to use the Diploi volume mount /data
const config = require('../../../shared/config');
const LocalStorageBase = require('./LocalStorageBase');

const messages = {
  notFound: 'Media file not found',
  notFoundWithRef: 'Media file not found: {file}',
  cannotRead: 'Could not read media file: {file}',
};

class DiploiMediaStorage extends LocalStorageBase {
  constructor() {
    super({
      storagePath: '/data/media',
      staticFileURLPrefix: config.getStaticUrlPrefix('media'),
      siteUrl: config.getSiteUrl(),
      errorMessages: messages,
    });
  }
}

module.exports = DiploiMediaStorage;
