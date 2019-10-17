import React, { Component }from 'react';
import { Card, Button, Icon } from 'react-native-elements';
import { ScrollView, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

const textStyle= {
  margin: 10,
};

class ContactComponent extends Component {
  static navigationOptions = {
    title: 'Contact Us',
  };
  sendMail() {
    MailComposer.composeAsync({
        recipients: ['confusion@food.net'],
        subject: 'Enquiry',
        body: 'To whom it may concern:',
    });
}
  render() {
    return(
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card title="Contact Information" style={{ width: '18rem' }}>
                <Text style={{ margin: 10 }}> 121, Clear Water Bay Road </Text>
                <Text style={{ margin: 10 }}>Clear Water Bay, Kowloon </Text>
                <Text style={{ margin: 10 }}> HONG KONG </Text>
                <Text style={{ margin: 10 }}>Tel: +852 1234 5678 </Text>
                <Text style={{ margin: 10 }}>Fax: +852 87654321 </Text>
                <Text style={{ margin: 10 }}>Email:confusion@food.net</Text>
                <Button
                    title='Send Email'
                    buttonStyle={{ backgroundColor: '#512DA8' }}
                    icon={
                      <Icon 
                        name='envelope-o' 
                        type='font-awesome' 
                        color='white' 
                        containerStyle={{ marginHorizontal: 10 }}
                      />
                    }
                    onPress={this.sendMail} 
                  />
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default ContactComponent; 
