import React, { useState, useRef } from 'react';

interface ImageFileProps {
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageFile: React.FC<ImageFileProps> = ({ setImageFile, setImageSrc }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop()?.toLowerCase();

    // 확장자 제한
    if (!['jpeg', 'png', 'jpg'].includes(fileExt || '')) {
      alert('jpg, png, jpg 파일만 업로드가 가능합니다.');
      return;
    }

    // 파일 리더
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // 파일 업로드
    reader.onload = () => {
      // 이미지 경로 선언
      setImageSrc(reader.result as string);
      // 이미지 파일 선언
      setImageFile(file);
    };
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        hidden
        accept="image/*"
        multiple
        type="file"
        onChange={onUpload}
      />
      <button onClick={onButtonClick}>Select Image</button>
    </div>
  );
};

export default ImageFile;
