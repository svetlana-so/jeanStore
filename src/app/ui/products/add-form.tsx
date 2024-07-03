'use client';

import {
  MultiImageDropzone,
  type FileState,
} from '@/app/components/MultiImageDropzone';
import { useEdgeStore } from '@/app/lib/edgestore';
import { useState } from 'react';
import { createProduct } from '@/app/lib/actions';
import type { FormFields} from '@/app/lib/actions';
import { Button } from '../button';
import { SubmitHandler, useForm } from 'react-hook-form';


export default function Form() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [isCancelled, setIsCancelled] = useState(false);
  const { edgestore } = useEdgeStore();

  const {register, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm<FormFields>()

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  async function handleCancel() {
    setIsCancelled(true);
    for (const url of urls) {
      await edgestore.publicFiles.delete({
        url,
      });
    }
    setFileStates([]);
    setUrls([]);
  }

  if (isCancelled) {
    return (
      <div className="m-6 flex flex-col items-center">
        <div>CANCELLED!!!</div>
        <button
          className="mt-4 rounded bg-green-500 px-3 py-1 text-black hover:opacity-80"
          onClick={() => setIsCancelled(false)}
        >
          Return to Upload
        </button>
      </div>
    );
  }

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
     /*  // Confirm uploads
      for (const url of urls) {
        await edgestore.publicFiles.confirmUpload({ url });
      } */

      const result = await createProduct(data);

      if (!result.success) {
       setError('root', {
        type: 'manual',
        message: result.message || 'Error creating product',
       })
      }
    } catch (err) {
      setError('root', {
        type: 'manual',
        message: 'Error confirming upload',
      });
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 6,
          maxSize: 1024 * 1024 * 1, // 1 MB
        }}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  // @ts-ignore
                  file: addedFileState.file,
                  options: {
                    temporary: true,
                  },
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });
                setUrls((prev) => [...prev, res.url]);
                console.log(res.url);
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
        }}
      />
      <div className="flex flex-col gap-2">
        <div>Brand</div>
        <input
        {...register('brand', {
          required: 'Is required'
        })}
            type="text"
            name="brand"
            className="rounded border border-zinc-600 bg-zinc-100 px-2 py-1"
          />
          {errors.brand && (<div className='text-red-400'>{errors.brand.message}</div>)}
          {errors.root && (<div className='text-red-400'>{errors.root.message}</div>)}
        <div className="mt-2 flex justify-end gap-2">
          <button

            className="rounded bg-white px-3 py-1 text-black hover:opacity-80"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <Button
          disabled= {isSubmitting}
          type="submit"
          >
            {isSubmitting? 'Loading' : 'Submit'}
          </Button>
        </div>

      </div>
    </div>
    </form>
  );
}

