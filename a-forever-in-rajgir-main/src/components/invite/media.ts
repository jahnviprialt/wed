import brideImg from "@/assets/bride.jpg";
import groomImg from "@/assets/groom.jpg";
import couple1Img from "@/assets/couple1.jpg";
import couple2Img from "@/assets/couple2.jpg";
import couple3Img from "@/assets/couple3.jpg";
import shipshadiMp3 from "@/assets/shipshadi.mp3";

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

// Supplied wedding soundtrack.
export const MUSIC_URL: string = shipshadiMp3;

// Venue location supplied by the couple.
export const DIRECTIONS_URL: string | null =
  "https://www.google.com/maps/place/Arunya+gautam+vihar+hotel+%26+Resort,+Rajgir/@25.0290629,85.4166552,17z/data=!3m1!4b1!4m9!3m8!1s0x39f2efb1cd42f0a7:0x350592c0378066d0!5m2!4m1!1i2!8m2!3d25.0290629!4d85.4166552!16s%2Fg%2F11vdvlrbzk";
