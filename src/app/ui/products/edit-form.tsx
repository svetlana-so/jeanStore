'use client';
import React from 'react';
import { Button } from '../button';
import type { Product } from '@/app/lib/definitions';
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
import { useForm } from 'react-hook-form';

interface EditFormProps {
  product: Product;
}

export const EditForm: React.FC<EditFormProps> = ({ product }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form>
      <div className="flex flex-col gap-2">
        {/* Brand */}
        <div className="mb-4">
          <label htmlFor="brand" className="mb-2 block text-sm font-medium">
            Brand
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="brand"
              {...register('brand')}
              type="text"
              defaultValue={product.brand}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Size Label */}
        <div className="mb-4">
          <label htmlFor="sizeLabel" className="block text-sm font-medium">
            Size Label
          </label>
          <select
            defaultValue={product.sizeLabel}
            id="sizeLabel"
            {...register('sizeLabel')}
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
            <input
              id="price"
              {...register('price')}
              type="number"
              step="0.01"
              placeholder="Enter SEK amount"
              defaultValue={product.price}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Choose category
          </label>
          <select
            id="category"
            {...register('category')}
            defaultValue={product.category}
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

        {/* Waist */}
        <div className="mb-4">
          <label
            htmlFor="waist"
            className="block text-sm font-medium dark:text-gray-200"
          >
            Waist
          </label>
          <select
            id="waist"
            {...register('waist')}
            defaultValue={product.waist}
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

        {/* Color */}
        <div className="mb-4">
          <label
            htmlFor="color"
            className="block text-sm font-medium dark:text-gray-200"
          >
            Color
          </label>
          <select
            id="color"
            {...register('color')}
            defaultValue={product.color}
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

        {/* Fit */}
        <div className="mb-4">
          <label htmlFor="fit" className="block text-sm font-medium">
            Fit
          </label>
          <select
            id="fit"
            {...register('fit')}
            defaultValue={product.fit}
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

        {/* Material */}
        <div className="mb-4">
          <label htmlFor="material" className="block text-sm font-medium">
            Material
          </label>
          <select
            id="material"
            {...register('material')}
            defaultValue={product.material}
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

        {/* Stretch */}
        <div className="mb-4">
          <label htmlFor="stretch" className="block text-sm font-medium">
            Stretch
          </label>
          <select
            id="stretch"
            {...register('stretch')}
            defaultValue={product.stretch}
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
            className="block text-sm font-medium dark:text-gray-200"
          >
            Length (in)
          </label>
          <select
            id="length"
            {...register('length')}
            defaultValue={product.length}
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

        {/* Measurement Hip */}
        <div className="mb-4">
          <label
            htmlFor="hipMeasurement"
            className="block text-sm font-medium dark:text-gray-200"
          >
            Hip (in)
          </label>
          <select
            id="hipMeasurement"
            {...register('hipMeasurement')}
            defaultValue={product.hipMeasurement}
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

        {/* Measurement Front Crotch */}
        <div className="mb-4">
          <label
            htmlFor="frontCrotchMeasurement"
            className="block text-sm font-medium dark:text-gray-200"
          >
            Front Crotch (in)
          </label>
          <select
            id="frontCrotchMeasurement"
            {...register('frontCrotchMeasurement')}
            defaultValue={product.frontCrotchMeasurement}
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

        {/* Measurement Back Crotch */}
        <div className="mb-4">
          <label
            htmlFor="backCrotchMeasurement"
            className="block text-sm font-medium dark:text-gray-200"
          >
            Back Crotch (in)
          </label>
          <select
            id="backCrotchMeasurement"
            {...register('backCrotchMeasurement')}
            defaultValue={product.backCrotchMeasurement}
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

        {/* Measurement Thigh */}
        <div className="mb-4">
          <label
            htmlFor="thighMeasurement"
            className="block text-sm font-medium dark:text-gray-200"
          >
            Thigh (in)
          </label>
          <select
            id="thighMeasurement"
            {...register('thighMeasurement')}
            defaultValue={product.thighMeasurement}
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

        {/* Measurement Inseam */}
        <div className="mb-4">
          <label
            htmlFor="inseamMeasurement"
            className="block text-sm font-medium dark:text-gray-200"
          >
            Inseam (in)
          </label>
          <select
            id="inseamMeasurement"
            {...register('inseamMeasurement')}
            defaultValue={product.inseamMeasurement}
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

        {errors.root && (
          <div className="text-red-400">{errors.root.message}</div>
        )}

        <div className="mt-2 flex justify-end">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Loading' : 'Submit'}
          </Button>
        </div>
      </div>
    </form>
  );
};
