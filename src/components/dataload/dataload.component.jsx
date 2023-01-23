import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { Input } from '@mui/material';
import { FormControl, CircularProgress } from '@mui/material';
import ProgressInd from '../progressInd/progressInd';

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    setIsLoading(true);
    console.log('upload started');
    event.preventDefault();
    const url = 'http://localhost:3001/upload';
    const formData = new FormData();
    formData.append('uploadfile', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    await axios.post(url, formData, config).then((response) => {
      setIsLoading(false);
      alert(response.data);
    });
  }

  return (
    <div className='upload-form'>
      <FormControl onSubmit={handleSubmit} margin='normal'>
        <div className='upload-header'>
          <h1>React File Upload</h1>
        </div>
        <div className='upload-input'>
          <Input type='file' onChange={handleChange} />
        </div>
        <div className='upload-input'>
          <Button type='submit' onClick={handleSubmit} variant='contained'>
            Upload
          </Button>
        </div>{' '}
        {isLoading && <ProgressInd />}
      </FormControl>
    </div>
  );
};

export default Upload;
