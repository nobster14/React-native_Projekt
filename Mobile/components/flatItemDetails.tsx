import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Flat } from './flatItem';

type FlatItemDetailsProps = {
    route: any,
};

export const FlatItemDetailsScreen: React.FunctionComponent<FlatItemDetailsProps> = ({route} : FlatItemDetailsProps) => {
    const flat : Flat = route.params.flatItem;
    const loginToken = route.params.loginToken;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([flat.thumbnail]);

    function fetchImages() {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json',
          'Authorization': "Bearer " + loginToken
         },
    
      };
        setLoading(true);
        fetch('https://pw-flatly.azurewebsites.net/flats/' + flat.id + '/images', requestOptions)
          .then((response) => response.json())
          .then((json) => {
            setData([...data, ...json])}) 
          .catch((error) => {})
          .finally(() => {
        setLoading(false)})
      }

      React.useEffect(() => {
        fetchImages();
      }, []);

    return (
<View style={styles.container}>
    <ScrollView>
            <Text style={styles.subheaderText}><Text style={styles.sectionHeaderText}>Country: </Text>{flat.country}</Text>
            <Text style={styles.subheaderText}><Text style={styles.sectionHeaderText}>Town: </Text>{flat.town}</Text>
            <Text style={styles.subheaderText}><Text style={styles.sectionHeaderText}>Street: </Text>{flat.address}</Text>
            <Text style={styles.subheaderText}><Text style={styles.sectionHeaderText}>Rooms: </Text>{flat.rooms}</Text>
            <Text style={styles.subheaderText}><Text style={styles.sectionHeaderText}>Capacity: </Text>{flat.capacity}</Text>
            <Text style={styles.subheaderText}><Text style={styles.sectionHeaderText}>Footage: </Text>{flat.footage}</Text>
            <Text style={styles.subheaderText}><Text style={styles.sectionHeaderText}>Price: </Text>{flat.price}$</Text>
            <Text style={styles.subheaderText}><Text style={styles.sectionHeaderText}>Contact info: </Text>{flat.contactInfo}</Text>
            <Text style={styles.headerText}>Photos:</Text>
            <ScrollView style={styles.scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
                {data.map((image, index) => (
                    <Image key={index} source={{uri: `data:image/png;base64,${image}`}} style={styles.image} />
                ))}
            </ScrollView>
            <Text style={styles.sectionHeaderText}>Description:</Text>
            <Text style={styles.subheaderText}>{flat.description}</Text>
    </ScrollView>
</View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "flex-start",
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        alignSelf: "center"
    },
    subheaderText: {
        fontSize: 18,
        marginVertical: 10,
        
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'left'
    },
    scrollView: {
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center'
    },
    image: {
        width: 150,
        height: 150,
        marginRight: 10,
    },
});