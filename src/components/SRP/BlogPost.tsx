import React, { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  tags: string[];
  publishedAt: Date | null;
  status: 'draft' | 'published';
}

const BlogManagementBad: React.FC = () => {
  // State for multiple responsibilities
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState('');

  // Responsibility 1: UI Management & Form Handling
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    // UI logic here - character count, formatting
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    // UI logic here - auto-save, word count
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
    // UI logic here
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
    // UI logic here
  };

  // Responsibility 2: Data Validation & Business Logic
  const validatePost = () => {
    // Validation logic here
    if (!title || !content || !author) {
      setMessage('Please fill all required fields');
      return false;
    }
    if (title.length < 5) {
      setMessage('Title must be at least 5 characters');
      return false;
    }
    if (content.length < 50) {
      setMessage('Content must be at least 50 characters');
      return false;
    }
    return true;
  };

  const processPostData = (postData: any) => {
    // Business logic here - content formatting, slug generation
    const processedTags = postData.tags
      .split(',')
      .map((tag: string) => tag.trim().toLowerCase())
      .filter((tag: string) => tag.length > 0);
    
    return {
      ...postData,
      tags: processedTags,
      slug: postData.title.toLowerCase().replace(/\s+/g, '-')
    };
  };

  const generateSEOMetadata = (post: any) => {
    // SEO business logic here
    return {
      metaTitle: post.title,
      metaDescription: post.content.substring(0, 160),
      keywords: post.tags.join(', ')
    };
  };

  // Responsibility 3: Data Storage & External Services
  const saveToDatabase = (post: BlogPost) => {
    // Database save logic here
    console.log('Saving to database...', post);
  };

  const publishToSocialMedia = (post: BlogPost) => {
    // Social media integration logic here
    console.log('Publishing to social media:', post.title);
  };

  const sendEmailNotification = (post: BlogPost) => {
    // Email service logic here
    console.log('Sending email notification for:', post.title);
  };

  const updateSearchIndex = (post: BlogPost) => {
    // Search indexing logic here
    console.log('Updating search index for:', post.title);
  };

  const handleSaveDraft = () => {
    // Combining all responsibilities in one function
    
    // Responsibility 2: Basic validation
    if (!title || !content) {
      setMessage('Title and content are required for draft');
      return;
    }

    // Responsibility 2: Business logic
    const postData = processPostData({ title, content, author, tags });

    // Responsibility 1: UI updates
    const newPost: BlogPost = {
      id: Date.now(),
      title: postData.title,
      content: postData.content,
      author: postData.author || 'Anonymous',
      tags: postData.tags,
      publishedAt: null,
      status: 'draft'
    };

    setPosts([...posts, newPost]);
    setTitle('');
    setContent('');
    setAuthor('');
    setTags('');

    // Responsibility 3: Data persistence
    saveToDatabase(newPost);

    setMessage(`Draft "${newPost.title}" saved successfully!`);
  };

  const handlePublish = () => {
    // Combining all responsibilities in one function
    
    // Responsibility 2: Full validation
    if (!validatePost()) return;

    // Responsibility 2: Business logic
    const postData = processPostData({ title, content, author, tags });
    const seoData = generateSEOMetadata(postData);

    // Responsibility 1: UI updates
    const newPost: BlogPost = {
      id: Date.now(),
      title: postData.title,
      content: postData.content,
      author: postData.author,
      tags: postData.tags,
      publishedAt: new Date(),
      status: 'published'
    };

    setPosts([...posts, newPost]);
    setTitle('');
    setContent('');
    setAuthor('');
    setTags('');

    // Responsibility 3: Multiple external services
    saveToDatabase(newPost);
    publishToSocialMedia(newPost);
    sendEmailNotification(newPost);
    updateSearchIndex(newPost);

    setMessage(`Post "${newPost.title}" published successfully!`);
  };

  const handleDelete = (id: number) => {
    // Combining multiple responsibilities
    
    const postToDelete = posts.find(post => post.id === id);
    
    // Responsibility 1: UI updates
    setPosts(posts.filter(post => post.id !== id));
    
    // Responsibility 3: Database operations
    console.log('Deleting from database...');
    
    // Responsibility 3: External service cleanup
    if (postToDelete?.status === 'published') {
      console.log('Removing from search index...');
      console.log('Updating social media...');
    }
    
    setMessage('Post deleted successfully!');
  };

  // Responsibility 1: UI Rendering (Mixed with other concerns)
  return (
    <div>
      <h2>Blog Management - Bad Example (Violates SRP)</h2>
      <p>This component handles UI, validation, business logic, data persistence, and external services all in one place.</p>
      
      <div>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={handleAuthorChange}
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={handleContentChange}
          rows={6}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={handleTagsChange}
        />
        
        <div>
          <button onClick={handleSaveDraft}>Save Draft</button>
          <button onClick={handlePublish}>Publish Post</button>
        </div>
      </div>

      {message && <div style={{ color: 'blue' }}>{message}</div>}

      <div>
        <h3>Posts ({posts.length})</h3>
        {posts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h4>{post.title}</h4>
            <p>Author: {post.author}</p>
            <p>Status: {post.status}</p>
            <p>Tags: {post.tags.join(', ')}</p>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManagementBad;
