import React from 'react';
import '../../NewLandingPage/Blogs/Blogs.css';
import Navbar from  "../../NewLandingPage/Navbar/Navbar";
import Footer from "../../NewLandingPage/Footer/Footer";

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'How to Plan a Perfect Event',
            date: 'July 7, 2024',
            author: 'Spandan Jagtap',
            content: 'Planning an event can be daunting, but with the right strategy, you can ensure it is a success...',
            
        },
        {
            id: 2,
            title: 'Top 10 Event Trends for 2024',
            date: 'July 7, 2024',
            author: 'Smith',
            content: 'Event trends are constantly evolving. Stay ahead of the curve with our top 10 trends for 2024...',
            
        },
    ];

    return (
        <>
        <Navbar/>
        <div className="blog-container">
            <h1>Our Blog</h1>
            <div className="blog-posts">
                {blogPosts.map(post => (
                    <div key={post.id} className="blog-post">
                        
                        <div className="blog-post-content">
                            <h2>{post.title}</h2>
                            <p><small>By {post.author} on {post.date}</small></p>
                            <p>{post.content}</p>
                            <button className="read-more">Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Blog;
