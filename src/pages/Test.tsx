import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  LinearProgress,
} from '@mui/material';
import axios from 'axios';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    id: '1',
    question: 'What is your favorite programming language?',
    options: ['JavaScript', 'Python', 'Java', 'C++'],
    correctAnswer: 'JavaScript'
  },
  {
    id: '2',
    question: 'How many years of experience do you have?',
    options: ['0-1 years', '1-3 years', '3-5 years', '5+ years'],
    correctAnswer: '1-3 years'
  },
  {
    id: '3',
    question: 'What is your preferred development environment?',
    options: ['VS Code', 'IntelliJ', 'Eclipse', 'Sublime Text'],
    correctAnswer: 'VS Code'
  },
];

const Test: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers(prev => ({
        ...prev,
        [questions[currentQuestion].id]: selectedAnswer,
      }));
      setSelectedAnswer('');

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate('/');
        return;
      }

      const score = calculateScore();
      await axios.post(`http://localhost:5000/api/users/${userId}/test-results`, {
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
          correctAnswer: questions.find(q => q.id === questionId)?.correctAnswer
        })),
        score,
      });

      navigate('/results');
    } catch (error) {
      console.error('Failed to submit test:', error);
      // Handle error appropriately
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      if (question && answer === question.correctAnswer) {
        correctCount++;
      }
    });
    return Math.floor((correctCount / questions.length) * 100);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Assessment Test
          </Typography>

          <LinearProgress variant="determinate" value={progress} sx={{ mb: 4 }} />

          <Typography variant="h6" gutterBottom>
            Question {currentQuestion + 1} of {questions.length}
          </Typography>

          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <FormLabel component="legend">
              {questions[currentQuestion].question}
            </FormLabel>
            <RadioGroup
              value={selectedAnswer}
              onChange={(e) => handleAnswerSelect(e.target.value)}
            >
              {questions[currentQuestion].options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Test; 