import BlogList from "@/components/Blog";
// import HeroSub from "@/components/shared/HeroSub";
import { Metadata } from "next";
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
    title:
        "Blog Piyango ",
};

const Blog = () => {
    return (
        <>
            <Header />
            <BlogList /> 
            <Footer />
        </>
    );
};

export default Blog;
