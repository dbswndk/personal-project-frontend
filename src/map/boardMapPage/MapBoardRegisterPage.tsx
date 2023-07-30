import { Box, Button, Container, TextField } from '@mui/material'
import ImageFile from 'Image/ImageFIle'
import AWS from 'aws-sdk';
import { registerBoard } from 'map/api/BoardMapApi'
import React, { useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

interface MapBoardRegisterPageProps {
  place_name: string;
  setIsWriting: React.Dispatch<React.SetStateAction<boolean>>; 
}

const MapBoardRegisterPage: React.FC<MapBoardRegisterPageProps> = ({ place_name, setIsWriting }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [writer] = useState(''); 
  const mutation = useMutation(
    (data: { title: string; content: string }) => {
      if (place_name) {
        return registerBoard(place_name, data);
      } else {
        throw new Error("해당하는 장소가 존재하지않습니다.");
      }
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('boardList'); 
        if (place_name) {
          setIsWriting(false);
        }
      }
    }
  );
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      elements: {
        title: { value: string };
        content: { value: string };
      };
    };

    const { title, content } = target.elements;

    if (!imageSrc) {
      return;
    }

    const data = {
      place_name: place_name,
      title: title.value,
      writer: writer,
      content: content.value,
    };
    await mutation.mutateAsync(data);

    setIsWriting(false);
  };

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

    const handleImageUpload = () => {
      const formData = new FormData();
      if (imageFile) {
        formData.append('file', imageFile);
        formData.append('name', imageFile.name);
      }
  
      uploadS3(formData);
    };

  return (
    <Container maxWidth="md" sx={{ marginTop: '2em' }}>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2} p={2}>
          <TextField label="제목" name="title" sx={{ borderRadius: '4px' }} className='customTextField'/>
          <TextField label="내용" name="content" multiline minRows={10} maxRows={10} sx={{ borderRadius: '4px' }}  className='customTextField'/>
          <ImageFile setImageFile={setImageFile} setImageSrc={setImageSrc} />
          {imageSrc && (<img src={imageSrc} alt="Uploaded Image" style={{ maxWidth: '300px', maxHeight: '300px' }} />)}
        </Box>
        <Button type="submit" onClick={() => {
          if (!imageSrc) {
            alert('영수증의 이미지를 등록해주세요.');
            return;
          } 
          handleImageUpload();
        }}
      >작성 완료</Button>
      </form>
    </Container>
  )
}

export default MapBoardRegisterPage;
