const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const isFile = typeof file.name == 'string';
    if (isFile) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(error);
    } else {
      const data = file.toDataURL();
      resolve(data);
    }
  });
};

export default toBase64;
