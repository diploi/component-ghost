const fs = require('fs');
const path = require('path');
const StorageBase = require('ghost-storage-base');

const MIME_TYPES = {
  '.avif': 'image/avif',
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.zip': 'application/zip'
};

class DiploiLocalStorageBase extends StorageBase {
  constructor({storagePath, staticFileURLPrefix}) {
    super();

    this.storagePath = storagePath;
    this.staticFileURLPrefix = staticFileURLPrefix.replace(/^\/+|\/+$/g, '');
  }

  _normalizeStorageRelativePath(filePath) {
    const normalized = path.posix.normalize(String(filePath || '')
      .replaceAll('\\', '/')
      .replace(/^\/+/, '')
      .replace(/\/+$/, ''));

    if (normalized === '.' || normalized === '..' || normalized.startsWith('../')) {
      throw new Error(`Invalid storage path: ${filePath}`);
    }

    return normalized;
  }

  _toStorageRelativePath(filePath) {
    const normalized = this._normalizeStorageRelativePath(filePath);
    const prefix = `${this.staticFileURLPrefix}/`;

    if (normalized.startsWith(prefix)) {
      return normalized.slice(prefix.length);
    }

    return normalized;
  }

  _resolveStoragePath(filePath, targetDir) {
    const root = path.resolve(this.storagePath);
    const base = targetDir ? path.resolve(targetDir) : root;
    const fullPath = path.resolve(base, this._toStorageRelativePath(filePath));
    const relative = path.relative(root, fullPath);

    if (relative === '' || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
      throw new Error(`Invalid storage path: ${filePath}`);
    }

    return fullPath;
  }

  _resolveTargetDir(targetDir) {
    const root = path.resolve(this.storagePath);
    const fullPath = targetDir ? path.resolve(targetDir) : root;
    const relative = path.relative(root, fullPath);

    if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
      throw new Error(`Invalid storage path: ${targetDir}`);
    }

    return fullPath;
  }

  _toPublicUrl(storageRelativePath) {
    const normalized = this._normalizeStorageRelativePath(storageRelativePath);
    return `/${this.staticFileURLPrefix}/${normalized}`.replace(/\\/g, '/');
  }

  async save(file, targetDir) {
    const destinationDir = targetDir
      ? this._resolveTargetDir(targetDir)
      : this.getTargetDir(this.storagePath);

    await fs.promises.mkdir(destinationDir, {recursive: true});

    const destination = await this.getUniqueFileName(file, destinationDir);
    await fs.promises.copyFile(file.path, destination);

    return this._toPublicUrl(path.relative(this.storagePath, destination));
  }

  async saveRaw(buffer, targetPath) {
    const destination = this._resolveStoragePath(targetPath);

    await fs.promises.mkdir(path.dirname(destination), {recursive: true});
    await fs.promises.writeFile(destination, buffer);

    return this._toPublicUrl(path.relative(this.storagePath, destination));
  }

  async exists(fileName, targetDir) {
    try {
      await fs.promises.stat(this._resolveStoragePath(fileName, targetDir));
      return true;
    } catch {
      return false;
    }
  }

  serve() {
    return (req, res, next) => {
      let filePath;

      try {
        filePath = this._resolveStoragePath(decodeURIComponent(req.path || req.url || ''));
      } catch (err) {
        res.statusCode = 400;
        return res.end('Bad Request');
      }

      const stream = fs.createReadStream(filePath);

      stream.on('error', (err) => {
        if (err.code === 'ENOENT' || err.code === 'ENOTDIR') {
          res.statusCode = 404;
          return res.end('Not Found');
        }

        return next(err);
      });

      res.setHeader('Cache-Control', 'public, max-age=31536000');

      const mimeType = MIME_TYPES[path.extname(filePath).toLowerCase()];
      if (mimeType) {
        res.setHeader('Content-Type', mimeType);
      }

      return stream.pipe(res);
    };
  }

  async delete(fileName, targetDir) {
    await fs.promises.rm(this._resolveStoragePath(fileName, targetDir), {force: true});
  }

  async read(options = {}) {
    return fs.promises.readFile(this._resolveStoragePath(options.path));
  }
}

module.exports = DiploiLocalStorageBase;
