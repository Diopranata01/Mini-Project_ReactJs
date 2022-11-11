import React from 'react'
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export default function NavChild() {
  return (
    <div>
        <Nav variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                  <Nav.Link href="/mainpost" style={{ color: '#000' }}>Post</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-1" href="/createdpost" style={{ color: '#000' }} >Created</Nav.Link>
                  {/* <Nav.Link eventKey="link-1" as={Link} to={{ pathname: '/home', new:{ someData: true }}} style={{ color: '#000' }}>Created</Nav.Link> */}
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-2" href="/deletedpost" style={{ color: '#000' }}>Deleted</Nav.Link>
                </Nav.Item>
              </Nav>
    </div>
  )
}
