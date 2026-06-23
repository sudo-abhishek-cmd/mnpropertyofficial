import {
  FALLBACK_OFFICE_IMAGES,
  FALLBACK_PROPERTY_IMAGES,
  GOOGLE_DRIVE_API_KEY,
  GOOGLE_DRIVE_OFFICE_FOLDER_ID,
  GOOGLE_DRIVE_PROPERTY_FOLDER_ID,
} from "./constants";

export type MediaBundle = {
  images: string[];
  video: string | null;
};

export type SiteDriveContent = {
  property: MediaBundle;
  office: MediaBundle;
  fromFallback: boolean;
};

/** @deprecated */
export type DriveContent = MediaBundle & { fromFallback: boolean };

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  createdTime?: string;
};

const IMAGE_MIMES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);
const VIDEO_MIMES = new Set(["video/mp4", "video/quicktime", "video/webm"]);

export function driveImageUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

export function driveVideoUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

function isImage(mimeType: string) {
  return IMAGE_MIMES.has(mimeType) || mimeType.startsWith("image/");
}

function isVideo(mimeType: string) {
  return VIDEO_MIMES.has(mimeType) || mimeType.startsWith("video/");
}

export function getFallbackContent(): SiteDriveContent {
  return {
    property: { images: FALLBACK_PROPERTY_IMAGES, video: null },
    office: { images: FALLBACK_OFFICE_IMAGES, video: null },
    fromFallback: true,
  };
}

async function fetchFolderMedia(
  folderId: string,
  apiKey: string,
  fallbackImages: string[],
): Promise<MediaBundle> {
  const query = encodeURIComponent(`'${folderId}' in parents and trashed=false`);
  const url =
    `https://www.googleapis.com/drive/v3/files` +
    `?q=${query}` +
    `&fields=files(id,name,mimeType,createdTime)` +
    `&orderBy=createdTime desc` +
    `&pageSize=20` +
    `&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Drive API error: ${res.status}`);

  const json = (await res.json()) as { files?: DriveFile[] };
  const files = json.files ?? [];

  const images = files
    .filter((f) => isImage(f.mimeType))
    .slice(0, 6)
    .map((f) => driveImageUrl(f.id));

  const videoFile = files.find((f) => isVideo(f.mimeType));

  return {
    images: images.length > 0 ? images : fallbackImages.slice(0, 6),
    video: videoFile ? driveVideoUrl(videoFile.id) : null,
  };
}

export async function fetchFromGoogleDrive(
  propertyFolderId = GOOGLE_DRIVE_PROPERTY_FOLDER_ID,
  officeFolderId = GOOGLE_DRIVE_OFFICE_FOLDER_ID,
  apiKey = GOOGLE_DRIVE_API_KEY,
): Promise<SiteDriveContent> {
  if (!apiKey || (!propertyFolderId && !officeFolderId)) {
    return getFallbackContent();
  }

  try {
    const [property, office] = await Promise.all([
      propertyFolderId
        ? fetchFolderMedia(propertyFolderId, apiKey, FALLBACK_PROPERTY_IMAGES)
        : Promise.resolve({ images: FALLBACK_PROPERTY_IMAGES, video: null }),
      officeFolderId
        ? fetchFolderMedia(officeFolderId, apiKey, FALLBACK_OFFICE_IMAGES)
        : Promise.resolve({ images: FALLBACK_OFFICE_IMAGES, video: null }),
    ]);

    return { property, office, fromFallback: false };
  } catch {
    return getFallbackContent();
  }
}

/** @deprecated Use fetchFromGoogleDrive */
export async function fetchFromGoogleDriveLegacy(
  folderId = GOOGLE_DRIVE_PROPERTY_FOLDER_ID,
  apiKey = GOOGLE_DRIVE_API_KEY,
): Promise<DriveContent> {
  const data = await fetchFromGoogleDrive(folderId, "", apiKey);
  return { ...data.property, fromFallback: data.fromFallback };
}
