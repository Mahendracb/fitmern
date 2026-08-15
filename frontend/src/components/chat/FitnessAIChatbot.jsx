import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Fab,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Stack,
  Chip,
  CircularProgress,
  Fade,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../../context/AuthContext';
import { postAIChatApi } from '../../services/api';

const FitnessAIChatbot = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hello ${user?.username || 'Athlete'}! 👋 I am your Gemini AI Fitness & Nutrition Coach. How can I help you reach your goals today?`,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  if (!user) return null; // Only show for authenticated users

  const handleSend = async (customMessage) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = { role: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!customMessage) setInput('');
    setLoading(true);

    try {
      const { data } = await postAIChatApi({
        message: textToSend,
        history: messages,
      });

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: '⚠️ Sorry, I ran into an issue connecting to Gemini AI. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    '💡 Suggest a 30-min chest workout',
    '🥗 Low calorie high protein meal idea',
    '📈 How to reach my weight goal faster?',
  ];

  return (
    <>
      {/* Floating Trigger FAB Button */}
      <Fab
        onClick={() => setOpen(!open)}
        className="tactile-btn"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)',
          color: '#090d16',
          boxShadow: '0 8px 24px rgba(245, 158, 11, 0.45)',
          zIndex: 1300,
          '&:hover': {
            background: 'linear-gradient(135deg, #fbbf24 0%, #34d399 100%)',
          },
        }}
      >
        {open ? <CloseIcon /> : <AutoAwesomeIcon />}
      </Fab>

      {/* Floating Chat Drawer Window */}
      <Fade in={open}>
        <Paper
          className="handcrafted-card"
          sx={{
            position: 'fixed',
            bottom: 92,
            right: { xs: 12, sm: 24 },
            width: { xs: 'calc(100vw - 24px)', sm: 380 },
            maxHeight: 560,
            height: 520,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1300,
            overflow: 'hidden',
            p: 0,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'rgba(245, 158, 11, 0.12)',
              borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box display="flex" alignItems="center" gap={1.2}>
              <Avatar
                sx={{
                  bgcolor: '#f59e0b',
                  color: '#090d16',
                  width: 34,
                  height: 34,
                }}
              >
                <SmartToyIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  AuraFit AI Coach
                </Typography>
                <Typography className="font-handwritten" sx={{ fontSize: '0.95rem', color: '#10b981' }}>
                  Powered by Gemini 1.5 Flash
                </Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: '#94a3b8' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Messages Scroll Area */}
          <Box
            sx={{
              flexGrow: 1,
              p: 2,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              bgcolor: 'rgba(9, 13, 22, 0.6)',
            }}
          >
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  gap: 1,
                }}
              >
                {msg.role === 'assistant' && (
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: '#10b981',
                      color: '#090d16',
                      fontSize: 12,
                    }}
                  >
                    AI
                  </Avatar>
                )}
                <Box
                  sx={{
                    maxWidth: '80%',
                    p: 1.5,
                    borderRadius:
                      msg.role === 'user'
                        ? '14px 14px 2px 14px'
                        : '14px 14px 14px 2px',
                    bgcolor:
                      msg.role === 'user'
                        ? 'rgba(245, 158, 11, 0.2)'
                        : 'rgba(255, 255, 255, 0.05)',
                    border:
                      msg.role === 'user'
                        ? '1px solid rgba(245, 158, 11, 0.4)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ whiteSpace: 'pre-line', lineHeight: 1.5, color: '#f8fafc' }}
                  >
                    {msg.text}
                  </Typography>
                </Box>
                {msg.role === 'user' && (
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: '#f59e0b',
                      color: '#090d16',
                      fontSize: 12,
                    }}
                  >
                    <PersonIcon fontSize="small" />
                  </Avatar>
                )}
              </Box>
            ))}

            {loading && (
              <Box display="flex" alignItems="center" gap={1} sx={{ color: '#fbbf24' }}>
                <CircularProgress size={16} color="inherit" />
                <Typography className="font-handwritten" sx={{ fontSize: '1rem' }}>
                  Gemini AI is thinking...
                </Typography>
              </Box>
            )}

            <div ref={messagesEndRef} />
          </Box>

          {/* Quick Prompts */}
          <Box sx={{ px: 1.5, py: 1, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Stack direction="row" spacing={0.8} sx={{ overflowX: 'auto', pb: 0.5 }}>
              {samplePrompts.map((prompt, idx) => (
                <Chip
                  key={idx}
                  label={prompt}
                  size="small"
                  onClick={() => handleSend(prompt)}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.04)',
                    color: '#fbbf24',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    fontSize: 11,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.15)' },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Input Box */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            sx={{
              p: 1.5,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              gap: 1,
              bgcolor: '#111827',
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Ask AI Coach for fitness advice..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              variant="outlined"
            />
            <IconButton
              type="submit"
              disabled={loading || !input.trim()}
              sx={{
                bgcolor: '#f59e0b',
                color: '#090d16',
                '&:hover': { bgcolor: '#fbbf24' },
                '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.1)', color: '#64748b' },
              }}
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      </Fade>
    </>
  );
};

export default FitnessAIChatbot;
