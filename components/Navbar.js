import { Avatar, Button, Heading, HStack, IconButton, Spacer, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaMoon, FaSearch, FaSun } from 'react-icons/fa'
export default function Navbar(){
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
            <Button onClick={()=> router.push(href)} px={'10px'} variant={'ghost'} size={scrolled ? 'md': 'lg'}>{name}</Button>
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
    <HStack zIndex={10}  px={'20px'} w={'full'} top={0} position={'fixed'} h={scrolled ? '80px': '100px'} bg={useColorModeValue(scrolled && "gray.50", scrolled && 'gray.700')}>
        <Avatar display={scrolled && 'none'} src="https://cdn.discordapp.com/avatars/729975591406796840/fef4ae376b7f80308c274ae346585d71.webp" size={'md'} name={"Pop Plays"} borderRadius={'lg'}/>
        <Heading mx={'20px !important'} color={useColorModeValue('blue.400','blue.200')} fontSize={'2xl'}>Pop Plays</Heading>
        {links.map((link)=>{
            return <><NavLink name={link.name} href={link.href}/></>
        })}
        <Spacer/>
        <IconButton icon={<FaSearch/>} rounded={'full'} size={scrolled ? 'md' : 'lg'} colorScheme={'blue'}/>
        <IconButton variant={'ghost'} ml={'20px !important'} icon={colorMode == 'light' ? <FaMoon/> : <FaSun/>} onClick={toggleColorMode} rounded={'full'} size={scrolled ? 'md' : 'lg'}/>
    </HStack>
    </>)
}