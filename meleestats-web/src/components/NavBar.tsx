import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link";
import { useMeQuery , useLogoutMutation} from '../generated/graphql';


interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{fetching: logoutFetching},logout] = useLogoutMutation();
    const [{data,fetching}] = useMeQuery();
    let body = null
    if(fetching){

    }else if(!data?.me){
        //user not logged in
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={2}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                     <Link>Register</Link>
                </NextLink>
            </>
        );
    }else{
        // user is logged
        body =(
            <Box>
               {data.me.username} 
               <Button 
                  variant="link"
                  onClick={() => {
                    logout();
                  }}
                  isLoading={logoutFetching}
                >
                    logout
                </Button>
            </Box>
        );
    }
        return (
            <Flex bg="tomato" p={4}>
                <Box ml={"auto"}>
                    {body}
                </Box>
            </Flex>
        );
}