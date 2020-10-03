import React from 'react';
import { ScrollView, StatusBar  } from 'react-native';
import { RowItem } from '../components/RowItem';

import spaceQuestions from '../data/space';
import westernsQuestions from '../data/westerns';
import computersQuestions from '../data/computers';

export default ({ navigation }) => (
  <ScrollView>
    <StatusBar barStyle="light-content" />
    <RowItem 
      name="Space"
      color="#36baf0"
      onPress={() => navigation.navigate('Quiz', { title: 'Space', questions: spaceQuestions, color: '#36baf0' })}
    />
    <RowItem 
      name="Westerns"
      color="#799469"
      onPress={() => navigation.navigate('Quiz', { title: 'Westerns', questions: westernsQuestions, color: '#799469' })}
    />
    <RowItem 
      name="Computers"
      color="#49475B"
      onPress={() => navigation.navigate('Quiz', { title: 'Computer', questions: computersQuestions, color: '#49475B' })}
    />
  </ScrollView>
);
