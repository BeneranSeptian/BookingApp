import { Alert, FlatList, Modal, Pressable, Text, TextInput, View } from "react-native";
import {COLOR} from '../../misc/Theme';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {deleteGuest, setGuest} from './store/guestReducer';
import { options } from "axios";

export default function ChangeGuestScreen() {
  const { guests } = useSelector((state) => state.guest);
  const dispatch = useDispatch();

  const [localGuests, setLocalGuests] = useState([...guests]);

  const handleAddGuestForm = () => {
    const newGuest = {
      name: '',
      title: '',
      id: localGuests.length + 1,
    };
    setLocalGuests((prevState) => [...prevState, { ...newGuest }]);
  };

  const handleDelete = (id) => {
    setLocalGuests((prevState) => prevState.filter((guest) => guest.id !== id));
  };

  const handleSubmit = () => {
    Alert.alert('', 'Simpan Perubahan?', [
      {
        text: 'Tidak',
        style: 'cancel',
      },
      {
        text: 'Ya',
        onPress: () => {
          dispatch(setGuest(localGuests));
        },
      },
    ]);
  };

  return (
    <View
      style={{
        backgroundColor: COLOR.background,
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
      }}>
      <View>
        <SubTitle textValue={'Data Tamu'} />
        {localGuests.map((guest, index) => (
          <GuestItem
            key={index}
            guest={guest}
            handleDelete={handleDelete}
            handleGuestNameChange={(name) =>
              setLocalGuests((prevState) => {
                const updatedGuests = [...prevState];
                updatedGuests[index].name = name;
                return updatedGuests;
              })
            }
            handleGuestTitleChange={(title) =>
              setLocalGuests((prevState) => {
                const updatedGuests = [...prevState];
                updatedGuests[index].title = title;
                return updatedGuests;
              })
            }
          />
        ))}
        <Pressable
          style={{ alignSelf: 'center', marginTop: 16 }}
          onPress={handleAddGuestForm}>
          <Text style={{ color: COLOR.secondary, textDecorationLine: 'underline' }}>
            + Tambah data tamu
          </Text>
        </Pressable>
      </View>
      <Pressable
        style={{
          backgroundColor: COLOR.secondary,
          width: '100%',
          height: 50,
          borderRadius: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleSubmit}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: COLOR.white }}>
          Simpan Data Tamu
        </Text>
      </Pressable>
    </View>
  );
}

const SubTitle = ({textValue}) => {
  return (
    <Text style={{fontWeight: 'bold', fontSize: 16, color: COLOR.primary}}>
      {textValue}
    </Text>
  );
};

const GuestItem = ({ guest, handleDelete, handleGuestNameChange, handleGuestTitleChange }) => {
  const dispatch = useDispatch();

  const handleGuestDelete = () => {
    dispatch(deleteGuest(guest.id));
    handleDelete(guest.id);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
      }}>
      <TitleDropdown
        title={guest.title}
        handleTitleSelect={handleGuestTitleChange}
      />
      <View style={{ borderRadius: 8, borderWidth: 1, flex: 1 }}>
        <TextInput
          style={{ width: '100%', color: COLOR.primary, fontWeight: 'bold' }}
          value={guest.name}
          onChangeText={handleGuestNameChange}
        />
      </View>
      <Pressable onPress={handleGuestDelete}>
        <Icon name={'trash-can-outline'} size={50} color={'red'} />
      </Pressable>
    </View>
  );
};


const TitleDropdown = ({ title, handleTitleSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(title);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTitlePress = (selectedTitle) => {
    setSelectedTitle(selectedTitle);
    handleTitleSelect(selectedTitle);
    setIsDropdownOpen(false);
  };

  const guestTitle = ['Tn.', 'Ny.'];

  const renderTitleOption = ({ item }) => {
    return (
      <Pressable
        style={{ paddingVertical: 10, paddingHorizontal: 16 }}
        onPress={() => handleTitlePress(item)}>
        <Text>{item}</Text>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        borderRadius: 8,
        borderWidth: 1,
        height: 50,
        justifyContent: 'center',
        padding: 12,
        marginEnd: 16,
      }}>
      <Pressable onPress={toggleDropdown}>
        <Text style={{ fontSize: 14, color: COLOR.primary, fontWeight: 'bold' }}>
          {selectedTitle || guestTitle[0]}
        </Text>
      </Pressable>
      <Modal visible={isDropdownOpen} transparent>
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={toggleDropdown}>
          <View style={{ backgroundColor: '#FFF', borderRadius: 8, width: 200 }}>
            <FlatList
              data={guestTitle}
              renderItem={renderTitleOption}
              keyExtractor={item => item}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
