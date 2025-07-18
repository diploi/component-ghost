const path = require('path');
// const fs = require('fs');
const BaseAdapter = require('ghost-storage-base');
const express = require('express');

class DiploiStorage extends BaseAdapter {
  constructor() {
    super();
    this.storagePath = '/data';
  }

  async save(image) {
    const targetPath = path.join(this.storagePath, path.basename(image.path));
    // await fs.copy(image.path, targetPath);
    return `/content/images/${path.basename(image.path)}`; // URL returned
  }

  serve() {
    return express.static(this.storagePath);
  }

  async delete(fileName) {
    const targetPath = path.join(this.storagePath, path.basename(fileName));
    // await fs.remove(targetPath);
    return;
  }

  async exists(fileName) {
    const targetPath = path.join(this.storagePath, path.basename(fileName));
    // return fs.pathExists(targetPath);
    return true;
  }
}

module.exports = DiploiStorage;
