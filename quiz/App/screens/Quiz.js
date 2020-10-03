import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from 'react-native';

import { Button, ButtonContainer } from '../components/Button';
import { Alert } from '../components/Alert';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#36B1F0',
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    letterSpacing: -0.02,
    fontWeight: '600'
  },
  safeArea: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'space-between'
  }
});

export default class Quiz extends Component {
  state = {
    correctCount: 0,
    totalCount: this.props.navigation.getParam('questions').length,
    activeQuestionIdx: 0,
    answerCorrect: false, 
    answered: false
  }

  nextQuestion = () => {
    this.setState(prevState => {
      let nextIdx = prevState.activeQuestionIdx + 1;

      if (nextIdx >= prevState.totalCount) {
        nextIdx = 0;
      }

      return {
        activeQuestionIdx: nextIdx,
        answered: false
      };
    });
  }

  answer = correct => {
    this.setState(prevState => {
      const nextState = { answered: true };

      if (correct) {
        nextState.correctCount = prevState.correctCount + 1;
        nextState.answerCorrect = true;
      } else {
        nextState.answerCorrect = false;
      }

      return nextState;
    }, () => {
      setTimeout(() => this.nextQuestion(), 750);
    });
  }

  render() {
    const { navigation } = this.props;
    const { correctCount, totalCount, activeQuestionIdx, answerCorrect, answered } = this.state;
    const questions = navigation.getParam('questions', []);
    const question = questions[activeQuestionIdx];

    return (
      <View style={[styles.container, { backgroundColor: navigation.getParam('color') }]}>
        <StatusBar barStyle='light-content' />
        <SafeAreaView style={styles.safeArea}>
          <View>
            <Text style={styles.text}>{question.question}</Text>
            <ButtonContainer>
              {question.answers.map(answer => (
                <Button key={answer.id} text={answer.text} onPress={() => this.answer(answer.correct)} />
              ))}
            </ButtonContainer>
          </View>
          <Text style={styles.text}>{`${correctCount}/${totalCount}`}</Text>
        </SafeAreaView>
        <Alert correct={answerCorrect} visible={answered} />
      </View>
    );
  }
}
