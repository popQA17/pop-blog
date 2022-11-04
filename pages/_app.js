import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useRouter } from "next/router";
import AdminLayout from "../components/AdminLayout";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import $ from 'jquery'
import { API_URL } from "../config";
import '../styles/globals.css'
export default function App({Component, pageProps}){
    const router = useRouter()
    const [tags, setTags] = useState([])
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        $.ajax({
            url: `${API_URL}/posts/get`,

        }).then((res)=>{
            setTags([...res.tags])
            setPosts([...res.posts])
        })
    }, [])
    return(<>
    <ChakraProvider >
        <Navbar/>
        {router.pathname.startsWith("/admin") ?
        <AdminLayout>
            <Component posts={posts} tags={tags} {...pageProps}/>
        </AdminLayout>
        :
            <Component posts={posts} tags={tags} {...pageProps}/>
        }
    </ChakraProvider>
    </>)
}