import urlRegex from 'url-regex';
function isDataURL(s) {
  return !!s.match(isDataURL.regex);
}

isDataURL.regex =
  /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const isFile = typeof file.name == 'string';
    const isCanvas = typeof file.toDataURL === 'function';
    if (isFile) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(error);
    } else if (isCanvas) {
      resolve(file.toDataURL());
    } else if (
      // Cloudinary can take an url
      typeof file === 'string' &&
      (isDataURL(file) || urlRegex({ exact: true }).test(file))
    ) {
      resolve(file);
    }
    reject(null);
  });
};

export default toBase64;
