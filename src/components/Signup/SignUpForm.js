import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Button from '../shared/Button';
import Input from '../shared/Input';

export default function SignUpForm() {
  const navigate = useNavigate();

  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitData(event) {
    event.preventDefault();
    try {
      const URL = 'https://mark-downer-api.herokuapp.com/sign-up';
      await axios.post(URL, {
        name,
        email,
        password,
        confirmPassword,
      });
      setLoading(true);
      alert('Usuário cadastrado com sucesso!');
      navigate('/sign-in');
    } catch (error) {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      alert('Usuário cadastrado ou os dados foram preenchidos incorretamente!');
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
      'CADASTRAR'
    );
  }

  function disable() {
    return loading ? 'disable' : '';
  }

  return (
    <form onSubmit={submitData}>
      <Input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        color={loading}
        maxLength={12}
        required
        disabled={disable()}
      />
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
      <Input
        type="password"
        placeholder="Confirme a senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        color={loading}
        required
        disabled={disable()}
      />
      <Button>{loadingButton()}</Button>
    </form>
  );
}
