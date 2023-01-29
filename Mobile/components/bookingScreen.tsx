import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Alert } from 'react-native';
import { BookingItem } from './bookingItem';


export const BookingsScreen: React.FunctionComponent = ({route} : any) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { loginToken } = route.params;
 


  const handlePressDelete =  (bookingId: number, loginToken: string) => {

       Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove booking with id " + bookingId + " ?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            deleteBooking(bookingId, loginToken);
            let arr = [...data];
            var obj = arr.findIndex(x => x.id == bookingId);
            arr.splice(obj, 1)
            setData(arr);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  function deleteBooking(bookingId: number, loginToken: string) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json',
      'Authorization': "Bearer " + loginToken
     },
    }

    fetch('https://pw-flatly.azurewebsites.net/flats/cancel/' + bookingId, requestOptions)
      .then((response) => response.json())
      .then((json) => {})     
      .catch((error) => {})
      .finally(() => {})
  }

  function fetchBookings() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
      'Authorization': "Bearer " + loginToken
     },

     
  };
    setLoading(true);
    fetch('https://pw-flatly.azurewebsites.net/bookings?page=' + page + '&size=10', requestOptions)
      .then((response) => response.json())
      .then((json) => {
        setData([...data, ...json])
        setPage(page + 1)
        if (json.length < 10) {
          setHasMore(false);
        }})     
      .catch((error) => {})
      .finally(() => {
    setLoading(false)})
  }

  React.useEffect(() => {
    fetchBookings();
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      fetchBookings();
    }
  };


    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({ item }) => (
              <BookingItem item={item} onDelete={handlePressDelete} loginToken={loginToken}/>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() : any => {
            return hasMore && <ActivityIndicator size="large" />;
          }}
        />
      </View>
    </SafeAreaView>
    );
  }

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      flex: 1,
    },
  });