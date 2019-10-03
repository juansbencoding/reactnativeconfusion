import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  StyleSheet,
} from 'react-native';
import { Card, Icon, Input, Rating, Button, Alert, PanResponder } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId)),
  postComments: (dishId, rating, author, comment) => dispatch(postComments(dishId)),
});

const styles = StyleSheet.create({
  cardRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  cardItem: {
    flex: 1,
    margin: 10,
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
  modalButtonContainer: {
    margin: 10,
  },
  modalInputIconContainer: {
    marginRight: 10,
  },
  commentRating: { display: 'flex', alignItems: 'flex-start' },
});

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item }) => {
    return (
      <View tyle={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Rating
          startingValue={item.rating}
          ratingCount={5}
          fractions={1}
          imageSize={12}
          readonly
          style={styles.commentRating}
        />
        <Text style={{ fontSize: 12 }}>
          {'-- ' + item.author + ', ' + item.date}{' '}
        </Text>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title='Comments'>
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

function RenderDish(props) {
  const dish = props.dish;

  handleViewRef = ref => this.view = ref; 

  const recognizeDrag = ({ moveX, moveY, dx, dy}) => {
    if ( dx < -200 )
      return true; 
    else 
      return false; 
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderGrant: () => {
        this.view.rubberBand(1000)
          .then(endState => console.log(endState.finished ? 'finished' : 'cancelled' ));
        
    },  
    onPanResponderEnd: (e, gestureState) => {
      if (recognizeDrag(gestureState)) 
        Alert (
            'Add to Favorites?',
            'Are you sure you wish to add ' + dish.name + ' to your favorites',
            [
              {
                  text: 'Cancel', 
                  onPress: () => console.log('Cancel pressed'),
                  style: 'cancel'
              },
              {
                  text: 'OK',
                  onPress: () =>  props.favorite ? console.log('Already favorite') : props.onPress()
              }
            ],
            { cancelable: false}
        )
      return true;
    }
  });

  if (dish != null) {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
        ref={this.handleViewRef}
        {...panResponder.panHandlers}>
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View style={styles.cardRow}>
          <Icon
            raised
            reverse
            name={props.favorite ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() =>
              props.favorite ? console.log('Already favorite') : props.onPress()
            }
          />
            <Icon
              raised
              reverse
              name='pencil'
              type='font-awesome'
              color='#512DA8'
              style={styles.cardItem}
              onPress={() => props.onShowModal()}
            />
          </View>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 5,
      author: '',
      comment: '',
    };
  }

  static navigationOptions = {
    title: 'Dish Details',
  };

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(dishId) {
    this.props.postComment(dishId, rating, author, comment);
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      rating: 5,
      author: '',
      comment: '',
    });
  }

  render() {
    const dishId = this.props.navigation.getParam('dishId', '');
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          onShowModal={() => this.toggleModal()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === dishId
          )}
        />
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
          animationType={'slide'}
          transparent={false}
        >
          <View style={styles.modal}>
            <Rating
              type='star'
              ratingCount={5}
              fractions={0}
              imageSize={40}
              startingValue={this.state.rating}
              showRating
              onFinishRating={rating => this.setState({ rating: rating })}
              style={{ paddingVertical: 10 }}
            />
            <Input
              leftIcon={{ name: 'user-o', type: 'font-awesome' }}
              leftIconContainerStyle={styles.modalInputIconContainer}
              placeholder='Author'
              onChangeText={text => this.setState({ author: text })}
              value={this.state.author}
            />
            <Input
              leftIcon={{ name: 'comment-o', type: 'font-awesome' }}
              leftIconContainerStyle={styles.modalInputIconContainer}
              placeholder='Comment'
              onChangeText={text => this.setState({ comment: text })}
              value={this.state.comment}
            />
            <Button
              onPress={() => {
                this.handleComment(dishId);
                this.toggleModal();
              }}
              containerStyle={styles.modalButtonContainer}
              buttonStyle={{
                backgroundColor: '#512DA8',
              }}
              title='Submit'
              raised
            />
            <Button
              onPress={() => this.toggleModal()}
              containerStyle={styles.modalButtonContainer}
              buttonStyle={{
                backgroundColor: 'grey',
              }}
              title='Cancel'
              raised
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishDetail);
