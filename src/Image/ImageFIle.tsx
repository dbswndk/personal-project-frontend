import React, { useState, useRef } from 'react';

interface ImageFileProps {
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setImageSrc: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageFile: React.FC<ImageFileProps> = ({ setImageFile, setImageSrc }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop()?.toLowerCase();

    if (!['jpeg', 'png', 'jpg'].includes(fileExt || '')) {
      alert('jpg, png, jpg 파일만 업로드가 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageSrc(reader.result as string);
      setImageFile(file);
    };
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#333',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
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
      <button style={buttonStyle} onClick={onButtonClick}>
        Select Image
      </button>    
    </div>
  );
};

export default ImageFile;
