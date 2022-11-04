
import { Box, Button, Heading, HStack, Spinner, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import {  useRouter } from "next/router";
import { useEffect, useState } from "react";
import $ from 'jquery'
import { API_URL } from "../config";
import Cookies from 'js-cookie'

export default function AdminLayout({children}){
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const pathName = router.pathname
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(()=>{
        async function checkAdmin(){
            if (Cookies.get('code')){
                $.ajax({
                    url: `${API_URL}/auth/login?code=${Cookies.get('code')}`
                }).then((res)=>{
                    if (res.status == 'INVALID'){
                        Cookies.set("code", null)
                        router.push('/')
                    } else {
                        setLoading(false)
                        setIsLoggedIn(true)
                    }
                })
            } else if (pathName == '/admin/auth/login') {
                setLoading(false)
            }
        }
        checkAdmin()
        
    }, [])
    const links = [
        {
            name: 'Dashboard',
            href: '/admin'
        },
        {
            name: 'Create',
            href: '/admin/create'
        }
    ]
    return(<>
    {!loading ?
    <>
    <HStack px={'10px'} pb={'20px'} height={'100vh'} pt={'100px'}>
        {isLoggedIn && <VStack px={'10px'} py={'20px'} rounded={'lg'} minWidth={'300px'} height={'100%'} bg={useColorModeValue('gray.50', 'gray.700')}>
            <Heading  mb={'20px !important'}  fontSize={'2xl'}>Admin Panel</Heading>
            {links.map((link)=>{
                return(<>
                <Button onClick={()=> router.push(link.href)} size={'lg'} w={'full'} variant={pathName == link.href ? 'solid' : 'ghost'} colorScheme={pathName == link.href ? 'blue' : 'gray'} >
                    {link.name}
                </Button>
                </>)
            })
                
            }
        </VStack>}
        <Box height={'100%'} width={'100%'} bg={useColorModeValue('gray.50', 'gray.700')} rounded={'lg'}>
        {children}
        </Box>
    </HStack>
    </>
    :
    <VStack height={'100vh'} w={'full'} justifyContent={'center'}>
        {Cookies.get("code") || pathName == '/admin/auth/login' ? 
        <HStack>
            <Spinner/>
            <Text>Authenticating..</Text>
        </HStack>
        :
        <HStack>
            <Button size={'lg'} width={'200px'} colorScheme={'blue'} onClick={()=> router.push('/admin/auth/login')}>Log In</Button>
        </HStack>
        }
    </VStack>
    }
    </>)
}