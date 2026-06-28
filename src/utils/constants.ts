/** Google Drive folder IDs — copy from folder URL after /folders/ */
export const GOOGLE_DRIVE_PROPERTY_FOLDER_ID = "";
export const GOOGLE_DRIVE_OFFICE_FOLDER_ID = "";

/** Google Cloud API key with Drive API enabled. */
export const GOOGLE_DRIVE_API_KEY = "";

/** @deprecated Use GOOGLE_DRIVE_PROPERTY_FOLDER_ID */
export const GOOGLE_DRIVE_FOLDER_ID = GOOGLE_DRIVE_PROPERTY_FOLDER_ID;

export const WHATSAPP_NUMBER = "+919643852807";
export const WHATSAPP_MESSAGE =
  "Hello, I saw the property samples on your website. Is it still available?";

export const SOCIAL_HANDLE = "@mnpropertyofficial";

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/mnpropertyofficial",
  facebook: "https://facebook.com/mnpropertyofficial",
  telegram: "https://t.me/mnpropertyofficial",
  youtube: "https://youtube.com/@mnpropertyofficial",
  x: "https://x.com/mnpropertyofficial",
};

const OFFICE_COORDS = { lat: 28.64965, lng: 77.183735 } as const;
const OFFICE_ADDRESS =
  "11675/2, Satnagar Rd, Karol Bagh West Extension Area, Block 1A, Sat Nagar, Karol Bagh, Delhi, 110005";

export const SITE = {
  contact: {
    phone: "+91 93153 52850",
    email: "mnpropertyofficial@gmail.com",
    address: OFFICE_ADDRESS,
    coordinates: OFFICE_COORDS,
  },
  hero: {
    headline: "Your Trusted Real Estate Partner in Central Delhi",
    subheadline: "Buy. Sell. Rent. Invest.",
    ribbon: "500+ Happy Families  •  10+ Years of Trust",
  },
  map: {
    embed: `https://maps.google.com/maps?q=${OFFICE_COORDS.lat},${OFFICE_COORDS.lng}&hl=en&z=17&output=embed`,
    link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS)}`,
  },
};

export const FALLBACK_PROPERTY_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
];

export const FALLBACK_OFFICE_IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  "https://images.unsplash.com/photo-1604328698692-f76ea9496813?w=800&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  "https://images.unsplash.com/photo-1605810235974-594f4f6a5516?w=800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
];

/** @deprecated Use FALLBACK_PROPERTY_IMAGES */
export const FALLBACK_IMAGES = FALLBACK_PROPERTY_IMAGES;

export const DRIVE_FETCH_ERROR_MSG =
  "Please check our social media for the latest properties and updates.";
