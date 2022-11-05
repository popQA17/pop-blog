import { VStack, useColorModeValue, Heading, Input, HStack, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import $ from "jquery";
import { API_URL } from "../config";
import PostCard from "../components/PostCard";

export default function Discover({query, setQuery, searched, setSearched, result, setResult}){
    
    const discovers = [
        {
            name: 'Articles',
            color: 'blue'
        },
        {
            name: 'Tags',
            color: 'yellow'
        },
        {
            name: 'Descriptions',
            color: 'green'
        }
    ]
    const [discover, setDiscover] = useState(discovers[0])
    useEffect(()=>{
        const x = setInterval(()=>{
            setDiscover((old)=> discovers.indexOf(old) == discovers.length - 1 ? discovers[0] : discovers[discovers.indexOf(old) + 1])
        }, 3000)
        return  ()=>{
            clearInterval(x)
        }
    }, [])
    return(<>
    <VStack justifyContent={!searched && 'center'} height={'100vh'} px={'10px'} pt={searched && '100px'}  width={'full'}>
        {!searched &&
        <VStack width={'full'} maxWidth={'500px'} spacing={'30px'} padding={'20px'} px={'40px'}  rounded={'lg'} background={useColorModeValue("gray.50", 'gray.700')} backdropFilter={'blur(5px)'}>
            <HStack>
                <Heading fontSize={'3xl'}>Search with</Heading>
                <AnimatePresence exitBeforeEnter>
                    <Heading textUnderlineOffset={'5px'} as={motion.div} key={discover.name} initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: -20, opacity: 0}} fontSize={'3xl'} color={useColorModeValue(`${discover.color}.400`, `${discover.color}.200`)}>{discover.name}</Heading>
                </AnimatePresence>
            </HStack>
            <form onSubmit={(e)=>{
                e.preventDefault()
                if (query){
                    $.ajax({
                        url: `${API_URL}/posts/search?query=${query}`,
                    }).then((res)=>{
                        setResult(res.data)
                        setSearched(true)
                        console.log(res.data)
                    })
                }
            }} style={{width: '100%'}}>
                <HStack width={'full'}>
                    <Input value={query} onChange={(e)=> setQuery(e.target.value)} placeholder="Enter a search query" background={useColorModeValue('gray.100', 'whiteAlpha.300')} _hover={{
                        background: useColorModeValue('gray.200', 'whiteAlpha.400')
                    }} variant={'filled'} width={'full'} maxWidth={'500px'} size={'lg'}/>
                    <IconButton type="submit" rounded={'full'} colorScheme={'blue'} size={'lg'} icon={<FaSearch/>}></IconButton>
                </HStack>
            </form>
        </VStack>
        }
        {searched && <VStack height={'full'} width={'full'} overflow={'auto'}>
        {result.map((post)=>{
            return <PostCard data={post}/>
        })}
        </VStack>
        }
    </VStack>
    </>)
}