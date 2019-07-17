## Openhack Abstract

**Subject : Web based Openflow Pipeline Builder for ONOS**

Openflow flow-tables provides a very flexible mechanism to build Packet Processing Pipelines in a Openflow enabled switch thus facilitating implementation of various Networking Use cases through manipulation & switching of packets. While designing the processing steps for a new packet flow, it is often required to perform experimentation by configuring multiple flow, group and meter entries to arrive at an optimal solution which is thereafter encoded into final application for deployment into SDN controller.

While working with ONOS SDN Controller, it has been found that there is no such intuitive tool/utility available to configure or edit flow/group entries currently. Hence, we propose to design, prototype and contribute into Community a Web GUI application for performing CRUD operations on flow/group entries on ONOS controlled devices in an intuitive manner thus saving effort during Pipeline design process. With intelligent field validations and pre-population based on Auto-Discovery (e.g. available ports on switch), it will accelerate the definition of flow-entries without worrying about syntactical error possible in Rest API calls for Flow additions.

We further envision to manage variations among the Openflow Standards and standardized Table Type Patterns (e.g. OFDPA) using Profiles in this application. The available options and tables, while configuring a Pipeline flow, would be governed by the profile applicable to the target device thus bringing more efficiency in pipeline design process. The application will support Profiles definition through YANG models to facilitate easy incorporation of new Profiles dynamically.

This application will be a standalone Web application based on AngularJS UI framework and Java backend; and can be deployed into basic Web Container (apache tomcat). Its build system will be created to generate a single distributable binary/archive with clearly defined instructions for installation alongside an ONOS controller. This application will consume REST API of ONOS application for performing CRUD operations on flow/group entries and retrieving Device/Port configurations.


## Features

AsMain objective of this application is to provide a convenient, intuitive Web-based Graphical interface to view & configure the Flows, Graphs and Meters for a switch using ONOS Rest API in the backend. In that context, following set of functional features would be supported by this application.

### ONOS Connection and Login

This mainly refers to functional views available on Web UI screens of application. Support for following operations is needed:

#### Flowbuild Login page
This should be the first Landing page of the application. It will list text-boxes for entering Username/Password and login button. Credentials of backend ONOS should be used to login into REST API of ONOS. An Error should be displayed in event of login failure and form should reset. On successful login, application should load Next page of Managed Switches.

#### Managed Switches

This page displays List of Switches managed by ONOS. It invokes the /devices REST API of ONOS to retrieve the list of managed switches and displays it in a table. Should show a warning "No Switches managed by ONOS" when devices REST API returns blank JSON.

This page should list switches in a tabular form with columns covering following attribute of each switch
* Name - pick from ```annotations``` -> ```name``` attribute in Json response
* Openflow Id - ```id``` attribute
* Device Type - ```driver``` attribute
* Vendor - ```mfr``` attribute
* Model - ```hw``` attribute
* Software Version - ```sw``` attribute
* Reachable - ```available``` attribute
* Openflow Protocol - ```annotations``` -> ```protocol``` attribute
* Last Update - ```humanReadableLastUpdate``` attribute

Also, it should be able to determine the associated Profile of discovered switch based on device type and openflow version. One column should display the Profile of switch.

The last column of Table would provide a single button 'Configure' to Open Switch Configuration page with default Flow management screen.

### Flow Management

This feature covers UI screens listed below to facilitate display and modification of Flow Entries for a managed switch.

* View Flows configured on Switch
* View details of flows configured on Switch (Table, Match fields, Priority, Timeout, Instructions, Counters, Cookie)
* Delete configured flows
* Add new flow entry
* Clone an existing flow entry

#### Match Fields

Match fields to be displayed will be governed by the Profile associated with the Switch. When adding a flow, only those fields which are allowed as part of Match criteria for the profile are made available in UI screen. When displaying the match criteria, all retrieved match fields will be displayed in UI screen but those fields which are not part of associated profile will be displayed in RED.

Flowbuild will allow configuring multiple match fields for a Flow Entry. Each match field will be composed of 2 parts,
1. **Group** - The group/category (e.g. Packet Header) the field belongs to e.g. L2, L3, MPLS etc.
2. **Field Name** - Descriptive Name of the field e.g. Ethernet Type, Source Port etc.

