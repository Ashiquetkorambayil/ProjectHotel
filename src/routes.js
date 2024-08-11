/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import Addadmin from "layouts/admin/addadmin"
// import SignUp from "layouts/authentication/sign-up";
import Admin from "layouts/admin";
import Editadmin from "layouts/admin/editadmin"
import Hotel from 'layouts/hotel'
import Amenities from 'layouts/amenities/ameinites'
import EditAmenities from './layouts/amenities/editamenities/editamenities'
import EditHotel from './layouts/hotel/data/editHotel'
import BranchAdmin from './layouts/hotel/branchAdmin/index'
import ViewAdmin from './layouts/hotel/branchAdmin/data/viewAdmin/viewAdmin'
import EditBranchAdmin from './layouts/hotel/branchAdmin/editBranchAdmin/editBranchAdmin'
import Operations from './layouts/hotel/branchAdmin/Operations/Operations'
import Role from './layouts/hotel/branchAdmin/data/viewAdmin/Role/role'
import BranchStaff from './layouts/hotel/branchStaff/branchstaff'
import ViewBranchStaff from './layouts/hotel/branchStaff/viewBranchStaff'
import Room from './layouts/RoomMangement/room'
import Type from './layouts/RoomMangement/type'
import Specefication from './layouts/RoomMangement/specefication .jsx'
import Cuisine from './layouts/CuisineManagement/Cuisine'
import Dishes from './layouts/CuisineManagement/dishes'
import ContactInfo from './layouts/Contact/ContactInfo'
import Slots from './layouts/RoomMangement/slots'
import Avalilability from './layouts/RoomMangement/availability'
// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";

