import React from "react";
import Input from "../../components/form/Input/Input";
import "./Login.css";
import InputPassword from "../../components/form/InputPassword/InputPassword";

const Login = () => {
  const [email, setEmail] = React.useState<string>("");

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <section className="sectionLogin">
      <p>Entrar</p>
      <Input description="E-mail" handleOnChange={handleChangeEmail} />
      <InputPassword description="Senha" handleOnChange={handleChangeEmail}/>
    </section>
  );
};

export default Login;
