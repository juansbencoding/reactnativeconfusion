import React from 'react';
import { Card, Text } from 'react-native-elements';
import { ScrollView } from 'react-native';

const ContactComponent = () => {
    return(
        <ScrollView>
          <Card title="Contact Information" style={{ width: '18rem', margin: 10 }}>
              <Text> 121, Clear Water Bay Road </Text>
              <Text>Clear Water Bay, Kowloon </Text>
              <Text> HONG KONG </Text>
              <Text>Tel: +852 1234 5678 </Text>
              <Text>Fax: +852 87654321 </Text>
              <Text>Email:confusion@food.net</Text>
        </Card>
      </ScrollView>
    )
}; 

ContactComponent.navigationOptions={
    title: 'Contact'
};

export default ContactComponent; 
