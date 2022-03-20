import React, {useState, useEffect} from 'react';
import { Button, Headline, Paragraph, } from 'react-native-paper';
import { View, Text } from 'react-native';
import Background from '../components/Background';
import CardsComponent from '../components/CardsComponent';
import StatusCard from '../components/StatusCard';
import {styles} from '../styles/styles';
import SwipeCards from "react-native-swipe-cards-deck";
import { getProspectUsers } from '../store/UserReducer';
import { connect } from 'react-redux';

const UserHomeScreen = (props) => {
  const [isCardsReady, setIsCardsReady] = useState(false);

  // replace with real remote data fetching
  useEffect(() => {
    props.dispatch(getProspectUsers());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsCardsReady(true);
    }, 3000);
  }, [props.User.prospectUsers]);

  function handleYup(card) {
    console.log(`Yup for ${card.text}`);
    return true; // return false if you wish to cancel the action
  }
  function handleNope(card) {
    console.log(`Nope for ${card.text}`);
    return true;
  }
  
  return (
    <Background>
      <View style={styles.container}>
        {isCardsReady ? (
          <SwipeCards
            cards={props.User.prospectUsers}
            renderCard={(cardData) => <CardsComponent data={cardData} />}
            keyExtractor={(cardData) => String(cardData.name)}
            renderNoMoreCards={() => <StatusCard text="No more cards..." />}
            actions={{
              nope: { onAction: handleNope, show: false, },
              yup: { onAction: handleYup,  show: false, },
            }}
            // If you want a stack of cards instead of one-per-one view, activate stack mode
            // stack={true}
            // stackDepth={3}
          />
        ) : (
          <StatusCard text="Loading..." />
        )}
      </View>
    </Background>
  );
}

const mapStateToProps = (state) => {
  const { User } = state
  return { User }
};

export default connect(mapStateToProps)(UserHomeScreen);