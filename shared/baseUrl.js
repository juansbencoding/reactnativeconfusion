export const baseUrl = 'http://192.168.1.14/'

//Michael's Code 

// import React, { Component } from 'react';
// import {
//   Text,
//   View,
//   ScrollView,
//   FlatList,
//   Modal,
//   StyleSheet,
// } from 'react-native';
// import { Card, Icon, Input, Rating, Button } from 'react-native-elements';
// import { connect } from 'react-redux';
// import { baseUrl } from '../shared/baseUrl';
// import { postFavorite } from '../redux/ActionCreators';

// const mapStateToProps = state => {
//   return {
//     dishes: state.dishes,
//     comments: state.comments,
//     favorites: state.favorites,
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   postFavorite: dishId => dispatch(postFavorite(dishId)),
// });

// const styles = StyleSheet.create({
//   cardRow: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     flexDirection: 'row',
//     margin: 20,
//   },
//   cardItem: {
//     flex: 1,
//     margin: 10,
//   },
//   modal: {
//     justifyContent: 'center',
//     margin: 20,
//   },
//   modalButtonContainer: {
//     margin: 10,
//   },
//   modalInputIconContainer: {
//     marginRight: 10,
//   },
//   commentRating: { display: 'flex', alignItems: 'flex-start' },
// });

// function RenderComments(props) {
//   const comments = props.comments;

//   const renderCommentItem = ({ item }) => {
//     return (
//       <View tyle={{ margin: 10 }}>
//         <Text style={{ fontSize: 14 }}>{item.comment}</Text>
//         <Rating
//           startingValue={item.rating}
//           ratingCount={5}
//           fractions={1}
//           imageSize={12}
//           readonly
//           style={styles.commentRating}
//         />
//         <Text style={{ fontSize: 12 }}>
//           {'-- ' + item.author + ', ' + item.date}{' '}
//         </Text>
//       </View>
//     );
//   };

//   return (
//     <Card title='Comments'>
//       <FlatList
//         data={comments}
//         renderItem={renderCommentItem}
//         keyExtractor={item => item.id.toString()}
//       />
//     </Card>
//   );
// }

// function RenderDish(props) {
//   const dish = props.dish;

//   if (dish != null) {
//     return (
//       <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
//         <Text style={{ margin: 10 }}>{dish.description}</Text>
//         <View style={styles.cardRow}>
//           <Icon
//             raised
//             reverse
//             name={props.favorite ? 'heart' : 'heart-o'}
//             type='font-awesome'
//             color='#f50'
//             onPress={() =>
//               props.favorite ? console.log('Already favorite') : props.onPress()
//             }
//           />
//           <Icon
//             raised
//             reverse
//             name='pencil'
//             type='font-awesome'
//             color='#512DA8'
//             style={styles.cardItem}
//             onPress={() => props.onShowModal()}
//           />
//         </View>
//       </Card>
//     );
//   } else {
//     return <View></View>;
//   }
// }

// class DishDetail extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showModal: false,
//       rating: 5,
//       author: '',
//       comment: '',
//     };
//   }

//   static navigationOptions = {
//     title: 'Dish Details',
//   };

//   markFavorite(dishId) {
//     this.props.postFavorite(dishId);
//   }

//   toggleModal() {
//     this.setState({ showModal: !this.state.showModal });
//   }

//   handleComment(dishId) {
//     console.log(JSON.stringify(this.state));
//     this.toggleModal();
//   }

//   resetForm() {
//     this.setState({
//       rating: 5,
//       author: '',
//       comment: '',
//     });
//   }

//   render() {
//     const dishId = this.props.navigation.getParam('dishId', '');
//     return (
//       <ScrollView>
//         <RenderDish
//           dish={this.props.dishes.dishes[+dishId]}
//           favorite={this.props.favorites.some(el => el === dishId)}
//           onPress={() => this.markFavorite(dishId)}
//           onShowModal={() => this.toggleModal()}
//         />
//         <RenderComments
//           comments={this.props.comments.comments.filter(
//             comment => comment.dishId === dishId
//           )}
//         />
//         <Modal
//           visible={this.state.showModal}
//           onRequestClose={() => this.toggleModal()}
//           animationType={'slide'}
//           transparent={false}
//         >
//           <View style={styles.modal}>
//             <Rating
//               type='star'
//               ratingCount={5}
//               fractions={0}
//               imageSize={40}
//               startingValue={this.state.rating}
//               showRating
//               onFinishRating={rating => this.setState({ rating: rating })}
//               style={{ paddingVertical: 10 }}
//             />
//             <Input
//               leftIcon={{ name: 'user-o', type: 'font-awesome' }}
//               leftIconContainerStyle={styles.modalInputIconContainer}
//               placeholder='Author'
//               onChangeText={text => this.setState({ author: text })}
//               value={this.state.author}
//             />
//             <Input
//               leftIcon={{ name: 'comment-o', type: 'font-awesome' }}
//               leftIconContainerStyle={styles.modalInputIconContainer}
//               placeholder='Comment'
//               onChangeText={text => this.setState({ comment: text })}
//               value={this.state.comment}
//             />
//             <Button
//               onPress={() => {
//                 this.handleComment(dishId);
//                 this.toggleModal();
//               }}
//               containerStyle={styles.modalButtonContainer}
//               buttonStyle={{
//                 backgroundColor: '#512DA8',
//               }}
//               title='Submit'
//               raised
//             />
//             <Button
//               onPress={() => this.toggleModal()}
//               containerStyle={styles.modalButtonContainer}
//               buttonStyle={{
//                 backgroundColor: 'grey',
//               }}
//               title='Cancel'
//               raised
//             />
//           </View>
//         </Modal>
//       </ScrollView>
//     );
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DishDetail);





