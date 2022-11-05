import { Badge, Button, HStack, Icon, Spacer, Text, Tooltip, useColorModeValue, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaClock } from "react-icons/fa";
import { getTimeString, timeDiff } from "./timeDiff";
import { motion } from 'framer-motion'
export default function PostCard({data, translucent}){
    const router = useRouter()
    return(<>
    <HStack backdropFilter={'blur(10px)'} shadow={'base'} alignItems={'flex-start'} minHeight={'100px'} width={'full'} rounded={'lg'} bg={useColorModeValue(translucent ? 'gray.50' : 'gray.100', translucent ? 'blackAlpha.300' : 'gray.700')} p={'10px'} px={'20px'} >
        <VStack alignItems={'flex-start'} minHeight={'full'} justifyContent={'center'}>
            <HStack>
                <Text fontWeight={'semibold'} fontSize={'2xl'}>{data.title}</Text>
                {data.tags.map((tag)=>{
                    return <Badge variant={'solid'} rounded={'lg'} colorScheme={'blue'}>{tag}</Badge>
                })}
            </HStack>
            <Text color={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}>{data.description || "A great article."}</Text>
        </VStack>
        <Spacer/>
        <VStack height={'full'} width={'150px'} alignItems={'flex-start'}>
            <Tooltip placement="top" label={`Created on ${getTimeString(data.created_at * 1000)}`}>
                <HStack color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}>
                    <Icon as={FaClock}/>
                    <Text>{timeDiff(data.created_at * 1000)}</Text>
                </HStack>
            </Tooltip>
            <Button onClick={()=> router.push(`/article/${data.id}`)} colorScheme={'blue'} width={'100%'}>View</Button>
        </VStack>
    </HStack>
    </>)
}