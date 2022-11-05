import { Badge, Divider, Heading, HStack, IconButton, Icon, Spacer, Spinner, Text, Tooltip, useColorModeValue, VStack } from "@chakra-ui/react"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaClock, FaPen } from "react-icons/fa"
import { getTimeString, timeDiff } from "../../components/timeDiff"
import { API_URL, MDX_COMPONENTS } from "../../config"
import Giscus from '@giscus/react';

export default function Article({tags, posts, isLoggedIn}){
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
    <VStack pb={'20px'} justifyContent={'right'} height={'100vh'} px={'10px'}>
        <VStack minH={'100px'}/>
        <VStack px={'20px'}  py={'20px'} roundedTop={'lg'} bg={useColorModeValue('gray.100', 'gray.700')} minHeight={'calc(100vh - 100px)'} width={'full'} maxWidth={'800px'}>
            {loading ? 
            <>
            <Spacer/>
            <Spinner size={'lg'}></Spinner>
            <Spacer/>
            </>
            :
            <>
            <HStack width={'full'}>
                <Heading width={'full'}>{post.title}</Heading>
                <IconButton onClick={()=> router.push(`/admin/article/${post.id}`)} rounded={'full'} variant={'ghost'} colorScheme={'blue'} icon={<FaPen/>} />
            </HStack>
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
                    <MDXRemote components={MDX_COMPONENTS} {...source}/>
                }
            </div>
            </>
            }
        </VStack>
        <VStack p={'10px'} width={'full'} maxWidth={'800px'} my={'20px !important'} rounded={'lg'} bg={useColorModeValue('gray.100', 'gray.700')}>
        <Giscus
            id="comments"
            repo="popQA17/pop-blog"
            repoId="R_kgDOIXo1CA"
            category="Comments"
            categoryId="DIC_kwDOIXo1CM4CSXa9"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme={useColorModeValue('light', 'dark')}
            lang="en"
            loading="lazy"
        />
        </VStack>
    </VStack>
    </>)
}
