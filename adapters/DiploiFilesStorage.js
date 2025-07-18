// # Local File System Storage module
// The (default) module for storing media, modified to use the Diploi volume mount /data
// This file will be moved to the /core/server/adapters/storage folder by the Dockerfiles.
const config = require('../../../shared/config');
const LocalStorageBase = require('./LocalStorageBase');

const messages = {
  notFound: 'File not found',
  notFoundWithRef: 'File not found: {file}',
  cannotRead: 'Could not read File: {file}',
};

class DiploiFilesStorage extends LocalStorageBase {
  constructor() {
    super({
      storagePath: '/data/files',
      siteUrl: config.getSiteUrl(),
      staticFileURLPrefix: config.getStaticUrlPrefix('files'),
      errorMessages: messages,
    });
  }
}

module.exports = DiploiFilesStorage;
