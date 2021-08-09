import { useRef } from 'react';
import { SubmitButton } from 'components/Buttons/SubmitButton';

export const UploadButton = ({ onFileChange, small }) => {
  const inputEl = useRef();
  const fileUploadAction = () => inputEl.current.click();

  return (
    <div>
      <input
        type="file"
        hidden
        ref={inputEl}
        onChange={() => onFileChange({ image: inputEl.current.files[0] })}
      />
      <SubmitButton small={small} onClick={fileUploadAction}>
        Choose An Image
      </SubmitButton>
    </div>
  );
};
