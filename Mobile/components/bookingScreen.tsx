import * as React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';

export function BookingsScreen() {

  function fetchBookings() {
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(0);

    setLoading(true);
    fetch('https://pw-flatly.azurewebsites.net/bookings?page=' + page + '&size=4')
      .then((response) => response.json())
      .then((json) => {
        setData([...data, ...json])
        setPage(page + 1)})     
      .catch((error) => {})
      .finally(() => {
    setLoading(false)})
  }

  React.useEffect(() => {
    fetchBookings();
  }, []);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Bookings</Text>
      </View>
    );
  }