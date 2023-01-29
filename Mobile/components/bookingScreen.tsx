import * as React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';

export const BookingsScreen: React.FunctionComponent = ({route} : any) => {
  const { loginToken } = route.params;
  function fetchBookings() {
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(0);
  }


    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Bookings</Text>
      </View>
    );
  }