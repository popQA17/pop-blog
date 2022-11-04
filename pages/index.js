
import { Avatar, Box, Button, Divider, Heading, HStack, Skeleton, Text, useColorModeValue, VStack, Wrap } from "@chakra-ui/react";
import {  useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { API_URL } from "../config";

export default function Home({tags, posts}){
    const [selectedTags, setSelectedTags] = useState([])
    useEffect(()=>{
        if (tags.length > 0){
            if (selectedTags.length == 0){
                setSelectedTags(tags)
            }
        }
    }, [tags])
    return(<>
    <VStack bg={useColorModeValue("gray.50", 'gray.700')} backgroundImage={useColorModeValue("https://preview.redd.it/oe901qo4hth61.png?width=3840&format=png&auto=webp&s=eac9b8f429cf2d88a84ed865b6ee5493ff452dcb", "/spaceBG.jpg")} height={'80vh'} w={'full'} justifyContent={'center'}>
        <Avatar src="https://cdn.discordapp.com/avatars/729975591406796840/fef4ae376b7f80308c274ae346585d71.webp" size={'lg'} height={'150px'} width={'150px'} name={'Pop Plays'}/>
        <Heading>Pop&apos;s Blog</Heading>
        <HStack mt={'20px !important'}>
            <Button size={'lg'} colorScheme={'blue'}>Guides</Button>
            <Button size={'lg'}>Blog</Button>
        </HStack>
    </VStack>
    <VStack px={'10px'} py={'20px'}>
        <Wrap justifyContent={'center'} mb={'20px !important'} w={'full'}>
            {tags.length > 0 ? tags.map((tag)=>{
                    return(<>
                    <HStack onClick={()=>{
                        if (selectedTags.includes(tag)){
                            setSelectedTags((old)=> old.filter((older)=> older != tag))
                        } else {
                            setSelectedTags((old)=> [...old, tag])
                        }
                    }} cursor={'pointer'} rounded={'full'} p={'10px'} px={'20px'} bg={useColorModeValue(selectedTags.includes(tag) ? 'blue.500' : "gray.200", selectedTags.includes(tag) ? 'blue.200' : 'gray.700')}><Text color={useColorModeValue(selectedTags.includes(tag) ? 'white' : 'black', selectedTags.includes(tag) ? 'black' : 'white')}>{tag}</Text></HStack>
                    </>)
            }) : 
            <>
            <Skeleton rounded={'full'}> 
                <HStack cursor={'pointer'} rounded={'full'} p={'10px'} px={'20px'} ><Text>Placeholder Tag.</Text></HStack>
            </Skeleton>
            <Skeleton rounded={'full'}> 
                <HStack cursor={'pointer'} rounded={'full'} p={'10px'} px={'20px'} ><Text>Placeho</Text></HStack>
            </Skeleton>
            <Skeleton rounded={'full'}> 
                <HStack cursor={'pointer'} rounded={'full'} p={'10px'} px={'20px'} ><Text>Placeholder Tag e.</Text></HStack>
            </Skeleton>
            <Skeleton rounded={'full'}> 
                <HStack cursor={'pointer'} rounded={'full'} p={'10px'} px={'20px'} ><Text>Place</Text></HStack>
            </Skeleton>
            <Skeleton rounded={'full'}> 
                <HStack cursor={'pointer'} rounded={'full'} p={'10px'} px={'20px'} ><Text>Placholder text.</Text></HStack>
            </Skeleton>
            </>
            }
        </Wrap>
        {posts.slice(0, 5).map((post)=>{
            if (post.tags.filter(value => selectedTags.includes(value)).length > 0){
                return(<>
                <PostCard data={post}/>
                </>)
            }
        })}
        <Divider/>
        <Button width={'200px'}>View More</Button>
    </VStack>
    </>)
}