import axios from 'axios';

export const saveUser = async (user) => {
  try {
    const response = await axios.post('http://assistant-core:8080/api/data/users', { user }, {
      headers: {
        'Origin': 'http://localhost:1008'
      }
    });
    console.log('User erfolgreich erstellt', response.data);
  } catch (error) {
    console.error('Fehler beim erstellen des Users:', error.response?.data || error.message);
  }
};


export default saveUser;