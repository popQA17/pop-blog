
import { Button, FormControl, FormLabel, Input, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import $ from 'jquery'
import Cookies from "js-cookie";
export default function Login(){
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const toast = useToast({
        position: 'bottom-left',
        isClosable: true
    })
    return(<>
    <VStack height={'calc(100vh - 120px)'} justifyContent={'center'}>
        <VStack width={'300px'} p={'4'} spacing={'20px'} justifyContent={'center'}>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type={'password'} value={password} onChange={(e)=> setPassword(e.target.value)}></Input>
            </FormControl>
            <Button onClick={()=>{
                setLoading(true)
                $.ajax({
                    url: `${API_URL}/auth/login?code=${password}`
                }).then((res)=>{
                    if (res.status == 'OK'){
                        Cookies.set("code", password)
                        toast({
                            title: 'Success!',
                            description: "Authentication successful",
                            status: 'success'
                        })
                        window.location.href = '/admin'
                    } else {
                        toast({
                            title: "Oop!",
                            description: "Incorrect password",
                            status: 'error'
                        })
                    }
                    setLoading(false)
                })
            }} isDisabled={loading || !password} isLoading={loading} width={'full'} colorScheme={'blue'}>Login</Button>
        </VStack>
    </VStack>
    </>)
}