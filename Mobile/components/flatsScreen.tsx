import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { FlatList, SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { and } from 'react-native-reanimated';
import {ListItem, Flat} from './flatItem';


export const FlatsScreen: React.FunctionComponent = ({route} : any) =>{
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { loginToken } = route.params;
  const navigation = useNavigation();


  function fetchFlats() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
      'Authorization': "Bearer " + loginToken
     },

  };
    setLoading(true);
    fetch('https://pw-flatly.azurewebsites.net/flats?page=' + page + '&size=10', requestOptions)
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
    fetchFlats();
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      fetchFlats();
    }
  };

  const handlePress = (flatItem : Flat, loginToken : string) => {
    // @ts-ignore:next-line
    navigation.navigate('Flat details', { flatItem, loginToken });
  };
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({ item }) => (
              <ListItem item={item} onPress={() => handlePress(item, loginToken)}/>
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

  
};




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