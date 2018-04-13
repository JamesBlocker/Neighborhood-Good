import React from 'react'
import { Link } from 'react-router-dom'
import httpClient from './httpClient'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

export default class Example extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {

        const user = httpClient.getCurrentUser()

        {if(user) {
            return (
                <div>
                  <Navbar color="light" light expand="md">
                    <NavbarBrand href="/posts">Feed</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                        <NavItem>
                          <NavLink href="/posts/new">New Post</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="/user/:id">Profile</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="/logout">Logout</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                            More
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem target="_blank" href="http://www.cityofglendora.org/departments-services/library/volunteering">
                              Volunteer
                            </DropdownItem>
                            <DropdownItem target="_blank" href="http://www.cityofglendora.org/">
                              City Info
                            </DropdownItem>
                            <DropdownItem target="_blank" href="http://www.cityofglendora.org/residents/business-directory">
                              Local Business
                            </DropdownItem>
                            <DropdownItem target="_blank" href="http://www.cityofglendora.org/residents/city-meetings">
                              City Meetings
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                              Donate
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
                    </Collapse>
                  </Navbar>
                </div>
              );
        
            } else {
                return (
                    <div>
                      <Navbar color="light" light expand="md">
                        <NavbarBrand href="/">Home</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                          <Nav className="ml-auto" navbar>
                            <NavItem>
                              <NavLink href="/login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink href="/signup">Signup</NavLink>
                            </NavItem>
                          </Nav>
                        </Collapse>
                      </Navbar>
                    </div>
                  );
            }
        }
        
      
    }
  }

// export default NavBar