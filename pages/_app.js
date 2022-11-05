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
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [searched, setSearched] = useState(false)
    const [result, setResult] = useState([])
    const [query, setQuery] = useState("")
    return(<>
    <ChakraProvider >
        <Navbar query={query} setQuery={setQuery} result={result} setResult={setResult} setSearched={setSearched} searched={searched}/>
        {router.pathname.startsWith("/admin") ?
        <AdminLayout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <Component posts={posts} setPosts={setPosts} tags={tags} {...pageProps}/>
        </AdminLayout>
        :
            <Component query={query} setQuery={setQuery} result={result} setResult={setResult} setSearched={setSearched} searched={searched} posts={posts} tags={tags} {...pageProps} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        }
    </ChakraProvider>
    </>)
}