While adding a new flow entry, user will be asked to first select a Group from the dropdown. Based on selected Group, the next dropdown of Field name will get populated. Please refer to [Match Fields page](MatchFields.md) for more details of supported match fields and their mapping to ONOS REST API JSON attributes. 

#### Instructions

As with Match Fields, Instructions to be displayed will be governed by the Profile associated with the Switch. When adding a flow, only those fields which are allowed as part of Instructions Action set for the profile are made available in UI screen. When displaying the Instructions, all retrieved action set fields will be displayed in UI screen but those action sets which are not part of associated profile will be displayed in RED.

Further details to be added.

### Auto Discovery and Intelligence

In order to facilitate intuitive programming of Flow Entries leading to Processing Pipeline on managed switch, flowbuild application will implement following intelligent mechanisms to aid in correct configuration of individual flow entries.

#### Semantic Validations based on Field Types

This covers validation of mostly input text fields based on field type. Field type can be generic e.g.

* Numeric - only integer numbers (within a range) are allowed in such fields. For example, Priority field in flow can have value from 0 to 65535 only. Also, tcp ports should also be between 0 to 65535 only.
* String - String value upto a maximum length are allowed in such fields
* HexString - Only Hex Strings upto a maximum length are allowed in such fields e.g. metatdata field in flow can be upto 64 hexadecimal bytes long.
* Binary - Only Bit String (0 & 1) are allowed in this field upto a maximum length e.g. DSCN field in IP Header is of 6 bits.

Other field to be supported are domain specific e.g.
* IPv4 Address - For example, Destination IP Address field of IPv4 Header in Flow Match fields
* MAC Address - For example, Destination MAC Address field of Ethernet Header in Flow Match fields

Additionally, there are many fields which have only discrete values which would be configured as ENUM in flowbuild and a drop-down with all allowed values will be provided to User to select. Example of such fields are Ethernet Frame Type, ARP Operation Code etc.

#### Validations based on Discovery

Some of the input fields in flowbuild will perform validations based on currently discovered and configured status of network elements e.g. device, ports, flows etc. This will mostly be achieved by only showing the allowed values in a drop-down for user to select.

Example of such fields include:

* Input Physical Port - Flowbuild will retrieve and cache list of available physical ports for a device and only show them in a drop-down while adding Input Port as a Match Field during configuration of a new flow entry.
* Out Port - Same as above
* Action Group - Only list of configured Group Buckets will be shown when selecting the next Group as the Action set.

#### Logical Validations

Openflow specifications defines some specific rules which can be used to defined some additional validations to prevent the configuration of invalid Flow/Group entries by user which would anyway be denied by switch on API call. Such validations shall include:

* Table Number - A Flow entry in a table should have go-to instruction pointing to higher number Table number only.
* Flow Entry - A Table Miss entry (no match criteria) should be configured only with lowest Priority (0) otherwise it can override any valid flow entries. 

### Group Management

Further details to be added.

### Meters Management

Further details to be added.

### Profiles

Profile refers to the differentiated behaviour and semantics of flows, groups and meters supported by various types and versions of Switches being programmed by ONOS. Each switch has a type and is compliant to a specific version of Openflow protocol; which governs which all attributes of flows is supported by that switch. For example, TCP_FLAGS is supported as a match field for Flow entry in Openflow version 1.5.1 but not in verison 1.3.0.

Flowbuild app will support multiple profiles; each compliant to a specific type and openflow protocol version. Each profile will be configured into a separate file named 'profile-name.yaml' and placed into profiles folder in the deployed application. All supported profiles will be loaded by flow-build application at the startup; any profile file not in correct format will be discarded and not loaded.

Thereafter, each discovered switch (returned in ONOS API call) will be associated with one of the loaded profile depending of device type and openflow version of switch. The configuration options displayed by flowbuild in UI screens of flows, groups and meters would be governed by the customizations & rules defined in the Profile associated with the switch.

There would also be a default profile with corresponding profile filename as 'default.yaml'. This defines customizations & rules for any switch which does not match the pre-configured profiles and hence would belong to the default profile.

To start with, a single profile with switch type 'ofdpa' and Openflow version '1.3.4' will be supported.

Refer to the <to be added> page for syntax and format of the profile file.

### Containerization

Further details to be added.

