import React from 'react';
import {Form, Formik} from 'formik';
import { valueScaleCorrection } from 'framer-motion/types/render/dom/layout/scale-correction';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from 'next/router';

interface registerProps {

}

   
const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();    
    const[,register] = useRegisterMutation();
        return (
            <Wrapper variant='small'> 
                <Formik 
                    initialValues={{username: "", password:""}}
                    onSubmit={async (values, {setErrors}) => {
                        const response = await register(values);
                        console.log(response.data);
                        // if the value names do not line up with variable names you need to change 2:38:15
                        if(response.data?.register.errors){
                            console.log("you mde it");
                            setErrors(toErrorMap(response.data.register.errors));
                        } else if(response.data?.register.user){
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
                           <Button mt={4} type="submit" colorScheme="teal" isLoading={isSubmitting} >register</Button>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        );
}

export default Register;