import Home from './client/home'
import About from './client/about'
import Service from './client/services'
import Menu from './client/menu'
import Contact from './client/contact'
import Booking from './client/booking'
import OurTeam from './client/ourTeam'
import Testimonial from './client/testimonial.jsx'
import Rooms from './client/rooms'
import OurBranch from './client/ourBarnch'
import IdBranch from './client/idbranch'
import LogIn from './client/login'
import UserSignUp from './client/signup'
const routes = [
  // {
  //   // type: "collapse",
  //   name:"Addadmin",
  //   key:'addadmin',
  //   route:'/addadmin',
  //   icon: <Document size="12px"/>,
  //   conponets: <Addadmin/>,
  //   noCollapse: true,
  // },
  {
    // type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name:'Admin',
    key:"admin",
    route:"/admin",
    icon:< Document size="12px"/>,
    component: <Admin/>,
    noCollapse: true
  },
  { type: "title", title: "Hotel Management" },
  {
    type: "collapse",
    name: "Hotel",
    key: "hotel",
    route: "/hotel",
    icon: <Shop size="12px" />,
    component: <Hotel />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Operations",
    key: "operations",
    route: "/operations",
    icon: <Shop size="12px" />,
    component: <Operations />,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Role",
    key: "role",
    route: "/role",
    icon: <Shop size="12px" />,
    component: <Role />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Amenities",
    key: "amenities",
    route: "/amenities",
    icon: <Shop size="12px" />,
    component: <Amenities />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Virtual Reality",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <Cube size="12px" />,
    component: <VirtualReality />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "RTL",
    key: "rtl",
    route: "/rtl",
    icon: <Settings size="12px" />,
    component: <RTL />,
    noCollapse: true,
  },

  
  {
    type: "collapse",
    name: "Room",
    key: "room",
    route: "/room",
    icon: <Shop size="12px" />,
    component: <Room />,
    noCollapse: true,
  },
  ,

  
  {
    // type: "collapse",
    name: "Slots",
    key: "slots",
    route: "/slots/:id",
    icon: <Shop size="12px" />,
    component: <Slots />,
    noCollapse: true,
  },
  { type: "title", title: "Restaurant Management" },
  {
    type: "collapse",
    name: "Cuisine",
    key: "cuisine",
    route: "/cuisine",
    icon: <Shop size="12px" />,
    component: <Cuisine />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Type",
    key: "type",
    route: "/type",
    icon: <Shop size="12px" />,
    component: <Type />,
    noCollapse: true,
  },
  
  {
    // type: "collapse",
    name: "Specefication",
    key: "specefication",
    route: "/specefication",
    icon: <Shop size="12px" />,
    component: <Specefication />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Dishes",
    key: "dishes",
    route: "/dishes/:id",
    icon: <Shop size="12px" />,
    component: <Dishes />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  }, {
    type: "collapse",
    name: "Contact Info",
    key: "contactinfo",
    route: "/contactinfo",
    icon: <CustomerSupport size="12px" />,
    component: <ContactInfo />,
    noCollapse: true,
  },
  
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: <SignUp />,
  //   noCollapse: true,
  // },
  {
    // type: "collapse",
    name: "Add Admin",
    key: "addadmin",
    route: "/addadmin",
    icon: <SpaceShip size="12px" />,
    component: <Addadmin />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Edit Hotel",
    key: "edithotel",
    route: "/edithotel/:id",
    icon: <SpaceShip size="12px" />,
    component: <EditHotel />,
    noCollapse: true,
  },
  {
    
    name:"Edit Admin",
    key:"editadmin",
    route: "/editadmin/:id",
    icon: <SpaceShip size="12px" />,
    component: <Editadmin/>,
    noCollapse: true,
    
  },
  {
    
    name:"Edit Amenities",
    key:"editamenities",
    route: "/editamenities/:id",
    icon: <SpaceShip size="12px" />,
    component: <EditAmenities/>,
    noCollapse: true,
    
  },
  {
    
    name:"Branch Admin",
    key:"branchadmin",
    route: "/branchadmin/:id",
    // icon: <SpaceShip size="12px" />,
    component: <BranchAdmin/>,
    noCollapse: true,
    
  },
  {
    
    name:"View Admin",
    key:"viewadmin",
    route: "/viewadmin/:id",
    // icon: <SpaceShip size="12px" />,
    component: <ViewAdmin/>,
    noCollapse: true,
    
  },
  {
    
    name:"Edit Branch Admin",
    key:"editbranchadmin",
    route: "/editbrachadmin/:id",
    // icon: <SpaceShip size="12px" />,
    component: <EditBranchAdmin/>,
    noCollapse: true,
    
  },
  {
    
    name:"Branch Staff",
    key:"branchstaff",
    route: "/branchstaff/:id",
    // icon: <SpaceShip size="12px" />,
    component: <BranchStaff/>,
    noCollapse: true,
    
  },
  {
    
    name:"View Branch Staff",
    key:"viewbranchstaff",
    route: "/viewbranchstaff/:id",
    // icon: <SpaceShip size="12px" />,
    component: <ViewBranchStaff/>,
    noCollapse: true,
    
  },
 
  {
    
    name:"Home",
    key:"home",
    route: "/home",
    // icon: <SpaceShip size="12px" />,
    component: <Home/>,
    noCollapse: true,
    
  }
  ,
 
  {
    
    name:"About",
    key:"about",
    route: "/about",
    // icon: <SpaceShip size="12px" />,
    component: <About/>,
    noCollapse: true,
    
  }
  ,
 
  {
    
    name:"Service",
    key:"service",
    route: "/service",
    // icon: <SpaceShip size="12px" />,
    component: <Service/>,
    noCollapse: true,
    
  },
 
  {
    
    name:"Menu",
    key:"menu",
    route: "/menu",
    // icon: <SpaceShip size="12px" />,
    component: <Menu/>,
    noCollapse: true,
    
  },
  {
    name:'Contact',
    key:"contact",
    route: "/contact",
    // icon: <SpaceShip size="12px" />,
    component: <Contact/>,
    noCollapse: true,
  },
  {
    name:'Booking',
    key:"booking",
    route: "/booking",
    // icon: <SpaceShip size="12px" />,
    component: <Booking/>,
    noCollapse: true,
  },
  {
    name:'Our Team',
    key:"ourteam",
    route: "/ourteam/:id",
    // icon: <SpaceShip size="12px" />,
    component: <OurTeam/>,
    noCollapse: true,
  },
  {
    name:'Testimonial',
    key:"testimonial",
    route: "/testimonial",
    // icon: <SpaceShip size="12px" />,
    component: <Testimonial/>,
    noCollapse: true,
  },
  {
    name:'Rooms',
    key:"rooms",
    route: "/rooms",
    // icon: <SpaceShip size="12px" />,
    component: <Rooms/>,
    noCollapse: true,
  },
  ,
  {
    name:'Availablility',
    key:"availability",
    route: "/availability/:id",
    // icon: <SpaceShip size="12px" />,
    component: <Avalilability/>,
    noCollapse: true,
  },
  {
    name:'Our Branch',
    key:"ourbranch",
    route: "/ourbranch",
    // icon: <SpaceShip size="12px" />,
    component: <OurBranch/>,
    noCollapse: true,
  },
  {
    name:'Id Branch',
    key:"idbranch",
    route: "/idbranch/:id",
    // icon: <SpaceShip size="12px" />,
    component: <IdBranch/>,
    noCollapse: true,
  },
  {
    name:'Log In',
    key:"login",
    route: "/login",
    // icon: <SpaceShip size="12px" />,
    component: <LogIn/>,
    noCollapse: true,
  }
 
  ,
  {
    name:'Sign Up',
    key:"signup",
    route: "/signup",
    // icon: <SpaceShip size="12px" />,
    component: <UserSignUp/>,
    noCollapse: true,
  }
 
  // {
  //   type: "collapse",
  //   name:"Addadmin",
  //   key:'addadmin',
  //   route:'/addadmin',
  //   icon: <Document size="12px"/>,
  //   conponets: <Addadmin/>,
  //   noCollapse: true,
  // },
];

export default routes;
