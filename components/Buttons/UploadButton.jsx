import { useRef } from 'react';
import { SubmitButton } from 'components/Buttons/SubmitButton';

export const UploadButton = (props) => {
  const inputEl = useRef();
  const fileUploadAction = () => inputEl.current.click();

  const convertToBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      props.onFileChange({ image: reader.result });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  return (
    <div>
      <input
        type="file"
        hidden
        ref={inputEl}
        onChange={() => convertToBase64(inputEl.current.files[0])}
      />
      <SubmitButton {...props} onClick={fileUploadAction}>
        Choose An Image
      </SubmitButton>
    </div>
  );
};
