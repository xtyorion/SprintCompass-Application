import React, {useState, useEffect} from 'react';
import { Button, Headline, Paragraph, } from 'react-native-paper';
import { View, Text } from 'react-native';
import Background from '../components/Background';
import CardsComponent from '../components/CardsComponent';
import StatusCard from '../components/StatusCard';
import {styles} from '../styles/styles';
import SwipeCards from "react-native-swipe-cards-deck";

const UserHomeScreen = (props) => {
  const [cards, setCards] = useState();

  // replace with real remote data fetching
  useEffect(() => {
    setTimeout(() => {
      setCards([
        { text: "Tomato", backgroundColor: "red" },
        { text: "Aubergine", backgroundColor: "purple" },
        { text: "Courgette", backgroundColor: "green" },
        { text: "Blueberry", backgroundColor: "blue" },
        { text: "Umm...", backgroundColor: "cyan" },
        { text: "orange", backgroundColor: "orange" },
      ]);
    }, 3000);
  }, []);

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
        {cards ? (
          <SwipeCards
            cards={cards}
            renderCard={(cardData) => <CardsComponent data={cardData} />}
            keyExtractor={(cardData) => String(cardData.text)}
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

export default UserHomeScreen;