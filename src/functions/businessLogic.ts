export interface BlogPostData {
  title: string;
  content: string;
  author: string;
  tags: string;
}

export interface ProcessedPostData {
  title: string;
  content: string;
  author: string;
  tags: string[];
  slug: string;
}

export interface SEOMetadata {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

export const validatePost = (title: string, content: string, author: string): { isValid: boolean; message?: string } => {
  if (!title || !content || !author) {
    return { isValid: false, message: 'Please fill all required fields' };
  }
  if (title.length < 5) {
    return { isValid: false, message: 'Title must be at least 5 characters' };
  }
  if (content.length < 50) {
    return { isValid: false, message: 'Content must be at least 50 characters' };
  }
  return { isValid: true };
};

export const processPostData = (postData: BlogPostData): ProcessedPostData => {
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

export const generateSEOMetadata = (post: ProcessedPostData): SEOMetadata => {
  return {
    metaTitle: post.title,
    metaDescription: post.content.substring(0, 160),
    keywords: post.tags.join(', ')
  };
};