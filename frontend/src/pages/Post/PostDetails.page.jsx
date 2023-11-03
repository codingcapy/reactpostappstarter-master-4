import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";
import { useLoaderData } from "react-router-dom"

function PostDetailsPage(title, category, image, id) {
  // const data = useLoaderData()
  return (
    <>
      <Container>
        <p>This page shows post details!</p>
        <Button>
          <Link to="/posts">Back to Posts</Link>
        </Button>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  // const pDetails = await axios.get(`${DOMAIN}/api/${params.id}`);
  // return pDetails.data;
  return null
};

export default PostDetailsPage;
