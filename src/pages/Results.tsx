import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import axios from 'axios';

interface TestResult {
  score: number;
  answers: Array<{
    questionId: string;
    answer: string;
    correctAnswer: string;
  }>;
  completedAt: string;
}

const Results: React.FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          navigate('/');
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/users/${userId}/test-results`);
        setResults(response.data.testResults);
      } catch (error) {
        console.error('Failed to fetch results:', error);
        // Handle error appropriately
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [navigate]);

  const handleRestart = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Test Results
          </Typography>

          {results && (
            <>
              <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h2" color="primary">
                  {results.score}%
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Your Score
                </Typography>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Your Answers:
                </Typography>
                <List>
                  {results.answers.map((answer, index) => (
                    <React.Fragment key={answer.questionId}>
                      <ListItem>
                        <ListItemText
                          primary={`Question ${index + 1}`}
                          secondary={
                            <Box>
                              <Typography variant="body1" color="text.primary">
                                Your Answer: {answer.answer}
                              </Typography>
                              <Typography 
                                variant="body1" 
                                color={answer.answer === answer.correctAnswer ? "success.main" : "error.main"}
                              >
                                Correct Answer: {answer.correctAnswer}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < results.answers.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Completed on: {new Date(results.completedAt).toLocaleString()}
              </Typography>
            </>
          )}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRestart}
            >
              Take Test Again
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Results; 