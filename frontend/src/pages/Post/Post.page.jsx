
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
        <SimpleGrid cols={3}>
          <Await resolve={posts.result} errorElement={<p>Error loading data</p>}>
            {(result) => result.data?.map((post) => (
              <ArticleCardImage key={post.title} {...post} />
            ))}
          </Await>
        </SimpleGrid>
      </React.Suspense >
    </Container>
  );
};

export const postsLoader = async () => {
  const res = axios.get(`${DOMAIN}/api/posts`);
  console.log("I ran!");
  return defer({ result: res });
};
