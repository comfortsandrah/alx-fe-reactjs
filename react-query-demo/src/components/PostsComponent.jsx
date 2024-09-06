import { useQuery } from "react-query";

const fetchData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const PostsComponent = () => {
  const { data, isError, error, isLoading, refetch } = useQuery(
    "fetchPosts",
    fetchData,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return;
  <div>Loading...</div>;

  if (isError) return;
  <div>Error handling data:{error?.message || "An unknown error occured"}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default PostsComponent;
