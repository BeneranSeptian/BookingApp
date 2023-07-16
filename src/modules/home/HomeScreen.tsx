import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLOR} from '../../misc/Theme';
import HotelItem from './components/HotelItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  setChosenHotelDetail,
  setChosenHotelParams,
  setChosenHotelPrices,
  setChosenHotelRoom
} from "./store/hotelReducer";
import {getFirstDetailOrder, getSecondDetailOrder} from '../../app/data/Remote';

const HomeScreen = () => {
  const { chosenHotelDetail, chosenHotelRoom } = useSelector(
    state => state.chosenHotel,
  );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleFetchData = async apiFunction => {
      try {
        setIsLoading(true)
        const response = await apiFunction();
        const chosenHotelFromResponse =
          response?.data?.chosen_hotel?.data?.get_chosen_hotel;

        const chosenHotel = chosenHotelFromResponse?.chosen_hotel_detail;

        const chosenRoom = chosenHotelFromResponse?.chosen_hotel_room;
        const chosenHotelParams = chosenHotelFromResponse?.chosen_hotel_params;
        const chosenHotelPrices = chosenHotelFromResponse?.chosen_hotel_prices;

        if (chosenHotelPrices) {
          dispatch(setChosenHotelPrices(chosenHotelPrices))
        }

        if (chosenHotelParams){
          dispatch(setChosenHotelParams(chosenHotelParams));
        } else {
          console.error('Error extracting hotel params');
        }

        if (chosenRoom) {
          dispatch(setChosenHotelRoom(chosenRoom));
        } else {
          console.error('Error extracting room data');
        }

        if (chosenHotel) {
          dispatch(setChosenHotelDetail(chosenHotel));
        } else {
          console.error('Error extracting hotel data');
        }
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.error('Error fetching hotel data:', error);
      }
    };

    handleFetchData(getFirstDetailOrder);
  }, []);

  return (
    <View style={{backgroundColor: COLOR.background, flex: 1}}>
      {isLoading ? <Text>Lagi Loading</Text> : <ContentComponent hotelDetail={chosenHotelDetail}/>}
    </View>
  );
};

const ContentComponent = ({hotelDetail}) => {
  return (
    <View style={{marginTop: 16, flex: 1, marginHorizontal: 8}}>
      <GreetingComponent />
      {(hotelDetail !== null) ? (
        <HotelItem
          name={hotelDetail.hotel_name}
          region={hotelDetail.address}
          star={hotelDetail.star}
          uri={hotelDetail.images[0]?.thumbnail}
        />
      ) : null}
    </View>
  );
};

const GreetingComponent = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        Selamat datang di Booking App!
      </Text>
      <Text style={{fontSize: 14}}>
        Silahkan pilih hotel yang anda inginkan
      </Text>
    </View>
  );
};

export default HomeScreen;
