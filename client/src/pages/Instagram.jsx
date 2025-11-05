import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const InstagramSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const accessToken = process.env.REACT_APP_IG_ACCESS_TOKEN;
        const userId = process.env.REACT_APP_IG_USER_ID;
        // Example endpoint using Graph API
        const url = `https://graph.instagram.com/${userId}/media?fields=id,media_url,permalink,thumbnail_url&access_token=${accessToken}&limit=6`;
        const resp = await fetch(url);
        const data = await resp.json();
        if (data && data.data) {
          setPosts(data.data);
        } else {
          console.error("Instagram fetch error:", data);
        }
      } catch (err) {
        console.error("Error fetching Instagram posts", err);
      }
    };
    fetchInstagramPosts();
  }, []);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
            Follow Us On <span className="text-yellow-500">Instagram</span>
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Get daily decoration inspiration and latest updates
          </p>
          <a
            href="https://www.instagram.com/surprisesutra"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:from-purple-600 hover:to-pink-600 transition duration-300 inline-block"
          >
            @surprisesutra
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, index) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-2xl aspect-square cursor-pointer"
            >
              <img
                src={post.media_url}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-transparent opacity-0 group-hover:opacity-90 transition duration-300 flex items-end justify-center pb-4">
                <Heart className="text-white" size={32} />
              </div>
            </a>
          ))}
          {posts.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              Loading posts…
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
