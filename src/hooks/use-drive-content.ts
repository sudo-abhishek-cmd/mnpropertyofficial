import { useQuery } from "@tanstack/react-query";
import { fetchFromGoogleDrive, getFallbackContent } from "@/utils/googleDrive";

export function useDriveContent() {
  return useQuery({
    queryKey: ["drive-content"],
    queryFn: async () => {
      try {
        return await fetchFromGoogleDrive();
      } catch {
        return getFallbackContent();
      }
    },
    staleTime: 5 * 60_000,
    retry: 1,
  });
}
