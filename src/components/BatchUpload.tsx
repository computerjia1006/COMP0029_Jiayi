'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Button,
  Box,
  Stack
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MainCard from 'components/MainCard';

export default function BatchUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    console.log('Uploading:', selectedFile);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
      <MainCard title="Add Project through CSV" sx={{ width: '80%' }}>
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            padding: 4,
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="csv-upload"
          />
          <label htmlFor="csv-upload">
            <CloudUploadIcon sx={{ fontSize: 50, color: 'blue' }} />
            <Typography>Upload .CSV File</Typography>
            <Typography variant="body2" color="textSecondary">
              Drop CSV file here or <strong>click to browse</strong> through your machine
            </Typography>
          </label>
        </Box>

        {selectedFile && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Selected File: {selectedFile.name}
          </Typography>
        )}

        <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.back()}
          >
            Return
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload File
          </Button>
        </Stack>
      </MainCard>
    </Box>
  );
}
