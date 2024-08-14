import fs from 'fs';
import path from 'path';

const controllersPath = path.resolve('backend/controllers');
fs.readdir(controllersPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
  } else {
    console.log('Files in controllers directory:', files);
  }
});
