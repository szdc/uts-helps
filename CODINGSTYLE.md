# Coding Style Guide

## Table of Contents
1. [General style](#general-style)
1. [JavaScript style](#javascript-style)
1. [Styling](#styling)
1. [Variables](#variables)
1. [Strings](#strings)
1. [Importing modules](#importing-modules)
1. [Class constructors](#class-constructors)
1. [Binding class methods](#binding-class-methods)
1. [React](#react) 
    1. [Components](#components)
    1. [Props](#props)

## General style
This project uses an [EditorConfig](http://editorconfig.org/) file for consistency across editors (we strongly recommend an IDE like [WebStorm](https://www.jetbrains.com/webstorm/)).
* 2 spaces for indentation
* lf line ending
* A file should end with a single newline

## JavaScript style
Consistency in this project is maintained using [ESLint](http://eslint.org/)
* **NO** semi-colons are used for JavaScript in this project. 
* Two spaces are used for indentation.

This project uses the [JavaScript Standard Style](http://standardjs.com/rules.html) with slight modifications:
* No space before function parentheses

## Styling

[SASS](http://sass-lang.com/) is used for styling.
* **Nesting**: Max 1 level deep (preferably none)
* Use camel-case for class names - this is because styles are imported and referenced as JavaScript objects
* CSS styles are ordered alphabetically
    * Exception: `composes` always comes first
* **CSS colour codes**: *always* lowercase - shorthand (#fff over #ffffff) where possible, **no** literal colours (e.g. orange).

Example:
```scss
.pullLeft {
  composes: className; // composes always comes first
  color: #fff; // short-hand colour code, not #ffffff or "white"
  cursor: pointer;
  display: inline-block;
  float: left;
  left: 10px;
  position: absolute;
  top: -2px;
}

// This pseudo-selector of .pullLeft is not nested
.pullLeft::before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
```

## Variables
* Use camel case

  ```javascript
  // Correct
  const propertyType = 1

  // Wrong
  const property_type = 1
  const propertytype = 1
  const PropertyType = 1
  ```

* Do not prefix variable names

  ```javascript
  // Correct
  const propertyType = 1

  // Wrong
  const $propertyType = 1
  ```

## Strings

Use single quotes for string literals

```javascript
// Correct
const string = 'String'

// Wrong
const string = "String"
```

Concatenate using backticks

```javascript
// Correct
const sentence = `Hello ${name}, how are you today?`

// Wrong
const string = 'Hello ' + name + ', how are you today?'
```

## Importing modules
Imports are grouped by source and type, and groups are separated by a single new line.
The groups (in specific order) are as follows:
- External modules
  - React is *always* imported first
  - The remaining imports are grouped into general/specific and sorted alphabetically
  - General/default imports come before specific imports (those wrapped in `{ }`)
    
    ```javascript
    import React from 'react'
    import MyModule from 'my-module'
    import Walk from 'walk'
    import { SomeMethod } from 'some-methods-module'
    import { SpecificMethod } from 'my-methods'
    ```
    
- Local modules
  - Group by general/specific and sort alphabetically
  - General imports come before specific imports (those wrapped in `{ }`)
  
    ```javascript
    import Component from '../components/Component'
    import { fetchContacts } from '../modules/actions'
    ```

- Strings & SASS files
  - Import strings files first, followed by SASS files

    For example:
    ```javascript
    import strings from './Container.strings.js'
    import classes from './Container.scss'
    ```

Full example:
```javascript
import React from 'react'
import MyModule from 'my-module'
import Walk from 'walk'
import { SomeMethod } from 'some-methods-module'
import { SpecificMethod } from 'my-methods'

import Component from '../components/Component'
import { fetchContacts } from '../modules/actions'

import strings from './Container.strings.js'
import classes from './Container.scss'
```

## Binding class methods
Callbacks to class methods (e.g. setting a handler for `onClick`) that reference `this` need the reference bound, 
or `this` will be undefined when you try to call it from inside the callback.

Binding `this` to the function in the constructor means that it is only bound once (rather than every time 
the component re-renders). For more info, see the [React docs](https://facebook.github.io/react/docs/reusable-components.html#no-autobinding).

Example:
```javascript
constructor(props) {
  super(props)
  
  this.state = {
    message: 'Method bound correctly!'
  }
  // :: is shorthand for this._onClick.bind(this)
  this._onClick = ::this._onClick
}

_onClick(e) {
  console.log(this.state.message)
}

render() {
  return (
    <div onClick={this._onClick}>
      Example
    </div>
  )
}
```

## React

General tips:
* **Do not** use `dispatch()` inside a component, as components are stateless. 
You should instead use the `mapDispatchToProps` method in the component's container.


### Components

* Internal, non-React methods should start with an underscore
  * `_onValueChanged()` **NOT** `onValueChanged()`
  * `render()` is a React method and should not start with an underscore as this will not work 

### Props
* Element props must be ordered alphabetically

Example:
```javascript

// Correct
<TaskList
  onSelectedTasksChanged={this._onSelectedTasksChanged}
  onTaskClick={this._onTaskClick}
  tasksByDate={tasksByDate}
/>

// Wrong
<TaskList
  tasksByDate={tasksByDate}
  onTaskClick={this._onTaskClick}
  onSelectedTasksChanged={this._onSelectedTasksChanged}
/>
```
