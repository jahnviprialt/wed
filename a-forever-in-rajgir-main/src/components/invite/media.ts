import brideImg from "@/assets/bride.jpg";
import groomImg from "@/assets/groom.jpg";
import couple1Img from "@/assets/couple1.jpg";
import couple2Img from "@/assets/couple2.jpg";
import couple3Img from "@/assets/couple3.jpg";

// Original photographs of the couple, shown untouched
// (only crop, slow zoom, fade and framing are applied).
// couple[0] is also used for the final section.
export const PHOTOS: {
  groom: string | null;
  bride: string | null;
  couple: (string | null)[];
} = {
  groom: groomImg,
  bride: brideImg,
  couple: [couple1Img, couple2Img, couple3Img],
};

// Supplied wedding soundtrack. When null, a soft generated
// tanpura-and-strings ambience plays instead.
export const MUSIC_URL: string | null = null;

// Venue location supplied by the couple.
export const DIRECTIONS_URL: string | null = "https://maps.app.goo.gl/3zzpS96KHaVgBCcc6";
