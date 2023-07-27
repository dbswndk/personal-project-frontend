import React, { useState } from 'react';
import AWS from 'aws-sdk';
import ImageFile from './ImageFIle';

const Upload: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const uploadS3 = (formData: FormData) => {
    const REGION = process.env.REACT_APP_REGION;
    const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID;
    const SECRET_ACCESS_KEY_ID = process.env.REACT_APP_SECRET_ACCESS_KEY_ID;

    AWS.config.update({
      region: REGION,
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY_ID,
    });

    if (!imageFile) {
      alert('이미지를 등록해 주세요.');
      return;
    }

    // S3 업로드 시작
    const upload = new AWS.S3.ManagedUpload({
      params: {
        ACL: 'public-read',
        Bucket: 'vue-s3-jua-test',
        Key: `upload/${imageFile.name}`,
        Body: imageFile,
      },
    });

    upload.promise()
    .then((data) => {
      const imageUrl = data.Location;
      setImageSrc(imageUrl);
      console.log('업로드');
    })
    .catch((err) => {
      console.error('업로드 에러:', err);
    });
  };

  return (
    <div>
      <ImageFile setImageFile={setImageFile} setImageSrc={setImageSrc} />
      {/* 미리보기 */}
      {imageSrc && (<img src={imageSrc} alt="Uploaded Image" style={{ maxWidth: '300px', maxHeight: '300px' }} />)}
      <button type="button" onClick={() => {
          if (!imageSrc) {
            alert('이미지를 등록해 주세요.');
            return;
          }

          const formData = new FormData();
          if (imageFile) {
            formData.append('file', imageFile);
            formData.append('name', imageFile.name);
          }

          uploadS3(formData);
        }}
      >
        업로드!
      </button>
    </div>
  );
};

export default Upload;
