import React, { Component } from 'react';
import { Text, 
    View, 
    ScrollView, 
    StyleSheet, 
    Picker, 
    Switch, 
    Button, 
    Modal, 
    Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';


class Reservation extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            guest: 1, 
            smoking: false,
            date: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    obtainCalendarPermission = async () => {
        const calendarPermission = await Permissions.askAsync(Permissions.CALENDAR);

        if(calendarPermission === 'granted'){
            let event = await Calendar.createCalendarAsync(details);
        }
    }


    async addReservationToCalendar(date) {
        let startDate = new Date(date);
        let endDate = new Date(date).setHours(startDate.getHours(date) + 2)
        // let calendar = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        // console.log(calendar);
        let newEvent = {
            title: 'Con Fusion Table Reservation',
            startDate: startDate,
            endDate: endDate,
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        }
        await this.obtainCalendarPermission();
        Calendar.createEventAsync('1CFEAAAB-91F7-4BA5-877B-FB447CE06B97', newEvent);
    }



    handleReservation() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Your Reservation OK?',
            ` Number of Guests: ${this.state.guests}
                Smoking?: ${this.state.smoking}
                Date and Time: ${this.state.date}`,
            [
                {
                    text: 'Cancel',
                    onPress: () => {console.log('Cancel Pressed'); 
                    this.resetForm()},
                    style: 'cancel'
                    
                },
                {
                    text: 'OK',
                    onPress: () => {console.log('OK Pressed'); 
                    this.presentLocalNotification(this.state.date);
                    this.obtainCalendarPermission()
                    this.addReservationToCalendar()
                    this.resetForm()
                    }
                    
                },
            ],
                { cancelable: false }
            );
        }

    resetForm() {
        this.setState({
            guests: 1, 
            smoking: false, 
            date: ''
        });
    }

    async obtainNotificationPermisson() {
        let permisson = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
        if ( Permissions.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permisson.status !== 'granted') {
                Alert.alert('Permisson not granted to show notifications');
            }
        }
        return permisson; 
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermisson();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested', 
            ios: {
                sound: true
            }, 
            android: {
                sound: true, 
                vibrate: true, 
                color: "#512DA8"
            }
        });
    }

    render(){
        return (
            <ScrollView>
                <Animatable.View animation="zoomIn">
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker 
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue})}
                        >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                        </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        trackColor={{ true: '#512DA8' }}  // i don't see this as a valid prop for Switch.  https://facebook.github.io/react-native/docs/0.60/switch
                        onValueChange={(value) => this.setState({ smoking: value })}
                        >
                    </Switch>
                    </View>
                    <View style={styles.formRow}> 
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DatePicker
                            style={{ flex: 2, marginRight: 20 }}
                            date={this.state.date}
                            format=''
                            mode='datetime'
                            placeholder='select date and time'
                            minDate='2017-01-01'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0, 
                                    top: 4, 
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => {this.setState({ date: date })}}
                            />
                    </View>
                    <View style={styles.formRow}> 
                        <Button
                            title='Reserve'
                            color='#512DA8'
                            onPress={() => this.handleReservation()}
                            accessibilityLabel='Learn more about this purple button'
                            />
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal(); this.resetForm()}}
                    onRequestClose={() => {this.toggleModal(); this.resetForm()}}
                    >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking? : {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
                        <Button 
                            onPress= {() => {
                            this.handleReservation()
                            }}
                    color='#512DA8'
                    title='Close'
            
                    />
                        
                        </View>
                    </Modal>
                </Animatable.View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, 
        flexDirection: 'row',
        margin: 20 
    },
    formLabel: {
        fontSize: 18, 
        flex: 2 
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20 
    },
    modalText: {
        fontSize: 18, 
        margin: 10
    }
});

export default Reservation; 