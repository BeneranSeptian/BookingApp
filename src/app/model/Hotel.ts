export interface ChosenHotelDetail {
  zip: string;
  star: number;
  phone: string;
  images: HotelImage[];
  address: string;
  latitude: number;
  longitude: number;
  facilities: string[];
  hotel_name: string;
  descriptions: HotelDescription[];
}

interface HotelImage {
  url: string;
  title: string;
  thumbnail: string;
}

interface HotelDescription {
  title: string;
  description: string;
}

export interface ChosenHotelRoom {
  meal: string;
  region: string;
  meal_code: string;
  room_name: string;
  sply_code: string;
  avail_sply: string;
  hotel_sply: string;
  room_grade: string;
  vendor_code: string;
  hotel_room_type_selected: string;
}

export interface ChosenHotelParams {
  check_in: string;
  check_out: string;
  hotel_code: string;
  hotel_name: string;
  total_room: number;
  guest_adult: number;
  guest_infant: number;
  guest_children: number;
  guest_children_ages: number[];
}

interface CancellationPolicy {
  cxl_fee: number;
  cxl_remark: string;
  cxl_end_date: string;
  cxl_start_date: string;
}

interface PriceDetail {
  total: number;
  currency: string;
  origin_total: number;
  corporate_fee: number;
  discount_price: number;
}

interface ImportantInformation {
  info: string;
}

export interface ChosenHotelPrices {
  cxl_policies: CancellationPolicy[];
  precode_book: string;
  price_detail: PriceDetail;
  is_refundable: boolean;
  discount_description: string;
  important_informations: ImportantInformation[];
}
