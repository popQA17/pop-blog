import { Badge, Divider, Heading, HStack, Icon, Spacer, Spinner, Text, Tooltip, useColorModeValue, VStack } from "@chakra-ui/react"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaClock, FaPen } from "react-icons/fa"
import { getTimeString, timeDiff } from "../../components/timeDiff"
import { API_URL } from "../../config"

export default function Article({tags, posts}){
    const router = useRouter()
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)
    const [source, setSource] = useState(null)
    const [mdxReady, setMdxReady] = useState(false)
    useEffect(()=>{
        if (loading){
            if (posts.length > 0){
                console.log(posts.filter((old)=> old.id == router.query.id))
                console.log(router.query.id)
                setPost(posts.filter((old)=> old.id == router.query.id)[0])
                setLoading(false)
            }
        }
    }, [posts])
    useEffect(()=>{
        async function serial(){
            const mdxSource = await serialize(post.content) 
            setSource(mdxSource)
            setMdxReady(true)
        }
        if (post.content){
            serial()
        }
    }, [post])
    return(<>
    <VStack justifyContent={'right'} height={'100vh'} px={'10px'}>
        <Spacer/>
        <VStack px={'20px'}  py={'20px'} roundedTop={'lg'} bg={useColorModeValue('gray.100', 'gray.700')} minHeight={'calc(100vh - 100px)'} width={'full'} maxWidth={'800px'}>
            {loading ? 
            <>
            <Spacer/>
            <Spinner size={'lg'}></Spinner>
            <Spacer/>
            </>
            :
            <>
            <Heading width={'full'}>{post.title}</Heading>
            <HStack width={'full'}>
                <Tooltip placement="top" label={`Created on ${getTimeString(post.created_at * 1000)}`}>
                    <HStack color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}>
                        <Icon as={FaClock}/>
                        <Text>{timeDiff(post.created_at * 1000)}</Text>
                    </HStack>
                </Tooltip> 
                {post.edited_at && 
                <Tooltip placement="top" label={`Last edited at ${getTimeString(post.edited_at * 1000)}`}>
                    <HStack color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}>
                        <Icon as={FaPen}/>
                        <Text>{timeDiff(post.edited_at * 1000)}</Text>
                    </HStack>
                </Tooltip> 
                }
                {post.tags.map((tag)=>{
                    return <Badge variant={'solid'} rounded={'lg'} colorScheme={'blue'}>{tag}</Badge>
                })}
            </HStack>
            <Divider/>
            <div style={{width: '100%'}} className="md-wrapper">
                {mdxReady && 
                    <MDXRemote {...source}/>
                }
            </div>
            </>
            }
        </VStack>
    </VStack>
    </>)
}
