// frontend/src/components/admin/instagram/InstagramForm.tsx
"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import { ImageUpload } from "../../ui/ImageUpload";
import { cn } from "@/lib/utils";

const instagramPostSchema = z.object({
  imageUrl: z.string().min(1, "Image is required"),
  caption: z.string().min(10, "Caption must be at least 10 characters"),
  permalink: z.string().url("Must be a valid Instagram URL"),
  isVisible: z.boolean().optional(),
  displayOrder: z.number().min(0).optional(),
});

export type InstagramFormData = z.infer<typeof instagramPostSchema>;

interface InstagramFormProps {
  initialData?: Partial<InstagramFormData>;
  onSubmit: (data: InstagramFormData) => Promise<void>;
  isSubmitting: boolean;
  submitLabel?: string;
}

export function InstagramForm({
  initialData,
  onSubmit,
  isSubmitting,
  submitLabel = "Save Post",
}: InstagramFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InstagramFormData>({
    resolver: zodResolver(instagramPostSchema),
    defaultValues: {
      isVisible: true,
      displayOrder: 0,
      imageUrl: "",
      ...initialData,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Image Upload */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Image</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram Image *
            </label>
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.imageUrl?.message}
                  disabled={isSubmitting}
                />
              )}
            />
            <p className="mt-2 text-xs text-gray-500">
              Upload a high-quality image. Recommended: 1080x1080px (1:1 ratio)
              for Instagram feed.
            </p>
          </div>
        </div>
      </div>

      {/* Post Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Post Details
        </h3>

        <div className="space-y-6">
          {/* Caption */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Caption *
            </label>
            <Textarea
              {...register("caption")}
              placeholder="Write a captivating caption for your post..."
              rows={4}
              error={errors.caption?.message}
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500">
              This caption will be displayed when users hover over the image.
            </p>
          </div>

          {/* Instagram Permalink */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram Post URL *
            </label>
            <Input
              {...register("permalink")}
              placeholder="https://www.instagram.com/p/ABC123..."
              error={errors.permalink?.message}
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500">
              The URL to the original Instagram post. Users will be redirected
              here when they click the image.
            </p>
          </div>

          {/* Display Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <Input
              type="number"
              min="0"
              {...register("displayOrder", { valueAsNumber: true })}
              placeholder="0"
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500">
              Lower numbers appear first. Use this to manually order your posts.
            </p>
          </div>

          {/* Visibility Toggle */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("isVisible")}
                disabled={isSubmitting}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 disabled:opacity-50"
              />
              <div>
                <span className="text-sm font-medium text-gray-700">
                  Visible on Website
                </span>
                <p className="text-xs text-gray-500">
                  Uncheck to hide this post from the Instagram feed section
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
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
