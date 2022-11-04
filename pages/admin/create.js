import { Divider, Heading, HStack, Skeleton, Text, Textarea, useColorModeValue, VStack, Wrap } from "@chakra-ui/react";
import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import $ from 'jquery'
import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from 'next-mdx-remote/serialize'
import { API_URL } from "../../config";
export default function Create({tags}){
    const [selectedTags, setSelectedTags] = useState([])
    const [content, setContent] = useState("Hello World")
    const [preview, setPreview] = useState(false)
    const [source, setSource] = useState(null)
    useEffect(()=>{
        async function serial(){
            const mdxSource = await serialize(content) 
            setSource(mdxSource)
        }
        serial()
    }, [content])
    return(<>
    <VStack width={'full'} py={'10px'} height={"full"} px={'10px'} justifyContent={'center'}>
        <VStack px={'20px'} py={'30px'} overflowY={'auto'} h={'full'} w={'full'} maxWidth={'800px'} rounded={'lg'} shadow={'lg'} bg={useColorModeValue('gray.50', 'gray.800')}>
            <Heading fontSize={'3xl'} w={'full'}>Create a Post</Heading>
            <Divider/>
            <Box mt={'30px !important'} width={'full'} height={'full'}>
            <Formik
                initialValues={{
                    title: "",
                    description: "",
                    header: "",
                    content: "Hello world!",
                }}
                onSubmit={(values) => {
                    const vals = values
                    vals.tags = selectedTags.join()
                    vals.content = content
                    $.ajax({
                        url: `${API_URL}/posts/create`,
                        type: 'POST',
                        data: $.param(vals)
                    }).then((res)=>{
                        console.log(res)
                    })
                }}
            >
                {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                        <FormControl isInvalid={!!errors.title && touched.title}>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Field
                            as={Input}
                            id="title"
                            name="title"
                            type="text"
                            variant="filled"
                            validate={(value) => {
                                let error;

                                if (value.length < 1) {
                                    error = "This field is required";
                                }
    
                                return error;
                            }}
                        />
                        <FormErrorMessage>{errors.title}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.header && touched.header}>
                        <FormLabel htmlFor="header">Header Image</FormLabel>
                        <Field
                            as={Input}
                            id="header"
                            name="header"
                            type="url"
                            variant="filled"
                            validate={(value) => {
                                let error;
                                if (value){
                                    if (!value.startsWith("http://") || value.startsWith("https://")) {
                                        error = "URL must start with http:// or https://";
                                    }
                                }
                                return error;
                            }}
                        />
                        <FormErrorMessage>{errors.header}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.description && touched.description}>
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <Field
                            as={Input}
                            id="description"
                            name="description"
                            type="description"
                            variant="filled"
                        />
                        <FormErrorMessage>{errors.description}</FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="tags">Tags</FormLabel>
                            <Wrap justifyContent={'center'} px={'20px'} w={'full'}>
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
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="description">Content</FormLabel>
                            <VStack rounded={'lg'} bg={useColorModeValue('blackAlpha.200', 'whiteAlpha.200')} width={'100%'}>
                                <HStack roundedTop={'lg'} p={'10px'} width={'full'} bg={useColorModeValue("blackAlpha.100", 'whiteAlpha.100')}>
                                    <HStack cursor={'pointer'} onClick={()=> setPreview(false)} p={'10px'} rounded={'full'} color={useColorModeValue(!preview && 'white', !preview && 'black' )} bg={useColorModeValue(!preview ? "blue.500" : 'blackAlpha.200', !preview ? 'blue.200': 'whiteAlpha.200')} justifyContent={'center'} width={'full'}>
                                        <Text fontWeight={'semibold'}>Write</Text>
                                    </HStack>
                                    <HStack cursor={'pointer'} onClick={()=> setPreview(true)} p={'10px'} rounded={'full'} color={useColorModeValue(preview && 'white', preview && 'black' )} bg={useColorModeValue(preview ? "blue.500" : 'blackAlpha.200', preview ? 'blue.200': 'whiteAlpha.200')} justifyContent={'center'} width={'full'}>
                                        <Text fontWeight={'semibold'}>Preview</Text>
                                    </HStack>
                                </HStack>
                                {preview ?
                                <div className="md-wrapper" style={{height: '100%', width: '100%', padding: '0 10px'}}>
                                    <MDXRemote {...source}/>
                                </div>
                                :
                                <Textarea height={'300px'} resize="false" value={content} onChange={(e)=> setContent(e.target.value)} variant={'filled'}>
                                </Textarea>
                                }
                            </VStack>
                        </FormControl>
                        <Button type="submit" colorScheme="blue" width="full">
                        Create
                        </Button>
                    </VStack>
                    </form>
                )}
                </Formik>
            </Box>
        </VStack>
    </VStack>
    </>)
}