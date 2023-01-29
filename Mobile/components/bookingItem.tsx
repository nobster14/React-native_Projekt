import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Flat } from './flatItem';


export interface Booking {
    id : number,
    flatId: number,
    tenant: {
        name: string,
        surname: string,
        email: string
      },
      dateFrom: string,
      dateTo: string
    }


interface Props {
    item: Booking,
    loginToken: string,
    onDelete: (bookingId: number, loginToken: string) => void;
}

export const BookingItem: React.FunctionComponent<Props> = ({item, loginToken, onDelete} : Props) => {

    
    return(
        <View style={styles.container}>
            <Text style={styles.subheaderText}><AntDesign name="user" size={18} color="black" /> {item.tenant.name} {item.tenant.surname}</Text>
            <Text style={styles.subheaderText}><AntDesign name="calendar" size={18} color="black" /> {item.dateFrom.substring(0, 10)} - {item.dateTo.substring(0, 10)}</Text>
            <Text style={styles.subheaderTextFlat}><AntDesign name="home" size={18} color="black" /> Flat No. {item.flatId}</Text>
            <TouchableOpacity onPress={() => onDelete(item.id, loginToken)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
        </View>
    );}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 5,
            alignItems: "flex-start",
        },
        subheaderText: {
            fontSize: 18,
            marginVertical: 10,
        },
        subheaderTextFlat: {
            fontSize: 18,
            marginVertical: 10,
            color: "#151e6b"
        },
        deleteButton: {
            marginTop: 10,
            fontSize: 18,
            color: 'red',
          },
      });