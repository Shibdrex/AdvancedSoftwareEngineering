import axios from 'axios';

export const saveUser = async (user) => {
  try {
    const response = await axios.post('http://assistant-core:8080/api/data/users', { user });
    console.log('Email erfolgreich gesendet', response.data);
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error.response?.data || error.message);
  }
};


export default saveUser;