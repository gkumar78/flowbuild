## Match Fields

Each of the match field supported by Openflow in Flow Entries maps to one of the Criteria class 
(implementing the [Criteria Interface](http://api.onosproject.org/1.3.0/org/onosproject/net/flow/criteria/Criterion.html) )
in ONOS API.

ONOS REST API for managing flows expects each of the match criteria supplied as child element of ```selector``` element as shown in example below

```
"selector": {
    "criteria": [
      {
        "type": "IN_PORT",
        "port": 6
      },
      {
        "type": "ETH_DST",
        "mac": "00:00:00:00:02:05"
      },
      {
        "type": "ETH_TYPE",
        "ethType": "0x86dd"
      },
      {
        "type": "VLAN_VID",
        "vlanId": 50
      }
    ]
  }
```

As visible in example above, each Match Criteria is composed of 2 parts:
1. **type** - A unique value identifying match field. This should match one of the [Criterion Enum](http://api.onosproject.org/1.3.0/org/onosproject/net/flow/criteria/Criterion.Type.html)
2. **value key** - This key will change depending upon the value of type element. For example, key is ```ethType``` for type as ```ETH_TYPE```
   but key should be ```mac``` when type is ```ETH_DST```.
   
Meanwhile, the Match Criteria shown in flowbuild GUI will be composed of 2 parts uniquely identifying the specific field.
1. **Group** - The group/category (e.g. Packet Header) the field belongs to e.g. L2, L3, MPLS etc.
2. **Field Name** - Descriptive Name of the field e.g. Ethernet Type, Source Port etc.

Additionally, each field will have a value associated with it. It is also possible that a Match Criteria is not part of any group e.g. Input Port.

### Field Mappings

A Match Criteria supported in flowbuild GUI will map to ONOS API which will further convert it to Openflow match field.
An example for Ethernet Type is shown below.

Flowbuild GUI (L2 Header, Ethernet Type) --->  ONOS REST API (ETH_TYPE, ethType) ---> Openflow (OFPXMT_OFB_ETH_TYPE)

Following table lists the match fields that should be supported by Flowbuild application along with their mappings to ONOS REST API 
and Openflow Match fields (for Openflow version 1.3.4).

| Flowbuild Group           | Flowbuild Field Name     | ONOS type      | ONOS value key     | Openflow Match field Enum     |
| ------------------------- | ------------------------ | -------------- | ------------------ | ----------------------------- |
|                           | Input Port               | IN_PORT        | port               | OFPXMT_OFB_IN_PORT            |
|  Ethernet Header          | Destination MAC          | ETH_DST        | mac                | OFPXMT_OFB_ETH_DST            |
|  IPv4 Header              | Source IP Address        | IPV4_SRC       | ip                 | OFPXMT_OFB_IPV4_SRC           |
|  Transport Header         | TCP Source Port          | TCP _SRC       | tcpPort            | OFPXMT_OFB_TCP_SRC            |
