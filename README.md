[![build status](https://secure.travis-ci.org/wayoutmind/crackle.png)](http://travis-ci.org/wayoutmind/crackle)
Crackle
=======

> JavaScript predicate, comparator, equality, and utility functions

Crackle is collection of useful JavaScript functions for both the browser and server.
Specifically it focuses on collection predicate operations, such as "all or nothing" verification, and also makes working with sets of jQuery Objects easier.

##Getting started

###Node.js

Install Crackle with NPM (Node Package Manager).

```
$ npm install crackle
```

```javascript
var Crackle = require('crackle');
```

###Web browser

Download and include [crackle.min.js](https://raw.github.com/wayoutmind/crackle/master/crackle.min.js).

```html
    <script src="crackle.min.js" type="text/javascript"></script>
    <script type="text/javascript" charset="utf-8">
        var values = [1, 2, 3];
        var Is = Crackle.is;
        if (Is(1).in(values)) {
          alert(Crackle.not(values).in([1, 2, 3, 4, 5]));
        }
    </script>
```

##API

###Value predicates

**<a name="value-in" href="#value-in">.is(value).in(self)</a>**

Return `true` if value `self` exists in an Array `that`.

**<a name="value-all" href="#value-all">.is(self).all(predicate)</a>**

Return `true` if all values in Array `self` satisfy Function `predicate`.

**<a name="value-typeof" href="#value-typeof">.is(self).typeof(type)</a>**

Return `true` if all values in Array `self` satisfy String `type`.

**<a name="value-instanceof" href="#value-instanceof">.is(self).instanceof(predicate)</a>**

Return `true` if all values in Array `self` are instanceof Constructor.

###Object predicates

**<a name="key-in" href="#key-in">.key(property).in(self)</a>**

Return `true` if `key` exists in Object `self`.

**<a name="key-defined" href="#key-defined">.is(self).key(property).defined()</a>**

Return `true` if `key` exists for each Object in Array `self`.

**<a name="key-all" href="#key-all">.is(self).key(property).all(predicate)</a>**

Return `true` if `Object[property]` satisfies Function `predicate` for each Object in Array `self`.

###jQuery

**<a name="parse" href="#parse">.parse(html)</a>**

Return jQuery Object (Array) from HTML String (Array).

**<a name="stringify" href="#stringify">.stringify(object)</a>**

Return HTML String (Array) from jQuery Object (Array).

**<a name="similar" href="#similar">.similar(self).to(that)</a>**

Return `true` if DOM node `self` and `that` have the same HTML content or are the same ID.

###Utility

**<a name="not" href="#not">.not(self).in(that)</a>**

Return elements of Array `self` not in Array `that`.
