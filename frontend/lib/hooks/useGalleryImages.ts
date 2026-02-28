import { useQuery } from "@tanstack/react-query";
import { galleryApi } from "@/lib/api/api";

export function useGalleryImages() {
return useQuery({
queryKey: ["gallery-images"],
queryFn: async () => {
const response = await galleryApi.getImages();
if (response.success && response.data) {
return response.data;
}
throw new Error(response.error || "Failed to load gallery images");
},
staleTime: 5 * 60 * 1000,
gcTime: 30 * 60 * 1000,
retry: 2,
});
}