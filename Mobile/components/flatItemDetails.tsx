import * as React from 'react';
import { View, Text } from 'react-native';

interface Props {
    flatItem: any;
}

export const FlatItemDetailsScreen: React.FunctionComponent = ({flatItem} : any) => {
    return (
        <View>
            <Text>Flat Item Details Screen</Text>
            <Text>{flatItem.name}</Text>
            <Text>{flatItem.location}</Text>
            <Text>{flatItem.price}</Text>
        </View>
);}

