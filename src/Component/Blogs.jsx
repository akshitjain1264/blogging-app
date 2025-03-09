import { useState, useEffect } from "react";

function Blogs() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from MongoDB
  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  // Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle Blog submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        body: formData,
      });

      const newBlog = await res.json();
      setBlogs([...blogs, newBlog]); // Update UI with new blog
      setTitle("");
      setContent("");
      setImage(null);

      alert("Blog added successfully.")
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  // Handling delete Blog
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        throw new Error("Failed to delete blog");
      }
      alert("Blog Deleted Successfully.");
      // Update state to remove the deleted blog
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div>
      <h2 className="header">Create a Blog Post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button type="submit">Publish</button>
      </form>

      <div className="container blog-container">
        <h3>Recent Blogs</h3>
        <div class="row">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="col-lg-3 col-md-4 col-sm-6 blog"
            >
              {blog.imageUrl && (
                <img
                  src={`http://localhost:5000${blog.imageUrl}`}
                  alt="Blog"
                  width="200"
                />
              )}
              <h4>{blog.title}</h4>
              <p>{blog.content}</p>
              <button onClick={() => handleDelete(blog._id)}>Delete</button> {/* 🗑️ DELETE BUTTON */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
