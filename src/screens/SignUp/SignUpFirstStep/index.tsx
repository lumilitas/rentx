import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import * as Yup from 'yup';

import { 
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';
import { useAuth } from "../../../hooks/auth";

export function SignUpFirstStep() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const navigation = useNavigation();
  const { user } = useAuth();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome é obrigatório'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('E-mail inválido'),
        driverLicense: Yup.string()
          .required('CNH é obrigatória')
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message);
      }
    }
  }
  
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active={true}/>
              <Bullet active={false}/>
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>

          <Button
            title="Próximo"
            onPress={handleNextStep}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}