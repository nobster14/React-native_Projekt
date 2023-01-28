import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { FlatList, SafeAreaView, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { and } from 'react-native-reanimated';
import {ListItem} from './flatItem';


export function FlatsScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(0);

  function fetchFlats() {
    setLoading(true);
    fetch('https://pw-flatly.azurewebsites.net/flats?page=' + page + '&size=4')
      .then((response) => response.json())
      .then((json) => {
        setData([...data, ...json])
        setPage(page + 1)})     
      .catch((error) => {})
      .finally(() => {
    setLoading(false)})
  }

  React.useEffect(() => {
    fetchFlats();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ListItem}
          refreshControl={
            <RefreshControl
                refreshing={isLoading}
                onRefresh={fetchFlats}
            />
            
        }
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