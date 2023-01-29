import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export interface Flat {
    id : number,
    country : string,
    town : string,
    address : string,
    capacity : number,
    rooms : number,
    footage : number,
    price: string,
    contactInfo : string,
    description : string,
    thumbnail : string
}

interface Props {
    item: Flat,
    onPress: () => void 
}



export const ListItem: React.FunctionComponent<Props> = ({item, onPress} : Props) => {

  
  return (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <Image source={{ uri: `data:image/png;base64,${item.thumbnail}` }} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>Flat No. {item.id}</Text>
      <Text style={styles.subtitle}>{item.town} {item.address}</Text>
    </View>
  </TouchableOpacity>
);}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
  },
});

export default ListItem;