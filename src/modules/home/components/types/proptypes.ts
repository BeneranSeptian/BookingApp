import { StyleSheet } from "react-native";

export interface HotelItemProps {
  name: string;
  region: string;
  star: number;
  uri: string;
}

export interface HotelImageProps {
  imageUriThumbnail: string;
  style: object,
}

export interface HotelDetailItemProps {
  name: string;
  region: string;
  star: number;
}

export interface HotelStarProps {
  rating: number;
}
