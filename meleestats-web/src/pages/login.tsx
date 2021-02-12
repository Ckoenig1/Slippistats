import React from 'react';
import {Form, Formik} from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from 'next/router';

interface registerProps {

}

   
const Login: React.FC<{}> = ({}) => {
    const router = useRouter();    
    const[,login] = useLoginMutation();
        return (
            <Wrapper variant='small'> 
                <Formik 
                    initialValues={{username: "", password:""}}
                    onSubmit={async (values, {setErrors}) => {
                        const response = await login({options: values});
                        console.log(response.data);
                        // if the value names do not line up with variable names you need to change 2:38:15
                        if(response.data?.login.errors){
                            console.log("you mde it");
                            setErrors(toErrorMap(response.data.login.errors));
                        } else if(response.data?.login.user){
                            // worked
                            router.push("/");
                        }
                    }}
                >
                    {({isSubmitting} ) => (
                        <Form>
                           <InputField
                           name ="username"
                           placeholder="username"
                           label="Username"
                           />
                           <Box mt={4}>
                           <InputField
                           name="password"
                           placeholder="password"
                           label="Password"
                            type="password"
                           />
                           </Box>
                           <Button mt={4} type="submit" colorScheme="teal" isLoading={isSubmitting} >login</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        );
}

export default Login;