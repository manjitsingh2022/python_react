import React from 'react';
import { Outlet } from 'react-router-dom';
import {  Row, Col } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import './style.css';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            <main>
              <Outlet />
            </main>
          </Col>
      <Footer />
        </Row>
    </>
  );
};

export default MainLayout;