// My Code 

// import React, { Component } from 'react';
// import { Text, View, ScrollView, FlatList, Modal, StyleSheet } from 'react-native';
// import { Card, Icon, Rating, Button } from 'react-native-elements';
// import { connect } from 'react-redux';
// import { baseUrl } from '../shared/baseUrl';
// import { postFavorite } from '../redux/ActionCreators';

// const mapStateToProps = state => {
//     return {
//         dishes: state.dishes,
//         comments: state.comments,
//         favorites: state.favorites
//     }
// }

// const mapDispatchToProps = dispatch => ({
//     postFavorite: (dishId) => dispatch(postFavorite(dishId))
// });

// function RenderDish(props) {
//     const dish = props.dish;
//     if (dish != null) {
//         return (
//             <Card
//                 featuredTitle={dish.name}
//                 image={{ uri: baseUrl + dish.image }}>
//                 <Text style={{ margin: 10 }}>
//                     {dish.description}
//                 </Text>
//                 <View style={styles.cardRow}>
//                     <Icon
//                         raised
//                         reverse
//                         name={props.favorite ? 'heart' : 'heart-o'}
//                         type='font-awesome'
//                         color='#f50'
//                         onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
//                     />
//                     <View style={styles.cardItem}>
//                         <Icon
//                             raised
//                             reverse
//                             name='pencil'
//                             type='font-awesome'
//                             size={24}
//                             color='#512DA8'
//                             onPress={() => props.onShowModal()}
//                         />
//                     </View>
//                 </View>
//             </Card>
//         );
//     }
//     else {
//         return (<View></View>);
//     }
//  }

// function RenderComments(props) {
//     const comments = props.comments;
            
//     const renderCommentItem = ({item, index}) => {
//         return (
//             <View key={index} style={{margin: 10}}>
//                 <Text style={{fontSize: 14}}>{item.comment}</Text>
//                 <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
//                 <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
//             </View>
//         );
//     };
    
//     return (
//         <Card title='Comments' >
//         <FlatList 
//             data={comments}
//             renderItem={renderCommentItem}
//             keyExtractor={item => item.id.toString()}
//             />
//         </Card>
//     );
// }

// class DishDetail extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             rating: '5',
//             author: '', 
//             comment: '',
//             favorites: [],
//             onshowModal: false
//         };
//     }

//     toggleModal() {
//         this.setState({ showModal: !this.state.showModal})
//     }

//     markFavorite(dishId) {
//         this.props.postFavorite(dishId);
//     }

//     static navigationOptions = {
//         title: 'Dish Details'
//     };

//     render() {
//         const dishId = this.props.navigation.getParam('dishId', '');

//         return(
//             <ScrollView>
//                 <RenderDish dish={this.props.dishes.dishes[+dishId]}
//                     favorite={this.state.favorites.some(el => el === dishId)} 
//                     onPress={() => this.markFavorite(dishId)}
//                     onShowModal={() => this.toggleModal()}
//                     />  
//                 <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                
//                 <Modal
//                     animationType={'slide'}
//                     transparent={false}
//                     visible={this.state.showModal}
//                     onDismiss={() => {this.toggleModal(); this.resetForm()}}
//                     onRequestClose={() => {this.toggleModal(); this.resetForm()}}
//                     >
//                         <Rating
//                             showRating
//                             onFinishRating={this.ratingCompleted}
//                             style={{ paddingVertical: 10 }}
//                             />
//                     <View style={styles.modal}>
//                         <Text style={styles.modalTitle}>Rating</Text>
//                         <Text style={styles.modalText}>Author{this.state.guests}</Text>
//                         <Text style={styles.modalText}>Comment{this.state.smoking ? 'Yes' : 'No'}</Text>
//                         <Button 
//                             onPress={() => {this.toggleModal(); this.resetForm()}}
//                             color='#512DA8'
//                             title='Close'
//                             />
//                     </View>
//                 </Modal> 

//             </ScrollView>
//         );
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
