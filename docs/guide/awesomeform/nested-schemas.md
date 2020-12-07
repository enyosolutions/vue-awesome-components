# Nested Schema

The awesomeForm compoenent allows you to include some other data coming form other models, via a nesting feature.
It's called the nestedModels features.

## presentation

Often you'll find yourself needing to display some additional data in the context of your current item. Exemple, list `comments` while browsing a `blog post`, or listing some `invoices` while browsing a `client`.

For that we created the nested models features. While browsing a item, you can display nested Tabs or list that will render in the context of the user.

## Initialisation

To creata nested component, simply add the `nestedModels` property (an array) and fill it with models definitions.



## props

| Type          | description                                                                     |
|---------------|---------------------------------------------------------------------------------|
| string        | Basic string stype                                                              |
| number        | Number based field                                                              |
| booelan       | Shows a green tick(✔) or a red cross(❌) depending on the value                  |
| url           | In app or external url                                                          |
| image         | Image column (displays the actual image)                                        |
| date          | Date field ("DD-MM-YYYY")                                                       |
| datetime      | Date time field (exact format will depend on your browser)                      |
| checkbox      | Checkox                                                                         |
| relation      | Date time field (exact format will depend on your browser) <Badge text="beta"/> |
| object        | Date time field (exact format will depend on your browser)                      |
| list-of-value | The value is used to find the value in a vuex store                             |
| list-of-data  | The value is used to find the value in a vuex store                             |



## events

| Type          | description                                                                     |
|---------------|---------------------------------------------------------------------------------|
| create        | Basic string stype                                                              |
| edit          | Number based field                                                              |
| bulkEdit      | Shows a green tick(✔) or a red cross(❌) depending on the value                  |
| url           | In app or external url                                                          |
| image         | Image column (displays the actual image)                                        |
| date          | Date field ("DD-MM-YYYY")                                                       |
| datetime      | Date time field (exact format will depend on your browser)                      |
| checkbox      | Checkox                                                                         |
| relation      | Date time field (exact format will depend on your browser) <Badge text="beta"/> |
| object        | Date time field (exact format will depend on your browser)                      |
| list-of-value | The value is used to find the value in a vuex store                             |
| list-of-data  | The value is used to find the value in a vuex store                             |




## Styling classes :

`aw-form`

## Examples
