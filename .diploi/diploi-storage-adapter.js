// # Local File System Image Storage module
// The (default) module for storing images, using the local file system
const config = require('../../../shared/config');
const urlUtils = require('../../../shared/url-utils');
const LocalStorageBase = require('./LocalStorageBase');

const messages = {
  notFound: 'Image not found',
  notFoundWithRef: 'Image not found: {file}',
  cannotRead: 'Could not read image: {file}',
};

class DiploiImagesStorage extends LocalStorageBase {
  constructor() {
    super({
      storagePath: '/data/images',
      staticFileURLPrefix: urlUtils.STATIC_IMAGE_URL_PREFIX,
      siteUrl: config.getSiteUrl(),
      errorMessages: messages,
    });
  }
}

module.exports = DiploiImagesStorage;
