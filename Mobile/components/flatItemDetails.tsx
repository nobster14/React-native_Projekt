import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flat } from './flatItem';

type FlatItemDetailsProps = {
    route: any,
};

export const FlatItemDetailsScreen: React.FunctionComponent<FlatItemDetailsProps> = ({route} : FlatItemDetailsProps) => {
    const flat = route.params.flatItem;
    const loginToken = route.params.loginToken;

    return (
        <View style={styles.container}>
            <Text>Flat Details</Text>
            <Text>Address: {flat.address}</Text>
            <Text>Size: {flat.footage} </Text>
            <Text>Rooms: {flat.rooms}</Text>
            <Text>Price: ${flat.price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});