import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Button from '../shared/Button';
import Input from '../shared/Input';
import UserContext from '../../contexts/UserContext';

export default function SignUpForm() {
  const navigate = useNavigate();

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUserData } = useContext(UserContext);

  async function submitData(event) {
    event.preventDefault();
    try {
      const URL = 'https://mark-downer-api.herokuapp.com/sign-in';
      const response = await axios.post(URL, {
        email,
        password,
      });
      setLoading(true);
      const { name, token } = response.data;
      setUserData({
        name,
        token,
      });
      navigate('/');
    } catch (error) {
      setEmail('');
      setPassword('');
      alert(
        'As informações de e-mail e/ou senha estão incorretas. Insira os dados novamente ou faça o cadastro!'
      );
      setLoading(false);
    }
  }

  function loadingButton() {
    return loading ? (
      <ThreeDots
        color="#000"
        background-color={'#A328D6'}
        opacity={0.7}
        height={80}
        width={80}
      />
    ) : (
      'ENTRAR'
    );
  }

  function disable() {
    return loading ? 'disable' : '';
  }

  return (
    <form onSubmit={submitData}>
      <Input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        color={loading}
        required
        disabled={disable()}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        color={loading}
        required
        disabled={disable()}
      />
      <Button>{loadingButton()}</Button>
    </form>
  );
}
