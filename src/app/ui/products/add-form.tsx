'use client';

import {
  MultiImageDropzone,
  type FileState,
} from '@/app/components/MultiImageDropzone';
import { useEdgeStore } from '@/app/lib/edgestore';
import { useState, useActionState } from 'react';
import { createProduct, State } from '@/app/lib/actions';


export default function Form() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [isCancelled, setIsCancelled] = useState(false);
  const { edgestore } = useEdgeStore();

  const initialState: State = { message: null, errors: {} };
  

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

  async function handleSubmit() {
    try {
      for (const url of urls) {
        await edgestore.publicFiles.confirmUpload({
          url,
        });
      }
      console.log(urls)
      console.log(state)
      setFileStates([]);
      setUrls([]);
      
    } catch (err) {
      console.error('Error confirming upload:', err);
    }
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

  return (
    <form onSubmit={handleSubmit}>
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
        <TextField name="brand"/>
        <div className="mt-2 flex justify-end gap-2">
          <button
            className="rounded bg-white px-3 py-1 text-black hover:opacity-80"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="rounded bg-white px-3 py-1 text-black hover:opacity-80"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    </form>
  );
}

function TextField(props: {
  name?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <input
      type="text"
      name={props.name}
      className="rounded border border-zinc-600 bg-zinc-100 px-2 py-1"
      onChange={(e) => props.onChange?.(e.target.value)}
    />
  );
}