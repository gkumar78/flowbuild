## Openhack Abstract

**Subject : Web based Openflow Pipeline Builder for ONOS**

Openflow flow-tables provides a very flexible mechanism to build Packet Processing Pipelines in a Openflow enabled switch thus facilitating implementation of various Networking Use cases through manipulation & switching of packets. While designing the processing steps for a new packet flow, it is often required to perform experimentation by configuring multiple flow, group and meter entries to arrive at an optimal solution which is thereafter encoded into final application for deployment into SDN controller.

While working with ONOS SDN Controller, it has been found that there is no such intuitive tool/utility available to configure or edit flow/group entries currently. Hence, we propose to design, prototype and contribute into Community a Web GUI application for performing CRUD operations on flow/group entries on ONOS controlled devices in an intuitive manner thus saving effort during Pipeline design process. With intelligent field validations and pre-population based on Auto-Discovery (e.g. available ports on switch), it will accelerate the definition of flow-entries without worrying about syntactical error possible in Rest API calls for Flow additions.

We further envision to manage variations among the Openflow Standards and standardized Table Type Patterns (e.g. OFDPA) using Profiles in this application. The available options and tables, while configuring a Pipeline flow, would be governed by the profile applicable to the target device thus bringing more efficiency in pipeline design process. The application will support Profiles definition through YANG models to facilitate easy incorporation of new Profiles dynamically.

This application will be a standalone Web application based on AngularJS UI framework and Java backend; and can be deployed into basic Web Container (apache tomcat). Its build system will be created to generate a single distributable binary/archive with clearly defined instructions for installation alongside an ONOS controller. This application will consume REST API of ONOS application for performing CRUD operations on flow/group entries and retrieving Device/Port configurations.


## Features

AsMain objective of this application is to provide a convenient, intuitive Web-based Graphical interface to view & configure the Flows, Graphs and Meters for a switch using ONOS Rest API in the backend. In that context, following set of functional features would be supported by this application.

### Flow Management

This mainly refers to functional views available on Web UI screens of application. Support for following operations is needed:

*  Login page with Username/Password. Credentials of backend ONOS should be used
*  View List of Switches managed by ONOS
*  View basic Details of Switch - as available from ONOS API Response
*  View Flows configured on Switch
*  View details of flows configured on Switch namely
  * Match fields - It Corresponds to fields under selector element in ONOS. Match fields to be supported includes
    * Input Port
    * L2 header fields
    * L3 header fields
    
### Group Management

Further details to be added.

### Auto Discovery and Intelligence

Further details to be added.

### Profiles

Further details to be added.

### Containerization

Further details to be added.

This application provides following Graphical Views for user operations

## GUI Pages

This application provides following Graphical Views for user operations:

* Login page with Username/Password. Credentials of backend ONOS should be used
* Home page - Lists option 'Switches' and 'Profiles' in the tab (top or left) to select the switch/profile to configure.
  * On selection of Switch option, displays list of switches that are managed by underlying ONOS instance in a table. Clicking on Switch opens the Switch page. The basic details of switch i.e. dpid, management ip-address, type of switch, no of ports, connection time etc. are displayed in table.
  * On selection of Profiles option, displays list of profiles that are configured in a table. Clicking on Profile opens the Profile page
* Switch page - Displays basic information about switch. Lists option 'Flows' and 'Groups' in the tab (top or left) to select.
  * On selection of Flows option, displays list of flows configured on the switch. The basic details of flow i.e. table number, management ip-address, type of switch, no of ports, connection time etc. are displayed in table.
  * To be added




## Session Management


