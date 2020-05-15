## autoprops

Create an editable side bar form that allows you play with a component property. useful for developing a component.

Can accept a slot if you want deeper control on the component

<code>
    < AutoProps
      :component="LiveEdit"
      :docked="true"
      :componentProps="{
        identity: 'ticket',
        apiRequestConfig: { perPageField: '_limit', pageField: '_page' },
        options: { detailPageMode: 'slide' },
      }"
      :skip-props="['translations']"
    />
</code>