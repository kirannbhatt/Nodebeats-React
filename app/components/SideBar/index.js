/**
 *
 * SideBar
 *
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';

function SideBar() {
  return (
    <div>
      <style>
        {`
        .sidebar-content {
          width: 211px;
        }
        `}
      </style>
      <Sidebar
        className="sidebar-content"
        as={Menu}
        animation="overlay"
        inverted
        vertical
        visible
      >
        <Menu.Item header>
          <Icon name="home" />
          <NavLink to="/admin/login">Dashboard</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="admin/user">User</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/admin/blog">Blog</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/admin/testimonial">Testimonial</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/admin/news">News</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to="/admin/newscategory">News Category</NavLink>
        </Menu.Item>
      </Sidebar>
    </div>
  );
}

SideBar.propTypes = {};

export default SideBar;
