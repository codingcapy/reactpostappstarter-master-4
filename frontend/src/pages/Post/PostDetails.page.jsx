import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";

function PostDetailsPage(title, category, image, id) {
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
  // do something with this
  return null;
};

export default PostDetailsPage;
