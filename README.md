## Introduction
I myself use Web Storage quite often as I use it for caching data returned from AJAX requests. What I wrote was usually lengthy because I created two storage items; 1 for holding the data and 1 for holding the creation date. I then had to always write a lengthy condition before utilizing this storage data.

dataStore aims to eliminate this, as it's a simple set of methods to make creating expirable storage items super short and easy. It also performs automatic checks for Web Storage support, so there's no worries about incompatibilities here. 

## Getting started
To get started with using dataStore, you first need to install it on your website. You can find the main JavaScript file [here](https://github.com/SethClydesdale/dataStore-JS/blob/master/datastore.js). Add that to your head section, or wherever you like, and you'll be ready to use dataStore in no time !

## dataStore Methods

There are 3 simple methods included with dataStore : ``set``, ``get``, and ``del``. Read on below to find more about them, and how to use them.

1. [dataStore.set()](#set)
2. [dataStore.get()](#get)
3. [dataStore.del()](#del)

### set

``set`` allows you to save an item to localStorage with (or without) an expiration.

##### Syntax

```javascript
dataStore.set(name, value, exp);
```

##### Parameters

| Parameter | Description |
| :-------- | :---------- |
| **name** |  A string that serves as the storage item's name. |
| **value** | The value that's to be saved to localStorage |
| **exp** | A number (in miliseconds) that represents the amount of time the storage item is to be kept. ***(optional)*** |

##### Examples

In the example below we set the following storage items to live for 24hrs and 1 hour.

```javascript
dataStore.set('kitty', 'meow meow', 24*60*60*1000);

dataStore.set('doggy', 'woof woof', 1*60*60*1000);
```

### get

``get`` allows you to get and return your storage item with its data and expiration time.

##### Syntax
```javascript
dataStore.get(name);
```

##### Return Value

The data returned is an object which consists of two properties. They are :

| Property | Description |
| :-------- | :---------- |
| **value** |  The value that you have saved to localStorage |
| **exp** | The amount of time remaining before the storage item is considered "expired." Everytime the object is retrieved, it subtracts the time you submitted against a new date and the creation time. |

##### Parameters

| Parameter | Description |
| :-------- | :---------- |
| **name** |  A string which contains the name of the storage item you want to get |

##### Examples

In the example below we get the kitty and doggy storage items. For now, let's say no time has passed.

```javascript
dataStore.get('kitty') // { value : 'meow meow', exp : 86400000 }

dataStore.get('doggy') // { value : 'woof woof', exp : 3600000 }
```

Here is a small usage example with kitty :
```javascript
var kitty = dataStore.get('kitty');

if (kitty.value && kitty.exp) { // kitty has a value and has not expired
  alert(kitty.value); // alert the storage value
} else {
  dataStore.set('kitty', kitty.value + ' meow', 60*1000); // add another meow for 60 seconds
}
```

### del

``del`` allows you to delete both the storage item and expiration date.

##### Syntax

```javascript
dataStore.del(name);
```

##### Parameters

| Parameter | Description |
| :-------- | :---------- |
| **name** |  A string which contains the name of the storage item you want to delete |

##### Examples

In the example below we delete the value of "kitty" and its expiration date.

```javascript
dataStore.get('kitty') // { value : 'meow meow', exp : 86400000 }

dataStore.del('kitty'); // delete the storage item

dataStore.get('kitty') // { value : '', exp : 0 }
```

### More Examples

Here's a comparison between the old way I used to use, and now with using dataStore.

##### dataStore way

```javascript
var container = document.getElementById('container'),
    data = dataStore.get('containerData');

if (data.value && data.exp) container.innerHTML = data.value;
else $.get('/home', function(d) {
  container.innerHTML = $('#homeMessage', d)[0].innerHTML;
  
  dataStore.set('containerData', container.innerHTML, 1*60*60*1000);
});
```

##### Old way

```javascript
var container = document.getElementById('container');

if (typeof localStorage !== 'undefined' && localStorage.containerData && localStorage.containerDataExp > +new Date - 1*60*60*1000) container.innerHTML = localStorage.containerData;
else $.get('/home', function(d) {
  container.innerHTML = $('#homeMessage', d)[0].innerHTML;
  
  if (typeof localStorage !== 'undefined') {
    localStorage.containerData = container.innerHTML;
    localStorage.containerDataExp = +new Date;
  }
});
```
