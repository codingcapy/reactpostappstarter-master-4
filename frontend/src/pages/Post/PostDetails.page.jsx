
import React from "react";
import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";
import { Await, defer, useLoaderData } from "react-router-dom"
import PageLoader from "../../components/misc/PageLoader";

function PostDetailsPage(title, category, image, id) {
  const post = useLoaderData()
  return (
    <>
      <Container>
      <React.Suspense fallback={<PageLoader />}>
        <Await resolve={post.result} errorElement={<p>Error loading data</p>}>
        {(result)=><div>
          <img src={result.data.image} /> 
          <p>Title: {result.data.title}</p>
          <p>Category: {result.data.category}</p>
          <p>Description: {result.data.content}</p>
          </div>}
        </Await>
        <Button>
          <Link to="/posts">Back to Posts</Link>
        </Button>
        </React.Suspense>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return defer ({result:res});
  return null
};

export default PostDetailsPage;
