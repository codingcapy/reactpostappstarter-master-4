
import React from "react";
import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container, TextInput, Box } from "@mantine/core";
import { Await, defer, useLoaderData } from "react-router-dom"
import PageLoader from "../../components/misc/PageLoader";
import classes from "./postdetails.module.css"
import { getUserIdFromToken } from "../../services/jwt.service";
import { useEditStore } from "../../store/EditStore";

const params = window.location.search
const id = new URLSearchParams(params).get('id')

function PostDetailsPage() {
  const post = useLoaderData()
  const userId = getUserIdFromToken();
  const { editMode, toggleEditMode } = useEditStore((state) => state)

  async function editPost(values) {
    await axios.patch(`${DOMAIN}/api/posts/${id}`, values)
  }

  function handleSubmit(e) {
    e.preventDefault()
    editPost(e)
    toggleEditMode()

  }

  return (
    <>
      <Container>
        <React.Suspense fallback={<PageLoader />}>
          <Await resolve={post.result} errorElement={<p>Error loading data</p>}>
            {(result) => editMode
              ? <Box maw={300} mx="auto">
                <form onSubmit={handleSubmit}>
                  <TextInput label="Title" placeholder={result.data.title} />
                  <TextInput label="Category" placeholder={result.data.category} />
                  <TextInput label="Image" placeholder={result.data.image} />
                  <TextInput label="Content" placeholder={result.data.content} />
                  <Button type="submit" >Update</Button>
                </form>
              </Box>
              : <Box maw={300} mx="auto">
                <img src={result.data.image} className={classes.image} />
                <p>Title: {result.data.title}</p>
                <p>Category: {result.data.category}</p>
                <p>Description: {result.data.content}</p>
                {userId === result.data.id && <Button onClick={toggleEditMode}>Edit</Button>}
              </Box>}
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
  return defer({ result: res });
};

export default PostDetailsPage;
