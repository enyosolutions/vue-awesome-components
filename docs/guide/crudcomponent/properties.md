---
{
  "title": "Enyo crud component - configuration",
  "lang": "en-US"
}
---


# Vue Crud component configuration


## props

<ComponentDoc :component="'EnyoCrudComponent'" />



## The options object

| Property | Description | type  | Default value |
|---|---|---|---|
|query params| Properties that will always be sent with the api request to the server. Usefull for creating filtered views |  object or function({context, items, currentItemn, parent }) |  undefined |
|body params| Properties that will always be sent with the api request to the server. Usefull for forcing a field to a certain value. |  object or function({context, items, currentItemn, parent }) |  undefined |
|   |   |   |   |
|   |   |   |   |

### query params

Properties that will always be sent with the api request to the server


### bodt params

Properties that will always be sent with the api request to the server. those are merged before updating

