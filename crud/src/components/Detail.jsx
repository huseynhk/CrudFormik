import React from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import { getSingleUser } from "../services/user";
import useAxios from "../hooks/useAxios";

const Detail = () => {
  const { userId } = useParams();

  const {
    data: responseData,
    loading,
    error,
  } = useAxios({
    requestFn: () => getSingleUser(userId),
  });

  const user = responseData?.data || {};

  if (!user) {
    return <div>No user data available.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Container className="mt-4 fs-1">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Card>
              <Card.Body>
                <Card.Text>
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    <Card.Title className="mb-2 text-muted fs-3">
                      User Datas
                    </Card.Title>

                    <div>
                      <strong className="text-danger me-3">FullName:</strong>
                      <span>{user.fullName}</span>
                    </div>
                    <div>
                      <strong className="text-danger me-3">Position:</strong>
                      <span>{user.position}</span>
                    </div>
                    <div>
                      <strong className="text-danger me-3">Email:</strong>
                      <span>{user.email}</span>
                    </div>
                    <div>
                      <strong className="text-danger me-3">Age:</strong>
                      <span>{user.age}</span>
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Detail;
