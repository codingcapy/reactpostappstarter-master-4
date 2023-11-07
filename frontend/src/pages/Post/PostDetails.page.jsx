
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
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

function PostDetailsPage() {
  const post = useLoaderData()
  const userId = getUserIdFromToken();
  const { editMode, toggleEditMode } = useEditStore((state) => state)
  const navigate = useNavigate();
  const id = post.result.data.id

  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      image: "",
      content: "",
    },
  });

  async function handleSubmit(values) {
    const updatedPost = {
      ...post.result.data,
      title: values.title,
      category: values.category,
      image: values.image,
      content: values.content,
      userId: userId,
    };
    await axios.post(`${DOMAIN}/api/posts/${id}`, updatedPost)
    toggleEditMode()
    navigate("/posts");
  }

  return (
    <>
      <Container>
        <React.Suspense fallback={<PageLoader />}>
          <Await resolve={post.result} errorElement={<p>Error loading data</p>}>
            {(result) => editMode
              ? <Box maw={300} mx="auto">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <TextInput label="Title" placeholder={result.data.title} />
                  <TextInput label="Category" placeholder={result.data.category} />
                  <TextInput label="Image" placeholder={result.data.image} />
                  <TextInput label="Content" placeholder={result.data.content} />
                  <Button type="submit">Update</Button>
                  <Button onClick={toggleEditMode}>Cancel</Button>
                </form>
              </Box>
              :
              <div>
                <div className={classes.detailsContainer}>
                  <div>
                    <p>Author: {result.data.userId}</p>
                    <p>Title: {result.data.title}</p>
                    <p>Category: {result.data.category}</p>
                    <p>Content: {result.data.content}</p>
                    {userId === result.data.userId && <Button onClick={toggleEditMode}>Edit</Button>}
                  </div>
                  <div>
                    <img src={result.data.image} className={classes.image} />
                  </div>
                </div>

              </div>
            }
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
