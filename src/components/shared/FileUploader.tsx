import { ImagePlus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { convertFileToUrl } from '@/lib/utils';

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpeg', '.jpg', '.svg'] },
  });

  return (
    <div
      {...getRootProps()}
      className='flex flex-col items-center p-4 border rounded-md cursor-pointer'
    >
      {fileUrl ? (
        <>
          <div className='flex justify-center flex-1 w-full p-5 lg:p-10'>
            <img
              src={fileUrl}
              alt='image'
              className='h-80 lg:h-[480px] w-full rounded-[24px] object-cover object-top'
            />
          </div>
          <p>Click or drag photo to replace</p>
        </>
      ) : (
        <div className='flex flex-col items-center jutify-center p-7 h-80 lg:h-[10rem]'>
          <input {...getInputProps()} />
          <ImagePlus size={60} />
          <h3>Drag Photos Here</h3>
          <p className='text-sm font-light text-gray-600'>SVG, PNG, JPG</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
