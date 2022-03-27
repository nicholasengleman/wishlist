import { forwardRef } from 'react';
import { Image, Placeholder, Transformation } from 'cloudinary-react';

const CloudinaryImage = forwardRef((props, ref) => (
  <Image
    ref={ref}
    cloudName="dazynasdm"
    publicId={props?.id}
    loading="lazy"
    style={props.style}
  >
    <Transformation quality="auto" fetchFormat="auto" />
    <Placeholder type="blur" />
  </Image>
));

export default CloudinaryImage;
