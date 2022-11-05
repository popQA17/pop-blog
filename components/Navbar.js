import { Avatar, Button, Heading, Input, HStack, IconButton, Spacer, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaMoon, FaSearch, FaSun } from 'react-icons/fa'
import $ from 'jquery'
import { API_URL } from "../config";
export default function Navbar({query, setQuery, searched, setSearched, result, setResult}){
    const {colorMode, toggleColorMode} = useColorMode()
    const [scrolled, setScrolled] = useState(false)
    const router = useRouter()
    useEffect(() => {
        window.onscroll = () =>
          window.pageYOffset === 0 ? setScrolled(false) : setScrolled(true);
    
        return () => (window.onscroll = null);
    }, []);
    function NavLink({name, href}){
        return(<>
            <Button onClick={()=> router.push(href)} px={'10px'} variant={'ghost'} size={scrolled ? 'md': 'lg'}  transition={'ease-in-out all 0.3s !important;'} >{name}</Button>
        </>)
    }
    const links = [
        {
            name: "Home",
            href: '/'
        },
        {
            name: "Guides",
            href: '/guides/'
        },
        {
            name: "Discover",
            href: '/discover'
        }
    ]
    return(<>
    <HStack  transition={'ease-in-out all 0.3s;'} shadow={scrolled && 'lg'} zIndex={10}  px={'20px'} w={'full'} top={0} position={'fixed'} h={scrolled ? '80px': '100px'} bg={useColorModeValue(scrolled && "gray.50", scrolled && 'gray.700')}>
        <Avatar display={scrolled && 'none'} src="https://cdn.discordapp.com/avatars/729975591406796840/fef4ae376b7f80308c274ae346585d71.webp" size={'md'} name={"Pop Plays"} borderRadius={'lg'}/>
        <Heading mx={'20px !important'} color={useColorModeValue('blue.400','blue.200')} fontSize={'2xl'}>Pop Plays</Heading>
        {links.map((link)=>{
            return <><NavLink name={link.name} href={link.href}/></>
        })}
        <Spacer/>
        <HStack width={'calc(100% - 550px)'}>
            <form onSubmit={(e)=>{
                    e.preventDefault()
                    if (query){
                        $.ajax({
                            url: `${API_URL}/posts/search?query=${query}`,
                        }).then((res)=>{
                            setResult(res.data)
                            setSearched(true)
                            router.push('/discover')
                        })
                    }
            }} style={{width: '100%'}}>
                <HStack spacing={'30px'} width={'full'}>
                    <Input value={query} onChange={(e)=> setQuery(e.target.value)} placeholder="Enter a search query" variant={'filled'} width={'full'} maxWidth={'full'}  size={scrolled ? 'md': 'lg'}/>
                    <IconButton  type="submit" rounded={'full'} colorScheme={'blue'} size={scrolled ? 'md': 'lg'} icon={<FaSearch/>}></IconButton>
                </HStack>
            </form>
        </HStack>
        <IconButton variant={'ghost'} ml={'20px !important'} icon={colorMode == 'light' ? <FaMoon/> : <FaSun/>} onClick={toggleColorMode} rounded={'full'} size={scrolled ? 'md' : 'lg'}/>
    </HStack>
    </>)
}