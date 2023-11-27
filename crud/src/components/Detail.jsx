import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

const Detail = () => {
  const [user, setUser] = useState("");
  const { userId } = useParams();

  const fetchUser = async () => {
    // const response = await GetSingleUser(userId);
    setUser(response);
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
