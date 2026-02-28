// frontend/src/components/admin/menu/MenuForm.tsx
"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MenuCategory, MoodTag, TimeOfDay } from "@/lib/types/menu";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import { ImageUpload } from "../../ui/ImageUpload";
import { MultiSelect } from "./MultiSelect";
import { cn } from "@/lib/utils";

const menuItemSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  category: z.nativeEnum(MenuCategory),
  image: z.string().min(1, "Image is required"),
  isAvailable: z.boolean().optional(),
  preparationTime: z.number().min(0).optional(),
  moodTags: z.array(z.string()).optional(),
  timeOfDay: z.array(z.string()).optional(),
});

export type MenuFormData = z.infer<typeof menuItemSchema>;

interface MenuFormProps {
  initialData?: Partial<MenuFormData>;
  onSubmit: (data: MenuFormData) => Promise<void>;
  isSubmitting: boolean;
  submitLabel?: string;
}

// Convert enum to options for MultiSelect
const moodTagOptions = Object.values(MoodTag).map((tag) => ({
  value: tag,
  label: tag.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
}));

const timeOfDayOptions = Object.values(TimeOfDay).map((time) => ({
  value: time,
  label: time.charAt(0).toUpperCase() + time.slice(1),
}));

export function MenuForm({
  initialData,
  onSubmit,
  isSubmitting,
  submitLabel = "Save Menu Item",
}: MenuFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MenuFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      isAvailable: true,
      image: "",
      moodTags: [],
      timeOfDay: [],
      ...initialData,
    },
  });

  const handleFormSubmit = async (data: MenuFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Name *
            </label>
            <Input
              {...register("name")}
              placeholder="e.g., Jollof Rice"
              error={errors.name?.message}
              disabled={isSubmitting}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <Textarea
              {...register("description")}
              placeholder="Describe the dish..."
              rows={4}
              error={errors.description?.message}
              disabled={isSubmitting}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (₦) *
            </label>
            <Input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              placeholder="0.00"
              error={errors.price?.message}
              disabled={isSubmitting}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              {...register("category")}
              disabled={isSubmitting}
              className={cn(
                "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent capitalize",
                errors.category ? "border-red-500" : "border-gray-300",
                isSubmitting && "opacity-50 cursor-not-allowed",
              )}
            >
              <option value="">Select category</option>
              {Object.values(MenuCategory).map((category) => (
                <option key={category} value={category} className="capitalize">
                  {category.replace(/_/g, " ")}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menu Item Image *
            </label>
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.image?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Additional Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Preparation Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preparation Time (minutes)
            </label>
            <Input
              type="number"
              min="0"
              {...register("preparationTime", { valueAsNumber: true })}
              placeholder="15"
              disabled={isSubmitting}
            />
          </div>

          {/* Mood Tags */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mood Tags
            </label>
            <Controller
              name="moodTags"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={moodTagOptions}
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="Select mood tags"
                  disabled={isSubmitting}
                />
              )}
            />
            <p className="mt-1 text-xs text-gray-500">
              Select tags that describe the mood or feeling of this dish
            </p>
          </div>

          {/* Time of Day */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time of Day
            </label>
            <Controller
              name="timeOfDay"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={timeOfDayOptions}
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="Select time of day"
                  disabled={isSubmitting}
                />
              )}
            />
            <p className="mt-1 text-xs text-gray-500">
              Select when this dish is typically served
            </p>
          </div>

          {/* Availability */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("isAvailable")}
                disabled={isSubmitting}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 disabled:opacity-50"
              />
              <span className="text-sm font-medium text-gray-700">
                Available for ordering
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="min-w-[200px]"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}
