import React, {useMemo, useState} from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {COLOR} from '../../misc/Theme';
import {HotelImage} from '../home/components/HotelItem';
import {useSelector} from 'react-redux';
import moment from 'moment';
import 'moment/locale/id';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import { useNavigation } from "@react-navigation/native";

const PaymentDetailsScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLOR.background}}>
      <OrderStepComponent style={{flex: 0.1}} />
      <Gap height={6} />
      <ScrollView style={{flex: 0.9}} contentContainerStyle={{ flexGrow: 1 }}>
        <OrderDetailComponent
          style={{justifyContent: 'space-between'}}
        />
        <Gap height={6} />
        <OrderPersonComponent />
      </ScrollView>
    </View>
  );
};

const OrderStepComponent = ({style}) => {
  return (
    <View style={[{backgroundColor: COLOR.white, width: '100%'}, {...style}]} >
      <CircleStep title={'Detail Pesanan'} number={1} />
    </View>
  );
};

const OrderDetailComponent = ({style}) => {
  const {
    chosenHotelDetail,
    chosenHotelRoom,
    chosenHotelParams,
    chosenHotelPrices,
  } = useSelector(state => state.chosenHotel);

  const {images} = chosenHotelDetail;
  const {room_name, meal} = chosenHotelRoom;
  const {is_refundable} = chosenHotelPrices;

  const {hotel_name, total_room, guest_adult, check_in, check_out} =
    chosenHotelParams;

  const checkInDate = moment(check_in, 'YYYY-MM-DD');
  const checkOutDate = moment(check_out, 'YYYY-MM-DD');

  const totalNight = checkOutDate.diff(checkInDate, 'days');

  const formatDate = date => {
    moment.locale('id');
    const formattedDate = moment(date).format('LL');
    return formattedDate.toString();
  };

  return (
    <View
      style={[
        {backgroundColor: COLOR.white, width: '100%', padding: 16},
        {...style},
      ]}>
      <SubTitle textValue={'Detail Pesanan'} />
      <HotelOrderedComponent
        style={{justifyContent: 'center', alignItems: 'center'}}
        totalGuest={guest_adult}
        totalRoom={total_room}
        hotelName={hotel_name}
        roomName={room_name}
        meal={meal}
        totalNight={totalNight}
        uri={images[0].thumbnail}
      />
      <StayTimeComponent
        stayDate={formatDate(checkInDate)}
        stayText={'Check-In'}
      />
      <StayTimeComponent
        stayDate={formatDate(checkOutDate)}
        stayText={'Check-Out'}
      />
      {is_refundable && (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Icon name={'cash-refund'} size={20} color="gold" />
          <Text style={{color: 'gold', marginStart: 8}}>
            Dapat direfund jika dibatalkan
          </Text>
        </View>
      )}
    </View>
  );
};

const OrderPersonComponent = ({style}) => {
  const {
    guests,
  } = useSelector(state => state.guest);

  const navigation = useNavigation()

  return (
    <View
      style={[
        {backgroundColor: COLOR.white, width: '100%', padding: 16, justifyContent: 'space-evenly', flex: 1},
        {...style},
      ]}>
      <SubTitle textValue={'Detail Pemesan'} />
      <CustomerOrderDetail />
      <OrderForComponent />
      <SubTitle textValue={'Data Tamu'} />
      {guests.map(guest => (
        <GuestDataComponent
          name={guest.name}
          title={guest.title}
          key={guest.id}
        />
      ))}
      <Pressable style={{alignSelf: 'flex-end'}} onPress={()=>navigation.navigate('ChangeGuest')}>
        <Text style={{textDecorationLine: 'underline', color: COLOR.primary}}>
          Ubah Data Tamu
        </Text>
      </Pressable>
    </View>
  );
};

const HotelOrderedComponent = ({
  uri,
  hotelName,
  roomName,
  meal,
  totalRoom,
  totalGuest,
  totalNight,
}) => {
  return (
    <View style={styles.hotelOrderedStyle}>
      <HotelImage imageUriThumbnail={uri} style={{width: 75, height: 75}} />
      <HotelDescComponent
        hotelName={hotelName}
        hotelDesc={`${roomName} with ${meal}`}
        hotelParams={`${totalRoom} kamar + ${totalGuest} tamu + ${totalNight} malam`}
        style={{
          justifyContent: 'center',
          margintStart: 8,
        }}
      />
    </View>
  );
};

const Gap = ({height}) => {
  return <View style={{height: height}} />;
};

const SubTitle = ({textValue}) => {
  return (
    <Text style={{fontWeight: 'bold', fontSize: 16, color: 'black'}}>
      {textValue}
    </Text>
  );
};

const HotelDescComponent = ({hotelName, hotelDesc, hotelParams, style}) => {
  return (
    <View style={style}>
      <Text style={{fontSize: 14, color: COLOR.primary, fontWeight: 'bold'}}>
        {hotelName}
      </Text>
      <Text style={{fontSize: 12}}>{hotelDesc}</Text>
      <Text style={{fontSize: 12}}>{hotelParams}</Text>
    </View>
  );
};

const StayTimeComponent = ({stayText, stayDate}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}>
      <SubTitle textValue={stayText} />
      <Text>{stayDate}</Text>
    </View>
  );
};

const CustomerOrderDetail = () => {
  return (
    <View
      style={[
        styles.hotelOrderedStyle,
        {justifyContent: 'space-between', alignItems: 'center', padding: 12},
      ]}>
      <View>
        <SubTitle textValue={'Tn. Andreas Pasaribu'} />
        <Text>andreasBeneran@gmail.com</Text>
        <Text>+628 1213144128</Text>
      </View>
      <Pressable>
        <Text style={{textDecorationLine: 'underline', color: COLOR.primary}}>
          Ubah
        </Text>
      </Pressable>
    </View>
  );
};

const OrderForComponent = () => {
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1',
        label: 'Saya memesan untuk sendiri',
        value: 'option1',
      },
      {
        id: '2',
        label: 'Saya memesan untuk orang lain',
        value: 'option2',
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState<string | undefined>();

  return (
    <View>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={setSelectedId}
        selectedId={selectedId}
        containerStyle={{alignItems: 'flex-start'}}
      />
    </View>
  );
};

const GuestDataComponent = ({title, name,}) => {
  return (
    <View style={[styles.hotelOrderedStyle, {alignItems: 'center', justifyContent: 'flex-start', marginTop: 8}]}>
      <Icon name={title === 'Tn.'? 'face-man-profile' : 'face-woman-profile' } size={30} />
      <Text style={{fontWeight: 'bold', marginStart: 8}}>{`${title} ${name}`}</Text>
    </View>
  );
};

const CircleStep = ({ number, title }) => {
  return (
    <View style={styles.circleStepContainer}>
      <View style={styles.circle}>
        <Text style={styles.number}>{number}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  hotelOrderedStyle: {
    width: '100%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: COLOR.white,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  circleStepContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLOR.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    color: COLOR.primary,
    marginTop: 6,
  },
});

export default PaymentDetailsScreen;
