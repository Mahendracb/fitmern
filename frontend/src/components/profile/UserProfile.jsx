import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Alert,
  Divider,
  Snackbar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { profile, updateProfile, fetchProfile } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    fitnessGoal: 'General Fitness',
    activityLevel: 'Moderately Active',
    medicalConditions: '',
    dietaryRestrictions: '',
    dateOfBirth: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        email: profile.email || '',
        age: profile.age !== null ? profile.age : '',
        weight: profile.weight !== null ? profile.weight : '',
        height: profile.height !== null ? profile.height : '',
        gender: profile.gender || '',
        fitnessGoal: profile.fitnessGoal || 'General Fitness',
        activityLevel: profile.activityLevel || 'Moderately Active',
        medicalConditions: profile.medicalConditions || '',
        dietaryRestrictions: profile.dietaryRestrictions || '',
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
        password: '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setSaving(true);

    const payload = {
      ...formData,
      age: formData.age !== '' ? Number(formData.age) : null,
      weight: formData.weight !== '' ? Number(formData.weight) : null,
      height: formData.height !== '' ? Number(formData.height) : null,
    };

    if (!payload.password) {
      delete payload.password;
    }

    const result = await updateProfile(payload);
    setSaving(false);
    if (result.success) {
      setMessage('Profile updated successfully!');
      fetchProfile();
    } else {
      setError(result.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          User Profile Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Update your physical metrics, fitness goals, and medical preferences
        </Typography>
      </Box>

      {message && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: '10px' }}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Card 1: Account Information */}
          <Grid item xs={12}>
            <Card className="glass-card" sx={{ p: 1 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                  <PersonIcon sx={{ color: '#8b5cf6' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Account & Credentials
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="New Password (leave blank to keep current)"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 2: Physical Metrics & Goals */}
          <Grid item xs={12}>
            <Card className="glass-card" sx={{ p: 1 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                  <FitnessCenterIcon sx={{ color: '#06b6d4' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Physical Metrics & Goals
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Weight (kg)"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Height (cm)"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      select
                      label="Gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      {['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to say'].map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      select
                      label="Fitness Goal"
                      name="fitnessGoal"
                      value={formData.fitnessGoal}
                      onChange={handleChange}
                    >
                      {['Weight Loss', 'Muscle Gain', 'Endurance', 'General Fitness', 'Maintenance'].map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      select
                      label="Activity Level"
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleChange}
                    >
                      {[
                        'Sedentary',
                        'Lightly Active',
                        'Moderately Active',
                        'Very Active',
                        'Extremely Active',
                      ].map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Card 3: Health & Dietary Preferences */}
          <Grid item xs={12}>
            <Card className="glass-card" sx={{ p: 1 }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                  <MedicalServicesIcon sx={{ color: '#ec4899' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Medical & Dietary Information
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Medical Conditions"
                      name="medicalConditions"
                      value={formData.medicalConditions}
                      onChange={handleChange}
                      placeholder="e.g. Asthma, Hypertension, Joint issues"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Dietary Restrictions"
                      name="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={handleChange}
                      placeholder="e.g. Lactose Intolerant, Vegan, Keto"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Submit Action */}
          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={saving}
              sx={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                px: 5,
                py: 1.5,
                fontWeight: 700,
              }}
            >
              {saving ? 'Saving Changes...' : 'Save Profile Updates'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UserProfile;
