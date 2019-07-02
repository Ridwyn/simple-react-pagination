import React, {useState, useEffect} from 'react';
import Posts from './components/Posts'
import Pagination from './components/Pagination'
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const[loading, setLoading] = useState(false);
  const[currentPage, setCurrentPage]= useState(1);
  const[postsPerpage, setPostsPerPage] =useState(10);

  useEffect(()=>{
    const fetchPosts = async()=>{
      setLoading(true);
      const res= await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false)
    }
    fetchPosts();
  },[]);
  
  //Get current posts
  const indexOfLastPost = currentPage * postsPerpage;
  const indexOfFirstPost = indexOfLastPost - postsPerpage;
  const currentPosts =posts.slice(indexOfFirstPost,indexOfLastPost);

  //Change Page
  const paginate =(pageNumber)=> setCurrentPage(pageNumber)
  return (
    <div className="container">
      <h1 className="text-primary mb-3">Blog</h1>
      <Posts posts={currentPosts} loading={loading}/>
      <Pagination postsPerPage={postsPerpage} totalPosts={posts.length} paginate={paginate}/>
     
    </div>
  );
}

export default App;
