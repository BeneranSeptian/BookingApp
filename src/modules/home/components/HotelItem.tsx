import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import {COLOR} from '../../../misc/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {
  HotelDetailItemProps,
  HotelImageProps,
  HotelItemProps,
  HotelStarProps,
} from './types/proptypes';
import { useNavigation, useRoute } from "@react-navigation/native";

const HotelItem: React.FC<HotelItemProps> = ({name, region, star, uri}) => {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.navigate('PaymentDetail')}>
      <View style={styles.itemContainer}>
      <HotelImage imageUriThumbnail={uri}  style={{}}/>
      <HotelDetailItem name={name} region={region} star={star} />
      </View>
    </Pressable>
  );
};

export const HotelImage: React.FC<HotelImageProps> = ({imageUriThumbnail, style}) => {
  return (
    <View style={[styles.imageContainer, {...style}]}>
      <Image
        style={{flex: 1, resizeMode: 'cover'}}
        source={{
          uri: imageUriThumbnail,
        }}
      />
    </View>
  );
};

const HotelDetailItem: React.FC<HotelDetailItemProps> = ({
  name,
  region,
  star,
}) => {
  return (
    <View style={{marginHorizontal: 12, justifyContent: 'center'}}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>{name}</Text>
      <View style={{marginTop: 4}}>
        <Text style={{fontSize: 14}}>{region}</Text>
        <HotelStar rating={star} />
      </View>
    </View>
  );
};

const HotelStar: React.FC<HotelStarProps> = ({rating}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<Icon key={i} name="star" size={20} color="gold" />);
    }
    return stars;
  };

  return <View style={{flexDirection: 'row', marginTop: 16}}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: COLOR.white,
    elevation: 2,
    borderRadius: 8,
    paddingVertical: 4,
    overflow: 'hidden',
    paddingHorizontal: 8,
  },

  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
export default HotelItem;
