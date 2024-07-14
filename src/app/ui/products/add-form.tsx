'use client';

import {
  MultiImageDropzone,
  type FileState,
} from '@/app/ui/dashboard/MultiImageDropzone';
import { useRouter } from 'next/navigation';
import { useEdgeStore } from '@/app/lib/edgestore';
import { useState } from 'react';
import { createProduct, createImages, FormFields } from '@/app/lib/actions';
import { Button } from '../button';
import { SubmitHandler, useForm } from 'react-hook-form';
import {categories} from '@/app/lib/jeansDefinitions'


export default function Form() {
  const router = useRouter();
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const { edgestore } = useEdgeStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

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

  async function cancelUpload() {
    for (const url of urls) {
      await edgestore.publicFiles.delete({
        url,
      });
    }
    console.log(fileStates, urls);
    setFileStates([]);
    setUrls([]);
    console.log(fileStates, urls);
  }

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      for (const url of urls) {
        await edgestore.publicFiles.confirmUpload({ url });
      }

      const productResult = await createProduct(data);

      if (!productResult.success) {
        setError('root', {
          type: 'manual',
          message: productResult.message || 'Error creating product',
        });
        return;
      }

      const imagesResult = await createImages(
        urls,
        productResult.productId as string,
      );
      router.push('/dashboard/products');

      if (!imagesResult.success) {
        setError('root', {
          type: 'manual',
          message: imagesResult.message || 'Error creating images',
        });
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
      <div className="flex flex-col justify-center gap-4">
        <div>
          <MultiImageDropzone
            value={fileStates}
            dropzoneOptions={{
              maxFiles: 6,
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
                          await new Promise((resolve) =>
                            setTimeout(resolve, 1000),
                          );
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
            onCancel={cancelUpload}
          />
        </div>

        <div className="flex flex-col gap-2">
          {/* Brand */}
          <div className="mb-4">
            <label htmlFor="brand" className="mb-2 block text-sm font-medium">
              Brand
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  {...register('brand', {
                    required: 'Is required',
                  })}
                  id="brand"
                  name="brand"
                  type="text"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="mb-2 block text-sm font-medium">
              Price
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  {...register('price', {
                    required: 'Price is required',
                  })}
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="Enter SEK amount"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium"
            >
              Choose category
            </label>
            <div className="relative">
              <select
                {...register('category', {
                  required: 'Is required',
                })}
                id="category"
                name="category"
                defaultValue=""
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {errors.brand && (
            <div className="text-red-400">{errors.brand.message}</div>
          )}
          {errors.root && (
            <div className="text-red-400">{errors.root.message}</div>
          )}
          <div className="mt-2 flex justify-end">
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Loading' : 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
