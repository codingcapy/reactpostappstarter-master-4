
import React from "react"
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { Await, defer, useLoaderData } from "react-router-dom";
import PageLoader from "../../components/misc/PageLoader";

export const PostPage = () => {
  const posts = useLoaderData();
  return (
    <Container>
      <React.Suspense fallback={<PageLoader />}>
        <Await>
          <SimpleGrid cols={3}>
            {posts?.map((post) => (
              <ArticleCardImage key={post.title} {...post} />
            ))}
          </SimpleGrid>
        </Await>
      </React.Suspense >
    </Container>
  );
};

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  console.log("I ran!");
  return res.data;
};
