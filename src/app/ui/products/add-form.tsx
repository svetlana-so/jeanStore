'use client';

import {
  MultiImageDropzone,
  type FileState,
} from '@/app/ui/dashboard/MultiImageDropzone';
import { useRouter } from 'next/navigation';
import { useEdgeStore } from '@/app/lib/edgestore';
import { useState } from 'react';
import { createProduct, createImages } from '@/app/lib/actions';
import { Button } from '../button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormFields } from '@/app/lib/definitions';
import {
  categories,
  waist,
  jeansColors,
  measurementLength,
  measurementHip,
  measurementFrontCrotch,
  measurementBackCrotch,
  measurementThigh,
  measurementInseam,
  sizeLabel,
  fitOptions,
  materialOptions,
  stretchOptions,
} from '@/app/lib/jeansDefinitions';

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
          {/* Size */}
          <div className="mb-4">
            <label htmlFor="sizeLabel" className="block text-sm font-medium">
              Size Label
            </label>
            <select
              {...register('sizeLabel', {
                required: 'Size label is required',
              })}
              id="sizeLabel"
              name="sizeLabel"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="" disabled>
                Select a size label
              </option>

              {sizeLabel.map((size) => (
                <option
                  key={size}
                  value={size}
                  className="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                >
                  {size}
                </option>
              ))}
            </select>
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
          {/* Waist */}
          <div className="mb-4">
            <label
              htmlFor="waist"
              className="mb-2 block text-sm font-medium dark:text-gray-200"
            >
              Waist
            </label>
            <div className="relative">
              <select
                {...register('waist', {
                  required: 'Is required',
                })}
                id="waist"
                name="waist"
                defaultValue=""
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400"
              >
                <option value="" disabled>
                  Select a waist size
                </option>
                {waist.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Jeans Color */}
          <div className="mb-4">
            <label
              htmlFor="color"
              className="mb-2 block text-sm font-medium dark:text-gray-200"
            >
              Color
            </label>
            <div className="relative">
              <select
                {...register('color', {
                  required: 'Is required',
                })}
                id="color"
                name="color"
                defaultValue=""
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400"
              >
                <option value="" disabled>
                  Select a color
                </option>
                {jeansColors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="fit" className="block text-sm font-medium">
              Fit
            </label>
            <select
              {...register('fit', {
                required: 'Fit is required',
              })}
              id="fit"
              name="fit"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400"
            >
              <option value="" disabled>
                Select a fit
              </option>
              {fitOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {/* material */}
          <div className="mb-4">
            <label htmlFor="material" className="block text-sm font-medium">
              Material
            </label>
            <select
              {...register('material', {
                required: 'Material is required',
              })}
              id="material"
              name="material"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400"
            >
              <option value="" disabled>
                Select a material
              </option>
              {materialOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="stretch" className="block text-sm font-medium">
              Stretch
            </label>
            <select
              {...register('stretch', {
                required: 'Stretch is required',
              })}
              id="stretch"
              name="stretch"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400"
            >
              <option value="" disabled>
                Select a stretch type
              </option>
              {stretchOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Measurement Length */}
          <div className="mb-4">
            <label
              htmlFor="length"
              className="mb-2 block text-sm font-medium dark:text-gray-200"
            >
              Length (in)
            </label>
            <div className="relative">
              <select
                {...register('length', {
                  required: 'Length is required',
                })}
                id="length"
                name="length"
                defaultValue=""
                className="dark:placeholder-text-gray-400 peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="" disabled>
                  Select a length
                </option>
                {measurementLength.map((length) => (
                  <option key={length} value={length}>
                    {length}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Measurement Hip */}
          <div className="mb-4">
            <label
              htmlFor="hipMeasurement"
              className="mb-2 block text-sm font-medium dark:text-gray-200"
            >
              Hip (in)
            </label>
            <div className="relative">
              <select
                {...register('hipMeasurement', {
                  required: 'Hip measurement is required',
                })}
                id="hipMeasurement"
                name="hipMeasurement"
                defaultValue=""
                className="dark:placeholder-text-gray-400 peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="" disabled>
                  Select a hip measurement
                </option>
                {measurementHip.map((hip) => (
                  <option key={hip} value={hip}>
                    {hip}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Measurement Front Crotch */}
          <div className="mb-4">
            <label
              htmlFor="frontCrotchMeasurement"
              className="mb-2 block text-sm font-medium dark:text-gray-200"
            >
              Front Crotch (in)
            </label>
            <div className="relative">
              <select
                {...register('frontCrotchMeasurement', {
                  required: 'Front crotch measurement is required',
                })}
                id="frontCrotchMeasurement"
                name="frontCrotchMeasurement"
                defaultValue=""
                className="dark:placeholder-text-gray-400 peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="" disabled>
                  Select a front crotch measurement
                </option>
                {measurementFrontCrotch.map((frontCrotch) => (
                  <option key={frontCrotch} value={frontCrotch}>
                    {frontCrotch}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Measurement Back Crotch */}
          <div className="mb-4">
            <label
              htmlFor="backCrotchMeasurement"
              className="mb-2 block text-sm font-medium dark:text-gray-200"
            >
              Back Crotch (in)
            </label>
            <div className="relative">
              <select
                {...register('backCrotchMeasurement', {
                  required: 'Back crotch measurement is required',
                })}
                id="backCrotchMeasurement"
                name="backCrotchMeasurement"
                defaultValue=""
                className="dark:placeholder-text-gray-400 peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="" disabled>
                  Select a back crotch measurement
                </option>
                {measurementBackCrotch.map((backCrotch) => (
                  <option key={backCrotch} value={backCrotch}>
                    {backCrotch}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Measurement Thigh */}
          <div className="mb-4">
            <label
              htmlFor="thighMeasurement"
              className="mb-2 block text-sm font-medium dark:text-gray-200"
            >
              Thigh (in)
            </label>
            <div className="relative">
              <select
                {...register('thighMeasurement', {
                  required: 'Thigh measurement is required',
                })}
                id="thighMeasurement"
                name="thighMeasurement"
                defaultValue=""
                className="dark:placeholder-text-gray-400 peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="" disabled>
                  Select a thigh measurement
                </option>
                {measurementThigh.map((thigh) => (
                  <option key={thigh} value={thigh}>
                    {thigh}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Measurement Inseam */}
          <div className="mb-4">
            <label
              htmlFor="inseamMeasurement"
              className="mb-2 block text-sm font-medium dark:text-gray-200"
            >
              Inseam (in)
            </label>
            <div className="relative">
              <select
                {...register('inseamMeasurement', {
                  required: 'Inseam measurement is required',
                })}
                id="inseamMeasurement"
                name="inseamMeasurement"
                defaultValue=""
                className="dark:placeholder-text-gray-400 peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="" disabled>
                  Select an inseam measurement
                </option>
                {measurementInseam.map((inseam) => (
                  <option key={inseam} value={inseam}>
                    {inseam}
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
